import mongoose from 'mongoose'
import { config } from './config.js'

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1
}

export function connectDatabase() {
  const mongoUri = config.mongoUri

  if (!mongoUri) {
    throw new Error('MONGODB_URI is required. Copy .env.example to .env and configure it.')
  }

  if (!/^mongodb(\+srv)?:\/\//i.test(mongoUri)) {
    throw new Error('MONGODB_URI must start with mongodb:// or mongodb+srv://')
  }

  return mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    retryWrites: true,
  })
}
