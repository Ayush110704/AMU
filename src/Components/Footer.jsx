import React from 'react'; 
import footerBgImg from '../assets/image.png';

const Footer = () => {
  return (
    <footer 
      className="relative w-full text-white pt-16 pb-24 px-6 mt-12 rounded-t-[2.5rem] bg-cover bg-center bg-no-repeat bg-[#004D2D]" 
      style={{ backgroundImage: `url(${footerBgImg})` }}
    >
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 rounded-t-[2.5rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 relative z-10">
        
        {/* Left Column: Brand & Quote */}
        <div className="md:col-span-4 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-white overflow-hidden shrink-0">
              {/* Replace with actual AMU logo */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Aligarh_Muslim_University_Logo.svg/1200px-Aligarh_Muslim_University_Logo.svg.png" 
                alt="AMU Logo" 
                className="w-full h-full object-cover p-0.5"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] font-bold text-white leading-tight drop-shadow-md">
                Aligarh Muslim University
              </span>
              <span className="text-[12px] text-[#E6F2EC] font-medium drop-shadow-sm">
                Student Election Portal
              </span>
            </div>
          </div>
          
          <div className="flex items-start gap-2 mt-2">
            <span className="text-[#D4AF37] text-2xl leading-none font-serif mt-1">"</span>
            <p className="text-[#F8F0D8] font-medium italic text-[15px] leading-snug drop-shadow-sm">
              A stronger campus<br/>begins with your voice.
            </p>
          </div>
        </div>

        {/* Middle Columns: Links */}
        <div className="md:col-span-5 grid grid-cols-2 gap-8 md:pl-8">
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-[14px] mb-4 drop-shadow-md">Quick Links</h4>
            <ul className="flex flex-col gap-2.5">
              {['Home', 'Report Issue', 'Our Representatives', 'About'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#E6F2EC] hover:text-[#D4AF37] text-[13px] transition-all no-underline drop-shadow-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-[14px] mb-4 drop-shadow-md">Support</h4>
            <ul className="flex flex-col gap-2.5">
              {['FAQs', 'Contact Us', 'Election Manifesto', 'Code of Conduct'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#E6F2EC] hover:text-[#D4AF37] text-[13px] transition-all no-underline drop-shadow-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Socials */}
        <div className="md:col-span-3">
          <h4 className="text-white font-semibold text-[14px] mb-4 drop-shadow-md">Follow Us</h4>
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a href="#" className="w-8 h-8 rounded-full bg-black/30 hover:bg-[#D4AF37] flex items-center justify-center transition-colors backdrop-blur-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="#" className="w-8 h-8 rounded-full bg-black/30 hover:bg-[#D4AF37] flex items-center justify-center transition-colors backdrop-blur-sm">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="w-8 h-8 rounded-full bg-black/30 hover:bg-[#D4AF37] flex items-center justify-center transition-colors backdrop-blur-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="w-8 h-8 rounded-full bg-black/30 hover:bg-[#D4AF37] flex items-center justify-center transition-colors backdrop-blur-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="max-w-7xl mx-auto mt-16 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-[#E6F2EC] text-[12px] text-center md:text-left drop-shadow-sm">
          © 2024 Aligarh Muslim University. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-[#E6F2EC] hover:text-white text-[12px] transition-all no-underline drop-shadow-sm">
            Privacy Policy
          </a>
          <span className="text-white/40">|</span>
          <a href="#" className="text-[#E6F2EC] hover:text-white text-[12px] transition-all no-underline drop-shadow-sm">
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;