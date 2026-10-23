import React from 'react';

const LogoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#006B3F]">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

const Navbar = () => {
  return (
    <div className="w-full pt-6 px-4">
      <nav className="w-full max-w-7xl mx-auto bg-[#FFFFFF] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] px-6 py-3 flex items-center justify-between">
        
        {/*  Logo */}
        <a href="/" className="flex items-center gap-3 no-underline">
          <div className="w-12 h-12 rounded-full border-2 border-[#006B3F] flex items-center justify-center overflow-hidden bg-white shrink-0"> 
            <LogoIcon />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[16px] font-bold text-[#292929] leading-tight">
              Aligarh Muslim University
            </span>
            <span className="text-[13px] font-medium text-[#626B65]">
              Student Election Portal
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="relative text-[15px] font-semibold text-[#006B3F] pb-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#006B3F] after:rounded-sm no-underline">
            Home
          </a>
          <a href="/report" className="text-[15px] font-medium text-[#292929] hover:text-[#006B3F] transition-colors no-underline pb-1.5">
            Report Issue
          </a>
          <a href="/representatives" className="text-[15px] font-medium text-[#292929] hover:text-[#006B3F] transition-colors no-underline pb-1.5">
            Our Representatives
          </a>
          <a href="/about" className="text-[15px] font-medium text-[#292929] hover:text-[#006B3F] transition-colors no-underline pb-1.5">
            About
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          
          {/* Search Icon */}
          <button className="p-2 rounded-full hover:bg-[#F5F5F0] text-[#292929] transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Notification Icon */}
          <button className="relative p-2 rounded-full hover:bg-[#F5F5F0] text-[#292929] transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-[#E53935] border-2 border-white rounded-full"></span>
          </button>

          {/* Primary Button */}
          <a 
            href="/report" 
            className="bg-[#006B3F] hover:bg-[#004D2D] text-white px-5 py-2.5 rounded-full text-[14px] font-semibold flex items-center gap-2 transition-all no-underline active:scale-95 ml-2"
          >
            Report an Issue
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;