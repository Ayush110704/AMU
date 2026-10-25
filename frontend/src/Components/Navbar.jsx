import { useEffect, useRef, useState } from 'react'
import AmuLogo from '../assets/AmuLogo.png'

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'Report Issue', href: '/#report-issue' },
  { label: 'Our Representatives', href: '/representatives' },
  { label: 'About', href: '/about' },
]

const linkStyle = 'rounded-md text-sm font-medium text-[#343B36] no-underline transition-colors duration-200 hover:text-[#006B3F]'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="w-full px-3 pt-4 sm:px-4 sm:pt-6">
      <nav aria-label="Main navigation" className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-2xl border border-[#E8EBE7] bg-white px-4 py-3 shadow-[0_8px_26px_rgba(21,47,32,0.07)] sm:px-6">
        <a href="/" className="flex min-w-0 items-center gap-3 rounded-lg no-underline">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#006B3F] bg-white p-1 sm:h-12 sm:w-12">
            <img src={AmuLogo} alt="AMU Logo" className="h-full w-full object-contain" />
          </span>
          <span className="flex min-w-0 flex-col justify-center">
            <span className="text-[14px] font-bold leading-tight tracking-[-0.02em] text-[#292929] sm:text-base">Aligarh Muslim University</span>
            <span className="mt-0.5 text-xs font-medium text-[#626B65] sm:text-[13px]">Student Election Portal</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {primaryLinks.map((link) => (
            <a key={link.label} href={link.href} className={`${linkStyle} px-1 py-2 ${link.label === 'Home' ? 'font-semibold text-[#006B3F]' : ''}`}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="ml-auto hidden items-center lg:flex">
          <a href="/#report-issue" className="inline-flex items-center gap-2 rounded-full bg-[#006B3F] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_0_#004D2D,0_8px_16px_rgba(0,77,45,0.16)] no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-[#004D2D] hover:shadow-[0_5px_0_#004D2D,0_11px_20px_rgba(0,77,45,0.18)] active:translate-y-0">
            Report an Issue
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DDE5DE] bg-[#F8FAF7] text-[#004D2D] transition-colors hover:bg-[#E6F2EC] lg:hidden"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5"><path d="m18 6-12 12M6 6l12 12" /></svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>

        <div id="mobile-navigation" className={`${isMenuOpen ? 'grid' : 'hidden'} w-full gap-1 border-t border-[#E8EBE7] pt-3 lg:hidden`}>
          {primaryLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={closeMenu} className={`${linkStyle} px-3 py-3 hover:bg-[#F5F7F3] ${link.label === 'Home' ? 'font-semibold text-[#006B3F]' : ''}`}>
              {link.label}
            </a>
          ))}
          <a href="/#report-issue" onClick={closeMenu} className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#006B3F] px-4 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#004D2D]">
            Report an Issue
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
