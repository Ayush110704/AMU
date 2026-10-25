import React from 'react';
import { motion } from 'framer-motion';
import footerBgImg from '../assets/image.png';
import AmuLogo from '../assets/AmuLogo.png';  

const Footer = () => { 
  const brandContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };
 
  const brandLineVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: (custom) => ({
      opacity: 1, 
      y: [0, -3, 0], // Gentle floating loop
      filter: 'blur(0px)',
      rotate: custom.rotate,
      x: custom.x,
      transition: {
        y: {
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: custom.delay
        },
        opacity: { duration: 0.8, ease: "easeOut" },
        filter: { duration: 0.8, ease: "easeOut" },
        rotate: { type: "spring", stiffness: 100, damping: 12 },
        x: { type: "spring", stiffness: 100, damping: 12 }
      }
    })
  };

  return (
    <div className="relative w-full mt-10">
      
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
          
          {/* TOP SECTION - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
            
            {/* LEFT SIDE: Branding & Logo */} 
            <div className="flex flex-row items-center gap-14 md:gap-24 justify-center md:justify-start">
               
              <motion.div 
                variants={brandContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="flex flex-col relative drop-shadow-md shrink-0"
              >
                <motion.p 
                  custom={{ rotate: -6, x: 0, delay: 0 }}
                  variants={brandLineVariants}
                  className="text-[#D4AF37] font-serif italic text-xl lg:text-2xl leading-tight mb-1 origin-left"
                >
                  Together
                </motion.p>
                
                <motion.p 
                  custom={{ rotate: -3, x: 16, delay: 0.4 }} 
                  variants={brandLineVariants}
                  className="text-white font-serif italic text-lg lg:text-xl leading-tight mb-1 origin-left"
                >
                  for a Better
                </motion.p>
                
                <motion.p 
                  custom={{ rotate: -2, x: 32, delay: 0.8 }} 
                  variants={brandLineVariants}
                  className="text-[#D4AF37] font-serif italic text-2xl lg:text-3xl font-bold origin-left"
                >
                  AMU
                </motion.p>
              </motion.div>

              {/* EXTENDED LOGO CONTAINER */}
              <div className="w-[160px] sm:w-[180px] h-[60px] sm:h-[65px] rounded-xl flex items-center justify-center bg-white overflow-hidden shrink-0 shadow-lg p-2">
                <img 
                  src={AmuLogo} 
                  alt="AMU Logo" 
                  className="w-full h-full object-contain object-left" 
                />
              </div>
            </div>

            {/* CENTER: Attractive Contact Card */}
            <div className="flex justify-center w-full">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-xl hover:bg-white/15 transition-colors w-full max-w-sm">
                <div className="bg-[#D4AF37] p-2.5 rounded-full text-[#004D2D] shadow-inner shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-0.5">Have an issue?</p>
                  <a href="mailto:support@amu.ac.in" className="text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors">
                    support@amu.ac.in
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Socials & Quote */}
            <div className="flex flex-col md:items-end justify-center mt-4 md:mt-0">
              <h4 className="text-white font-semibold text-[12px] mb-2 md:text-right uppercase tracking-wider">Connect With Us</h4>
              
              <div className="flex items-center gap-4 mb-4">
                {/* Instagram */}
                <a href="#" className="text-white hover:text-[#D4AF37] transition-all hover:-translate-y-1 duration-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* Twitter / X */}
                <a href="#" className="text-white hover:text-[#D4AF37] transition-all hover:-translate-y-1 duration-200">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a href="#" className="text-white hover:text-[#D4AF37] transition-all hover:-translate-y-1 duration-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="text-white hover:text-[#D4AF37] transition-all hover:-translate-y-1 duration-200">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>

              {/* Quote Area */}
              <div className="flex items-start gap-1 md:justify-end md:text-right">
                <p className="text-[#E6F2EC] font-serif italic text-[12px] leading-snug opacity-90">
                  A stronger campus <br className="hidden md:block"/> begins with your voice.
                </p>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="mt-10 pt-5 border-t border-white/15 relative flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left: Copyright */}
            <p className="text-gray-400 text-[11px] text-center md:text-left z-10">
              © 2024 Aligarh Muslim University. All rights reserved.
            </p>

            {/* Center: Designed by Athenura */}
            <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-1.5 text-[11px] text-gray-400 z-10 mt-2 md:mt-0">
              <span>Crafted with</span> 
              <svg 
                className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>by</span>
              <a 
                href="https://athenura.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-bold text-gray-200 hover:text-[#D4AF37] transition-colors no-underline tracking-wide"
              >
                Athenura
              </a>
            </div>

            {/* Right: Legal Links */}
            <div className="flex items-center gap-3 z-10">
              <a href="#" className="text-gray-400 hover:text-white text-[11px] transition-colors no-underline">
                Privacy Policy
              </a>
              <span className="text-white/20 text-[11px]">|</span>
              <a href="#" className="text-gray-400 hover:text-white text-[11px] transition-colors no-underline">
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