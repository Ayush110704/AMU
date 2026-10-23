import { useEffect, useState } from 'react'

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600&h=600',
    title: 'Your Campus, Your Voice',
    subtitle: 'Report issues, share suggestions, and help build a better AMU.',
    ctaText: 'Report an Issue',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600&h=600',
    title: 'Meet Your Representatives',
    subtitle: 'See who is working hard to address student concerns on campus.',
    ctaText: 'View Representatives',
  },
]

function HeroBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(motionQuery.matches)
    updateMotionPreference()
    motionQuery.addEventListener('change', updateMotionPreference)
    return () => motionQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return undefined
    const timer = window.setInterval(() => {
      setCurrentSlide((current) => (current + 1) % banners.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [isPaused, prefersReducedMotion])

  const nextSlide = () => setCurrentSlide((current) => (current + 1) % banners.length)
  const prevSlide = () => setCurrentSlide((current) => (current - 1 + banners.length) % banners.length)

  return (
    <section className="mx-auto w-full max-w-[1400px] px-3 pb-4 pt-5 sm:px-4 sm:pt-6" aria-label="Campus highlights">
      <div
        className="group relative h-[430px] w-full overflow-hidden rounded-[1.5rem] bg-[#004D2D] shadow-[0_18px_45px_rgba(0,45,27,0.2)] sm:h-[470px] sm:rounded-[1.75rem] lg:h-[520px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="AMU campus highlights"
        aria-live={isPaused || prefersReducedMotion ? 'polite' : 'off'}
      >
        {banners.map((banner, index) => {
          const isActive = index === currentSlide
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 h-full w-full transition-opacity duration-700 ease-in-out ${isActive ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${banners.length}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover object-center"
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />

              <div className="absolute inset-0 z-10 flex flex-col items-start justify-center px-6 pb-8 sm:px-10 md:px-14 lg:px-20">
                <div className="max-w-2xl">
                  <span className="mb-5 inline-flex rounded-full border border-[#D4AF37]/60 bg-[#D4AF37] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#292929] shadow-sm sm:text-xs">
                    Student Election Portal
                  </span>
                  <h1 className="mb-4 max-w-[15ch] text-[clamp(2.25rem,7.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.25)]">
                    {banner.title}
                  </h1>
                  <p className="mb-7 max-w-lg text-base font-medium leading-relaxed text-white/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.3)] sm:mb-8 sm:text-lg md:text-xl">
                    {banner.subtitle}
                  </p>
                  {banner.ctaText === 'Report an Issue' ? (
                    <a href="#report-issue" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/70 bg-white px-6 py-3 text-sm font-bold text-[#006B3F] shadow-[0_5px_0_rgba(0,0,0,0.15),0_12px_26px_rgba(0,0,0,0.18)] no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-[#F5F5F0] active:translate-y-0 sm:px-7 sm:text-[15px]">
                      {banner.ctaText}
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </a>
                  ) : (
                    <a href="/representatives" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/75 bg-white/95 px-6 py-3 text-sm font-bold text-[#006B3F] shadow-[0_5px_0_rgba(0,0,0,0.15),0_12px_26px_rgba(0,0,0,0.18)] no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 sm:px-7 sm:text-[15px]">
                      {banner.ctaText}
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        <button
          type="button"
          onClick={prevSlide}
          className="absolute bottom-16 left-3 top-auto z-20 flex h-10 w-10 translate-y-0 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white shadow-lg backdrop-blur-md transition hover:bg-black/50 sm:bottom-auto sm:left-5 sm:top-1/2 sm:h-12 sm:w-12 sm:-translate-y-1/2"
          aria-label="Previous slide"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute bottom-16 right-3 top-auto z-20 flex h-10 w-10 translate-y-0 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white shadow-lg backdrop-blur-md transition hover:bg-black/50 sm:bottom-auto sm:right-5 sm:top-1/2 sm:h-12 sm:w-12 sm:-translate-y-1/2"
          aria-label="Next slide"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="9 18 15 12 9 6" /></svg>
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/30 px-2.5 py-2 backdrop-blur-md sm:bottom-5">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Show slide ${index + 1}: ${banner.title}`}
              aria-pressed={index === currentSlide}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-7 bg-[#D4AF37]' : 'w-2.5 bg-white/65 hover:bg-white'}`}
            />
          ))}
        </div>

        {!prefersReducedMotion && <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
          className="absolute bottom-4 right-3 z-20 flex min-h-10 items-center justify-center rounded-full border border-white/30 bg-black/30 px-3 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition hover:bg-black/50 sm:bottom-5 sm:right-5 sm:min-h-11 sm:px-4"
        >
          {isPaused ? 'Play' : 'Pause'}
        </button>}
      </div>
    </section>
  )
}

export default HeroBannerCarousel
