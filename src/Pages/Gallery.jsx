import React from 'react';
import heroImg from '../assets/hero.png'; // Assuming this is your AMU building image

const Gallery = () => {
  // Dummy data for the carousels (Replace these with your actual images)
  const carouselImagesTop = [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400&h=300",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400&h=300",
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400&h=300",
    "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&q=80&w=400&h=300",
  ];

  const carouselImagesBottom = [
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400&h=300",
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=400&h=300",
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=400&h=300",
    "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=400&h=300",
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden">
      
      {/* LEFT SIDE: Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
        
        {/* Badge */}
        <div className="flex items-center gap-2 bg-[#E6F2EC] px-4 py-1.5 rounded-full mb-6">
          <span className="text-[#006B3F] text-[11px] font-bold tracking-widest uppercase">
            Students • Ideas • Action
          </span>
        </div>

        {/* Headings */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#292929] leading-[1.1] mb-4 relative">
          <span className="text-[#006B3F] relative inline-block">
            <span className="font-serif italic font-medium">Your Campus</span>
            {/* Sketch underline */}
            <svg className="absolute -bottom-2 left-0 w-full h-4 text-[#D4AF37]" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Paragraph */}
        <p className="text-[#626B65] text-[16px] leading-relaxed max-w-lg mb-8 mt-4">
          Report your problems, share your suggestions and let your elected student representatives take action for a better AMU.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <a href="#" className="bg-[#006B3F] hover:bg-[#004D2D] text-white px-6 py-3 rounded-full text-[15px] font-semibold flex items-center gap-2 transition-all shadow-lg shadow-[#006B3F]/20 hover:-translate-y-0.5">
            Report an Issue
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          <a href="#" className="bg-white hover:bg-gray-50 text-[#292929] border border-gray-300 px-6 py-3 rounded-full text-[15px] font-semibold flex items-center gap-2 transition-all shadow-sm">
            See Representatives
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>
        </div>

        {/* Social Proof */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
            <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="User" />
            <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
            <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold text-[#292929]">1,200+</span>
            <span className="text-[12px] text-[#626B65]">students already shared their concerns</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Dual Continuous Carousels */}
      <div className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] flex flex-col justify-center gap-4 overflow-hidden rounded-3xl bg-gray-100/50">
        
        {/* Gradient Masks for smooth fade on edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F5F5F0] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F5F5F0] to-transparent z-20 pointer-events-none"></div>

        {/* Top Carousel (Moves Left) */}
        <div className="flex w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
          {/* We duplicate the array to create the infinite illusion */}
          {[...carouselImagesTop, ...carouselImagesTop].map((img, index) => (
            <div key={`top-${index}`} className="w-[280px] h-[180px] md:w-[320px] md:h-[220px] flex-shrink-0 px-2">
              <img 
                src={img} 
                alt="Campus life" 
                className="w-full h-full object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Bottom Carousel (Moves Right) */}
        <div className="flex w-max animate-[marquee-reverse_25s_linear_infinite] hover:[animation-play-state:paused]">
          {[...carouselImagesBottom, ...carouselImagesBottom].map((img, index) => (
            <div key={`bottom-${index}`} className="w-[280px] h-[180px] md:w-[320px] md:h-[220px] flex-shrink-0 px-2">
              <img 
                src={img} 
                alt="Campus architecture" 
                className="w-full h-full object-cover rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Floating Decorative Elements (Like the image) */}
        <div className="absolute top-10 right-10 bg-[#D4AF37] text-white px-4 py-2 rounded-xl rotate-6 shadow-lg z-10 hidden md:block">
          <span className="text-[13px] font-bold">A Safer Campus</span>
        </div>
        <div className="absolute bottom-12 left-8 bg-white text-[#292929] px-4 py-2 rounded-xl -rotate-6 shadow-lg z-10 hidden md:block border border-gray-100">
          <span className="text-[13px] font-bold">Better Facilities</span>
        </div>

      </div>

      {/* Required Keyframes for the Marquee Effect */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}} />
    </section>
  );
};

export default Gallery;