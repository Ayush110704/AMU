import { useRef, useState } from 'react'
import './ComplaintForm.css'

const categories = [
  'Infrastructure and Maintenance', 'Electricity and Water',
  'Hostel and Campus Facilities', 'Cleanliness and Sanitation',
  'Academic Facilities', 'Security and Safety', 'Administration', 'Other',
]

const allowedTypes = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/quicktime', 'video/webm',
  'audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/webm', 'application/pdf',
])
const videoTypes = new Set(['video/mp4', 'video/quicktime', 'video/webm'])
const VIDEO_LIMIT = 5 * 1024 * 1024
const FILE_LIMIT = 10 * 1024 * 1024

function ComplaintForm() {
  const [files, setFiles] = useState([])
  const [fileError, setFileError] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const addFiles = (incoming) => {
    setFileError('')
    const accepted = []
    for (const file of Array.from(incoming)) {
      if (!allowedTypes.has(file.type)) {
        setFileError(`${file.name}: this file type is not supported.`)
      } else if (videoTypes.has(file.type) && file.size > VIDEO_LIMIT) {
        setFileError(`${file.name}: videos must be 5 MB or smaller.`)
      } else if (file.size > FILE_LIMIT) {
        setFileError(`${file.name}: files must be 10 MB or smaller.`)
      } else {
        accepted.push(file)
      }
    }
    setFiles((current) => {
      const combined = [...current, ...accepted]
      if (combined.length > 5) setFileError('You can attach up to 5 files.')
      return combined.slice(0, 5)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitMessage('')
    const data = new FormData(event.currentTarget)
    const mobile = data.get('mobile')?.trim()
    if (!/^\+?[0-9\s().-]{7,20}$/.test(mobile || '') || (mobile.match(/\d/g) || []).length < 7 || (mobile.match(/\d/g) || []).length > 15) {
      event.currentTarget.elements.mobile.setCustomValidity('Enter a valid phone number (7–20 digits).')
      event.currentTarget.elements.mobile.reportValidity()
      event.currentTarget.elements.mobile.setCustomValidity('')
      return
    }
    // No complaint API is configured in this project, so do not claim persistence.
    setSubmitMessage('Your details are valid, but complaint submission is not connected yet. Please contact the university through its official channels.')
  }

  const fieldClass = 'mt-2 w-full rounded-xl border border-[#D1D5DB] bg-white px-4 py-3 text-sm text-[#292929] outline-none transition placeholder:text-[#929992] focus:border-[#006B3F] focus:ring-4 focus:ring-[#006B3F]/10'
  const labelClass = 'block text-sm font-semibold text-[#292929]'
  const sectionClass = 'rounded-2xl border border-[#E6E8E4] bg-white p-5 shadow-[0_8px_28px_rgba(25,48,35,0.045)] sm:p-7'

  return (
    <section id="report-issue" className="scroll-mt-8 bg-[#F5F5F0] px-4 py-16 sm:py-20" aria-labelledby="complaint-heading">
      <div className="mx-auto max-w-5xl">
        <div className="mb-9 max-w-2xl">
          <span className="mb-3 inline-flex rounded-full bg-[#E6F2EC] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#006B3F]">Student voice matters</span>
          <h2 id="complaint-heading" className="text-3xl font-extrabold tracking-tight text-[#292929] sm:text-4xl">Tell us what needs attention</h2>
          <p className="mt-3 text-sm leading-6 text-[#626B65] sm:text-base">Share the details and our student representatives can understand the issue and work toward a resolution.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className={sectionClass}>
            <div className="mb-6 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F2EC] text-sm font-bold text-[#006B3F]">01</span>
              <div><h3 className="font-bold text-[#292929]">Student information</h3><p className="mt-1 text-xs text-[#626B65]">How can we reach you about this report?</p></div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>Full name *<input className={fieldClass} name="name" autoComplete="name" placeholder="Your full name" required /></label>
              <label className={labelClass}>Student ID *<input className={fieldClass} name="studentId" placeholder="e.g. AMU2026001" required /></label>
              <label className={labelClass}>Roll number<input className={fieldClass} name="rollNumber" placeholder="Your roll number" /></label>
              <label className={labelClass}>Email address *<input className={fieldClass} type="email" name="email" autoComplete="email" placeholder="you@amu.ac.in" required /></label>
              <label className={labelClass}>Mobile number *<input className={fieldClass} type="tel" name="mobile" autoComplete="tel" placeholder="+91 98765 43210" required /></label>
              <label className={labelClass}>Department *<input className={fieldClass} name="department" placeholder="Your department" required /></label>
              <label className={labelClass}>Course and year / semester<input className={fieldClass} name="course" placeholder="e.g. BSc, Year 2" /></label>
              <label className={labelClass}>Hostel or residence<input className={fieldClass} name="residence" placeholder="Hostel name or residence" /></label>
            </div>
          </div>

          <div className={sectionClass}>
            <div className="mb-6 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F8F0D8] text-sm font-bold text-[#9C7912]">02</span>
              <div><h3 className="font-bold text-[#292929]">Complaint details</h3><p className="mt-1 text-xs text-[#626B65]">A few specifics help us route it to the right people.</p></div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>Complaint title *<input className={fieldClass} name="title" placeholder="A short summary of the issue" required /></label>
              <label className={labelClass}>Category *<select className={fieldClass} name="category" defaultValue="" required><option value="" disabled>Select a category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
              <label className={labelClass}>Location of issue *<input className={fieldClass} name="location" placeholder="Building, area, or campus location" required /></label>
              <label className={labelClass}>Incident date<input className={fieldClass} type="date" name="incidentDate" /></label>
              <label className={`${labelClass} sm:col-span-2`}>Describe what happened *<textarea className={`${fieldClass} min-h-32 resize-y`} name="description" placeholder="Include the details that will help us understand the issue…" required /></label>
              <label className={`${labelClass} sm:col-span-2`}>What would a good resolution look like?<textarea className={`${fieldClass} min-h-24 resize-y`} name="resolution" placeholder="Share any outcome or action you would like to see." /></label>
            </div>
          </div>

          <div className={sectionClass}>
            <div className="mb-5 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F2EC] text-sm font-bold text-[#006B3F]">03</span>
              <div><h3 className="font-bold text-[#292929]">Supporting evidence <span className="font-normal text-[#929992]">(optional)</span></h3><p className="mt-1 text-xs text-[#626B65]">Add photos, video, audio, or a PDF that helps explain the issue.</p></div>
            </div>
            <div
              onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files) }}
              className={`rounded-2xl border-2 border-dashed p-6 text-center transition-colors sm:p-8 ${dragging ? 'border-[#006B3F] bg-[#E6F2EC]' : 'border-[#D1D5DB] bg-[#FAFBF9]'}`}
            >
              <input ref={inputRef} className="sr-only" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm,audio/mpeg,audio/mp4,audio/wav,audio/webm,application/pdf" onChange={(event) => { addFiles(event.target.files); event.target.value = '' }} aria-label="Choose evidence files" />
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#006B3F] shadow-sm" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>
              </div>
              <p className="text-sm font-semibold text-[#292929]">Drop files here or <button type="button" onClick={() => inputRef.current?.click()} className="border-0 bg-transparent p-0 font-bold text-[#006B3F] underline underline-offset-2">browse files</button></p>
              <p className="mt-2 text-xs text-[#626B65]">Images, video, audio, PDF · Up to 5 files · 10 MB each · Videos up to 5 MB</p>
            </div>
            {fileError && <p role="alert" className="mt-3 text-sm font-medium text-red-700">{fileError}</p>}
            {files.length > 0 && <ul className="mt-3 space-y-2">{files.map((file, index) => <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-xl bg-[#F5F5F0] px-4 py-3 text-sm"><span className="min-w-0 truncate text-[#292929]">{file.name}<span className="ml-2 text-xs text-[#626B65]">{(file.size / (1024 * 1024)).toFixed(2)} MB</span></span><button type="button" onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-[#626B65] hover:bg-white hover:text-red-700" aria-label={`Remove ${file.name}`}>Remove</button></li>)}</ul>}
          </div>

          <div className={sectionClass}>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#454B47]"><input className="mt-1 h-4 w-4 accent-[#006B3F]" type="checkbox" name="declaration" required /><span>I confirm that the information I have provided is accurate to the best of my knowledge. *</span></label>
          </div>

          {submitMessage && <p role="status" className="rounded-xl border border-[#E4D79F] bg-[#FBF7E8] px-4 py-3 text-sm leading-6 text-[#665216]">{submitMessage}</p>}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs leading-5 text-[#626B65]">Fields marked * are required. Your information is not sent until a submission service is connected.</p>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#006B3F] px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-[#006B3F]/15 transition hover:-translate-y-0.5 hover:bg-[#004D2D] focus:outline-none focus:ring-4 focus:ring-[#006B3F]/20 sm:w-auto">Submit Complaint <span aria-hidden="true">→</span></button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ComplaintForm
