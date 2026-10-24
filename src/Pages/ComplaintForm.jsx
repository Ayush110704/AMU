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

  const fieldClass = 'mt-2 min-h-[3.05rem] w-full rounded-[.82rem] border border-[#dce2dc] bg-[#fbfcfa] px-[.95rem] py-[.8rem] text-sm text-[#292929] shadow-[inset_0_1px_2px_rgba(24,46,34,0.025)] outline-none transition-[border-color,box-shadow,background-color,transform] duration-[180ms] placeholder:text-[#929b94] placeholder:opacity-100 hover:border-[#b6c9bb] hover:bg-white focus:border-[#16815a] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,107,63,0.105),0_3px_10px_rgba(0,77,45,0.055)] focus:outline-none'
  const labelClass = 'block text-[.83rem] font-semibold tracking-[.005em] text-[#343d37]'
  const sectionClass = 'relative overflow-hidden rounded-[1.35rem] border border-[rgba(29,58,42,0.105)] p-[clamp(1.2rem,3vw,2rem)] shadow-[0_2px_4px_rgba(24,46,34,0.025),0_14px_35px_rgba(24,46,34,0.055),0_1px_0_rgba(255,255,255,0.95)_inset] [transform:perspective(1400px)_rotateX(0.18deg)] transition-[transform,box-shadow,border-color] duration-[240ms] hover:border-[rgba(0,107,63,0.2)] hover:[transform:perspective(1400px)_translateY(-2px)_rotateX(0)] hover:shadow-[0_5px_10px_rgba(24,46,34,0.035),0_20px_42px_rgba(24,46,34,0.075),0_1px_0_#fff_inset] max-[640px]:rounded-[1.1rem] max-[640px]:hover:transform-none'
  const sectionBackgroundClass = 'bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(252,253,250,0.96))]'
  const submitClass = 'inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-full border border-[rgba(0,45,27,0.18)] bg-[linear-gradient(145deg,#08774b,#005b39_78%)] px-[1.65rem] py-3.5 text-sm font-bold text-white shadow-[0_5px_0_#00472c,0_9px_20px_rgba(0,77,45,0.19),0_1px_0_rgba(255,255,255,0.2)_inset] transition-[transform,box-shadow,filter] duration-[180ms] hover:-translate-y-0.5 hover:brightness-[1.06] hover:shadow-[0_6px_0_#00472c,0_13px_24px_rgba(0,77,45,0.22),0_1px_0_rgba(255,255,255,0.2)_inset] active:translate-y-[3px] active:shadow-[0_2px_0_#00472c,0_4px_11px_rgba(0,77,45,0.16)] disabled:cursor-not-allowed disabled:opacity-[.68] disabled:filter-none disabled:transform-none disabled:shadow-[0_2px_0_#00472c,0_4px_10px_rgba(0,77,45,0.1)] focus:ring-4 focus:ring-[#006B3F]/20 focus-visible:outline-[3px] focus-visible:outline-[rgba(0,107,63,0.35)] focus-visible:outline-offset-[3px] sm:w-auto max-[640px]:min-h-[3.2rem]'
  return (
    <section id="report-issue" className="relative isolate scroll-mt-8 overflow-hidden bg-[radial-gradient(ellipse_at_12%_10%,rgba(0,107,63,0.075),transparent_30rem),radial-gradient(ellipse_at_92%_42%,rgba(212,175,55,0.07),transparent_24rem),#f5f5f0] px-4 py-16 sm:py-20 max-[640px]:py-[3.5rem]" aria-labelledby="complaint-heading">
      <div className="relative z-[1] mx-auto max-w-5xl">
        <div className="amu-complaint__intro relative mb-[2.8rem] max-w-[48rem] max-[640px]:mb-8 after:mt-[1.35rem] after:block after:h-[3px] after:w-[4.25rem] after:rounded-[99px] after:bg-[linear-gradient(90deg,#006b3f_0_68%,#d4af37_68%_100%)] after:content-['']">
          <span className="mb-3 inline-flex rounded-full border border-[rgba(0,107,63,0.12)] bg-[#E6F2EC] px-[.85rem] py-[.45rem] text-[11px] font-bold uppercase tracking-[.18em] text-[#006B3F] shadow-[0_3px_10px_rgba(0,77,45,0.06)]">Student voice matters</span>
          <h2 id="complaint-heading" className="max-w-[13ch] text-[clamp(2.1rem,4.5vw,3.5rem)] font-extrabold leading-[1.04] tracking-[-.045em] text-[#292929] first-line:text-[#202923]">Tell us what needs attention</h2>
          <p className="mt-[1.1rem] max-w-[42rem] text-base leading-[1.75] text-[#626B65]">Share the details and our student representatives can understand the issue and work toward a resolution.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className={`${sectionClass} ${sectionBackgroundClass}`}>
            <div className="mb-6 flex items-center gap-[.9rem] max-[640px]:mb-[1.2rem]">
              <span className="flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center rounded-[.9rem] border border-[rgba(0,107,63,0.14)] bg-[#E6F2EC] text-sm font-bold text-[#006B3F] shadow-[0_4px_10px_rgba(0,77,45,0.08),0_1px_0_#fff_inset]">01</span>
              <div><h3 className="text-[1.04rem] font-bold tracking-[-.015em] text-[#292929]">Student information</h3><p className="mt-1 text-[.8rem] leading-[1.55] text-[#626B65]">How can we reach you about this report?</p></div>
            </div>
            <div className="grid gap-y-5 gap-x-[1.15rem] sm:grid-cols-2 max-[640px]:gap-y-4">
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

          <div className={`${sectionClass} ${sectionBackgroundClass}`}>
            <div className="mb-6 flex items-center gap-[.9rem] max-[640px]:mb-[1.2rem]">
              <span className="flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center rounded-[.9rem] border border-[rgba(184,148,31,0.22)] bg-[#F8F0D8] text-sm font-bold text-[#9C7912] shadow-[0_4px_10px_rgba(156,121,18,0.09),0_1px_0_#fff_inset]">02</span>
              <div><h3 className="text-[1.04rem] font-bold tracking-[-.015em] text-[#292929]">Complaint details</h3><p className="mt-1 text-[.8rem] leading-[1.55] text-[#626B65]">A few specifics help us route it to the right people.</p></div>
            </div>
            <div className="grid gap-y-5 gap-x-[1.15rem] sm:grid-cols-2 max-[640px]:gap-y-4">
              <label className={labelClass}>Complaint title *<input className={fieldClass} name="title" placeholder="A short summary of the issue" required /></label>
              <label className={labelClass}>Category *<select className={fieldClass} name="category" defaultValue="" required><option value="" disabled>Select a category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
              <label className={labelClass}>Location of issue *<input className={fieldClass} name="location" placeholder="Building, area, or campus location" required /></label>
              <label className={labelClass}>Incident date<input className={fieldClass} type="date" name="incidentDate" /></label>
              <label className={`${labelClass} sm:col-span-2`}>Describe what happened *<textarea className={`${fieldClass} min-h-[7.5rem] resize-y leading-[1.6]`} name="description" placeholder="Include the details that will help us understand the issue…" required /></label>
              <label className={`${labelClass} sm:col-span-2`}>What would a good resolution look like?<textarea className={`${fieldClass} min-h-[6rem] resize-y leading-[1.6]`} name="resolution" placeholder="Share any outcome or action you would like to see." /></label>
            </div>
          </div>

          <div className={`${sectionClass} ${sectionBackgroundClass}`}>
            <div className="mb-6 flex items-center gap-[.9rem] max-[640px]:mb-[1.2rem]">
              <span className="flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center rounded-[.9rem] border border-[rgba(0,107,63,0.14)] bg-[#E6F2EC] text-sm font-bold text-[#006B3F] shadow-[0_4px_10px_rgba(0,77,45,0.08),0_1px_0_#fff_inset]">03</span>
              <div><h3 className="text-[1.04rem] font-bold tracking-[-.015em] text-[#292929]">Supporting evidence <span className="font-normal text-[#929992]">(optional)</span></h3><p className="mt-1 text-[.8rem] leading-[1.55] text-[#626B65]">Add photos, video, audio, or a PDF that helps explain the issue.</p></div>
            </div>
            <div
              onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files) }}
              className={`rounded-[1.15rem] border-[1.5px] border-dashed p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-[background,border-color,box-shadow,transform] duration-[180ms] sm:p-8 ${dragging ? 'border-[#16815a] bg-[linear-gradient(135deg,#f6faf6,#fbfcf9)] shadow-[0_0_0_4px_rgba(0,107,63,0.07),0_8px_20px_rgba(0,77,45,0.055)]' : 'border-[#b9ccbf] bg-[linear-gradient(135deg,#f6faf6,#fbfcf9)] hover:border-[#16815a] hover:shadow-[0_0_0_4px_rgba(0,107,63,0.07),0_8px_20px_rgba(0,77,45,0.055)]'}`}
            >
              <input ref={inputRef} className="sr-only" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm,audio/mpeg,audio/mp4,audio/wav,audio/webm,application/pdf" onChange={(event) => { addFiles(event.target.files); event.target.value = '' }} aria-label="Choose evidence files" />
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(0,107,63,0.12)] bg-white text-[#006B3F] shadow-[0_5px_14px_rgba(0,77,45,0.1)]" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>
              </div>
              <p className="text-sm font-semibold text-[#292929]">Drop files here or <button type="button" onClick={() => inputRef.current?.click()} className="border-0 bg-transparent p-0 font-bold text-[#006B3F] underline underline-offset-2 focus-visible:outline-[3px] focus-visible:outline-[rgba(0,107,63,0.35)] focus-visible:outline-offset-[3px]">browse files</button></p>
              <p className="mt-2 text-xs text-[#626B65]">Images, video, audio, PDF · Up to 5 files · 10 MB each · Videos up to 5 MB</p>
            </div>
            {fileError && <p role="alert" className="mt-3 rounded-[.85rem] border border-[#eccaca] bg-[#fff8f7] px-[.9rem] py-[.7rem] text-sm font-medium leading-[1.5] text-red-700">{fileError}</p>}
            {files.length > 0 && <ul className="mt-3 space-y-2">{files.map((file, index) => <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-xl border border-[#e3e9e3] bg-[linear-gradient(120deg,#f5f8f4,#fbfcfa)] px-4 py-3 text-sm shadow-[0_2px_7px_rgba(24,46,34,0.035)]"><span className="min-w-0 truncate text-[#292929] [overflow-wrap:anywhere]">{file.name}<span className="ml-2 text-xs text-[#626B65]">{(file.size / (1024 * 1024)).toFixed(2)} MB</span></span><button type="button" onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="shrink-0 rounded-lg px-2 py-1 text-xs font-semibold text-[#626B65] transition-[color,background-color] duration-[160ms] hover:bg-white hover:text-red-700 focus-visible:outline-[3px] focus-visible:outline-[rgba(0,107,63,0.35)] focus-visible:outline-offset-[3px]" aria-label={`Remove ${file.name}`}>Remove</button></li>)}</ul>}
          </div>

          <div className={`${sectionClass} border-[rgba(0,107,63,0.13)] bg-[linear-gradient(120deg,#f9fcf8,#fff_70%)]`}>
            <label className="flex cursor-pointer items-start gap-3 p-[.15rem] text-sm leading-6 text-[#454B47]"><input className="mt-1 h-[1.1rem] w-[1.1rem] flex-none rounded-[.3rem] accent-[#006b3f] focus-visible:outline-[3px] focus-visible:outline-[rgba(0,107,63,0.3)] focus-visible:outline-offset-[3px]" type="checkbox" name="declaration" required /><span>I confirm that the information I have provided is accurate to the best of my knowledge. *</span></label>
          </div>

          {submitMessage && <p role="status" className="rounded-[.85rem] border border-[#E4D79F] border-l-4 border-l-[var(--color-accent-strong)] bg-[#FBF7E8] px-4 py-3 text-sm leading-6 text-[#665216] shadow-[0_3px_12px_rgba(156,121,18,0.06)]">{submitMessage}</p>}
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs leading-5 text-[#626B65]">Fields marked * are required. Your information is not sent until a submission service is connected.</p>
            <button type="submit" className={submitClass}>Submit Complaint <span aria-hidden="true">→</span></button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ComplaintForm
