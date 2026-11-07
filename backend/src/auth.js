import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from './config.js'

const tokenExpiry = '12h'

function ensureJwtSecret() {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is required.')
  }
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash)
}

export function signAdminToken(admin) {
  ensureJwtSecret()

  return jwt.sign(
    {
      sub: String(admin._id),
      email: admin.email,
      role: admin.role,
      name: admin.name,
    },
    config.jwtSecret,
    { expiresIn: tokenExpiry },
  )
}

export function verifyAdminToken(token) {
  ensureJwtSecret()
  return jwt.verify(token, config.jwtSecret)
}

export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ error: 'Authentication required.' })
    return
  }

  try {
    const payload = verifyAdminToken(token)
    req.admin = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    }
    next()
  } catch (_error) {
    res.status(401).json({ error: 'Invalid or expired token.' })
  }
}
