import mongoose from 'mongoose'
import { config } from './config.js'

export function connectDatabase() {
  if (!config.mongoUri) {
    throw new Error('MONGODB_URI is required. Copy .env.example to .env and configure it.')
  }
  return mongoose.connect(config.mongoUri)
}
