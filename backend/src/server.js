import app from './app.js'
import { config } from './config.js'
import { connectDatabase } from './db.js'

try {
  await connectDatabase()
  app.listen(config.port, () => {
    console.log(`AMU complaint API listening on port ${config.port}`)
  })
} catch (error) {
  console.error('Could not start the API:', error.message)
  process.exitCode = 1
}
