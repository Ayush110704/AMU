import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const categories = [
  'Infrastructure and Maintenance',
  'Electricity and Water',
  'Hostel and Campus Facilities',
  'Cleanliness and Sanitation',
  'Academic Facilities',
  'Security and Safety',
  'Administration',
  'Other',
]

const steps = [
  { label: 'Getting to Know You', title: "Let's start with you.", description: "A few details can help us understand who's reaching out. Share only what you're comfortable sharing." },
  { label: 'Your Concern', title: "What's on your mind?", description: 'Every concern deserves to be heard. Tell us a little about what happened.' },
  { label: 'Supporting Evidence', title: 'Every little detail helps.', description: 'Have a photo, document, or recording that adds context? You can share it here if you wish.' },
  { label: 'Final Review', title: "Let's make sure everything looks right.", description: "Here's a quick recap. You can revisit any section before finishing." },
]

const studentFields = [
  { name: 'name', label: 'What should we call you?', placeholder: 'Your name or preferred name', autoComplete: 'name' },
  { name: 'studentId', label: 'Your campus identity', placeholder: "Student ID, if you'd like to share it" },
  { name: 'rollNumber', label: 'Your roll number', placeholder: 'Add it here if you have it handy' },
  { name: 'email', label: 'Where can we reach you?', placeholder: 'you@example.com', type: 'email', autoComplete: 'email' },
  { name: 'mobile', label: 'Your preferred contact number', placeholder: 'A number we can use to reach you', type: 'tel', autoComplete: 'tel' },
  { name: 'department', label: 'Which department are you part of?', placeholder: 'Your department or faculty' },
  { name: 'course', label: 'What are you studying?', placeholder: 'Your course or programme' },
  { name: 'residence', label: 'Where do you stay?', placeholder: 'Hostel, residence, or campus location' },
]

const complaintFields = [
  { name: 'title', label: 'Give your concern a headline', placeholder: 'A short summary of the issue' },
  { name: 'location', label: 'Where did this happen?', placeholder: 'Building, classroom, hostel, or another location' },
  { name: 'incidentDate', label: 'When did it happen?', type: 'date', helper: 'An approximate date is fine.' },
  { name: 'description', label: 'Tell us the story', placeholder: 'Share as much or as little detail as you would like. What happened, and how has it affected you?', multiline: true },
  { name: 'resolution', label: 'What would make things better?', placeholder: 'Tell us what outcome or improvement you would hope to see.', multiline: true },
]
const complaintValidationFields = [complaintFields[0], { name: 'category' }, ...complaintFields.slice(1)]

const allowedTypes = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/quicktime', 'video/webm',
  'audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/webm', 'application/pdf',
])
const videoTypes = new Set(['video/mp4', 'video/quicktime', 'video/webm'])
const VIDEO_LIMIT = 5 * 1024 * 1024
const FILE_LIMIT = 10 * 1024 * 1024
const MAX_FILES = 5

const initialValues = Object.fromEntries(
  [...studentFields, ...complaintValidationFields].map(({ name }) => [name, '']),
)

function formatFileSize(size) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`
  return `${(size / (1024 * 1024)).toFixed(2)} MB`
}

function FilePreview({ file }) {
  const previewRef = useRef(null)

  useEffect(() => {
    const preview = previewRef.current
    if (!preview) return undefined

    const url = URL.createObjectURL(file)
    const attribute = preview.tagName === 'A' ? 'href' : 'src'
    preview.setAttribute(attribute, url)

    return () => {
      URL.revokeObjectURL(url)
      preview.removeAttribute(attribute)
    }
  }, [file])

  if (file.type.startsWith('image/')) {
    return <img ref={previewRef} alt={`Preview of ${file.name}`} className="h-16 w-16 rounded-xl border border-[#e3e9e3] object-cover" />
  }
  if (file.type.startsWith('video/')) {
    return <video ref={previewRef} controls preload="metadata" aria-label={`Preview of ${file.name}`} className="max-h-24 max-w-36 rounded-xl bg-black" />
  }
  if (file.type.startsWith('audio/')) {
    return <audio ref={previewRef} controls preload="metadata" aria-label={`Preview of ${file.name}`} className="h-10 max-w-48" />
  }
  if (file.type === 'application/pdf') {
    return <a ref={previewRef} target="_blank" rel="noreferrer" className="rounded-lg border border-[#dce2dc] bg-white px-3 py-2 text-xs font-semibold text-[#006B3F] underline underline-offset-2">Preview PDF</a>
  }
  return null
}

function ComplaintForm() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [files, setFiles] = useState([])
  const [fileErrors, setFileErrors] = useState([])
  const [announcement, setAnnouncement] = useState('')
  const [dragging, setDragging] = useState(false)
  const [declaration, setDeclaration] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [direction, setDirection] = useState(1)
  const inputRef = useRef(null)
  const fieldRefs = useRef({})
  const reduceMotion = useReducedMotion()
  const fieldGroupVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.045, delayChildren: reduceMotion ? 0 : 0.035 } },
  }
  const fieldVariants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 7 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' } },
  }
  const makeAmbientMotion = (duration, delay, xRange, yRange, opacityRange) => reduceMotion ? {} : {
    animate: { x: xRange, y: yRange, scale: [0.96, 1.04, 0.98], opacity: opacityRange },
    transition: { duration, delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
  }

  const setField = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmitMessage('')
  }

  const validateFields = (fieldList) => {
    const nextErrors = {}
    fieldList.forEach(({ name, type }) => {
      const value = values[name].trim()
      if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        nextErrors[name] = 'Enter a valid email address.'
      } else if (name === 'mobile' && value && (!/^\+?[0-9\s().-]{7,20}$/.test(value) || (value.match(/\d/g) || []).length < 7 || (value.match(/\d/g) || []).length > 15)) {
        nextErrors[name] = 'Use 7 to 20 permitted characters and include 7 to 15 digits.'
      }
    })
    setErrors((current) => ({ ...current, ...nextErrors }))
    const firstInvalid = fieldList.find(({ name }) => nextErrors[name])
    if (firstInvalid) {
      fieldRefs.current[firstInvalid.name]?.focus()
      return false
    }
    return true
  }

  const goToStep = (nextStep, movement) => {
    setDirection(movement)
    setStep(nextStep)
    setSubmitMessage('')
    setTimeout(() => document.getElementById('complaint-step-heading')?.focus(), reduceMotion ? 0 : 180)
  }

  const handleContinue = () => {
    const fields = step === 0 ? studentFields : complaintFields
    if (validateFields(fields)) goToStep(step + 1, 1)
  }

  const addFiles = (incoming) => {
    const nextErrors = []
    const accepted = []
    for (const file of Array.from(incoming)) {
      if (!allowedTypes.has(file.type)) {
        nextErrors.push(`${file.name}: this file type is not supported.`)
      } else if (videoTypes.has(file.type) && file.size > VIDEO_LIMIT) {
        nextErrors.push(`${file.name}: videos must be 5 MB or smaller.`)
      } else if (file.size > FILE_LIMIT) {
        nextErrors.push(`${file.name}: files must be 10 MB or smaller.`)
      } else {
        accepted.push(file)
      }
    }
    const availableSlots = Math.max(0, MAX_FILES - files.length)
    if (accepted.length > availableSlots) {
      accepted.slice(availableSlots).forEach((file) => nextErrors.push(`${file.name}: you can attach up to 5 files.`))
    }
    const acceptedWithinLimit = accepted.slice(0, availableSlots)
    if (acceptedWithinLimit.length) {
      setFiles((current) => [...current, ...acceptedWithinLimit])
      setAnnouncement(`${acceptedWithinLimit.length} file${acceptedWithinLimit.length === 1 ? '' : 's'} added.`)
    }
    setFileErrors(nextErrors)
    if (nextErrors.length) setAnnouncement(`${acceptedWithinLimit.length} file${acceptedWithinLimit.length === 1 ? '' : 's'} added. ${nextErrors.length} file${nextErrors.length === 1 ? 'was' : 's were'} rejected. ${nextErrors.join(' ')}`)
    if (!acceptedWithinLimit.length && !nextErrors.length) setAnnouncement('No files selected.')
  }

  const removeFile = (index) => {
    const removedName = files[index]?.name
    setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))
    setAnnouncement(`${removedName} removed.`)
  }

  const handleFinalAction = (event) => {
    event.preventDefault()
    const studentValid = validateFields(studentFields)
    const detailsValid = validateFields(complaintValidationFields)
    if (!studentValid) {
      goToStep(0, -1)
      return
    }
    if (!detailsValid) {
      goToStep(1, -1)
      return
    }
    setSubmitMessage('Your review is ready, but complaint submission is not connected yet. Nothing has been sent or stored. Please contact the university through its official channels if you need to submit this concern.')
  }

  const fieldClass = 'mt-2 min-h-[3.15rem] w-full rounded-[.95rem] border border-[#d9e1d9] bg-white/90 px-4 py-3 text-sm text-[#292929] shadow-[inset_0_1px_2px_rgba(24,46,34,0.025)] outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-[#858f87] hover:border-[#a9c2af] hover:bg-white focus:border-[#16815a] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,107,63,0.12),0_5px_14px_rgba(0,77,45,0.06)]'
  const labelClass = 'block text-[.83rem] font-semibold tracking-[.005em] text-[#343d37]'
  const cardClass = 'relative overflow-hidden rounded-[1.6rem] border border-white/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.91),rgba(248,250,246,0.86))] p-[clamp(1.2rem,3.2vw,2.25rem)] shadow-[0_3px_8px_rgba(17,50,33,0.04),0_24px_70px_rgba(17,50,33,0.12),0_1px_0_rgba(255,255,255,0.92)_inset] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-200 before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#d6bd6a]/70 before:to-transparent hover:-translate-y-px hover:border-white hover:shadow-[0_8px_18px_rgba(17,50,33,0.05),0_28px_76px_rgba(17,50,33,0.15)] motion-reduce:transform-none motion-reduce:transition-none'
  const primaryButton = 'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[rgba(0,45,27,0.18)] bg-[linear-gradient(145deg,#08774b,#005b39_78%)] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_0_#00472c,0_8px_18px_rgba(0,77,45,0.16)] transition-[box-shadow,filter] duration-150 hover:brightness-105 active:brightness-95 focus-visible:outline-[3px] focus-visible:outline-[#006B3F] focus-visible:outline-offset-[3px] sm:w-auto'
  const secondaryButton = 'inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#d7dfd8] bg-white px-6 py-3 text-sm font-bold text-[#3f4b43] shadow-sm transition-colors hover:border-[#8cad98] hover:bg-[#f7faf7] focus-visible:outline-[3px] focus-visible:outline-[#006B3F] focus-visible:outline-offset-[3px] sm:w-auto'

  const renderField = ({ name, label, placeholder, type = 'text', autoComplete, multiline, helper }) => {
    const error = errors[name]
    const id = `complaint-${name}`
    const commonProps = {
      id,
      name,
      value: values[name],
      placeholder,
      autoComplete,
      'aria-invalid': Boolean(error),
      'aria-describedby': error ? `${id}-error` : undefined,
      onChange: (event) => setField(name, event.target.value),
      onBlur: () => validateFields([{ name, type }]),
      ref: (node) => { fieldRefs.current[name] = node },
      className: `${fieldClass} ${error ? 'border-red-500 focus:border-red-600 focus:shadow-[0_0_0_4px_rgba(185,28,28,0.12)]' : ''} ${multiline ? 'min-h-32 resize-y leading-[1.65]' : ''}`,
    }
    return (
      <motion.div key={name} variants={fieldVariants} className={name === 'description' || name === 'resolution' ? 'sm:col-span-2' : ''}>
        <label htmlFor={id} className={labelClass}>{label}</label>
        {multiline
          ? <textarea {...commonProps} />
          : <input {...commonProps} type={type} />}
        {helper && <p className="mt-1.5 text-xs leading-5 text-[#737d75]">{helper}</p>}
        {error && <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-700">{error}</p>}
      </motion.div>
    )
  }

  const transitionVariants = {
    initial: (movement) => ({ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : movement * 18 }),
    animate: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' } },
    exit: (movement) => ({ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : movement * -12, transition: { duration: reduceMotion ? 0 : 0.14, ease: 'easeIn' } }),
  }

  return (
    <section id="report-issue" className="relative isolate scroll-mt-8 overflow-hidden bg-[radial-gradient(ellipse_at_8%_14%,rgba(16,185,129,0.25),transparent_38rem),radial-gradient(ellipse_at_92%_14%,rgba(167,243,208,0.32),transparent_40rem),radial-gradient(ellipse_at_92%_88%,rgba(212,175,55,0.18),transparent_36rem),radial-gradient(ellipse_at_10%_82%,rgba(107,153,119,0.2),transparent_40rem),linear-gradient(135deg,#fbfaf2_0%,#eaf5ee_48%,#f7f2e2_100%)] px-4 py-20 sm:py-24 lg:py-28" aria-labelledby="complaint-heading">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <motion.span className="absolute -left-48 top-[7%] h-[min(46rem,104vw)] w-[min(46rem,104vw)] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.62),rgba(6,78,59,0.22)_38%,rgba(16,185,129,0)_72%)] opacity-[.4] blur-[64px] will-change-transform max-sm:blur-[50px]" {...makeAmbientMotion(18, 0, [0, 20, -12, 0], [0, 16, -10, 0], [0.32, 0.5, 0.38, 0.32])} />
        <motion.span className="absolute -right-48 top-[18%] h-[min(46rem,104vw)] w-[min(46rem,104vw)] rounded-full bg-[radial-gradient(circle,rgba(167,243,208,0.72),rgba(110,231,183,0.28)_40%,rgba(167,243,208,0)_73%)] opacity-[.38] blur-[66px] will-change-transform max-sm:blur-[50px]" {...makeAmbientMotion(22, -4, [0, -18, 12, 0], [0, 14, -9, 0], [0.3, 0.48, 0.36, 0.3])} />
        <motion.span className="absolute -bottom-40 -right-36 h-[min(42rem,94vw)] w-[min(42rem,94vw)] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.5),rgba(177,151,82,0.18)_38%,rgba(212,175,55,0)_72%)] opacity-[.3] blur-[62px] will-change-transform max-sm:blur-[48px]" {...makeAmbientMotion(20, -9, [0, -16, 10, 0], [0, -15, 9, 0], [0.25, 0.4, 0.31, 0.25])} />
        <motion.span className="absolute -bottom-36 left-[8%] h-[min(44rem,100vw)] w-[min(44rem,100vw)] rounded-full bg-[radial-gradient(circle,rgba(137,177,146,0.56),rgba(78,127,94,0.2)_42%,rgba(137,177,146,0)_73%)] opacity-[.34] blur-[64px] will-change-transform max-sm:blur-[50px]" {...makeAmbientMotion(24, -13, [0, 18, -13, 0], [0, -16, 10, 0], [0.28, 0.44, 0.34, 0.28])} />
      </div>
      <div className="relative z-[1] mx-auto max-w-6xl">
        <motion.header initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: 'easeOut' }} className="relative mb-10 grid items-center gap-8 sm:mb-14 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
          <div className="max-w-4xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2 text-[11px] font-bold uppercase tracking-[.19em] text-[#006B3F] shadow-[0_5px_20px_rgba(24,46,34,0.08)] backdrop-blur-md sm:mb-7 sm:text-xs"><span className="h-2 w-2 rounded-full bg-gradient-to-br from-[#08774b] to-[#d4af37] shadow-[0_0_12px_rgba(0,107,63,0.35)]" aria-hidden="true" />AMU <span className="text-[#b8a04f]">/</span> Student Complaint Portal</span>
            <h2 id="complaint-heading" className="max-w-[13ch] text-[clamp(3.35rem,8vw,6.65rem)] font-black leading-[.91] tracking-[-.065em] text-[#173526]">Your Campus.<br /><span className="bg-gradient-to-r from-[#006B3F] via-[#16815a] to-[#9a7a20] bg-clip-text pr-2 text-transparent">Your Voice.</span></h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#4d5b51] sm:mt-7 sm:text-lg sm:leading-8">Every concern deserves to be heard. Tell us what is happening, and help us make campus life better.</p>
            <div className="mt-7 flex items-center gap-3 sm:mt-8"><span className="h-[3px] w-14 rounded-full bg-gradient-to-r from-[#006B3F] to-[#249168]" /><span className="h-[3px] w-6 rounded-full bg-[#D4AF37]" /><span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#647267]">A Campus That Listens</span></div>
          </div>
          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.92, rotate: 4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.18, ease: 'easeOut' }} className="relative hidden aspect-square w-full max-w-[17rem] items-center justify-center justify-self-center lg:flex">
            <motion.div animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 54, repeat: Infinity, ease: 'linear' }} className="absolute inset-2 rounded-full border border-dashed border-[#006B3F]/25" />
            <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.82),rgba(255,255,255,0.12)_70%)] shadow-[0_20px_60px_rgba(0,77,45,0.1)] backdrop-blur-sm" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(230,242,236,0.75))] text-[#006B3F] shadow-[0_18px_42px_rgba(0,77,45,0.16),0_1px_0_white_inset]">
              <svg viewBox="0 0 64 64" fill="none" className="h-14 w-14" aria-hidden="true"><path d="M11 16.5C11 12.91 13.91 10 17.5 10h29C50.09 10 53 12.91 53 16.5v20C53 40.09 50.09 43 46.5 43H31L19 53v-10h-1.5C13.91 43 11 40.09 11 36.5v-20Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/><path d="M21 22h22M21 30h15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="46" cy="47" r="8" fill="#D4AF37" stroke="white" strokeWidth="3"/></svg>
            </div>
            <motion.span animate={reduceMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-4 left-0 rounded-2xl border border-white/85 bg-white/80 px-4 py-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#355242] shadow-lg backdrop-blur-md">Your voice matters</motion.span>
          </motion.div>
        </motion.header>

        <nav aria-label="Complaint form progress" className={`${cardClass} mb-7 p-4 sm:p-6`}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="rounded-full bg-[#E6F2EC] px-3 py-1.5 text-xs font-bold text-[#006B3F]" aria-live="polite">Step {step + 1} of {steps.length}</p>
            <p className="hidden text-xs text-[#626B65] sm:block">Your progress is kept as you move between steps</p>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-0.5 bg-[#e4e9e4] sm:block">
              <motion.span initial={false} animate={{ width: `${(step / (steps.length - 1)) * 100}%` }} transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeInOut' }} className="block h-full bg-[#006B3F]" />
            </div>
            <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2">
              {steps.map((item, index) => {
                const completed = index < step
                const current = index === step
                const circleClass = current
                  ? 'border-[#006B3F] bg-[#006B3F] text-white ring-4 ring-[#D4AF37]/25 shadow-[0_0_0_6px_rgba(0,107,63,0.06)]'
                  : completed
                    ? 'border-[#006B3F] bg-[#006B3F] text-white'
                    : 'border-[#d9dfd9] bg-white text-[#737d75]'
                const content = <>
                  <span className={`relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-extrabold transition-colors ${circleClass}`} aria-hidden="true">{completed ? '\u2713' : index + 1}</span>
                  <span className={`text-xs font-bold leading-4 sm:mt-2 sm:max-w-[9rem] sm:text-center ${current || completed ? 'text-[#006B3F]' : 'text-[#737d75]'}`}>{item.label}</span>
                </>
                return (
                  <li key={item.title} className="min-w-0">
                    {completed
                      ? <button type="button" onClick={() => goToStep(index, -1)} aria-label={`Return to step ${index + 1}: ${item.title}`} className="flex w-full items-center gap-3 rounded-xl p-2 text-left focus-visible:outline-[3px] focus-visible:outline-[#006B3F] focus-visible:outline-offset-2 sm:flex-col sm:gap-0 sm:rounded-none sm:p-0 sm:text-center">{content}</button>
                      : <div aria-current={current ? 'step' : undefined} className="flex items-center gap-3 rounded-xl p-2 sm:flex-col sm:gap-0 sm:rounded-none sm:p-0 sm:text-center">{content}</div>}
                  </li>
                )
              })}
            </ol>
          </div>
        </nav>

        <form onSubmit={step === 3 ? handleFinalAction : (event) => { event.preventDefault(); handleContinue() }} noValidate>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={step} custom={direction} variants={transitionVariants} initial="initial" animate="animate" exit="exit">
              <div className={cardClass}>
                <div className="mb-7 flex items-start gap-4">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${step % 2 === 0 ? 'bg-[#E6F2EC] text-[#006B3F]' : 'bg-[#F8F0D8] text-[#9C7912]'} text-sm font-extrabold shadow-sm`} aria-hidden="true">0{step + 1}</span>
                  <div>
                    <h3 id="complaint-step-heading" tabIndex={-1} className="text-xl font-extrabold tracking-[-.02em] text-[#292929] focus:outline-none sm:text-2xl">{steps[step].title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#626B65]">{steps[step].description}</p>
                  </div>
                </div>

                {step === 0 && <motion.div initial="hidden" animate="visible" variants={fieldGroupVariants} className="grid gap-x-5 gap-y-5 sm:grid-cols-2">{studentFields.map(renderField)}</motion.div>}

                {step === 1 && (
                  <motion.div initial="hidden" animate="visible" variants={fieldGroupVariants} className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                    {renderField(complaintFields[0])}
                    <motion.fieldset variants={fieldVariants} className="sm:col-span-2">
                      <legend className={labelClass}>What is your concern about?</legend>
                      <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        {categories.map((category, index) => {
                          const selected = values.category === category
                          return (
                            <motion.label key={category} whileTap={reduceMotion ? undefined : { scale: 0.985 }} className={`group relative flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-[border-color,background-color,box-shadow,transform] duration-200 focus-within:outline-none focus-within:ring-4 focus-within:ring-[#006B3F]/15 ${selected ? 'border-[#006B3F]/50 bg-[linear-gradient(120deg,rgba(230,242,236,0.95),rgba(255,255,255,0.92))] text-[#004D2D] shadow-[0_8px_22px_rgba(0,77,45,0.09),0_1px_0_white_inset]' : 'border-[#dce4dc]/90 bg-white/75 text-[#3f4b43] hover:-translate-y-0.5 hover:border-[#a8c5af] hover:bg-white hover:shadow-[0_9px_22px_rgba(0,77,45,0.07)]'}`}>
                              <input type="radio" name="category" value={category} checked={selected} onChange={(event) => setField('category', event.target.value)} className="peer sr-only" />
                              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-[11px] font-extrabold transition-colors ${selected ? 'border-[#006B3F] bg-[#006B3F] text-white' : 'border-[#d8e2d9] bg-[#f6f8f4] text-[#728176] group-hover:border-[#aac5b0]'}`} aria-hidden="true">{selected ? '\u2713' : String(index + 1).padStart(2, '0')}</span>
                              <span className="flex-1 leading-5">{category}</span>
                              <span className={`h-2 w-2 shrink-0 rounded-full transition-colors ${selected ? 'bg-[#D4AF37] shadow-[0_0_0_4px_rgba(212,175,55,0.13)]' : 'bg-transparent'}`} aria-hidden="true" />
                            </motion.label>
                          )
                        })}
                      </div>
                    </motion.fieldset>
                    {complaintFields.slice(1).map(renderField)}
                  </motion.div>
                )}

                {step === 2 && (
                  <div>
                    <div onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); addFiles(event.dataTransfer.files) }} className={`rounded-[1.2rem] border-[1.5px] border-dashed p-6 text-center transition-[background,border-color,box-shadow] duration-200 sm:p-9 ${dragging ? 'border-[#16815a] bg-[#eff8f1] shadow-[0_0_0_4px_rgba(0,107,63,0.08)]' : 'border-[#b9ccbf] bg-[linear-gradient(135deg,#f6faf6,#fbfcf9)] hover:border-[#16815a]'}`}>
                      <input ref={inputRef} className="sr-only" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm,audio/mpeg,audio/mp4,audio/wav,audio/webm,application/pdf" onChange={(event) => { addFiles(event.target.files); event.target.value = '' }} aria-label="Choose evidence files" />
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(0,107,63,0.12)] bg-white text-[#006B3F] shadow-md" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L7 9m5-5 5 5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" /></svg>
                      </div>
                      <p className="text-sm font-semibold text-[#292929]">Drop your files here</p>
                      <p className="mt-1 text-sm text-[#626B65]">Or browse your device</p>
                      <motion.button type="button" whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} onClick={() => inputRef.current?.click()} className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-[#006B3F]/20 bg-white px-5 text-sm font-bold text-[#006B3F] shadow-sm transition-colors hover:bg-[#E6F2EC] focus-visible:outline-[3px] focus-visible:outline-[#006B3F] focus-visible:outline-offset-[3px]">Browse files</motion.button>
                      <p className="mt-4 text-xs leading-5 text-[#626B65]">JPEG, PNG, WebP, GIF &middot; MP4, MOV, WebM &middot; MP3, M4A, WAV, WebM &middot; PDF</p>
                      <p className="mt-1 text-xs leading-5 text-[#626B65]">Up to 5 files &middot; 10 MB per file &middot; Videos up to 5 MB</p>
                      <p className="mt-3 text-xs leading-5 text-[#626B65]">Share photos, documents, or recordings that help explain your concern.</p>
                    </div>
                    <p role="status" aria-live="polite" className="sr-only">{announcement}</p>
                    {fileErrors.length > 0 && <ul role="alert" aria-live="assertive" className="mt-4 space-y-1 rounded-xl border border-[#eccaca] bg-[#fff8f7] px-4 py-3 text-sm font-medium leading-6 text-red-700">{fileErrors.map((error, index) => <li key={`${error}-${index}`}>{error}</li>)}</ul>}
                    {files.length > 0 && (
                      <ul className="mt-4 space-y-3" aria-label="Selected attachments">
                        {files.map((file, index) => (
                          <li key={`${file.name}-${file.lastModified}-${index}`} className="flex flex-col gap-3 rounded-xl border border-[#e3e9e3] bg-white/80 p-3 shadow-sm sm:flex-row sm:items-center">
                            <FilePreview file={file} />
                            <div className="min-w-0 flex-1"><p className="break-all text-sm font-semibold text-[#292929]">{file.name}</p><p className="mt-1 text-xs text-[#626B65]">{formatFileSize(file.size)}</p></div>
                            <button type="button" onClick={() => removeFile(index)} className="self-start rounded-lg px-3 py-2 text-xs font-bold text-[#626B65] transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-[3px] focus-visible:outline-[#006B3F] focus-visible:outline-offset-2 sm:self-center" aria-label={`Remove ${file.name}`}>Remove</button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-4 text-xs leading-5 text-[#626B65]">Attachments stay on this page only. They are not uploaded.</p>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <section className="rounded-[1.25rem] border border-[#dfe8df] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(247,250,246,0.96))] p-5 shadow-[0_8px_24px_rgba(24,46,34,0.055)]" aria-labelledby="review-student-heading">
                      <div className="mb-4 flex items-center justify-between gap-3"><h4 id="review-student-heading" className="font-bold text-[#004D2D]">Student information</h4><button type="button" onClick={() => goToStep(0, -1)} className="rounded-lg px-3 py-2 text-xs font-bold text-[#006B3F] hover:bg-[#E6F2EC] focus-visible:outline-[3px] focus-visible:outline-[#006B3F]">Edit</button></div>
                      <dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2">
                        {studentFields.map(({ name, label }) => <div key={name}><dt className="text-xs font-medium text-[#737d75]">{label}</dt><dd className="mt-1 break-words font-semibold text-[#292929]">{values[name] || 'Not provided'}</dd></div>)}
                      </dl>
                    </section>
                    <section className="rounded-[1.25rem] border border-[#dfe8df] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(247,250,246,0.96))] p-5 shadow-[0_8px_24px_rgba(24,46,34,0.055)]" aria-labelledby="review-complaint-heading">
                      <div className="mb-4 flex items-center justify-between gap-3"><h4 id="review-complaint-heading" className="font-bold text-[#004D2D]">Complaint details</h4><button type="button" onClick={() => goToStep(1, -1)} className="rounded-lg px-3 py-2 text-xs font-bold text-[#006B3F] hover:bg-[#E6F2EC] focus-visible:outline-[3px] focus-visible:outline-[#006B3F]">Edit</button></div>
                      <dl className="grid gap-x-5 gap-y-4 text-sm sm:grid-cols-2">
                        {[...complaintFields.slice(0, 1), { name: 'category', label: 'Category' }, ...complaintFields.slice(1)].map(({ name, label }) => <div key={name} className={name === 'description' || name === 'resolution' ? 'sm:col-span-2' : ''}><dt className="text-xs font-medium text-[#737d75]">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words font-semibold text-[#292929]">{values[name] || 'Not provided'}</dd></div>)}
                      </dl>
                    </section>
                    <section className="rounded-[1.25rem] border border-[#dfe8df] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(247,250,246,0.96))] p-5 shadow-[0_8px_24px_rgba(24,46,34,0.055)]" aria-labelledby="review-files-heading">
                      <div className="mb-4 flex items-center justify-between gap-3"><h4 id="review-files-heading" className="font-bold text-[#004D2D]">Evidence & attachments</h4><button type="button" onClick={() => goToStep(2, -1)} className="rounded-lg px-3 py-2 text-xs font-bold text-[#006B3F] hover:bg-[#E6F2EC] focus-visible:outline-[3px] focus-visible:outline-[#006B3F]">Edit</button></div>
                      {files.length ? <ul className="space-y-3">{files.map((file, index) => <li key={`${file.name}-${file.lastModified}-${index}`} className="flex flex-wrap items-center gap-3"><FilePreview file={file} /><span className="break-all text-sm font-medium text-[#292929]">{file.name} <span className="text-xs text-[#626B65]">({formatFileSize(file.size)})</span></span></li>)}</ul> : <p className="text-sm text-[#626B65]">No attachments added.</p>}
                    </section>
                    <section className="rounded-2xl border border-[rgba(0,107,63,0.13)] bg-[linear-gradient(120deg,#f9fcf8,#fff_70%)] p-5">
                      <label htmlFor="complaint-declaration" className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#454B47]"><input id="complaint-declaration" type="checkbox" checked={declaration} onChange={(event) => setDeclaration(event.target.checked)} className="mt-1 h-[1.1rem] w-[1.1rem] flex-none accent-[#006b3f] focus-visible:outline-[3px] focus-visible:outline-[#006B3F] focus-visible:outline-offset-[3px]" /><span>I've reviewed the information I've chosen to share. (Optional)</span></label>
                    </section>
                  </div>
                )}
              </div>

              {submitMessage && <p role="status" aria-live="polite" className="mt-4 rounded-[.85rem] border border-[#E4D79F] border-l-4 border-l-[var(--color-accent-strong)] bg-[#FBF7E8] px-4 py-3 text-sm leading-6 text-[#665216] shadow-sm">{submitMessage}</p>}

              <div className="mt-5 flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
                {step > 0 ? <button type="button" onClick={() => goToStep(step - 1, -1)} className={secondaryButton}>Back</button> : <p className="text-xs leading-5 text-[#626B65]">All fields are optional.</p>}
                {step < 3
                  ? <motion.button type="button" whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.985 }} onClick={handleContinue} className={primaryButton}>Continue <span aria-hidden="true">→</span></motion.button>
                  : <motion.button type="submit" whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.985 }} className={primaryButton}>Finish review <span aria-hidden="true">→</span></motion.button>}
              </div>
              {step === 3 && <p className="mt-3 text-center text-xs leading-5 text-[#626B65]">Submission is not connected. The final action checks your information only; the declaration is optional.</p>}
            </motion.div>
          </AnimatePresence>
        </form>
      </div>
    </section>
  )
}

export default ComplaintForm
