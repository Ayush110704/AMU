import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
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
    <section className="relative w-full overflow-hidden bg-[#F8FAF8] px-4 py-16 sm:py-20 lg:py-24" aria-labelledby="how-it-works-heading">
      
      {/* BACKGROUND DECORATIONS */}
      <div aria-hidden="true" className="absolute top-0 right-0 h-[30rem] w-[30rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#E6F2EC] opacity-70 mix-blend-multiply blur-[100px] pointer-events-none"></div>
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-[25rem] w-[25rem] -translate-x-1/3 translate-y-1/3 rounded-full bg-[#F8F0D8] opacity-60 mix-blend-multiply blur-[90px] pointer-events-none"></div>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-9 lg:flex-row lg:gap-6">
        
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative flex w-full shrink-0 flex-col items-start lg:w-[24%]"
        >
          <span className="bg-[#E6F2EC] text-[#006B3F] text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 shadow-sm border border-[#006B3F]/10">
            Simple Process
          </span>
          <div className="relative">
            <h2 id="how-it-works-heading" className="text-3xl font-extrabold tracking-[-0.035em] text-[#292929] sm:text-4xl">
              How It Works
            </h2>
            
            {/* ANIMATED UNDERLINE SVG */}
            <svg 
              aria-hidden="true" 
              className="absolute -bottom-3 left-0 w-full h-[12px] text-[#D4AF37]" 
              viewBox="0 0 100 12" 
              preserveAspectRatio="none"
            >
              <motion.path 
                d="M0,8 Q50,12 100,3" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
              />
            </svg>

            <svg aria-hidden="true" className="absolute -right-8 -top-2 w-8 h-8 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="12" x2="8" y2="6"></line>
              <line x1="10" y1="16" x2="14" y2="8"></line>
              <line x1="16" y1="14" x2="20" y2="10"></line>
            </svg>
          </div>
        </motion.div>

        {/* Timeline Steps */}
        <div className="relative flex w-full flex-col items-stretch justify-between gap-3 md:flex-row md:items-start md:gap-3 lg:w-[73%]" role="list">
          
          {steps.map((step, index) => (
            <div key={step.num} className="group relative flex w-full flex-1 flex-col items-center md:min-w-0" role="listitem">
              
              {/* ANIMATED Step Card */}
              <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 120, 
                  damping: 15,
                  delay: index * 0.6 
                }}
                whileHover={{ y: -5, boxShadow: "0_10px_25px_rgba(25,48,35,0.08)", borderColor: "rgba(0,107,63,0.2)" }}
                className="relative z-10 flex w-full flex-col items-center rounded-[1.2rem] border border-[rgba(29,58,42,0.09)] bg-[linear-gradient(150deg,#ffffff,#fbfcfa)] px-4 py-5 text-center shadow-[0_3px_8px_rgba(25,48,35,0.035),0_12px_28px_rgba(25,48,35,0.055),0_1px_0_#fff_inset] backdrop-blur-sm sm:px-5 md:min-h-[182px] md:px-3 md:py-5"
              >
                
                <div className="mb-4 flex items-center gap-3">
                  {/* Number Badge */}
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step.numColor} text-sm font-bold ${step.num === '2' ? 'text-[#292929]' : 'text-white'} shadow-[0_3px_8px_rgba(0,77,45,0.15),0_1px_0_rgba(255,255,255,0.24)_inset]`} aria-hidden="true">
                    {step.num}
                  </div>
                  
                  {/* Icon Circle */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full border-4 border-white ${step.iconBg} shadow-[0_4px_10px_rgba(25,48,35,0.09),0_1px_0_#fff_inset]`} aria-hidden="true">
                    <div className={step.iconColor}>
                      {step.icon}
                    </div>
                  </div>
                </div>

                <h3 className="mb-1 text-[15px] font-bold text-[#292929]">{step.title}</h3>
                <p className="whitespace-pre-line text-xs leading-relaxed text-[#626B65]">
                  {step.desc}
                </p>
              </motion.div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;