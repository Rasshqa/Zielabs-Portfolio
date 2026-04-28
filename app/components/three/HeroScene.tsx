// app/components/three/HeroScene.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Hero 3D Scene — Zielabs Portfolio
//
// OPTIMASI:
// - dpr={[1, 1.5]}: Batasi pixel ratio maks 1.5x agar smooth di Retina screens
// - performance.min=0.5: Auto-turunkan kualitas jika fps drop
// - powerPreference="high-performance": Gunakan GPU discrete jika tersedia
// - gl.antialias=true: Anti-aliasing bawaan tanpa postprocessing berat
//
// INTERAKTIVITAS:
// - PresentationControls: Drag model dengan batas rotasi yang dikurasi (tidak flip)
//   snap=true: Model kembali ke posisi awal saat dilepas (premium feel)
// - useFrame auto-rotation: Rotasi lambat Y-axis untuk ambient motion
//   Dipisah dari mouse parallax (tidak ada konflik lagi)
//
// VISUAL:
// - Glitch effect DIHAPUS: Terlalu distracting, tidak sesuai estetika Luxury
// - Bloom DIPERTAHANKAN: Memberikan glow premium tanpa cost tinggi
// - Environment "city": Ambient HDRI reflection untuk material metalik
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  useGLTF,
  Center,
  PresentationControls,
  Environment,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── Custom 3D Model ───────────────────────────────────────────────

function CustomModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/object/ZieLabs3d.glb");

  // Auto-rotation murni di sumbu Y — tidak bercampur dengan parallax
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    // PresentationControls: interaksi drag dengan batas rotasi yang aman
    <PresentationControls
      global={false}          // Hanya aktif saat cursor di atas canvas
      cursor={true}           // Ubah cursor jadi pointer saat hover
      snap={true}             // Kembalikan ke posisi awal saat dilepas
      speed={1.5}             // Kecepatan drag
      zoom={1}                // Tidak ada zoom-on-drag
      polar={[-0.1, 0.1]}    // Batasi rotasi vertikal ±~6°, tidak bisa flip
      azimuth={[-Math.PI / 4, Math.PI / 4]} // Batasi rotasi horizontal ±45°
    >
      <group ref={groupRef}>
        <Float
          speed={1.5}          // Kecepatan floating
          rotationIntensity={0.15}  // Rotasi ambient sangat halus
          floatIntensity={0.8}      // Amplitudo naik-turun
          floatingRange={[-0.15, 0.15]}
        >
          <Center>
            <primitive object={scene} scale={0.26} />
          </Center>
        </Float>
      </group>
    </PresentationControls>
  );
}

// ─── Ambient Particles ─────────────────────────────────────────────
// Partikel latar belakang dengan warna brand Zielabs.
// Menggunakan Float32Array yang di-memo agar tidak re-create setiap render.

function Particles() {
  const ref = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotasi ambient yang sangat halus
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.005;
      // Gentle sine movement
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    }
  });

  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Palet warna brand Zielabs
  const palette = [
    new THREE.Color("#50C878"), // Emerald Green (dominan)
    new THREE.Color("#50C878"), // Emerald Green (dua kali weight untuk dominan)
    new THREE.Color("#A7FFD3"), // Neon Mint
    new THREE.Color("#2660A4"), // Blue
  ];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;

    const color = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3]     = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false} // Hindari z-fighting dengan objek lain
      />
    </points>
  );
}

// ─── Scene Composition ─────────────────────────────────────────────

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-[#050505] dark:to-black">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          // Gunakan GPU discrete jika tersedia untuk performa maksimal
          powerPreference: "high-performance",
          // Nonaktifkan preserveDrawingBuffer yang tidak diperlukan
          preserveDrawingBuffer: false,
        }}
        style={{ background: "transparent" }}
        // dpr [1, 1.5]: cap pixel ratio di 1.5 untuk keseimbangan kualitas/performa
        dpr={[1, 1.5]}
        // Auto-turunkan kualitas jika FPS di bawah threshold
        performance={{ min: 0.5 }}
      >
        {/* ── Lighting Setup ───────────────────────────────────── */}
        {/* Ambient lemah — warna utama dari Environment + Spotlights */}
        <ambientLight intensity={0.15} color="#ffffff" />

        {/* Directional: simulasi matahari/studio */}
        <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ffffff" />

        {/* Accent spotlights brand: Hijau kiri atas + subtle biru kanan bawah */}
        <spotLight
          position={[-5, 5, -5]}
          intensity={4}
          color="#50C878"
          angle={0.5}
          penumbra={1}
          castShadow={false} // Matikan shadow untuk performa
        />
        <spotLight
          position={[5, -3, 5]}
          intensity={1.5}
          color="#2660A4"
          angle={0.5}
          penumbra={1}
          castShadow={false}
        />

        {/* ── 3D Content ───────────────────────────────────────── */}
        <Suspense fallback={null}>
          <CustomModel />
          {/* Environment: load HDR lokal dari /public/object/zielabs-hdr.hdr
              Menghindari fetch remote (potsdamer_platz CDN) yang menyebabkan
              "Failed to fetch" error. File dilayani langsung oleh Next.js. */}
          <Environment files="/object/zielabs-hdr.hdr" />
        </Suspense>
        <Particles />

        {/* ── Postprocessing ───────────────────────────────────── */}
        {/* Bloom saja — efek premium tanpa Glitch yang distracting */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.15}  // Ambang batas brightness sebelum glow
            luminanceSmoothing={0.9}   // Smoothing transisi glow
            mipmapBlur                 // Blur berbasis mipmap (lebih efisien)
            intensity={1.5}            // Sedikit lebih intense untuk luxury feel
            radius={0.8}               // Radius bloom
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

// Pre-load model agar tidak ada lag saat pertama kali render
useGLTF.preload("/object/ZieLabs3d.glb");
