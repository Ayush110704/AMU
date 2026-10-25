import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

const categories = [
  {
    id: 'academic',
    title: 'Academic Issues',
    color: 'green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
      </svg>
    )
  },
  {
    id: 'hostel',
    title: 'Hostel Facilities',
    color: 'green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M3 21h18" />
        <path d="M5 21V9l7-4 7 4v12" />
        <rect x="9" y="13" width="6" height="4" rx="1" />
      </svg>
    )
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    color: 'yellow',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M10 18h4" />
      </svg>
    )
  },
  {
    id: 'library',
    title: 'Library Resources',
    color: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  {
    id: 'mess',
    title: 'Mess & Food',
    color: 'green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
    )
  },
  {
    id: 'safety',
    title: 'Safety & Security',
    color: 'yellow',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    id: 'it',
    title: 'IT & Digital Services',
    color: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    )
  },
  {
    id: 'other',
    title: 'Other',
    color: 'orange',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    )
  }
];

const colorMap = {
  green: { iconBg: 'bg-[#E6F4EA]', iconColor: 'text-[#137333]', arrowColor: 'text-[#137333]' },
  yellow: { iconBg: 'bg-[#FEF7E0]', iconColor: 'text-[#B06000]', arrowColor: 'text-[#B06000]' },
  blue: { iconBg: 'bg-[#E8F0FE]', iconColor: 'text-[#1A73E8]', arrowColor: 'text-[#1A73E8]' },
  orange: { iconBg: 'bg-[#FDF4E9]', iconColor: 'text-[#C26401]', arrowColor: 'text-[#C26401]' }
};

const duplicatedCategories = [...categories, ...categories, ...categories];

export default function IssueCategories() {
  const containerRef = useRef(null);
  // Initialize with a very large negative number; we'll snap it to the correct position on mount
  const baseX = useMotionValue(-10000); 
  const [isHovered, setIsHovered] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the position once the element renders and we know the width
  React.useEffect(() => {
    if (containerRef.current) {
      const oneSetWidth = containerRef.current.scrollWidth / 3;
      // Start at the beginning of the second set so there is a full set to the left
      baseX.set(-oneSetWidth);
      setIsInitialized(true);
    }
  }, [baseX]);

  useAnimationFrame((t, delta) => {
    if (isHovered || !isInitialized) return;

    // Positive value moves the track to the right
    let moveBy = 50 * (delta / 1000); 
    let newX = baseX.get() + moveBy;

    if (containerRef.current) {
      const oneSetWidth = containerRef.current.scrollWidth / 3;
      
      // When it scrolls far enough right (back to 0), snap back to the start of the second set
      if (newX >= 0) {
        newX = -oneSetWidth;
      }
    }
    
    baseX.set(newX);
  });

  return (
    <section className="w-full bg-[#F7F8F9] py-6 overflow-hidden relative">
      
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#F7F8F9] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#F7F8F9] to-transparent"></div>

      <div className="mx-auto w-full max-w-[1400px]">
        
        <div 
          className="relative flex w-full overflow-hidden pb-2 pt-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            ref={containerRef}
            className="flex w-max gap-3 sm:gap-4"
            style={{ x: baseX }}
          >
            {duplicatedCategories.map((category, index) => {
              const colors = colorMap[category.color];
              
              return (
                <button
                  key={`${category.id}-${index}`} 
                  type="button"
                  className="flex w-[220px] shrink-0 items-center justify-between rounded-[14px] border border-gray-200 bg-white p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl ${colors.iconBg} ${colors.iconColor}`}>
                      {category.icon}
                    </div>
                    <span className="text-left text-[13.5px] font-semibold leading-tight text-[#333333]">
                      {category.title}
                    </span>
                  </div>
                  
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition-transform hover:translate-x-0.5 ${colors.arrowColor}`}>
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
} 