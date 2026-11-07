import express from 'express'
import mongoose from 'mongoose'
import Complaint from '../models/Complaint.js'
import { isDatabaseConnected } from '../db.js'

const router = express.Router()
const allowedStatuses = ['Pending', 'In Progress', 'Resolved']

function normalizeStatus(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function ensureDatabaseReady(res) {
  if (!isDatabaseConnected()) {
    res.status(503).json({ error: 'Database is unavailable. Please check MongoDB Atlas connectivity and IP whitelist.' })
    return false
  }

  return true
}

async function findComplaintByIdOrNumber(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Complaint.findById(id)
  }

  return Complaint.findOne({ complaintNumber: id })
}

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', module: 'admin' })
})

router.get('/complaints', async (_req, res, next) => {
  if (!ensureDatabaseReady(res)) return

  try {
    const complaints = await Complaint.find({}).sort({ createdAt: -1 }).lean()
    res.json({ complaints })
  } catch (error) {
    next(error)
  }
})

router.get('/complaints/:id', async (req, res, next) => {
  if (!ensureDatabaseReady(res)) return

  try {
    const complaint = await findComplaintByIdOrNumber(req.params.id)

    if (!complaint) {
      res.status(404).json({ error: 'Complaint not found.' })
      return
    }

    res.json({ complaint: complaint.toObject ? complaint.toObject() : complaint })
  } catch (error) {
    next(error)
  }
})

router.patch('/complaints/:id', async (req, res, next) => {
  if (!ensureDatabaseReady(res)) return

  try {
    const status = normalizeStatus(req.body.status)
    const adminRemarks = typeof req.body.adminRemarks === 'string' ? req.body.adminRemarks.trim() : ''

    if (!status) {
      res.status(400).json({ error: 'Status is required.' })
      return
    }

    if (!allowedStatuses.includes(status)) {
      res.status(400).json({ error: 'Invalid status. Allowed values: Pending, In Progress, Resolved.' })
      return
    }

    const existingComplaint = await findComplaintByIdOrNumber(req.params.id)

    if (!existingComplaint) {
      res.status(404).json({ error: 'Complaint not found.' })
      return
    }

    const complaint = await Complaint.findByIdAndUpdate(
      existingComplaint._id,
      {
        status,
        adminRemarks: adminRemarks || 'No remarks provided.',
      },
      { new: true, runValidators: true },
    )

    res.json({ message: 'Complaint updated successfully.', complaint })
  } catch (error) {
    next(error)
  }
})

router.get('/stats', async (_req, res, next) => {
  if (!ensureDatabaseReady(res)) return

  try {
    const [total, pending, inProgress, resolved] = await Promise.all([
      Complaint.countDocuments(),
      Complaint.countDocuments({ status: 'Pending' }),
      Complaint.countDocuments({ status: 'In Progress' }),
      Complaint.countDocuments({ status: 'Resolved' }),
    ])

    res.json({
      total,
      pending,
      inProgress,
      resolved,
    })
  } catch (error) {
    next(error)
  }
})

export default router
