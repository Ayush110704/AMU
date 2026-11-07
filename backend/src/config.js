import 'dotenv/config'

function text(value) {
  return typeof value === 'string' ? value.trim() : value
}

const mongoUri = text(process.env.MONGODB_URI) || text(process.env.MONGO_URI)
const jwtSecret = text(process.env.JWT_SECRET)
const isProduction = process.env.NODE_ENV === 'production'

export const config = {
  port: Number(process.env.PORT) || 4000,
  clientUrl: text(process.env.CLIENT_URL) || 'http://localhost:5173',
  mongoUri,
  jwtSecret: jwtSecret || (isProduction ? undefined : 'dev-only-jwt-secret-change-me'),
  adminRegistrationCode: text(process.env.ADMIN_REGISTRATION_CODE),
  cloudinary: {
    cloudName: text(process.env.CLOUDINARY_CLOUD_NAME),
    apiKey: text(process.env.CLOUDINARY_API_KEY),
    apiSecret: text(process.env.CLOUDINARY_API_SECRET),
  },
  brevo: {
    apiKey: text(process.env.BREVO_API_KEY),
    senderEmail: text(process.env.BREVO_SENDER_EMAIL),
    senderName: text(process.env.BREVO_SENDER_NAME) || 'AMU Complaint Portal',
    adminEmail: text(process.env.ADMIN_EMAIL),
  },
}

