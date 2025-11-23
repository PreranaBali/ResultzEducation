import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Users, Clock } from "lucide-react";
import director from '../../assets/team/director.png'
// --- Config ---
const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "255, 123, 0"; // orange glow
const MOBILE_BREAKPOINT = 768;

// --- Simple data: one active + Coming soon placeholders ---
const TEAM = {
  active: {
    name: "Mr. Ashwin Kumar",
    role: "Managing Director & Founder",
    image: director
      ,
  },
  placeholders: 1,
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
    className="bento-section grid gap-3 p-4 max-w-6xl w-full mx-auto select-none relative"
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
  <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-orange-900/60 p-0">
    <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-[#ff7b00]/10 via-[#ffae00]/5 to-transparent">
      <img src={image} alt={name} className="h-full w-full object-cover" loading="lazy" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
    </div>
    <div className="relative z-10 p-5">
      <h3 className="text-lg font-semibold tracking-tight text-white">{name}</h3>
      <p className="mt-1 text-sm font-medium text-[#ffae00]/90">{role}</p>
    </div>
  </div>
);

const ComingSoonCard = () => (
  <div className="grid h-full place-items-center gap-3 rounded-2xl border border-dashed border-orange-400/40 bg-orange-900/40 p-10 text-center shadow-inner backdrop-blur-sm">
    <Clock className="h-10 w-10 text-[#ffae00]" />
    <p className="text-base font-semibold tracking-wide text-[#ffae00]">Coming soon</p>
  </div>
);

// ---------------- Page ----------------
export default function OurTeam() {
  const gridRef = useRef(null);
  const isMobile = useMobile();
  const shouldDisable = isMobile; // prefer calm on mobile

  return (
     <section className="relative min-h-screen w-full bg-transparent mt-20">

      {/* soft background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#ff7b00]/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-50 w-60 rounded-full bg-[#ffae00]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-[#ffae00]/30 bg-gradient-to-br from-[#ff7b00]/15 to-[#ffae00]/10">
            <Users className="h-7 w-7 text-[#ffae00]" />
          </div>
          <h1 className="bg-gradient-to-r from-white via-[#ffae00] to-[#ff7b00] bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            Our Team
          </h1>
          <p className="mt-2 text-sm text-slate-300/80">
            Meet the leadership at the helm — more profiles are on the way.
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
          <div className="card-responsive grid gap-3 [--border-color:#392e4e] [--background-dark:#060010] [--white:#fff]" style={{}}>
            {/* Active member card with particles */}
            <ParticleCard
              className="card rounded-2xl border border-slate-700/60 bg-orange-900/60 p-0 card--border-glow hover:-translate-y-0.5 transition-all duration-300"
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

            {/* Coming soon placeholders (animated too for consistency) */}
            {Array.from({ length: TEAM.placeholders }).map((_, i) => (
              <ParticleCard
                key={i}
                className="card rounded-2xl border border-dashed border-[#ffae00]/30 bg-slate-900/40 p-0 card--border-glow hover:-translate-y-0.5 transition-all duration-300"
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

      {/* CSS for border glow & responsive layout (kept tiny) */}
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
          position: absolute; inset: 0; padding: 6px; border-radius: inherit; pointer-events: none; z-index: 1;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 0.8)) 0%,
            rgba(${DEFAULT_GLOW_COLOR}, calc(var(--glow-intensity) * 0.4)) 30%,
            transparent 60%);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          transition: opacity .3s ease;
        }
        .card--border-glow:hover::after { opacity: 1; }
        .particle::before { content: ''; position: absolute; inset: -2px; border-radius: 9999px; background: rgba(${DEFAULT_GLOW_COLOR}, .2); z-index: -1; }
      `}</style>
    </section>
  );
}
