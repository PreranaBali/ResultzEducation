import React, { useEffect, useRef, useState } from "react";

export default function ImageBurst() {
  const container = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!container.current) return;
      
      const rect = container.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress based on element position
      const start = windowHeight * 0.9; // Start earlier (was 0.75)
      const end = -rect.height * 0.25; // when element leaves viewport
      
      if (rect.top <= start && rect.top >= end) {
        const progress = (start - rect.top) / (start - end);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      } else if (rect.top < end) {
        setScrollProgress(1);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate position for each image based on scroll progress
  const getImageStyle = (index, total) => {
    const angle = (index / total) * Math.PI * 2;
    
    // Calculate how horizontal or vertical the angle is
    // cos(angle) is 1 at 0°/180° (horizontal), 0 at 90°/270° (vertical)
    const horizontalness = Math.abs(Math.cos(angle));
    const verticalness = Math.abs(Math.sin(angle));
    
    // Images on left/right (horizontal) move more, top/bottom (vertical) move less
    const maxDistanceHorizontal = 700; // More movement for left/right (was 500)
    const maxDistanceVertical = 400;   // Less movement for top/bottom
    
    // Interpolate between vertical and horizontal max distance based on angle
    const maxDistance = maxDistanceVertical + (maxDistanceHorizontal - maxDistanceVertical) * horizontalness;
    
    const distance = scrollProgress * maxDistance;
    
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    const opacity = scrollProgress;
    const scale = 0.95 + (scrollProgress * 0.05);

    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
      opacity: opacity,
      width: '120px',
      height: '120px',
      transition: 'none', // Smooth scrolling without CSS transition
      willChange: 'transform, opacity',
    };
  };

  const images = [
    { src: "/images/brand/pic1.svg", alt: "pic1" },
    { src: "/images/brand/pic2.svg", alt: "pic2" },
    { src: "/images/brand/pic3.svg", alt: "pic3" },
    { src: "/images/brand/pic4.svg", alt: "pic4" },
    { src: "/images/brand/pic5.svg", alt: "pic5" },
    { src: "/images/brand/pic6.svg", alt: "pic6" },
    { src: "/images/brand/pic7.svg", alt: "pic7" },
    { src: "/images/brand/pic8.svg", alt: "pic8" },
    { src: "/images/brand/pic9.svg", alt: "pic9" },
    { src: "/images/brand/pic10.svg", alt: "pic10" },
    { src: "/images/brand/pic11.svg", alt: "pic11" },
    { src: "/images/brand/pic12.svg", alt: "pic12" },
  ];

  return (
    <section
      ref={container}
      className="relative w-full h-[1100px] overflow-hidden bg-transparent"
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img.src}
          alt={img.alt}
          className="shadow-2xl"
          style={getImageStyle(index, images.length)}
        />
      ))}
      
      {/* Center text that becomes visible on scroll */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div 
          className="text-center max-w-3xl px-8"
          style={{ 
            opacity: scrollProgress,
            transform: `scale(${0.9 + scrollProgress * 0.1})`,
            transition: 'none'
          }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Guaranteed Success for Every Student
          </h2>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            We assure 100% placement for every student. At Results Education, we are committed to equipping learners with the skills, training, and opportunities needed to secure their future confidently and successfully. With our industry-relevant programs and strong network of partners, students are empowered to step into their careers with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}