// HorizontalScrollerLottie.jsx  (only showing updated bits)
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
        trigger: sectionRef.current, pin: true, scrub: 1,
        end: () => "+=" + getEnd(), invalidateOnRefresh: true,
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill(); tween.kill(); ScrollTrigger.getAll().forEach(t=>t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden text-white">
      <div ref={trackRef} className="flex h-full items-stretch" style={{ width: "400vw" }}>
        {/* ===== Panels with color-linking cuts ===== */}
        <FeaturePanel
          bg="#3D1E6D"      // P1 base – deep royal indigo (was P4)
          tlColor="#3D1E6D" // TL echoes base
          brColor="#D98E04" // warm amber transition
          title="Affordable Excellence"
          copy="High-quality courses priced under ₹9,999/- ensuring accessible education for all."
          src="/lottie/affordable.json"
        />

        <FeaturePanel
          bg="#D98E04"      // P2 base – golden amber
          tlColor="#3D1E6D" // ties to orange tone
          brColor="#2A5F9E" // blends into blue
          title="Innovative Learning"
          copy="Holographic teaching technology for immersive and engaging educational experiences."
          src="/lottie/innovative.json"
        />

        <FeaturePanel
          bg="#2A5F9E"      // P3 base – elegant sapphire blue
          tlColor="#D98E04" // soft golden transition
          brColor="#B85C00" // connects to next orange tone
          title="Comprehensive Coverage"
          copy="Preparation for various exams like engineering, medical, law, postgraduate, and government."
          src="/lottie/coverage.json"
        />

        <FeaturePanel
          bg="#B85C00"      // P4 base – deep burnt orange (was P1)
          tlColor="#2A5F9E" // ties back to blue tone
          brColor="#B85C00" // echoes base tone
          title="Flexible Platforms"
          copy="Offers both offline and online learning environments tailored to diverse needs."
          src="/lottie/platforms.json"
        />
      </div>
    </section>
  );
}

function TwoCuts({ tlColor, brColor }) {
  // 50% ensures the diagonal meets the panel edge at mid-height on both sides,
  // so the line is perfectly continuous across adjacent panels.
  const tlClip = "polygon(0 0, 50% 0, 0 50%)";
  const brClip = "polygon(100% 100%, 50% 100%, 100% 50%)";

  const base = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: 1,                // tweak 0.9–1.0 if needed
    willChange: "clip-path",   // improve subpixel consistency
  };

  return (
    <>
      <div aria-hidden style={{ ...base, backgroundColor: tlColor, clipPath: tlClip }} />
      <div aria-hidden style={{ ...base, backgroundColor: brColor, clipPath: brClip }} />
    </>
  );
}


/* ============== Panel ============== */
function FeaturePanel({ bg, tlColor, brColor, title, copy, src }) {
  return (
    <div className="hs-panel w-screen h-full relative flex items-center justify-center" style={{ backgroundColor: bg }}>
      <TwoCuts tlColor={tlColor} brColor={brColor} size={56} />
      <div className="relative z-10 max-w-4xl w-full grid gap-8 px-6 md:grid-cols-[360px_1fr] items-center">
        <LottieBox src={src} />
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3">{title}</h2>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">{copy}</p>
        </div>
      </div>
    </div>
  );
}

/* ============== Lottie wrapper ============== */
function LottieBox({ src }) {
  return (
    <div className="rounded-3xl border backdrop-blur p-4 md:p-6"
      style={{ background: "rgba(255,255,255,0.10)", borderColor: "rgba(255,255,255,0.30)" }}>
      {/* @ts-ignore */}
      <lottie-player src={src} background="transparent" speed="1" loop autoplay style={{ width: 320, height: 320 }} />
    </div>
  );
}
