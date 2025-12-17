// Professional Elegant Gold - Fixed Mirroring & Enhanced Vertical Shift
// Packages: three @react-three/fiber @react-three/drei @react-three/postprocessing framer-motion gsap

import React, { useMemo, useRef, useState, useEffect, createElement } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Sparkles, 
  PerspectiveCamera,
  ContactShadows
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion } from "framer-motion";
import { gsap } from "gsap";

/* -------------------- THEME CONFIG -------------------- */
const BRAND_COLOR = "#F25912";    
const GOLD_CHAMPAGNE = "#D4AF37"; 
const GOLD_SOFT = "#E8D5B5";      
const BRONZE_MUTED = "#8E6F3E";   
const OBSIDIAN_DEEP = "#080808";  
/* ------------------------------------------------------ */

const faceList = [
  { key: "Full-Stack Web Development", label: "Full-Stack Web Development", text: "</>",  slug: "Full-Stack-Web-Development",       target: [0, 0, 0],          position: [0, 0, 3.26] },
  { key: "AI & Machine Learning",       label: "AI & Machine Learning",     text: "A.I",  slug: "AI-Machine-Learning",           target: [0, -Math.PI/2, 0], position: [3.26, 0, 0] },
  { key: "Data Analytics",         label: "Data Analytics",         text: "Σ",    slug: "Data-Analytics",               target: [0, Math.PI, 0],    position: [0, 0, -3.26] },
  { key: "Graphic Design",         label: "Graphic Design", text: "PX",   slug: "Graphic-Design",            target: [0, Math.PI/2, 0],  position: [-3.26, 0, 0] },
  { key: "Cyber Security Master",      label: "Cyber Security Master",      text: "SEC",  slug: "Cyber-Security-Master",            target: [Math.PI/2, 0, 0], position: [0, 3.26, 0] },
  { key: "U.S. Taxation",       label: "U.S. Taxation",       text: "§",    slug: "US-Taxation",             target: [-Math.PI/2, 0, 0],  position: [0, -3.26, 0] },
];

const TextType = ({
  text,
  as: Component = 'span',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const cursorRef = useRef(null);
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.to(cursorRef.current, { opacity: 0, duration: cursorBlinkDuration, repeat: -1, yoyo: true, ease: 'power2.inOut' });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    let timeout;
    const currentText = textArray[currentTextIndex];
    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        } else {
          timeout = setTimeout(() => setDisplayedText(prev => prev.slice(0, -1)), deletingSpeed);
        }
      } else {
        if (currentCharIndex < currentText.length) {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev + currentText[currentCharIndex]);
            setCurrentCharIndex(prev => prev + 1);
          }, typingSpeed);
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };
    executeTypingAnimation();
    return () => clearTimeout(timeout);
  }, [currentCharIndex, displayedText, isDeleting, typingSpeed, deletingSpeed, pauseDuration, textArray, currentTextIndex]);

  return createElement(Component, { className: `inline-block ${className}`, ...props },
    <>
      <span style={{ color: textColors[currentTextIndex % textColors.length] || 'inherit' }}>{displayedText}</span>
      {showCursor && <span ref={cursorRef} className={`ml-1 inline-block ${cursorClassName}`}>{cursorCharacter}</span>}
    </>
  );
};

function goto(path) {
  window.location.href = path.startsWith("http") ? path : `/${path}`;
}

function logoTexture(text, color) {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, size, size);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = color;
  ctx.shadowBlur = 35;
  ctx.font = `bold 260px "Inter", sans-serif`; 
  ctx.fillStyle = "white";
  ctx.fillText(text, size / 2, size / 2);
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = color;
  ctx.arc(size/2, size/2, 410, 0, 2 * Math.PI);
  ctx.stroke();
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

function CubeFace({ faceData, active }) {
  const texture = useMemo(() => logoTexture(faceData.text, active ? GOLD_CHAMPAGNE : "#332a1a"), [faceData.text, active]);
  
  // Refined rotations to ensure all symbols face the viewer correctly
  let rotation = [0, 0, 0];
  if (faceData.position[0] > 0) rotation = [0, Math.PI / 2, 0];
  else if (faceData.position[0] < 0) rotation = [0, -Math.PI / 2, 0];
  else if (faceData.position[1] > 0) rotation = [-Math.PI / 2, 0, 0]; // Adjusted for SEC top face
  else if (faceData.position[1] < 0) rotation = [Math.PI / 2, 0, 0];
  else if (faceData.position[2] < 0) rotation = [0, Math.PI, 0];

  return (
    <mesh position={faceData.position} rotation={rotation}>
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        opacity={active ? 1 : 0.1} 
        side={THREE.FrontSide} // FIXED: FrontSide prevents mirrored "SƎC" through the cube
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
      />
    </mesh>
  );
}

function HoloCube({ activeIndex }) {
  const group = useRef();
  const targetEuler = useRef(new THREE.Euler(...faceList[0].target));

  useEffect(() => { 
    targetEuler.current.set(...faceList[activeIndex].target); 
  }, [activeIndex]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetEuler.current.x, 3.5, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetEuler.current.y, 3.5, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetEuler.current.z, 3.5, delta);
  });

  return (
    <Float floatIntensity={1.2} rotationIntensity={0.2} speed={1.2}>
      <group ref={group}>
        <mesh>
          <boxGeometry args={[6.4, 6.4, 6.4]} />
          <meshPhysicalMaterial color={OBSIDIAN_DEEP} roughness={0.01} metalness={1} transmission={0.35} thickness={1} transparent opacity={0.95} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(6.5, 6.5, 6.5)]} />
          <lineBasicMaterial color={GOLD_CHAMPAGNE} transparent opacity={0.2} />
        </lineSegments>
        {faceList.map((face, idx) => (
          <CubeFace key={face.key} faceData={face} active={activeIndex === idx} />
        ))}
      </group>
    </Float>
  );
}

function Scene({ activeIndex }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 24]} fov={40} />
      <Environment preset="city" />
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={1} color={GOLD_SOFT} />
      <Sparkles count={80} scale={15} size={2} speed={0.3} opacity={0.3} color={GOLD_CHAMPAGNE} />
      <HoloCube activeIndex={activeIndex} />
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.6} radius={0.4} />
      </EffectComposer>
      <ContactShadows opacity={0.3} scale={40} blur={3} far={20} color="#000000" />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

export default function FuturisticHero() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] overflow-hidden text-zinc-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Rajdhani:wght@500;700&display=swap');
        .font-tech { font-family: 'Rajdhani', sans-serif; }
        .font-brand { font-family: 'Rajdhani', sans-serif; font-weight: 700; }
        @keyframes gridMove { 0% { transform: translate(0, 0); } 100% { transform: translate(40px, 40px); } }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#1a150a_0%,_#050505_100%)]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(#D4AF37 0.5px, transparent 0.5px), linear-gradient(90deg, #D4AF37 0.5px, transparent 0.5px)`, backgroundSize: '80px 80px', animation: 'gridMove 40s linear infinite' }} />

      {/* Brand Watermark */}
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none hidden lg:block">
        <div className="font-brand text-7xl tracking-[0.2em] uppercase" style={{ writingMode: 'vertical-rl', color: BRAND_COLOR }}>RESULTZ</div>
      </div>

      <div className="relative z-20 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 pt-24 md:grid-cols-2 lg:items-center min-h-screen">
        
        {/* LEFT: Text Content */}
        <div className="order-2 md:order-1 flex flex-col gap-10 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-10 inline-flex items-center gap-4">
              <div className="h-[2px] w-12" style={{ backgroundColor: BRAND_COLOR }} />
              <div className="font-brand text-base tracking-[0.5em] uppercase font-bold" style={{ color: BRAND_COLOR }}>RESULTZ EDUCATION</div>
            </div>

            <div className="min-h-[220px]">
              <h1 className="font-tech text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
                <TextType 
                  text={["TURN SKILLS INTO CAREER", "ARCHITECT THE FUTURE", "CODE YOUR DESTINY", "DECODE SUCCESS"]}
                  typingSpeed={80} textColors={[BRAND_COLOR, GOLD_CHAMPAGNE, "#F2F2F2"]} cursorCharacter="▋"
                />
              </h1>
            </div>
            <p className="font-tech text-lg text-zinc-400 font-light leading-relaxed max-w-md border-l border-gold-600/30 pl-6 italic">
              Master modern tech skills with <span style={{ color: BRAND_COLOR }}>Resultz Education</span>.
            </p>
          </motion.div>

          {/* Menu Grid */}
          <div className="mt-4 grid grid-cols-2 gap-px bg-zinc-800/20 p-px">
            {faceList.map((f, i) => (
              <button key={f.key} onMouseEnter={() => setActive(i)} onClick={() => goto(`courses`)}
                className={`group relative overflow-hidden p-6 text-left transition-all duration-500 bg-[#080808] ${active === i ? "z-10" : "opacity-60"}`}>
                <div className="absolute bottom-0 left-0 h-[2px] transition-all duration-500" style={{ backgroundColor: active === i ? BRAND_COLOR : "transparent", width: active === i ? "100%" : "0%" }} />
                <div className="font-tech text-[10px] tracking-[0.3em] uppercase mb-2 text-zinc-600">SECTOR 0{i + 1}</div>
                <div className={`font-tech text-sm md:text-base tracking-wide transition-colors ${active === i ? "text-white" : "text-zinc-400"}`}>{f.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: 3D Scene - MOVED FURTHER UP */}
        <div className="order-1 md:order-2 h-[500px] md:h-[800px] w-full flex items-center justify-center relative -translate-y-16 md:-translate-y-40">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-[85%] h-[85%] border border-gold-500/5 rounded-full animate-[spin_60s_linear_infinite]" />
             <div className="absolute w-[65%] h-[65%] border border-gold-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </div>
          <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
            <Scene activeIndex={active} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}