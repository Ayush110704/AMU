import React from 'react';
import './HowItWorks.css'

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
      numColor: 'bg-[#006B3F]',
      iconBg: 'bg-[#E6F2EC]',
      iconColor: 'text-[#006B3F]',
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
    <section className="how-it-works relative w-full overflow-hidden bg-[#F5F5F0] px-4 py-14 sm:py-16 lg:py-20" aria-labelledby="how-it-works-heading">
      {/* Optional: Subtle background blobs to match the image's organic feel */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 bg-[#E6F2EC] rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="how-it-works__layout relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-9 lg:flex-row lg:gap-6">
        
        {/* Title Section (Left) */}
        <div className="how-it-works__intro relative flex w-full shrink-0 flex-col items-start lg:w-[24%]">
          <span className="bg-[#E6F2EC] text-[#006B3F] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
            Simple Process
          </span>
          <div className="relative">
            <h2 id="how-it-works-heading" className="text-3xl font-extrabold tracking-[-0.035em] text-[#292929] sm:text-4xl">
              How It Works
            </h2>
            {/* Playful sketch lines */}
            <svg aria-hidden="true" className="absolute -right-8 -top-2 w-8 h-8 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="12" x2="8" y2="6"></line>
              <line x1="10" y1="16" x2="14" y2="8"></line>
              <line x1="16" y1="14" x2="20" y2="10"></line>
            </svg>
          </div>
        </div>

        {/* Steps Timeline (Right) */}
        <div className="how-it-works__steps relative flex w-full flex-col items-stretch justify-between gap-4 md:flex-row md:items-start md:gap-3 lg:w-[73%]" role="list" aria-label="Complaint resolution steps">
          
          {steps.map((step, index) => (
            <div key={step.num} className="how-it-works__step group relative flex w-full flex-1 flex-col items-center md:min-w-0" role="listitem">
              
              {/* Connecting Dotted Line (Hidden on mobile and for the last item) */}
              {index !== steps.length - 1 && (
                <div aria-hidden="true" className="how-it-works__connector absolute left-[50%] top-5 z-0 hidden h-[2px] w-full border-t-2 border-dashed border-[#CBD5CE] md:block">
                  {/* Small Arrow at the end of the line */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                     <svg viewBox="0 0 24 24" fill="none" stroke="#AAB7AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 bg-[#F5F5F0]">
                        <polyline points="9 18 15 12 9 6"></polyline>
                     </svg>
                  </div>
                </div>
              )}

              {/* Step Content Wrapper */}
              <div className="how-it-works__content relative z-10 flex w-full flex-col items-center px-4 py-5 text-center sm:px-5 md:min-h-[182px] md:px-3 md:py-5">
                
                {/* Icons & Numbers Row */}
                <div className="mb-4 flex items-center gap-3">
                  {/* Number Badge */}
                  <div className={`how-it-works__number flex h-8 w-8 items-center justify-center rounded-full ${step.numColor} text-sm font-bold ${step.num === '2' ? 'text-[#292929]' : 'text-white'} shadow-sm transition-transform duration-300 group-hover:scale-105`} aria-hidden="true">
                    {step.num}
                  </div>
                  
                  {/* Icon Circle */}
                  <div className={`how-it-works__icon flex h-12 w-12 items-center justify-center rounded-full border-4 border-white ${step.iconBg} shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5`} aria-hidden="true">
                    <div className={step.iconColor}>
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <h3 className="mb-1 text-[15px] font-bold text-[#292929]">{step.title}</h3>
                <p className="whitespace-pre-line text-xs leading-relaxed text-[#626B65]">
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
