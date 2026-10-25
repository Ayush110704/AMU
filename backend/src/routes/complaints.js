import crypto from 'node:crypto'
import express from 'express'
import { removeUploadedFiles, upload } from '../middleware/upload.js'
import Complaint, { complaintCategories } from '../models/Complaint.js'

const router = express.Router()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const mobilePattern = /^\+?[0-9\s().-]{7,20}$/
const videoTypes = new Set(['video/mp4', 'video/quicktime', 'video/webm'])

function text(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function validateComplaint(body, files) {
  const required = ['name', 'studentId', 'email', 'mobile', 'department', 'title', 'category', 'location', 'description']
  const missing = required.filter((key) => !text(body[key]))
  if (missing.length) return `Required fields are missing: ${missing.join(', ')}.`

  const limits = {
    name: 100, studentId: 50, rollNumber: 50, email: 254, department: 120,
    course: 120, residence: 120, title: 160, location: 200, description: 5000, resolution: 3000,
  }
  const tooLong = Object.entries(limits).find(([key, max]) => text(body[key]).length > max)
  if (tooLong) return `${tooLong[0]} must be ${tooLong[1]} characters or fewer.`
  if (!emailPattern.test(text(body.email))) return 'Enter a valid email address.'
  const digits = text(body.mobile).match(/\d/g) || []
  if (!mobilePattern.test(text(body.mobile)) || digits.length < 7 || digits.length > 15) {
    return 'Enter a valid mobile number.'
  }
  if (!complaintCategories.includes(text(body.category))) return 'Select a valid complaint category.'
  if (text(body.declaration).toLowerCase() !== 'on' && text(body.declaration).toLowerCase() !== 'true') {
    return 'Confirm the declaration before submitting.'
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

router.post('/', upload.array('attachments', 5), async (req, res, next) => {
  const files = req.files || []
  const validationError = validateComplaint(req.body, files)
  if (validationError) {
    await removeUploadedFiles(files)
    res.status(400).json({ error: validationError })
    return
  }

  try {
    const complaint = await Complaint.create({
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
      attachments: files.map((file) => ({
        storageKey: file.filename,
        originalName: pathSafeName(file.originalname),
        mimeType: file.mimetype,
        size: file.size,
      })),
    })

    res.status(201).json({
      message: 'Complaint received.',
      complaintNumber: complaint.complaintNumber,
    })
  } catch (error) {
    await removeUploadedFiles(files)
    next(error)
  }
})

function pathSafeName(filename) {
  return filename.replaceAll('\\', '/').split('/').pop().slice(0, 255)
}

export default router
