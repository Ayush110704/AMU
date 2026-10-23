import React from 'react';
import footerBgImg from '../assets/image.png';
import AmuLogo from '../assets/AmuLogo.png';  

const Footer = () => {
  return (
    <div className="relative w-full mt-16">
      
      {/* TOP WAVE */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-[99%]">
        <svg 
          className="relative block w-full h-[40px] md:h-[70px]" 
          viewBox="0 0 1440 100" 
          preserveAspectRatio="none"
        >
          <path d="M0,50 Q360,100 720,50 T1440,50 L1440,100 L0,100 Z" fill="#004D2D"/>
        </svg>
      </div>

      {/* MAIN FOOTER BODY */}
      <footer 
        className="relative w-full text-white pt-10 pb-6 px-6 bg-[#004D2D] bg-no-repeat"
        style={{ 
          backgroundImage: `url(${footerBgImg})`,
          backgroundPosition: 'bottom right',
          backgroundSize: 'contain',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#004D2D] via-[#004D2D]/90 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* TOP GRID SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center">
            
            {/* 1. Left: Handwritten Style Branding */}
            <div className="md:col-span-3 flex flex-col relative mt-2">
              <p className="text-[#D4AF37] font-serif italic text-[15px] leading-tight mb-1 transform -rotate-6">
                Together
              </p>
              <p className="text-white font-serif italic text-[14px] leading-tight mb-1 ml-3 transform -rotate-3">
                for a Better
              </p>
              <p className="text-[#D4AF37] font-serif italic text-xl font-bold ml-6 transform -rotate-2">
                AMU
              </p>
            </div>

            {/* 2. Middle Left: Brand & Logo (CHANGED TO RECTANGLE) */}
            <div className="md:col-span-2 flex items-center justify-start md:justify-center mt-1">
              {/* Changed rounded-full to rounded-2xl, adjusted width to make it a rectangle */}
              <div className="w-[110px] h-[70px] rounded-2xl flex items-center justify-center bg-white overflow-hidden shrink-0 shadow-lg p-2">
                <img 
                  src={AmuLogo} 
                  alt="AMU Logo" 
                  // Changed object-cover to object-contain so the full logo is visible inside the rectangle
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* 3. Middle: Quick Links */}
            <div className="md:col-span-2 mt-1">
              <h4 className="text-white font-semibold text-[12px] mb-3">Quick Links</h4>
              <ul className="flex flex-col gap-1.5">
                {['Home', 'Report Issue', 'Our Representatives', 'About'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-[#D4AF37] text-[11px] transition-colors no-underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Middle Right: Support */}
            <div className="md:col-span-2 mt-1">
              <h4 className="text-white font-semibold text-[12px] mb-3">Support</h4>
              <ul className="flex flex-col gap-1.5">
                {['FAQs', 'Contact Us', 'Election Manifesto', 'Code of Conduct'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-[#D4AF37] text-[11px] transition-colors no-underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. Right: Socials & Quote */}
            <div className="md:col-span-3 flex flex-col justify-start mt-1">
              <h4 className="text-white font-semibold text-[12px] mb-3">Follow Us</h4>
              
              <div className="flex items-center gap-4 mb-6">
                {/* Instagram */}
                <a href="#" className="text-white hover:text-[#D4AF37] transition-colors hover:-translate-y-0.5 duration-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* Twitter / X */}
                <a href="#" className="text-white hover:text-[#D4AF37] transition-colors hover:-translate-y-0.5 duration-200">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" className="text-white hover:text-[#D4AF37] transition-colors hover:-translate-y-0.5 duration-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="text-white hover:text-[#D4AF37] transition-colors hover:-translate-y-0.5 duration-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>

              {/* Quote Area */}
              <div className="flex items-start gap-1">
                <span className="text-[#D4AF37] text-xl leading-none font-serif mt-0.5">“</span>
                <p className="text-[#E6F2EC] font-serif italic text-[12px] leading-snug">
                  A stronger campus<br/>begins with your voice.
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="mt-12 pt-4 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-gray-300 text-[10px] text-center md:text-left">
              © 2024 Aligarh Muslim University. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-gray-300 hover:text-white text-[10px] transition-colors no-underline">
                Privacy Policy
              </a>
              <span className="text-white/30 text-[10px]">|</span>
              <a href="#" className="text-gray-300 hover:text-white text-[10px] transition-colors no-underline">
                Terms of Use
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;