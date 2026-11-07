import test from 'node:test'
import assert from 'node:assert/strict'

import { signAdminToken, verifyAdminToken, requireAdminAuth } from './auth.js'

test('admin tokens can be signed and verified', () => {
  const token = signAdminToken({
    _id: '64f0c2d7a3b1e2d1f0a1b2c3',
    email: 'admin@amu.ac.in',
    role: 'admin',
  })

  const payload = verifyAdminToken(token)

  assert.equal(payload.email, 'admin@amu.ac.in')
  assert.equal(payload.role, 'admin')
})

test('requireAdminAuth rejects missing bearer token', () => {
  let statusCode = 200
  const res = {
    status(code) {
      statusCode = code
      return this
    },
    json(payload) {
      this.payload = payload
      return this
    },
  }

  let nextCalled = false
  const req = { headers: {} }

  requireAdminAuth(req, res, () => {
    nextCalled = true
  })

  assert.equal(statusCode, 401)
  assert.equal(nextCalled, false)
})
