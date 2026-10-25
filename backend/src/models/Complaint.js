import mongoose from 'mongoose'

export const complaintCategories = [
  'Infrastructure and Maintenance',
  'Electricity and Water',
  'Hostel and Campus Facilities',
  'Cleanliness and Sanitation',
  'Academic Facilities',
  'Security and Safety',
  'Administration',
  'Other',
]

const attachmentSchema = new mongoose.Schema({
  storageKey: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
}, { _id: false })

const complaintSchema = new mongoose.Schema({
  complaintNumber: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  studentId: { type: String, required: true, trim: true, maxlength: 50 },
  rollNumber: { type: String, trim: true, maxlength: 50, default: '' },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  mobile: { type: String, required: true, trim: true, maxlength: 20 },
  department: { type: String, required: true, trim: true, maxlength: 120 },
  course: { type: String, trim: true, maxlength: 120, default: '' },
  residence: { type: String, trim: true, maxlength: 120, default: '' },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  category: { type: String, required: true, enum: complaintCategories },
  location: { type: String, required: true, trim: true, maxlength: 200 },
  incidentDate: { type: Date, default: null },
  description: { type: String, required: true, trim: true, maxlength: 5000 },
  resolution: { type: String, trim: true, maxlength: 3000, default: '' },
  attachments: { type: [attachmentSchema], default: [] },
  status: { type: String, enum: ['received', 'in_review', 'resolved'], default: 'received' },
}, { timestamps: true, versionKey: false })

export default mongoose.model('Complaint', complaintSchema)
