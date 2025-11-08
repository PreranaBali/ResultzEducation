// Holographic Cube Hero – single-file React component (Updated: larger cube + repositioned note)
// Packages to install:
//   npm i three @react-three/fiber @react-three/drei framer-motion

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const faceList = [
  { key: "code", label: "Coding", text: "</>", slug: "coding", target: [0, 0, 0] },
  { key: "ml", label: "Machine Learning", text: "ML", slug: "machine-learning", target: [0, -Math.PI / 2, 0] },
  { key: "cloud", label: "Cloud", text: "☁", slug: "cloud", target: [0, Math.PI / 2, 0] },
  { key: "blockchain", label: "Blockchain", text: "₿", slug: "blockchain", target: [0, Math.PI, 0] },
  { key: "data", label: "Data", text: "DB", slug: "data", target: [-Math.PI / 2, 0, 0] },
  { key: "ai", label: "AI", text: "AI", slug: "ai", target: [Math.PI / 2, 0, 0] },
];

function goto(path) {
  if (path.startsWith("http")) window.location.href = path; else window.location.href = `/${path}`;
}

function neonFaceTexture(text) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");

  const g = ctx.createRadialGradient(size/2, size/2, 40, size/2, size/2, size/2);
  g.addColorStop(0, "rgba(0,255,255,0.08)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0,0,size,size);

  ctx.shadowColor = "#5ef2ff";
  ctx.shadowBlur = 40;
  ctx.lineJoin = "round";

  ctx.font = "bold 200px ui-sans-serif, system-ui, -apple-system, Segoe UI";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeStyle = "rgba(94,242,255,0.9)";
  ctx.lineWidth = 10;
  ctx.strokeText(text, size/2, size/2);
  ctx.shadowBlur = 10;
  ctx.fillStyle = "rgba(94,242,255,0.6)";
  ctx.fillText(text, size/2, size/2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function GalaxyBackground() {
  const points = useMemo(() => {
    const p = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      const r = 40 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, []);
  const geom = useMemo(() => new THREE.BufferGeometry(), []);
  geom.setAttribute("position", new THREE.BufferAttribute(points, 3));
  const mat = useMemo(() => new THREE.PointsMaterial({ size: 0.15, transparent: true, opacity: 0.8 }), []);
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.005;
  });
  return <points ref={ref} geometry={geom} material={mat} />;
}

function HoloCube({ activeIndex, onFaceClick }) {
  const group = useRef();
  const [textures] = useState(() => faceList.map(f => neonFaceTexture(f.text)));
  const materials = useMemo(() => textures.map(tex => new THREE.MeshStandardMaterial({
    map: tex,
    transparent: true,
    color: new THREE.Color(0x66ffff),
    emissive: new THREE.Color(0x0a1a1f),
    emissiveIntensity: 0.8,
    metalness: 0.6,
    roughness: 0.2,
    opacity: 0.9,
  })), [textures]);

  const boxRef = useRef();
  const targetEuler = useRef(new THREE.Euler(...faceList[0].target));
  useEffect(() => {
    targetEuler.current.set(...faceList[activeIndex].target);
  }, [activeIndex]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetEuler.current.x, 4, delta);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetEuler.current.y, 4, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, targetEuler.current.z, 4, delta);
  });

  const handleClick = (e) => {
    e.stopPropagation();
    const face = Math.floor(e.faceIndex / 2);
    onFaceClick(face);
  };

  return (
    <group ref={group}>
      <group position={[0, 0.3, 0]}>
        <mesh ref={boxRef} onClick={handleClick} castShadow>
          {/* Increased cube size */}
          <boxGeometry args={[4.5, 4.5, 4.5]} />
          {materials.map((m, i) => (
            <meshStandardMaterial key={i} attach={`material-${i}`} {...m} />
          ))}
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(4.55, 4.55, 4.55)]} />
          <lineBasicMaterial linewidth={2} color={"#53e5ff"} transparent opacity={0.8} />
        </lineSegments>
      </group>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} castShadow />
      <pointLight position={[-6, -4, -6]} intensity={0.6} />
      <Environment preset="night" />
    </>
  );
}

function useResizeCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
  }, [size, camera]);
}

export default function HolographicCubeHero() {
  const [active, setActive] = useState(0);

  const handleFaceClick = (faceIndex) => {
    const item = faceList[faceIndex];
    goto(`courses/${item.slug}`);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-70" style={{
          background: "radial-gradient(1200px 600px at 20% 30%, rgba(33,78,99,0.45), transparent), radial-gradient(900px 600px at 80% 60%, rgba(79,17,116,0.35), transparent), #05070c"
        }} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="text-lg font-semibold tracking-wide">NebulaLearn</div>
        <div className="hidden gap-8 md:flex text-sm text-gray-300">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Courses</a>
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
        <a href="#" className="rounded-full border border-white/20 px-4 py-2 text-sm hover:bg-white/10">Sign In</a>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-6 md:grid-cols-2 md:pt-10">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold leading-tight md:text-6xl"
          >
            Learning That <br /> Expands Your <br /> Universe
          </motion.h1>

          <div className="mt-8 flex items-center gap-4">
            <a href="#courses" className="rounded-2xl bg-white/10 px-6 py-3 font-medium backdrop-blur hover:bg-white/20">Get Started</a>
            <div className="text-sm text-gray-300">400+ courses • Expert instructors • Lifetime access</div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {faceList.map((f, i) => (
              <button
                key={f.key}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => goto(`courses/${f.slug}`)}
                className={`rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-gray-200 hover:bg-white/10 ${active===i?"ring-1 ring-cyan-400/60":""}`}
              >
                <div className="text-base">{f.text} <span className="ml-1 font-semibold">{f.label}</span></div>
                <div className="text-xs text-gray-400">Explore</div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-[580px] w-full">
          <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
            <Scene activeIndex={active} onFaceClick={handleFaceClick} />
          </Canvas>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6))]" />
    </div>
  );
}

function Scene({ activeIndex, onFaceClick }) {
  useResizeCamera();
  return (
    <>
      <GalaxyBackground />
      <Lights />
      <HoloCube activeIndex={activeIndex} onFaceClick={onFaceClick} />
      <OrbitControls enableZoom={false} enablePan={false} />
      {/* Repositioned note to bottom-right corner */}
      <Html position={[4.5, -3.5, 0]} style={{ pointerEvents: "none" }}>
        <div className="text-right text-xs text-cyan-200/80">Hover a course to rotate • Click the cube to open</div>
      </Html>
    </>
  );
}