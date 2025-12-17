// Professional Elegant Gold - Our Team Page
// Packages: react lucide-react gsap

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Users, Clock } from "lucide-react";
// Assuming director remains the same asset path
import director from '../../assets/team/director.png'

/* -------------------- NEW ELEGANT CONFIG -------------------- */
const BRAND_COLOR_HEX = "#F25912";
const BRAND_COLOR_RGB = "242, 89, 18";     // Resultz Orange
const GOLD_CHAMPAGNE_RGB = "212, 175, 55"; // #D4AF37
const BRONZE_MUTED_RGB = "142, 111, 62";   // #8E6F3E
const OBSIDIAN_DEEP = "#050505";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const MOBILE_BREAKPOINT = 768;

const TEAM = {
  active: {
    name: "Mr. Muthyal Ashwin Kumar",
    role: "Managing Director & Founder",
    image: director,
  },
  placeholders: 3, 
};

// ---------------- Particle utilities ----------------
const createParticleElement = (x, y, color = GOLD_CHAMPAGNE_RGB) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 8px rgba(${color}, 0.8);
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

// ---------------- ParticleCard (Logic Preserved) ----------------
const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = GOLD_CHAMPAGNE_RGB,
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
        scale: 0, opacity: 0, duration: 0.3, ease: "back.in(1.7)",
        onComplete: () => { particle.parentNode?.removeChild(particle); },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();
    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none", repeat: -1, yoyo: true,
        });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;
    const handleMouseEnter = () => { isHoveredRef.current = true; animateParticles(); };
    const handleMouseLeave = () => { isHoveredRef.current = false; clearAllParticles(); 
      gsap.to(element, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.3 });
    };
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const centerX = rect.width / 2; const centerY = rect.height / 2;
      if (enableTilt) {
        gsap.to(element, { rotateX: ((y - centerY) / centerY) * -10, rotateY: ((x - centerX) / centerX) * 10, duration: 0.1, transformPerspective: 1000 });
      }
      if (enableMagnetism) {
        gsap.to(element, { x: (x - centerX) * 0.05, y: (y - centerY) * 0.05, duration: 0.3 });
      }
    };
    const handleClick = (e) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      const ripple = document.createElement("div");
      ripple.style.cssText = `position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(${BRAND_COLOR_RGB}, 0.3) 0%, transparent 70%); left: ${x - 200}px; top: ${y - 200}px; pointer-events: none; z-index: 1000;`;
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 2, opacity: 0, duration: 0.8, onComplete: () => ripple.remove() });
    };
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-hidden group`} style={{ ...style }}>
      {/* Elegant Gold Corners */}
      <div className="absolute top-0 right-0 w-2 h-[1px] bg-gold-500/40" />
      <div className="absolute top-0 right-0 w-[1px] h-2 bg-gold-500/40" />
      <div className="absolute bottom-0 left-0 w-2 h-[1px] bg-gold-500/40" />
      <div className="absolute bottom-0 left-0 w-[1px] h-2 bg-gold-500/40" />
      {children}
    </div>
  );
};

// ---------------- GlobalSpotlight (Warm Amber/Gold) ----------------
const GlobalSpotlight = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS }) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `position: fixed; width: 600px; height: 600px; border-radius: 50%; pointer-events: none; background: radial-gradient(circle, rgba(${GOLD_CHAMPAGNE_RGB}, 0.1) 0%, rgba(${BRONZE_MUTED_RGB}, 0.05) 30%, transparent 70%); z-index: 200; opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen;`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      const cards = gridRef.current.querySelectorAll(".card");
      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        cards.forEach((card) => card.style.setProperty("--glow-intensity", "0"));
        return;
      }
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const distance = Math.hypot(e.clientX - (cardRect.left + cardRect.width/2), e.clientY - (cardRect.top + cardRect.height/2)) - Math.max(cardRect.width, cardRect.height)/2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);
        let glowIntensity = effectiveDistance <= proximity ? 1 : effectiveDistance <= fadeDistance ? (fadeDistance - effectiveDistance)/(fadeDistance - proximity) : 0;
        updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });
      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, opacity: minDistance <= fadeDistance ? 0.6 : 0, duration: 0.2 });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius]);
  return null;
};

// ---------------- Presentational cards ----------------
const PersonCard = ({ name, role, image }) => (
  <div className="relative h-full overflow-hidden rounded-2xl border border-gold-500/20 bg-stone-950/40 backdrop-blur-xl p-0">
    <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-amber-500/5 to-transparent relative">
      <img src={image} alt={name} className="h-full w-full object-cover" loading="lazy" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
      {/* Brand Accent Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ backgroundColor: BRAND_COLOR_HEX, opacity: 0.4 }} />
    </div>
    <div className="relative z-10 p-6">
      <h3 className="font-brand text-xl font-bold tracking-tight text-stone-100 uppercase" style={{ textShadow: `0 0 15px rgba(${GOLD_CHAMPAGNE_RGB}, 0.3)` }}>{name}</h3>
      <p className="font-tech mt-1 text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: BRAND_COLOR_HEX }}>{role}</p>
    </div>
  </div>
);

const ComingSoonCard = () => (
  <div className="grid h-full place-items-center gap-3 rounded-2xl border border-dashed border-stone-800 bg-stone-950/20 p-10 text-center backdrop-blur-sm group hover:bg-amber-950/10 transition-colors">
    <div className="relative">
        <Clock className="h-10 w-10 text-stone-600 group-hover:text-amber-500 transition-colors duration-500" />
        <div className="absolute inset-0 bg-amber-400 blur-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
    </div>
    <p className="font-tech text-xs font-bold tracking-[0.4em] text-stone-600 uppercase group-hover:text-stone-400">Syncing...</p>
  </div>
);

// ---------------- Page ----------------
export default function OurTeam() {
  const gridRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
     <section className="relative min-h-screen w-full bg-[#050505] pt-32 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Inter:wght@400;600&display=swap');
        .font-tech { font-family: 'Rajdhani', sans-serif; }
        .font-brand { font-family: 'Rajdhani', sans-serif; }
        @keyframes gridMove { 0% { transform: translate(0, 0); } 100% { transform: translate(40px, 40px); } }
      `}</style>

      {/* --- ELEGANT THEME BACKGROUND --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a150a_0%,_#050505_100%)]" />
      
      {/* Refined Gold Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(${GOLD_CHAMPAGNE_RGB}, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(${GOLD_CHAMPAGNE_RGB}, 0.2) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        animation: 'gridMove 40s linear infinite'
      }} />
      
      <div className="relative mx-auto max-w-7xl px-8 z-20">
        <header className="mx-auto mb-20 max-w-2xl text-center">
          <div className="mx-auto mb-8 flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-stone-700" />
             <div className="font-tech text-sm tracking-[0.5em] uppercase font-bold" style={{ color: BRAND_COLOR_HEX }}>
               Results Education
             </div>
             <div className="h-[1px] w-12 bg-stone-700" />
          </div>
          
          <h1 className="font-brand text-5xl md:text-7xl font-bold tracking-tighter text-stone-100 uppercase">
             OUR TEAM
          </h1>
          <p className="font-tech mt-6 text-lg text-stone-400 tracking-wide max-w-lg mx-auto italic border-l border-gold-500/20 pl-4">
            Meet the elite team defining the gold standard at <span style={{ color: BRAND_COLOR_HEX }}>Resultz Education</span>.
          </p>
        </header>

        <GlobalSpotlight gridRef={gridRef} disableAnimations={isMobile} enabled={!isMobile} />

        <div className="bento-section grid gap-6 p-4 max-w-7xl w-full mx-auto relative z-30 select-none" ref={gridRef}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Active member card */}
            <ParticleCard
              className="card rounded-2xl border border-stone-800 bg-[#080808] p-0 card--border-glow transition-all duration-700"
              style={{ "--glow-x": "50%", "--glow-y": "50%", "--glow-intensity": 0, "--glow-radius": "200px" }}
              disableAnimations={isMobile}
            >
              <PersonCard name={TEAM.active.name} role={TEAM.active.role} image={TEAM.active.image} />
            </ParticleCard>

            {/* Placeholders */}
            {Array.from({ length: TEAM.placeholders }).map((_, i) => (
              <ParticleCard
                key={i}
                className="card rounded-2xl border border-dashed border-stone-900 bg-[#050505] p-0 card--border-glow"
                style={{ "--glow-x": "50%", "--glow-y": "50%", "--glow-intensity": 0, "--glow-radius": "200px" }}
                disableAnimations={isMobile}
              >
                <ComingSoonCard />
              </ParticleCard>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .card--border-glow::after {
          content: ''; position: absolute; inset: 0; padding: 1.5px; border-radius: inherit; pointer-events: none; z-index: 1;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${GOLD_CHAMPAGNE_RGB}, calc(var(--glow-intensity) * 0.8)) 0%,
            rgba(${BRAND_COLOR_RGB}, calc(var(--glow-intensity) * 0.4)) 50%,
            transparent 80%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor;
          transition: opacity .5s ease;
        }
        .card--border-glow:hover::after { opacity: 1; }
        .particle::before { content: ''; position: absolute; inset: -1px; border-radius: 9999px; background: rgba(${GOLD_CHAMPAGNE_RGB}, .2); z-index: -1; filter: blur(1px); }
      `}</style>
    </section>
  );
}