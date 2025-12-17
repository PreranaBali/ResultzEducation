import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MinimalGoldCursor = () => {
  const cursorRef = useRef(null);
  const progressRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Radius for the circle (size 32px means center is 16px)
  const radius = 13;
  const circumference = 2 * Math.PI * radius;

  useLayoutEffect(() => {
    // 1. Hide default cursor
    gsap.set('html', { cursor: 'none' });

    // 2. Optimized Movement (GSAP quickTo bypasses React rendering for 0 lag)
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" });
    
    const dotXTo = gsap.quickTo(dotRef.current, "x", { duration: 0.1, ease: "power3" });
    const dotYTo = gsap.quickTo(dotRef.current, "y", { duration: 0.1, ease: "power3" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    // 3. Scroll Progress Logic
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      // Update the SVG progress ring offset
      const offset = circumference - (scrolled / 100) * circumference;
      
      gsap.to(progressRef.current, {
        strokeDashoffset: offset,
        duration: 0.1,
        ease: "none"
      });
    };

    // 4. Hover Interactions (Subtle Scale)
    const handleMouseOver = (e) => {
      const target = e.target;
      const isPointer = window.getComputedStyle(target).cursor === 'pointer' || 
                        target.closest('button') || 
                        target.closest('a');
      
      if (isPointer) {
        gsap.to(ringRef.current, { scale: 1.4, duration: 0.3, borderColor: "#fbbf24" });
        gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
      } else {
        gsap.to(ringRef.current, { scale: 1, duration: 0.3, borderColor: "rgba(217, 119, 6, 0.4)" });
        gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mouseover", handleMouseOver);
      gsap.set('html', { cursor: 'auto' });
    };
  }, [circumference]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Precision Core Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 h-1 w-1 bg-yellow-200 rounded-full"
      />
      
      {/* Main Container */}
      <div ref={cursorRef} className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <div 
          ref={ringRef}
          className="relative h-8 w-8 rounded-full border border-amber-600/40 flex items-center justify-center transition-colors duration-300"
        >
          {/* Progress SVG Ring */}
          <svg className="absolute h-full w-full -rotate-90 transform" viewBox="0 0 32 32">
            <circle
              ref={progressRef}
              cx="16"
              cy="16"
              r={radius}
              stroke="#fbbf24" // Gold
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MinimalGoldCursor;