import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Users, Clock } from "lucide-react";
import director from '../../assets/team/director.png'

// --- Config ---
const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
// Changed from Orange to Neon Cyan format (R, G, B)
const DEFAULT_GLOW_COLOR = "0, 243, 255"; 
const NEON_PURPLE_RGB = "189, 0, 255";
const MOBILE_BREAKPOINT = 768;

// --- Simple data: one active + Coming soon placeholders ---
const TEAM = {
  active: {
    name: "Mr. Muthyal Ashwin Kumar",
    role: "Managing Director & Founder",
    image: director,
  },
  placeholders: 3, // Increased placeholders to fill grid better
};

// ---------------- Particle utilities ----------------
const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

// ---------------- ParticleCard (GSAP) ----------------
const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill?.();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    DEFAULT_GLOW_COLOR,
  ]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style }}>
      {/* Tech Decoration Corners (Added from theme) */}
      <div className="absolute top-0 right-0 w-2 h-[2px] bg-cyan-500/50" />
      <div className="absolute top-0 right-0 w-[2px] h-2 bg-cyan-500/50" />
      <div className="absolute bottom-0 left-0 w-2 h-[2px] bg-cyan-500/50" />
      <div className="absolute bottom-0 left-0 w-[2px] h-2 bg-cyan-500/50" />
      
      {children}
    </div>
  );
};

// ---------------- GlobalSpotlight ----------------
const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll(".card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
        cards.forEach((card) => card.style.setProperty("--glow-intensity", "0"));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) glowIntensity = 1;
        else if (effectiveDistance <= fadeDistance)
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);

        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
          : 0;

      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll(".card").forEach((card) => card.style.setProperty("--glow-intensity", "0"));
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// ---------------- Layout helpers ----------------
const BentoCardGrid = ({ children, gridRef }) => (
  <div
    className="bento-section grid gap-5 p-4 max-w-6xl w-full mx-auto select-none relative z-30"
    style={{ fontSize: "clamp(1rem, 0.9rem + 0.25vw, 1.2rem)" }}
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

// ---------------- Presentational cards ----------------
const PersonCard = ({ name, role, image }) => (
  // Changed from Orange borders to Cyan/Purple borders and dark bg
  <div className="relative h-full overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/80 backdrop-blur-md p-0">
    <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-transparent relative">
      <img src={image} alt={name} className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
      
      {/* Tech Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-50" />
    </div>
    <div className="relative z-10 p-5">
        {/* Tech font classes added */}
      <h3 className="font-brand text-lg font-bold tracking-wider text-white uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">{name}</h3>
      <p className="font-tech mt-1 text-sm font-medium text-cyan-400 tracking-widest uppercase">{role}</p>
    </div>
  </div>
);

const ComingSoonCard = () => (
  // Changed to Cyan dashed border
  <div className="grid h-full place-items-center gap-3 rounded-2xl border border-dashed border-cyan-500/30 bg-slate-950/50 p-10 text-center shadow-inner backdrop-blur-sm group hover:bg-cyan-950/20 transition-colors">
    <div className="relative">
        <Clock className="h-10 w-10 text-cyan-500 group-hover:text-white transition-colors" />
        <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-20 animate-pulse" />
    </div>
    <p className="font-tech text-base font-bold tracking-widest text-cyan-500/80 uppercase">Initialize...</p>
  </div>
);

// ---------------- Page ----------------
export default function OurTeam() {
  const gridRef = useRef(null);
  const isMobile = useMobile();
  const shouldDisable = isMobile; // prefer calm on mobile

  return (
     <section className="relative min-h-screen w-full bg-[#030712] mt-20 overflow-hidden">
      
      {/* --- FONT IMPORTS from Theme --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
        .font-tech { font-family: 'Rajdhani', sans-serif; }
        .font-brand { font-family: 'Orbitron', sans-serif; }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>

      {/* --- THEME BACKGROUND (Radial + Grid) --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#030712] to-[#030712]" />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite'
      }} />
      
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 z-20">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-cyan-500/50 bg-cyan-950/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Users className="h-8 w-8 text-cyan-400" />
          </div>
          
          <h1 className="font-brand bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-4xl font-black tracking-widest text-transparent sm:text-5xl drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] uppercase">
           Our Team
          </h1>
          <p className="font-tech mt-4 text-lg text-cyan-200/70 tracking-wider">
          Where vision meets execution — meet the people behind ResultsEducation.
          </p>
        </header>

        {/* Spotlight */}
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisable}
          enabled={!shouldDisable}
          spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
          glowColor={DEFAULT_GLOW_COLOR}
        />

        <BentoCardGrid gridRef={gridRef}>
          <div className="card-responsive grid gap-6 [--border-color:#22d3ee] [--background-dark:#030712] [--white:#fff]" style={{}}>
            {/* Active member card with particles */}
            <ParticleCard
              className="card rounded-2xl border border-cyan-800 bg-[#030712] p-0 card--border-glow hover:-translate-y-1 transition-all duration-500 shadow-2xl"
              style={{ color: "var(--white)", "--glow-x": "50%", "--glow-y": "50%", "--glow-intensity": 0, "--glow-radius": "200px" }}
              disableAnimations={shouldDisable}
              particleCount={DEFAULT_PARTICLE_COUNT}
              glowColor={DEFAULT_GLOW_COLOR}
              enableTilt={!shouldDisable}
              clickEffect={!shouldDisable}
              enableMagnetism={!shouldDisable}
            >
              <PersonCard name={TEAM.active.name} role={TEAM.active.role} image={TEAM.active.image} />
            </ParticleCard>

            {/* Coming soon placeholders */}
            {Array.from({ length: TEAM.placeholders }).map((_, i) => (
              <ParticleCard
                key={i}
                className="card rounded-2xl border border-dashed border-cyan-900/50 bg-[#030712]/40 p-0 card--border-glow hover:-translate-y-1 transition-all duration-500"
                style={{ color: "var(--white)", "--glow-x": "50%", "--glow-y": "50%", "--glow-intensity": 0, "--glow-radius": "200px" }}
                disableAnimations={shouldDisable}
                particleCount={DEFAULT_PARTICLE_COUNT}
                glowColor={DEFAULT_GLOW_COLOR}
                enableTilt={!shouldDisable}
                clickEffect={!shouldDisable}
                enableMagnetism={!shouldDisable}
              >
                <ComingSoonCard />
              </ParticleCard>
            ))}
          </div>
        </BentoCardGrid>
      </div>

      {/* CSS for border glow & responsive layout - Updated to Cyan/Purple */}
      <style>{`
        .bento-section {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
          --glow-color: ${DEFAULT_GLOW_COLOR};
        }
        .card-responsive {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .card-responsive { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .card-responsive { grid-template-columns: repeat(4, 1fr); }
        }
        .card--border-glow::after {
          content: '';
          position: absolute; inset: 0; padding: 2px; border-radius: inherit; pointer-events: none; z-index: 1;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 1)) 0%,
            rgba(${NEON_PURPLE_RGB}, calc(var(--glow-intensity) * 0.6)) 40%,
            transparent 70%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          transition: opacity .3s ease;
        }
        .card--border-glow:hover::after { opacity: 1; }
        .particle::before { content: ''; position: absolute; inset: -2px; border-radius: 9999px; background: rgba(${DEFAULT_GLOW_COLOR}, .4); z-index: -1; filter: blur(2px); }
      `}</style>
    </section>
  );
}