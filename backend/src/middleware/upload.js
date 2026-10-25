import crypto from 'node:crypto'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import multer from 'multer'

export const uploadDirectory = fileURLToPath(new URL('../../uploads/', import.meta.url))
fs.mkdirSync(uploadDirectory, { recursive: true })

export const allowedMimeTypes = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/quicktime', 'video/webm',
  'audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/webm',
  'application/pdf',
])

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (_req, _file, callback) => callback(null, crypto.randomUUID()),
})

export const upload = multer({
  storage,
  limits: { files: 5, fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      callback(new Error('Only images, video, audio, and PDF files are allowed.'))
      return
    }
    callback(null, true)
  },
})

export function removeUploadedFiles(files = []) {
  return Promise.all(files.map(({ path: filePath }) => fs.promises.rm(filePath, { force: true })))
}
