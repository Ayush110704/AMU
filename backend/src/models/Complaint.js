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
  publicId: { type: String, required: true },
  url: { type: String, required: true },
  resourceType: { type: String, required: true },
  originalName: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
}, { _id: false })

const complaintSchema = new mongoose.Schema({
  complaintNumber: { type: String, required: true, unique: true, index: true },
  name: { type: String, trim: true, maxlength: 100, default: '' },
  studentId: { type: String, trim: true, maxlength: 50, default: '' },
  rollNumber: { type: String, trim: true, maxlength: 50, default: '' },
  email: { type: String, trim: true, lowercase: true, maxlength: 254, default: '' },
  mobile: { type: String, trim: true, maxlength: 20, default: '' },
  department: { type: String, trim: true, maxlength: 120, default: '' },
  course: { type: String, trim: true, maxlength: 120, default: '' },
  residence: { type: String, trim: true, maxlength: 120, default: '' },
  title: { type: String, trim: true, maxlength: 160, default: '' },
  category: { type: String, enum: ['', ...complaintCategories], default: '' },
  location: { type: String, trim: true, maxlength: 200, default: '' },
  incidentDate: { type: Date, default: null },
  description: { type: String, trim: true, maxlength: 5000, default: '' },
  resolution: { type: String, trim: true, maxlength: 3000, default: '' },
  attachments: { type: [attachmentSchema], default: [] },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  adminRemarks: { type: String, trim: true, maxlength: 2000, default: '' },
}, { timestamps: true, versionKey: false })

export default mongoose.model('Complaint', complaintSchema)
