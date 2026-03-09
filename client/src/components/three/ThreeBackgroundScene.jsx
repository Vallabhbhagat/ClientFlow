import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function Shapes() {
  const group = useRef();
  const items = useMemo(() => {
    const colors = ["#7C5CFF", "#22D3EE", "#22C55E", "#F59E0B"];
    return Array.from({ length: 10 }).map((_, i) => ({
      key: i,
      color: colors[i % colors.length],
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
      ],
      scale: 0.35 + Math.random() * 0.55,
      speed: 0.6 + Math.random() * 1.2,
      rot: [Math.random(), Math.random(), Math.random()],
    }));
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.05;
    group.current.rotation.x += delta * 0.02;
  });

  return (
    <group ref={group}>
      {items.map((it) => (
        <Float
          key={it.key}
          speed={it.speed}
          rotationIntensity={0.6}
          floatIntensity={0.6}
        >
          <mesh position={it.position} rotation={it.rot} scale={it.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={it.color}
              roughness={0.35}
              metalness={0.5}
              emissive={it.color}
              emissiveIntensity={0.12}
              transparent
              opacity={0.55}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function ThreeBackgroundScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 8], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 5, 5]} intensity={0.75} />
      <Shapes />
    </Canvas>
  );
}

