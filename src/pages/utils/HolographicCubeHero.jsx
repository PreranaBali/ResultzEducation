// Futuristic Holographic Hero
// Packages: three @react-three/fiber @react-three/drei @react-three/postprocessing framer-motion gsap

import React, { useMemo, useRef, useState, useEffect, createElement, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Sparkles, 
  PerspectiveCamera,
  ContactShadows,
  Grid
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion } from "framer-motion";
import { gsap } from "gsap";

/* -------------------- CONFIG -------------------- */
const NEON_CYAN = "#00f3ff";
const NEON_PURPLE = "#bd00ff";
const GLASS_COLOR = "#101826";
/* ------------------------------------------------ */

// TextType Component
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

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return;
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    let timeout;

    const currentText = textArray[currentTextIndex];

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < currentText.length) {
          timeout = setTimeout(() => {
            setDisplayedText(prev => prev + currentText[currentCharIndex]);
            setCurrentCharIndex(prev => prev + 1);
          }, typingSpeed);
        } else if (textArray.length > 1) {
          if (!loop && currentTextIndex === textArray.length - 1) return;
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [currentCharIndex, displayedText, isDeleting, typingSpeed, deletingSpeed, pauseDuration, textArray, currentTextIndex, loop, initialDelay]);

  return createElement(
    Component,
    {
      className: `inline-block ${className}`,
      ...props
    },
    <>
      <span style={{ color: getCurrentTextColor() || 'inherit' }}>
        {displayedText}
      </span>
      {showCursor && (
        <span ref={cursorRef} className={`ml-1 inline-block opacity-100 ${cursorClassName}`}>
          {cursorCharacter}
        </span>
      )}
    </>
  );
};

// YOUR ORIGINAL FACE LIST
const faceList = [
  { key: "blockchain", label: "Blockchain", text: "₿",    slug: "blockchain",       target: [0, 0, 0],          position: [0, 0, 3.26] },
  { key: "code",       label: "Coding",     text: "</>",  slug: "coding",           target: [0, -Math.PI/2, 0], position: [3.26, 0, 0] },
  { key: "ai",         label: "AI",         text: "AI",   slug: "ai",               target: [0, Math.PI, 0],    position: [0, 0, -3.26] },
  { key: "ml",         label: "Machine Learning", text: "ML", slug: "machine-learning", target: [0, Math.PI/2, 0],  position: [-3.26, 0, 0] },
  { key: "cloud",      label: "Data",      text: "DB",  slug: "cloud",            target: [Math.PI/2, 0, 0], position: [0, 3.26, 0] },
  { key: "data",       label: "Cloud",       text: "☁︎",   slug: "data",             target: [-Math.PI/2, 0, 0],  position: [0, -3.26, 0] },
];

function goto(path) {
  if (path.startsWith("http")) window.location.href = path;
  else window.location.href = `/${path}`;
}

// YOUR ORIGINAL TEXTURE GENERATOR
function logoTexture(text, color) {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, size, size);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  ctx.shadowColor = color;
  ctx.shadowBlur = 40;
  
  ctx.font = `800 ${300}px "Courier New", monospace`; 
  ctx.fillStyle = "white";
  ctx.fillText(text, size / 2, size / 2);

  ctx.beginPath();
  ctx.lineWidth = 15;
  ctx.strokeStyle = color;
  ctx.arc(size/2, size/2, 400, 0, 2 * Math.PI);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}

// YOUR ORIGINAL CUBE FACE
function CubeFace({ faceData, active }) {
  const texture = useMemo(() => logoTexture(faceData.text, active ? NEON_CYAN : "#555"), [faceData.text, active]);
  
  let rotation = [0, 0, 0];
  if (faceData.position[0] > 0) rotation = [0, Math.PI / 2, 0];
  else if (faceData.position[0] < 0) rotation = [0, -Math.PI / 2, 0];
  else if (faceData.position[1] > 0) rotation = [Math.PI / 2, 0, 0];
  else if (faceData.position[1] < 0) rotation = [-Math.PI / 2, 0, Math.PI];
  else if (faceData.position[2] < 0) rotation = [0, Math.PI, 0];

  return (
    <mesh position={faceData.position} rotation={rotation}>
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        opacity={active ? 1 : 0.3} 
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

// YOUR ORIGINAL HOLOCUBE LOGIC
function HoloCube({ activeIndex }) {
  const group = useRef();
  const targetEuler = useRef(new THREE.Euler(...faceList[0].target));

  useEffect(() => { 
    targetEuler.current.set(...faceList[activeIndex].target); 
  }, [activeIndex]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const dampSpeed = 4;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetEuler.current.x, dampSpeed, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetEuler.current.y, dampSpeed, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetEuler.current.z, dampSpeed, delta);
  });

  return (
    <Float floatIntensity={2} rotationIntensity={0.5} speed={2}>
      <group ref={group}>
        
        {/* Glass Core */}
        <mesh>
          <boxGeometry args={[6.4, 6.4, 6.4]} />
          <meshPhysicalMaterial 
            color={GLASS_COLOR}
            roughness={0.1}
            metalness={0.9}
            transmission={0.6}
            thickness={2}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Wireframe Edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(6.5, 6.5, 6.5)]} />
          <lineBasicMaterial color={NEON_CYAN} toneMapped={false} linewidth={2} transparent opacity={0.6} />
        </lineSegments>

        {/* Inner Core */}
        <mesh>
           <octahedronGeometry args={[2, 0]} />
           <meshBasicMaterial color={NEON_PURPLE} wireframe transparent opacity={0.5} />
        </mesh>

        {/* Faces */}
        {faceList.map((face, idx) => (
          <CubeFace key={face.key} faceData={face} active={activeIndex === idx} />
        ))}
        
      </group>
    </Float>
  );
}

// SCENE - Updated with Bloom and better camera position
function Scene({ activeIndex }) {
  return (
    <>
      {/* Moved Camera back to Z:18 to prevent cutting */}
      <PerspectiveCamera makeDefault position={[0, 0, 18]} fov={45} />
      
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
      <pointLight position={[-10, -10, -10]} intensity={1} color={NEON_CYAN} />

      <Sparkles count={200} scale={20} size={3} speed={0.4} opacity={0.5} color={NEON_CYAN} />
      <Sparkles count={100} scale={25} size={5} speed={0.2} opacity={0.3} color={NEON_PURPLE} />

      <HoloCube activeIndex={activeIndex} />
      
      {/* Bloom makes your cube glow without changing its logic */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.6} />
      </EffectComposer>

      <ContactShadows opacity={0.4} scale={30} blur={2.5} far={20} color="#000000" />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}

export default function FuturisticHero() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative min-h-screen w-full bg-[#030712] overflow-hidden text-white selection:bg-cyan-500/30">
      
      {/* Tech Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
        .font-tech { font-family: 'Rajdhani', sans-serif; }
        .font-brand { font-family: 'Orbitron', sans-serif; }
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes glow {
          0%, 100% { 
            text-shadow: 0 0 20px rgba(6,182,212,0.5), 0 0 40px rgba(6,182,212,0.3), 0 0 60px rgba(189,0,255,0.2);
            filter: brightness(1);
          }
          50% { 
            text-shadow: 0 0 30px rgba(6,182,212,0.8), 0 0 60px rgba(6,182,212,0.5), 0 0 90px rgba(189,0,255,0.4);
            filter: brightness(1.2);
          }
        }
      `}</style>

      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#030712] to-[#030712]" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#030712] to-transparent z-10" />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite'
      }} />
      
      {/* Floating Brand Watermark */}
      <motion.div 
        className="absolute top-8 right-8 opacity-10 pointer-events-none hidden lg:block"
        animate={{ 
          y: [0, -15, 0],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <div className="font-brand text-[10rem] font-black text-cyan-400 tracking-wider" style={{ 
          writingMode: 'vertical-rl',
          textShadow: '0 0 50px rgba(6,182,212,0.3)'
        }}>
          RESULTZ
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-20 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pt-24 md:grid-cols-2 lg:items-center min-h-screen">
        
        {/* LEFT: Text & UI */}
        <div className="order-2 md:order-1 flex flex-col gap-8 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Simple Brand Badge */}
            <div className="mb-8 inline-flex">
              <div className="relative group">
                {/* Glow background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded opacity-30 blur-lg group-hover:opacity-50 transition duration-1000 animate-pulse"></div>
                
                {/* Main badge */}
                <div className="relative group">
  {/* Subtle outer glow behind the container - reduced intensity */}
  <div className="absolute -inset-0.5 bg-cyan-500/20 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
  
  {/* Main Container */}
  <div className="relative px-6 py-3 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex items-center gap-4">
    
    {/* Animated Dot */}
    <div className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
    </div>

    {/* Brand Text */}
    <div className="font-brand text-lg md:text-xl font-bold tracking-[0.15em] uppercase select-none">
      <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">resultz</span>
      <span className="text-slate-300 font-medium">Education</span>
      <span className="text-cyan-500/60">.com</span>
    </div>
    
  </div>
</div>
              </div>
            </div>
            <div className="min-h-[200px]">
            <h1 className="font-tech text-6xl font-bold leading-none tracking-tight md:text-8xl mb-6">
              <TextType 
                text={[
                  "ARCHITECT THE FUTURE",
                  "CODE YOUR DESTINY",
                  "MASTER THE METAVERSE",
                  "INNOVATE BEYOND LIMITS",
                  "ENGINEER TOMORROW",
                  "DECODE SUCCESS",
                  "BUILD DIGITAL EMPIRES"
                ]}
                typingSpeed={100}
                deletingSpeed={60}
                pauseDuration={2000}
                loop={true}
                textColors={[NEON_CYAN, NEON_PURPLE, NEON_CYAN, NEON_PURPLE, NEON_CYAN, NEON_PURPLE, NEON_CYAN]}
                cursorCharacter="|"
                cursorClassName="text-cyan-400"
                className="block"
              />
            </h1>
            </div>
            <p className="font-tech text-xl text-slate-400 leading-relaxed max-w-lg">
              Initialize your learning sequence. Master Blockchain, AI, and Cloud architecture with our holographic modules.
            </p>
          </motion.div>

          {/* Interactive Menu Grid */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {faceList.map((f, i) => (
              <button
                key={f.key}
                onMouseEnter={() => setActive(i)}
                onClick={() => goto(`courses/${f.slug}`)}
                className={`group relative overflow-hidden border p-3 text-left transition-all duration-300
                  ${active === i 
                    ? "border-cyan-500 bg-cyan-950/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                    : "border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800"
                  }`}
              >
                 {/* Decorative Corner Lines */}
                  <div className={`absolute top-0 right-0 w-2 h-[2px] transition-colors ${active===i?"bg-cyan-500":"bg-gray-700"}`} />
                  <div className={`absolute top-0 right-0 w-[2px] h-2 transition-colors ${active===i?"bg-cyan-500":"bg-gray-700"}`} />
                  <div className={`absolute bottom-0 left-0 w-2 h-[2px] transition-colors ${active===i?"bg-cyan-500":"bg-gray-700"}`} />
                  <div className={`absolute bottom-0 left-0 w-[2px] h-2 transition-colors ${active===i?"bg-cyan-500":"bg-gray-700"}`} />

                <div className="relative z-10">
                  <div className={`font-tech text-xs font-bold uppercase tracking-wider ${active === i ? "text-cyan-400" : "text-slate-500"}`}>
                    0{i + 1} //
                  </div>
                  <div className="font-tech mt-1 text-lg font-bold text-slate-200 group-hover:text-white uppercase">
                    {f.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: 3D Scene */}
        <div className="order-1 md:order-2 h-[500px] md:h-[700px] w-full flex items-center justify-center relative">
          <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
            <Scene activeIndex={active} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}