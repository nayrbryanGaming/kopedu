"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

/* A single cooperative "coin" disc */
function Coin({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const ref = React.useRef<THREE.Mesh>(null);
  const speed = React.useMemo(() => 0.3 + Math.random() * 0.5, []);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.x += delta * speed * 0.3;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.9}>
      <mesh ref={ref} position={position} scale={scale} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 48]} />
        <meshStandardMaterial
          color={color}
          metalness={0.35}
          roughness={0.3}
        />
      </mesh>
    </Float>
  );
}

/* Rotating ring that holds the coins together */
function Cluster() {
  const group = React.useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });

  const coins = React.useMemo(() => {
    const greens = ["#2D6A4F", "#40916C", "#B7E4C7", "#52B788"];
    const out: {
      position: [number, number, number];
      color: string;
      scale: number;
    }[] = [];
    const count = 11;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 2.1;
      out.push({
        position: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi) * 0.7,
          r * Math.cos(phi),
        ],
        color: greens[i % greens.length],
        scale: 0.7 + Math.random() * 0.7,
      });
    }
    return out;
  }, []);

  return (
    <group ref={group}>
      {coins.map((c, i) => (
        <Coin key={i} position={c.position} color={c.color} scale={c.scale} />
      ))}
      {/* central anchor */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.2}>
        <mesh castShadow>
          <torusGeometry args={[0.85, 0.13, 24, 80]} />
          <meshStandardMaterial color="#2D6A4F" metalness={0.5} roughness={0.25} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} castShadow />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#B7E4C7" />
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#52B788" />
      <Cluster />
      <Sparkles
        count={60}
        scale={8}
        size={2}
        speed={0.3}
        opacity={0.5}
        color="#2D6A4F"
      />
      <AdaptiveDpr pixelated />
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <React.Suspense fallback={null}>
        <Scene />
      </React.Suspense>
    </Canvas>
  );
}
