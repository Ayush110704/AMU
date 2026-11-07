import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import multer from 'multer'
import { requireAdminAuth } from './auth.js'
import { config } from './config.js'
import adminRouter from './routes/admin.js'
import adminAuthRouter from './routes/adminAuth.js'
import complaintsRouter from './routes/complaints.js'

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: config.clientUrl }))
app.use(express.json({ limit: '32kb' }))
app.use('/api/admin/auth', adminAuthRouter)
app.use('/api/admin', requireAdminAuth, adminRouter)
app.use('/api/complaints', complaintsRouter)
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE'
      ? 'Files must be 10 MB or smaller.'
      : error.code === 'LIMIT_FILE_COUNT'
        ? 'You can attach up to 5 files.'
        : 'The uploaded files could not be accepted.'
    res.status(400).json({ error: message })
    return
  }

  if (error.message?.startsWith('Only images')) {
    res.status(400).json({ error: error.message })
    return
  }

  if (error.name === 'ValidationError') {
    res.status(400).json({ error: 'Some request details are invalid.' })
    return
  }

  if (error.name === 'CastError') {
    res.status(400).json({ error: 'The requested record id is invalid.' })
    return
  }

  if (error.code === 11000) {
    res.status(409).json({ error: 'A record with the same value already exists.' })
    return
  }

  console.error('Request failed:', error.message)
  res.status(500).json({ error: 'The request could not be completed. Please try again later.' })
})

export default app
