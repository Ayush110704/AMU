import { useState } from 'react'
import './Gallery.css'

const carouselImagesTop = [
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400&h=300',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400&h=300',
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400&h=300',
  'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&q=80&w=400&h=300',
]

const carouselImagesBottom = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400&h=300',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=400&h=300',
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=400&h=300',
  'https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=400&h=300',
]

function Gallery() {
  const [motionPaused, setMotionPaused] = useState(false)

  return (
    <section className="campus-showcase relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 overflow-hidden px-4 py-14 sm:gap-12 sm:py-16 lg:flex-row lg:justify-between lg:gap-8 lg:py-20" aria-labelledby="campus-showcase-heading">
      <div className="z-10 flex w-full min-w-0 flex-col items-start [perspective:1200px] lg:w-[44%]">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#006B3F]/10 bg-[#E6F2EC] px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#006B3F] sm:text-[11px]">
            Students · Ideas · Action
          </span>
        </div>

        <h2 id="campus-showcase-heading" className="max-w-[14ch] text-4xl font-extrabold leading-[1.06] tracking-[-0.04em] text-[#292929] sm:text-5xl lg:text-[3.5rem]">
          Explore the <span className="relative inline-block text-[#006B3F]">campus
            <svg aria-hidden="true" className="absolute -bottom-2 left-0 h-3 w-full text-[#D4AF37]" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h2>

        <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#626B65] sm:text-base">
          Report your problems, share your suggestions and let your elected student representatives take action for a better AMU.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
          <a href="#report-issue" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#006B3F] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_0_#004D2D,0_9px_18px_rgba(0,77,45,0.14)] no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-[#004D2D] active:translate-y-0 sm:px-6 sm:text-[15px]">
            Report an Issue
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </a>
          <a href="#" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D1D5DB] bg-white px-5 py-3 text-sm font-semibold text-[#292929] shadow-sm no-underline transition duration-200 hover:-translate-y-0.5 hover:border-[#006B3F]/35 hover:bg-[#FAFBF9] active:translate-y-0 sm:px-6 sm:text-[15px]">
            See Representatives
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
          </a>
        </div>

        <div className="mt-7 flex items-center gap-4">
          <div className="flex -space-x-3" aria-hidden="true">
            <img className="h-9 w-9 rounded-full border-2 border-[#F5F5F0] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" />
            <img className="h-9 w-9 rounded-full border-2 border-[#F5F5F0] object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="" />
            <img className="h-9 w-9 rounded-full border-2 border-[#F5F5F0] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="" />
            <img className="h-9 w-9 rounded-full border-2 border-[#F5F5F0] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd722f2d?auto=format&fit=crop&w=100&q=80" alt="" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#292929]">1,200+</span>
            <span className="max-w-[14rem] text-xs leading-5 text-[#626B65]">students already shared their concerns</span>
          </div>
        </div>
      </div>

      <div className="relative isolate h-[340px] w-full min-w-0 overflow-hidden rounded-[1.6rem] border border-white/70 bg-[#EDF1EC] shadow-[0_18px_42px_rgba(25,48,35,0.13)] [perspective:1200px] sm:h-[390px] lg:h-[450px] lg:w-[52%]" role="group" aria-label="Campus photo carousel">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-[linear-gradient(90deg,rgba(237,241,236,0.95),transparent)] max-sm:w-5" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-[linear-gradient(270deg,rgba(237,241,236,0.95),transparent)] max-sm:w-5" aria-hidden="true" />
        <button
          type="button"
          className="campus-showcase__motion-control absolute right-3 top-3 z-30 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3.5 text-xs font-semibold text-[#004D2D] shadow-md backdrop-blur-sm transition hover:bg-white focus-visible:outline-[#006b3f] motion-reduce:hidden sm:right-4 sm:top-4 sm:px-4"
          onClick={() => setMotionPaused((paused) => !paused)}
          aria-pressed={motionPaused}
          aria-controls="campus-showcase-images"
        >
          <span className="text-[.85rem] leading-none text-[#006b3f]" aria-hidden="true">{motionPaused ? '▶' : 'Ⅱ'}</span>
          {motionPaused ? 'Resume motion' : 'Pause motion'}
        </button>

        <div id="campus-showcase-images" className="campus-showcase__tracks flex h-full flex-col justify-center gap-3 sm:gap-4">
          <div className={`campus-showcase__track flex w-max animate-[campus-marquee-forward_38s_linear_infinite] hover:[animation-play-state:paused] ${motionPaused ? '[animation-play-state:paused]' : ''}`}>
            {[...carouselImagesTop, ...carouselImagesTop].map((image, index) => (
              <div key={`top-${index}`} className="campus-showcase__photo h-[145px] w-[250px] shrink-0 px-2 sm:h-[170px] sm:w-[290px] lg:h-[200px] lg:w-[320px]">
                <img src={image} alt={index < carouselImagesTop.length ? 'University campus and student life' : ''} aria-hidden={index >= carouselImagesTop.length} loading="lazy" className="h-full w-full rounded-[1.15rem] object-cover shadow-[0_8px_20px_rgba(20,45,31,0.18)] transition-transform duration-300 hover:scale-[1.025]" />
              </div>
            ))}
          </div>
          <div className={`campus-showcase__track flex w-max animate-[campus-marquee-reverse_42s_linear_infinite] hover:[animation-play-state:paused] ${motionPaused ? '[animation-play-state:paused]' : ''}`}>
            {[...carouselImagesBottom, ...carouselImagesBottom].map((image, index) => (
              <div key={`bottom-${index}`} className="campus-showcase__photo h-[145px] w-[250px] shrink-0 px-2 sm:h-[170px] sm:w-[290px] lg:h-[200px] lg:w-[320px]">
                <img src={image} alt={index < carouselImagesBottom.length ? 'Campus architecture and grounds' : ''} aria-hidden={index >= carouselImagesBottom.length} loading="lazy" className="h-full w-full rounded-[1.15rem] object-cover shadow-[0_8px_20px_rgba(20,45,31,0.18)] transition-transform duration-300 hover:scale-[1.025]" />
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-5 z-10 hidden -rotate-3 rounded-xl border border-[#E6E8E4] bg-white/95 px-4 py-2.5 text-sm font-bold text-[#292929] shadow-lg backdrop-blur-sm md:block lg:bottom-7 lg:left-7">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#D4AF37]" aria-hidden="true" />A Safer Campus
        </div>
        <div className="pointer-events-none absolute bottom-5 right-5 z-10 hidden rotate-2 rounded-xl bg-[#D4AF37] px-4 py-2.5 text-sm font-bold text-[#292929] shadow-lg md:block lg:bottom-7 lg:right-7">
          Better Facilities
        </div>
      </div>
    </section>
  )
}

export default Gallery
