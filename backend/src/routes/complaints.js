import crypto from 'node:crypto'
import express from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { config } from '../config.js'
import { upload } from '../middleware/upload.js'
import Complaint, { complaintCategories } from '../models/Complaint.js'
import { sendComplaintNotification } from '../services/email.js'

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
  secure: true,
})

const router = express.Router()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobilePattern = /^\+?[0-9\s().-]{7,20}$/
const videoTypes = new Set(['video/mp4', 'video/quicktime', 'video/webm'])

function text(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function validateComplaint(body, files) {
  const hasComplaintDetails = ['title', 'category', 'location', 'description'].some((key) => text(body[key]))
  if (!hasComplaintDetails) return 'Share at least one complaint detail before submitting.'

  const limits = {
    name: 100, studentId: 50, rollNumber: 50, email: 254, department: 120,
    course: 120, residence: 120, title: 160, location: 200, description: 5000, resolution: 3000,
  }
  const tooLong = Object.entries(limits).find(([key, max]) => text(body[key]).length > max)
  if (tooLong) return `${tooLong[0]} must be ${tooLong[1]} characters or fewer.`
  if (text(body.email) && !emailPattern.test(text(body.email))) return 'Enter a valid email address.'
  const digits = text(body.mobile).match(/\d/g) || []
  if (text(body.mobile) && (!mobilePattern.test(text(body.mobile)) || digits.length < 7 || digits.length > 15)) {
    return 'Enter a valid mobile number.'
  }
  if (text(body.category) && !complaintCategories.includes(text(body.category))) {
    return 'Select a valid complaint category.'
  }
  if (body.incidentDate) {
    const date = new Date(body.incidentDate)
    if (Number.isNaN(date.valueOf())) return 'Enter a valid incident date.'
    if (date > new Date()) return 'Incident date cannot be in the future.'
  }
  if (files.some((file) => videoTypes.has(file.mimetype) && file.size > 5 * 1024 * 1024)) {
    return 'Video files must be 5 MB or smaller.'
  }
  return null
}

function makeComplaintNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  return `AMU-${date}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`
}

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const resourceType = file.mimetype.startsWith('image/') ? 'image'
      : file.mimetype.startsWith('video/') || file.mimetype.startsWith('audio/') ? 'video' : 'raw'
    const stream = cloudinary.uploader.upload_stream({
      folder: 'amu-complaints',
      resource_type: resourceType,
      public_id: `${crypto.randomUUID()}-${pathSafeName(file.originalname)}`,
    }, (error, result) => error ? reject(error) : resolve({
      publicId: result.public_id,
      url: result.secure_url,
      resourceType: result.resource_type,
    }))
    stream.end(file.buffer)
  })
}

function deleteFromCloudinary(attachments) {
  return Promise.allSettled(attachments.map(({ publicId, resourceType }) =>
    cloudinary.uploader.destroy(publicId, { resource_type: resourceType }),
  ))
}

router.get('/track/:complaintNumber', async (req, res, next) => {
  try {
    const complaintNumber = text(req.params.complaintNumber)
    if (!complaintNumber) {
      res.status(400).json({ error: 'Complaint number is required.' })
      return
    }

    const complaint = await Complaint.findOne({ complaintNumber }).lean()
    if (!complaint) {
      res.status(404).json({ error: 'Complaint not found.' })
      return
    }

    res.json({
      complaint: {
        complaintNumber: complaint.complaintNumber,
        status: complaint.status,
        adminRemarks: complaint.adminRemarks,
        createdAt: complaint.createdAt,
        updatedAt: complaint.updatedAt,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', upload.array('attachments', 5), async (req, res, next) => {
  const files = req.files || []
  const validationError = validateComplaint(req.body, files)
  if (validationError) {
    res.status(400).json({ error: validationError })
    return
  }

  const uploadedFiles = []
  let complaint
  try {
    for (const file of files) uploadedFiles.push(await uploadToCloudinary(file))
    complaint = await Complaint.create({
      complaintNumber: makeComplaintNumber(),
      name: text(req.body.name),
      studentId: text(req.body.studentId),
      rollNumber: text(req.body.rollNumber),
      email: text(req.body.email),
      mobile: text(req.body.mobile),
      department: text(req.body.department),
      course: text(req.body.course),
      residence: text(req.body.residence),
      title: text(req.body.title),
      category: text(req.body.category),
      location: text(req.body.location),
      incidentDate: req.body.incidentDate || null,
      description: text(req.body.description),
      resolution: text(req.body.resolution),
      attachments: files.map((file, index) => ({
        ...uploadedFiles[index],
        originalName: pathSafeName(file.originalname),
        mimeType: file.mimetype,
        size: file.size,
      })),
    })

  } catch (error) {
    await deleteFromCloudinary(uploadedFiles)
    next(error)
    return
  }

  let notificationSent = false
  try {
    const emailFiles = files.map((file, index) => ({
      ...uploadedFiles[index],
      buffer: file.buffer,
      originalName: pathSafeName(file.originalname),
      size: file.size,
    }))
    await sendComplaintNotification(complaint, emailFiles)
    notificationSent = true
  } catch (error) {
    console.error(`Could not email admin about complaint ${complaint.complaintNumber}:`, error.message)
  }

  res.status(201).json({
    message: 'Complaint received.',
    complaintNumber: complaint.complaintNumber,
    notificationSent,
  })
})

function pathSafeName(filename) {
  return filename.replaceAll('\\', '/').split('/').pop().slice(0, 255)
}

export default router
