import React from 'react';

const HowItWorks = () => {
  // Data for the steps to keep the JSX clean
  const steps = [
    {
      num: '1',
      numColor: 'bg-[#006B3F]',
      iconBg: 'bg-[#E6F2EC]',
      iconColor: 'text-[#006B3F]',
      title: 'Report',
      desc: 'Submit your issue\nwith details',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      num: '2',
      numColor: 'bg-[#D4AF37]',
      iconBg: 'bg-[#F8F0D8]',
      iconColor: 'text-[#B8941F]',
      title: 'Review',
      desc: 'Representatives\nwill review it',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      num: '3',
      numColor: 'bg-[#2563EB]', // Blue
      iconBg: 'bg-[#EFF6FF]', // Light Blue
      iconColor: 'text-[#2563EB]',
      title: 'Action',
      desc: 'It will be discussed\nand assigned',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    },
    {
      num: '4',
      numColor: 'bg-[#006B3F]',
      iconBg: 'bg-[#E6F2EC]',
      iconColor: 'text-[#006B3F]',
      title: 'Resolution',
      desc: 'Track progress until\nit\'s resolved',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      )
    }
  ];

  return (
    <section className="w-full bg-[#F5F5F0] py-12 px-4 relative overflow-hidden">
      {/* Optional: Subtle background blobs to match the image's organic feel */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E6F2EC] rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-4 relative z-10">
        
        {/* Title Section (Left) */}
        <div className="flex flex-col items-start lg:w-1/4 shrink-0 relative">
          <span className="bg-[#E6F2EC] text-[#006B3F] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
            Simple Process
          </span>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#292929]">
              How It Works
            </h2>
            {/* Playful sketch lines */}
            <svg className="absolute -right-8 -top-2 w-8 h-8 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="12" x2="8" y2="6"></line>
              <line x1="10" y1="16" x2="14" y2="8"></line>
              <line x1="16" y1="14" x2="20" y2="10"></line>
            </svg>
          </div>
        </div>

        {/* Steps Timeline (Right) */}
        <div className="w-full lg:w-3/4 flex flex-col md:flex-row items-start justify-between relative gap-8 md:gap-0">
          
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex flex-col items-center relative w-full group">
              
              {/* Connecting Dotted Line (Hidden on mobile and for the last item) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-[50%] w-full h-[2px] border-t-2 border-dashed border-gray-300 z-0">
                  {/* Small Arrow at the end of the line */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                     <svg viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 bg-[#F5F5F0]">
                        <polyline points="9 18 15 12 9 6"></polyline>
                     </svg>
                  </div>
                </div>
              )}

              {/* Step Content Wrapper */}
              <div className="relative z-10 flex flex-col items-center text-center px-2">
                
                {/* Icons & Numbers Row */}
                <div className="flex items-center gap-3 mb-4">
                  {/* Number Badge */}
                  <div className={`w-8 h-8 rounded-full ${step.numColor} text-white font-bold text-sm flex items-center justify-center shadow-sm transform group-hover:scale-110 transition-transform duration-300`}>
                    {step.num}
                  </div>
                  
                  {/* Icon Circle */}
                  <div className={`w-12 h-12 rounded-full ${step.iconBg} flex items-center justify-center border-4 border-white shadow-sm group-hover:-translate-y-1 transition-transform duration-300`}>
                    <div className={step.iconColor}>
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-[#292929] font-bold text-[15px] mb-1">{step.title}</h3>
                <p className="text-[#626B65] text-[12px] leading-relaxed whitespace-pre-line">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;