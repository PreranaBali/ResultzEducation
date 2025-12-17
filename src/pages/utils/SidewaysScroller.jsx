// SidewaysScroller.jsx - Professional brand-colored design
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const BRAND_GOLD = "#FFB800";
const BRAND_BLUE = "#0066FF";

export default function SidewaysScroller() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const panels = gsap.utils.toArray(".hs-panel");
    const getEnd = () =>
      trackRef.current.scrollWidth - sectionRef.current.offsetWidth;

    const tween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current, 
        pin: true, 
        scrub: 1,
        end: () => "+=" + getEnd(), 
        invalidateOnRefresh: true,
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => { 
      window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill(); 
      tween.kill(); 
      ScrollTrigger.getAll().forEach(t=>t.kill()); 
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden text-white">
      <div ref={trackRef} className="flex h-full items-stretch" style={{ width: "400vw" }}>
        <FeaturePanel
          bg={`linear-gradient(135deg, #080704ff 0%, #080808 100%)`}
          tlColor={BRAND_GOLD}
          brColor={BRAND_BLUE}
          title="Affordable Excellence"
          copy="High-quality courses priced under ₹15,000/- ensuring accessible education for all."
          src="/lottie/affordable.json"
          accent={BRAND_GOLD}
        />

        <FeaturePanel
          bg={`linear-gradient(135deg, #1a2744 0%, #0A0F1C 100%)`}
          tlColor={BRAND_BLUE}
          brColor={BRAND_GOLD}
          title="Innovative Learning"
          copy="Holographic teaching technology for immersive and engaging educational experiences."
          src="/lottie/innovative.json"
          accent={BRAND_BLUE}
        />

        <FeaturePanel
          bg={`linear-gradient(135deg, #0A0F1C 0%, #1a2744 100%)`}
          tlColor={BRAND_GOLD}
          brColor={BRAND_BLUE}
          title="Comprehensive Coverage"
          copy="Preparation for various exams like engineering, medical, law, postgraduate, and government."
          src="/lottie/coverage.json"
          accent={BRAND_GOLD}
        />

        <FeaturePanel
          bg={`linear-gradient(135deg, #20180fff 0%, #0b0604ff 100%)`}
          tlColor={BRAND_BLUE}
          brColor={BRAND_GOLD}
          title="Flexible Platforms"
          copy="Offers both offline and online learning environments tailored to diverse needs."
          src="/lottie/platforms.json"
          accent={BRAND_BLUE}
        />
      </div>
    </section>
  );
}

function TwoCuts({ tlColor, brColor }) {
  const tlClip = "polygon(0 0, 50% 0, 0 50%)";
  const brClip = "polygon(100% 100%, 50% 100%, 100% 50%)";

  const base = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 0.8,
    willChange: "clip-path",
  };

  return (
    <>
      <div aria-hidden style={{ ...base, background: `linear-gradient(135deg, ${tlColor}, transparent)`, clipPath: tlClip }} />
      <div aria-hidden style={{ ...base, background: `linear-gradient(135deg, transparent, ${brColor})`, clipPath: brClip }} />
    </>
  );
}

function FeaturePanel({ bg, tlColor, brColor, title, copy, src, accent }) {
  return (
    <div className="hs-panel w-screen h-full relative flex items-center justify-center" 
         style={{ background: bg }}>
      {/* Professional background pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(${accent}20 1px, transparent 1px), linear-gradient(90deg, ${accent}20 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />
      
      <TwoCuts tlColor={tlColor} brColor={brColor} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl w-full grid gap-8 px-6 md:grid-cols-[360px_1fr] items-center"
      >
        <LottieBox src={src} accent={accent} />
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3">
            <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
                  style={{ filter: `drop-shadow(0 0 20px ${accent}50)` }}>
              {title}
            </span>
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-200">
            {copy}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function LottieBox({ src, accent }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, rotate: 2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative rounded-3xl p-4 md:p-6"
      style={{ 
        background: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,20,40,0.6))`,
        border: `2px solid ${accent}`,
        boxShadow: `0 0 40px ${accent}30, inset 0 0 30px ${accent}10`
      }}>
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: accent }} />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: accent }} />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: accent }} />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: accent }} />
      
      {/* @ts-ignore */}
      <lottie-player 
        src={src} 
        background="transparent" 
        speed="1" 
        loop 
        autoplay 
        style={{ width: 320, height: 320 }} 
      />
    </motion.div>
  );
}