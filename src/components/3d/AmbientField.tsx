import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AmbientFieldProps {
  count?: number;
  spread?: number;
  colorA?: string;
  colorB?: string;
  speed?: number;
}

/**
 * A lightweight scatter of drifting wireframe shapes used to fill empty
 * corners of sections with subtle motion. Each shape gets its own random
 * position, rotation speed and drift path so the field never looks static
 * or repetitive.
 */
export default function AmbientField({
  count = 6,
  spread = 3.2,
  colorA = "#5fd4ff",
  colorB = "#d66bff",
  speed = 1,
}: AmbientFieldProps) {
  const group = useRef<THREE.Group>(null);

  const items = useMemo(() => {
    const shapes: {
      position: [number, number, number];
      scale: number;
      kind: number;
      speed: number;
      color: string;
      driftX: number;
      driftY: number;
      phase: number;
    }[] = [];
    for (let i = 0; i < count; i++) {
      shapes.push({
        position: [
          (Math.random() - 0.5) * spread * 2.2,
          (Math.random() - 0.5) * spread * 1.6,
          (Math.random() - 0.5) * 2.4,
        ],
        scale: 0.16 + Math.random() * 0.32,
        kind: Math.floor(Math.random() * 4),
        speed: 0.3 + Math.random() * 0.8,
        color: Math.random() > 0.5 ? colorA : colorB,
        driftX: (Math.random() - 0.5) * 1.6,
        driftY: (Math.random() - 0.5) * 1.6,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return shapes;
  }, [count, spread, colorA, colorB]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime() * speed;
    group.current.children.forEach((child, i) => {
      const it = items[i];
      if (!it) return;
      child.rotation.x = t * 0.22 * it.speed;
      child.rotation.y = t * 0.28 * it.speed;
      child.position.x = it.position[0] + Math.sin(t * it.speed + it.phase) * it.driftX;
      child.position.y = it.position[1] + Math.cos(t * it.speed * 0.8 + it.phase) * it.driftY;
    });
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.position} scale={it.scale}>
          {it.kind === 0 && <boxGeometry args={[1, 1, 1]} />}
          {it.kind === 1 && <octahedronGeometry args={[0.8, 0]} />}
          {it.kind === 2 && <torusGeometry args={[0.6, 0.2, 8, 16]} />}
          {it.kind === 3 && <tetrahedronGeometry args={[0.9, 0]} />}
          <meshBasicMaterial color={it.color} wireframe transparent opacity={0.32} />
        </mesh>
      ))}
    </group>
  );
}
