import express from 'express'
import Admin from '../models/Admin.js'
import { hashPassword, signAdminToken, verifyPassword, requireAdminAuth } from '../auth.js'
import { config } from '../config.js'

const router = express.Router()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(value) {
  return typeof value === 'string' ? value.trim() : ''
}

router.post('/register', async (req, res, next) => {
  try {
    const name = text(req.body.name)
    const email = text(req.body.email).toLowerCase()
    const password = text(req.body.password)
    const adminCode = text(req.body.adminCode)

    if (!name || !email || !password || !adminCode) {
      res.status(400).json({ error: 'name, email, password, and adminCode are required.' })
      return
    }

    if (!emailPattern.test(email)) {
      res.status(400).json({ error: 'Enter a valid email address.' })
      return
    }

    if (password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters.' })
      return
    }

    if (!config.adminRegistrationCode) {
      res.status(500).json({ error: 'Admin registration is not configured.' })
      return
    }

    if (adminCode !== config.adminRegistrationCode) {
      res.status(403).json({ error: 'Invalid admin registration code.' })
      return
    }

    const existingAdmin = await Admin.findOne({ email }).lean()
    if (existingAdmin) {
      res.status(409).json({ error: 'An admin account already exists for this email.' })
      return
    }

    const passwordHash = await hashPassword(password)
    const admin = await Admin.create({
      name,
      email,
      passwordHash,
      role: 'admin',
      isActive: true,
    })

    res.status(201).json({
      message: 'Admin registered successfully.',
      admin: admin.toSafeObject(),
    })
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const email = text(req.body.email).toLowerCase()
    const password = text(req.body.password)

    if (!email || !password) {
      res.status(400).json({ error: 'email and password are required.' })
      return
    }

    const admin = await Admin.findOne({ email })
    if (!admin || !admin.isActive) {
      res.status(401).json({ error: 'Invalid email or password.' })
      return
    }

    const isValidPassword = await verifyPassword(password, admin.passwordHash)
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid email or password.' })
      return
    }

    admin.lastLoginAt = new Date()
    await admin.save()

    const token = signAdminToken(admin)
    res.json({
      token,
      admin: admin.toSafeObject(),
    })
  } catch (error) {
    next(error)
  }
})

router.get('/me', requireAdminAuth, async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id)

    if (!admin || !admin.isActive) {
      res.status(401).json({ error: 'Admin account is not available.' })
      return
    }

    res.json({ admin: admin.toSafeObject() })
  } catch (error) {
    next(error)
  }
})

export default router
