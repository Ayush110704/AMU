import { config } from '../config.js'

const brevoEndpoint = 'https://api.brevo.com/v3/smtp/email'
const attachmentLimit = 14 * 1024 * 1024
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const supportedAttachments = new Set([
  'xlsx', 'xls', 'ods', 'docx', 'docm', 'doc', 'csv', 'pdf', 'txt', 'gif', 'jpg', 'jpeg',
  'png', 'tif', 'tiff', 'rtf', 'bmp', 'cgm', 'css', 'shtml', 'html', 'htm', 'zip', 'xml',
  'ppt', 'pptx', 'tar', 'ez', 'ics', 'mobi', 'msg', 'pub', 'eps', 'odt', 'mp3', 'm4a',
  'm4v', 'wma', 'ogg', 'flac', 'wav', 'aif', 'aifc', 'aiff', 'mp4', 'mov', 'avi', 'mkv',
  'mpeg', 'mpg', 'wmv', 'pkpass', 'xlsm',
])

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])
}

function canAttachAllFiles(files) {
  const totalSize = files.reduce((total, file) => total + file.size, 0)
  return totalSize <= attachmentLimit && files.every((file) => {
    const filename = file.originalName || file.originalname || ''
    const extension = filename.includes('.') ? filename.split('.').pop().toLowerCase() : ''
    return supportedAttachments.has(extension)
  })
}

export async function sendComplaintNotification(complaint, files) {
  const { apiKey, senderEmail, senderName, adminEmail } = config.brevo
  if (!apiKey || !senderEmail || !adminEmail) {
    throw new Error('Set BREVO_API_KEY, BREVO_SENDER_EMAIL, and ADMIN_EMAIL in backend/.env.')
  }
  if (!emailPattern.test(senderEmail) || !emailPattern.test(adminEmail)) {
    throw new Error('BREVO_SENDER_EMAIL or ADMIN_EMAIL is invalid. Check for typos or extra spaces in backend/.env.')
  }

  const details = [
    ['Reference', complaint.complaintNumber], ['Name', complaint.name],
    ['Student ID', complaint.studentId], ['Roll number', complaint.rollNumber],
    ['Email', complaint.email], ['Mobile', complaint.mobile], ['Department', complaint.department],
    ['Course', complaint.course], ['Residence', complaint.residence], ['Title', complaint.title],
    ['Category', complaint.category], ['Location', complaint.location],
    ['Incident date', complaint.incidentDate ? new Date(complaint.incidentDate).toISOString().slice(0, 10) : ''],
    ['Description', complaint.description], ['Requested resolution', complaint.resolution],
  ]
  const rows = details.map(([label, value]) =>
    `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${escapeHtml(value) || '—'}</td></tr>`,
  ).join('')
  const textDetails = details.map(([label, value]) => `${label}: ${value || '—'}`).join('\n')
  const attachFiles = canAttachAllFiles(files)
  const attachmentLinks = files.map((file, index) =>
    `${index + 1}. ${file.originalName}: ${file.url}`,
  )
  const content = attachFiles
    ? 'The evidence files are attached to this email.'
    : files.length
      ? `Evidence files are available from Cloudinary:\n${attachmentLinks.join('\n')}`
      : 'No files were attached.'
  const htmlFiles = attachFiles || !files.length
    ? `<p>${escapeHtml(content)}</p>`
    : `<p>Evidence files are too large or use a file type that Brevo cannot attach. Download them from Cloudinary:</p><ul>${files.map((file) => `<li><a href="${escapeHtml(file.url)}">${escapeHtml(file.originalName)}</a></li>`).join('')}</ul>`

  const payload = {
    sender: { email: senderEmail, name: senderName },
    to: [{ email: adminEmail }],
    subject: `New complaint ${complaint.complaintNumber}`,
    textContent: `A new complaint was filed.\n\n${textDetails}\n\n${content}`,
    htmlContent: `<h2>New complaint received</h2><table cellpadding="6" cellspacing="0" border="1">${rows}</table>${htmlFiles}`,
  }
  if (complaint.email) payload.replyTo = { email: complaint.email, name: complaint.name || complaint.email }
  if (attachFiles && files.length) {
    payload.attachment = files.map((file) => ({
      name: file.originalName,
      content: file.buffer.toString('base64'),
    }))
  }

  const response = await fetch(brevoEndpoint, {
    method: 'POST',
    headers: { 'api-key': apiKey, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    throw new Error(`Brevo email request failed with HTTP ${response.status}. ${errorBody}`.trim())
  }
}
