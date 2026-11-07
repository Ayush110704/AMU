import app from './app.js'
import { config } from './config.js'
import { connectDatabase } from './db.js'

async function startServer() {
  try {
    await connectDatabase()
    app.listen(config.port, () => {
      console.log(`AMU complaint API listening on port ${config.port}`)
    })
  } catch (error) {
    console.error('Could not start the API:', error.message)
    console.error('MongoDB connection failed. Check MONGODB_URI and MongoDB Atlas access.')

    if (process.env.NODE_ENV === 'production') {
      process.exitCode = 1
    }
  }
}

startServer()
