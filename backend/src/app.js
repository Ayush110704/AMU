import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import multer from 'multer'
import { config } from './config.js'
import complaintsRouter from './routes/complaints.js'

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: config.clientUrl }))
app.use(express.json({ limit: '32kb' }))
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
    res.status(400).json({ error: 'Some complaint details are invalid.' })
    return
  }

  console.error('Request failed:', error.message)
  res.status(500).json({ error: 'The complaint could not be saved. Please try again later.' })
})

export default app
