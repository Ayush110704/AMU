import React, { useState, useEffect } from 'react';

const HeroBannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define your 2 banners here (replace the URLs with your actual images)
  const banners = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600&h=600",
      title: "Your Campus, Your Voice",
      subtitle: "Report issues, share suggestions, and help build a better AMU.",
      ctaText: "Report an Issue",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600&h=600",
      title: "Meet Your Representatives",
      subtitle: "See who is working hard to address student concerns on campus.",
      ctaText: "View Representatives",
    }
  ];

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000); // Changes slide every 5 seconds
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === banners.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? banners.length - 1 : currentSlide - 1);
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 pt-6 pb-4">
      
      {/* Main Carousel Container */}
      <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg group">
        
        {/* Map through banners */}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img 
              src={banner.image} 
              alt={banner.title} 
              className="w-full h-full object-cover"
            />

            {/* Banner Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start px-8 md:px-16 lg:px-24">
              <div className="max-w-2xl">
                <span className="bg-[#D4AF37] text-[#292929] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block">
                  Student Election Portal
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-md">
                  {banner.title}
                </h1>
                <p className="text-white/90 text-lg md:text-xl mb-8 max-w-lg drop-shadow-sm font-medium">
                  {banner.subtitle}
                </p>
                <button className="bg-white hover:bg-gray-100 text-[#006B3F] px-8 py-3.5 rounded-full text-[15px] font-bold transition-all shadow-md active:scale-95 flex items-center gap-2">
                  {banner.ctaText}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Left Arrow Navigation */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 border border-white/30"
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Right Arrow Navigation */}
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 border border-white/30"
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Bottom Dots (Pagination) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide 
                  ? 'w-8 h-2.5 bg-[#D4AF37]' // Active dot (Gold)
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80' // Inactive dot
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroBannerCarousel;