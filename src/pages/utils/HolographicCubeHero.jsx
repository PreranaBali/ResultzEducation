// Holographic Cube Hero — fixed with individual face planes
// Packages: three @react-three/fiber @react-three/drei framer-motion

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
/* -------------------- CONFIG -------------------- */
const CUBE_FACE_COLOR   = "#162033";
const LOGO_FILL_COLOR   = "rgba(255,255,255,0.95)";
const LOGO_STROKE_COLOR = "rgba(0,0,0,0.45)";
const LOGO_SIZE_PX      = 280;
/* ------------------------------------------------ */

const faceList = [
  { key: "blockchain", label: "Blockchain", text: "₿",text1: "₿",  slug: "blockchain",        target: [0, 0, 0],          position: [0, 0, 3.25] },          // front
  { key: "code",       label: "Coding",     text: "</>", text1: "</>", slug: "coding",            target: [0, -Math.PI/2, 0], position: [3.25, 0, 0] },          // right
  { key: "ai",         label: "AI",         text: "AI",text1: "AI",  slug: "ai",                target: [0, Math.PI, 0],    position: [0, 0, -3.25] },         // back
  { key: "ml",         label: "Machine Learning", text: "ML",text1: "ML", slug: "machine-learning", target: [0, Math.PI/2, 0], position: [-3.25, 0, 0] },     // left
  { key: "cloud",      label: "Cloud",      text: "DB",text1: "☁",  slug: "cloud",             target: [-Math.PI/2, 0, 0], position: [0, 3.25, 0] },          // top
  { key: "data",       label: "Data",       text: "☁",text1: "DB",   slug: "data",              target: [Math.PI/2, 0, 0],  position: [0, -3.25, 0] },         // bottom
];

function goto(path) {
  if (path.startsWith("http")) window.location.href = path;
  else window.location.href = `/${path}`;
}

function logoTexture(text) {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = CUBE_FACE_COLOR;
  ctx.fillRect(0, 0, size, size);
  
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${LOGO_SIZE_PX}px ui-sans-serif, system-ui, -apple-system, Segoe UI`;

  ctx.lineWidth = 22;
  ctx.strokeStyle = LOGO_STROKE_COLOR;
  ctx.strokeText(text, size / 2, size / 2);

  ctx.fillStyle = LOGO_FILL_COLOR;
  ctx.fillText(text, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function GalaxyBackground() {
  const points = useMemo(() => {
    const p = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const r = 40 + Math.random() * 120;
      const t = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      p[i * 3 + 0] = r * Math.sin(ph) * Math.cos(t);
      p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(t);
      p[i * 3 + 2] = r * Math.cos(ph);
    }
    return p;
  }, []);
  const geom = useMemo(() => new THREE.BufferGeometry(), []);
  geom.setAttribute("position", new THREE.BufferAttribute(points, 3));
  const mat = useMemo(() => new THREE.PointsMaterial({ size: 0.15, transparent: true, opacity: 0.8 }), []);
  const ref = useRef();
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.005; });
  return <points ref={ref} geometry={geom} material={mat} />;
}

function CubeFace({ faceData, faceIndex }) {
  const texture = useMemo(() => logoTexture(faceData.text), [faceData.text]);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ 
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  }), [texture]);
  
  // Calculate rotation based on position to face outward
  let rotation = [0, 0, 0];
  const offset = 0.02; // slight offset to sit on top of solid cube
  let adjustedPos = [...faceData.position];
  
  if (faceData.position[0] > 0) {
    rotation = [0, Math.PI / 2, 0];
    adjustedPos[0] += offset;
  } else if (faceData.position[0] < 0) {
    rotation = [0, -Math.PI / 2, 0];
    adjustedPos[0] -= offset;
  } else if (faceData.position[1] > 0) {
    rotation = [Math.PI / 2, 0, 0]; // top
    adjustedPos[1] += offset;
  } else if (faceData.position[1] < 0) {
    rotation = [-Math.PI / 2, 0, Math.PI]; // bottom - rotated 180° on z-axis
    adjustedPos[1] -= offset;
  } else if (faceData.position[2] < 0) {
    rotation = [0, Math.PI, 0];
    adjustedPos[2] -= offset;
  } else {
    adjustedPos[2] += offset;
  }
  
  return (
    <mesh
      position={adjustedPos}
      rotation={rotation}
      material={material}
    >
      <planeGeometry args={[6.5, 6.5]} />
    </mesh>
  );
}

function HoloCube({ activeIndex }) {
  const group = useRef();

  const targetEuler = useRef(new THREE.Euler(...faceList[0].target));
  useEffect(() => { 
    targetEuler.current.set(...faceList[activeIndex].target); 
  }, [activeIndex]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetEuler.current.x, 5, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetEuler.current.y, 5, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetEuler.current.z, 5, delta);
  });

  return (
    <group ref={group}>
      <group position={[0, 0.3, 0]}>
        {/* Solid cube base */}
        <mesh>
          <boxGeometry args={[6.5, 6.5, 6.5]} />
          <meshBasicMaterial color={CUBE_FACE_COLOR} />
        </mesh>

        {/* Individual face planes slightly offset to appear on top */}
        {faceList.map((face, idx) => (
          <CubeFace key={face.key} faceData={face} faceIndex={idx} />
        ))}

        {/* Borders */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(6.56, 6.56, 6.56)]} />
          <lineBasicMaterial color={"#53e5ff"} transparent opacity={0.95} />
        </lineSegments>

        <group scale={1.012}>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(6.56, 6.56, 6.56)]} />
            <lineBasicMaterial
              color={"#9ff9ff"}
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        </group>
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 7, 6]} intensity={1.2} />
      <Environment preset="night" />
    </>
  );
}

function useResizeCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 13.5);
    camera.lookAt(0, 0, 0);
  }, [size, camera]);
}

export default function HolographicCubeHero() {
  const [active, setActive] = useState(0); // start on blockchain (front)

  return (
    <div className="relative min-h-screen w-full overflow-hidden  text-white pt-15">
      

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-6 md:grid-cols-2 md:pt-10">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold leading-tight md:text-6xl"
          >
            Empower your <br /> Dreams with <br /><span className="text-amber-200">Results Education</span> 
          </motion.h1>

          <div className="mt-8 flex items-center gap-4">
            <a href="#courses" className="rounded-2xl w-[159px] bg-white/10 px-6 py-3 font-medium backdrop-blur hover:bg-white/20">Get Started</a>
            <div className="text-sm text-gray-300">Affordable, innovative, and revolutionary learning solutions that bring success within reach.</div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {faceList.map((f, i) => (
              <button
                key={f.key}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => goto(`courses/${f.slug}`)}
                className={`rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-gray-200 hover:bg-white/10 transition-all ${active===i?"ring-2 ring-cyan-400/80":""}`}
              >
                <div className="text-base">
                  {f.text1} <span className="ml-1 font-semibold">{f.label}</span>
                </div>
                <div className="text-xs text-gray-400">Explore</div>
              </button>
            ))}
          </div>
        </div>
        <div className="h-[640px] w-full">
          <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
            <Scene activeIndex={active} />
          </Canvas>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6))]" />
    </div>
  );
}

function Scene({ activeIndex }) {
  useResizeCamera();
  return (
    <>
      <GalaxyBackground />
      <Lights />
      <HoloCube activeIndex={activeIndex} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  );
}