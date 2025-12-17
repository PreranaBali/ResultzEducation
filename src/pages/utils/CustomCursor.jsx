import React, { useEffect, useState, useRef } from 'react';

const GoldCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Use refs for smoother trailing effect on the outer layer don't trigger re-renders
  const auraPos = useRef({ x: 0, y: 0 });
  const auraRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target;
      // Detect clickables (buttons, links, or anything with cursor: pointer)
      const isClickable =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('a') || 
        target.closest('button');
        
      setIsPointer(!!isClickable);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Animation loop for the trailing "Aura" layer for extra smoothness
  useEffect(() => {
    let animationFrameId;
    
    const animateAura = () => {
      if (auraRef.current) {
        // Calculate distance between current aura pos and actual mouse pos
        const dx = mousePos.x - auraPos.current.x;
        const dy = mousePos.y - auraPos.current.y;
        
        // Move aura towards mouse with an "ease-out" lag (0.15 speed factor)
        auraPos.current.x += dx * 0.15;
        auraPos.current.y += dy * 0.15;
        
        auraRef.current.style.left = `${auraPos.current.x}px`;
        auraRef.current.style.top = `${auraPos.current.y}px`;
      }
      animationFrameId = requestAnimationFrame(animateAura);
    };

    animationFrameId = requestAnimationFrame(animateAura);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]); // Re-run animation loop dependency on mousePos updates

  const cursorClasses = "pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full z-[9999]";

  return (
    <>
      {/* Global override to hide default cursor */}
      <style>{`
        html, body, * { cursor: none !important; }
        
        /* Add a subtle pulse animation for hover state */
        @keyframes goldPulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(2.5); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(2.7); }
        }
        .animate-gold-pulse {
           animation: goldPulse 2s infinite ease-in-out;
        }
      `}</style>

      {/* Layer 3: The Outer Molten Aura (Slowest, blurred trail) */}
      <div
        ref={auraRef}
        // We use refs for position here instead of state for performance on the heaviest layer
        className={`${cursorClasses} transition-all duration-500 ease-out will-change-transform
          ${isPointer 
            ? 'h-16 w-16 bg-amber-600/40 blur-[20px] animate-gold-pulse' 
            : 'h-12 w-12 bg-orange-700/30 blur-[15px]'}
          ${isMouseDown ? 'scale-90 opacity-50' : ''}
          `}
      />

      {/* Layer 2: The Core (The main visual ring) */}
      <div
        className={`${cursorClasses} transition-all duration-200 ease-out border-[1.5px] will-change-[transform,width,height]
          ${isPointer 
            ? 'h-10 w-10 border-yellow-300/80 bg-amber-500/20 shadow-[0_0_15px_2px_rgba(251,191,36,0.5)]' 
            : 'h-6 w-6 border-amber-500/60 bg-transparent'}
           ${isMouseDown ? 'scale-75 !border-orange-500' : ''}
        `}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* Layer 1: The Spark (Center precision dot) */}
      <div
        className={`${cursorClasses} transition-all duration-75 ease-out
          ${isPointer ? 'h-2 w-2 bg-white shadow-sm' : 'h-1.5 w-1.5 bg-yellow-200'}
        `}
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
    </>
  );
};

export default GoldCursor;