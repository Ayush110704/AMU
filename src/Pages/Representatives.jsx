import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useInView } from 'framer-motion';

// Sample Data
const representatives = [
  {
    id: 1,
    name: 'Ahmed Khan',
    role: 'President',
    faculty: 'Arts Faculty',
    roleColor: 'bg-[#E6F4EA] text-[#137333]',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 2,
    name: 'Sara Ahmed',
    role: 'Vice President',
    faculty: 'Science Faculty',
    roleColor: 'bg-[#FEF7E0] text-[#B06000]',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 3,
    name: 'Faizan Ali',
    role: 'General Secretary',
    faculty: 'Engineering Faculty',
    roleColor: 'bg-[#E6F4EA] text-[#137333]',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 4,
    name: 'Zoya Khan',
    role: 'Hostel Affairs',
    faculty: 'Hostel & Accommodation',
    roleColor: 'bg-[#E6F4EA] text-[#137333]',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    id: 5,
    name: 'Armaan Siddiqui',
    role: 'Infrastructure',
    faculty: 'Campus Facilities',
    roleColor: 'bg-[#FEF7E0] text-[#B06000]',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
  }
];

const duplicatedReps = [...representatives, ...representatives, ...representatives];

export default function RepresentativesCarousel() {
  const containerRef = useRef(null);
  const baseX = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
 
  const headingRef = useRef(null); 
  const isInView = useInView(headingRef, { once: true, margin: "0px 0px -100px 0px" });
  
  const fullText = "Our Representatives";
  const [typedText, setTypedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => { 
    if (isInView) {
      let currentIndex = 0;
      
      const intervalId = setInterval(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === fullText.length) {
          clearInterval(intervalId);
          setIsTypingDone(true);
        }
      }, 70); // Speed of typing
      
      return () => clearInterval(intervalId);
    }
  }, [isInView, fullText]); 

  useEffect(() => {
    if (containerRef.current && !isInitialized) {
      const oneSetWidth = containerRef.current.scrollWidth / 3;
      baseX.set(-oneSetWidth);
      setIsInitialized(true);
    }
  }, [baseX, isInitialized]);

  useAnimationFrame((t, delta) => {
    if (isHovered || !isInitialized) return;

    let moveBy = 30 * (delta / 1000); 
    let newX = baseX.get() + moveBy;

    if (containerRef.current) {
      const oneSetWidth = containerRef.current.scrollWidth / 3;
      if (newX >= 0) {
        newX = -oneSetWidth;
      }
    }
    
    baseX.set(newX);
  });

  const handleManualScroll = (direction) => {
    setIsHovered(true);
    setTimeout(() => setIsHovered(false), 2000);
    const shift = direction === 'right' ? 480 : -480;
    baseX.set(baseX.get() + shift);
  };

  return (
    <section className="w-full bg-[#F7F8F9] py-10 overflow-hidden relative">
      <div className="mx-auto w-full max-w-[1400px] px-3 sm:px-4 relative">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col items-start px-2 sm:px-4">
          <span className="mb-2 inline-block rounded-full bg-[#FEF7E0] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#B06000]">
            Student Leadership
          </span>
          
          {/* Typing Heading Container */}
          <h2 ref={headingRef} className="flex items-center gap-2 text-3xl font-extrabold text-[#004D2D] sm:text-4xl min-h-[40px] sm:min-h-[48px]">
            {typedText}
            
            {/* Blinking Cursor while typing */}
            {isInView && !isTypingDone && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-1.5 h-7 sm:h-9 bg-[#004D2D] ml-1 rounded-sm"
              />
            )}

            {/*  doodle arrow   */}
            {isTypingDone && (
              <motion.svg 
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="h-8 w-8 text-[#D4AF37] -ml-2 mt-2" 
                viewBox="0 0 100 100" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="6" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M10,80 Q40,20 80,40 M80,40 L60,20 M80,40 L60,60" />
              </motion.svg>
            )}
          </h2>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button 
            onClick={() => handleManualScroll('left')}
            className="absolute left-0 z-30 flex h-10 w-10 -translate-x-2 items-center justify-center rounded-full bg-white text-[#004D2D] shadow-lg border border-gray-100 hover:scale-105 active:scale-95 sm:translate-x-0 md:h-12 md:w-12"
            aria-label="Scroll left"
          >
             <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="15 18 9 12 15 6" /></svg>
          </button>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#F7F8F9] to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#F7F8F9] to-transparent"></div>

          <div className="w-full overflow-hidden px-8 py-4">
            <motion.div 
              ref={containerRef}
              className="flex w-max gap-4"
              style={{ x: baseX }}
            >
              {duplicatedReps.map((rep, index) => (
                <div
                  key={`${rep.id}-${index}`}
                  className="flex w-[320px] shrink-0 items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border-2 border-gray-100">
                    <img src={rep.image} alt={rep.name} className="h-full w-full object-cover" />
                  </div>
                  
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-[15px] font-bold text-[#333333]">{rep.name}</h3>
                    
                    <span className={`mb-1 mt-0.5 inline-block w-max rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${rep.roleColor}`}>
                      {rep.role}
                    </span>
                    
                    <p className="text-xs font-medium text-gray-500">{rep.faculty}</p>
                    
                    <div className="mt-2 flex items-center gap-3 text-gray-400">
                      <a href="#" className="transition-colors hover:text-[#004D2D]">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                      </a>
                      <a href="#" className="transition-colors hover:text-[#004D2D]">
                         <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </a>
                      <a href="#" className="transition-colors hover:text-[#004D2D]">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <button 
            onClick={() => handleManualScroll('right')}
            className="absolute right-0 z-30 flex h-10 w-10 translate-x-2 items-center justify-center rounded-full bg-white text-[#004D2D] shadow-lg border border-gray-100 hover:scale-105 active:scale-95 sm:translate-x-0 md:h-12 md:w-12"
            aria-label="Scroll right"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

      </div>
    </section>
  );
}