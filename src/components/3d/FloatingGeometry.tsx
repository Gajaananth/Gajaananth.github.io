import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
interface FloatingGeometryProps {
  count?: number;
  radius?: number;
  colorA?: string;
  colorB?: string;
  speed?: number;
}
export default function FloatingGeometry({
  count = 14,
  radius = 8,
  colorA = "#5fd4ff",
  colorB = "#8b7bff",
  speed = 1,
}: FloatingGeometryProps) {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => {
    const shapes: { position: [number, number, number]; scale: number; kind: number; speed: number; color: string }[] = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.4 + Math.random() * 0.6);
      shapes.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.6,
          r * Math.cos(phi) - radius * 0.3,
        ],
        scale: 0.18 + Math.random() * 0.4,
        kind: Math.floor(Math.random() * 3),
        speed: 0.2 + Math.random() * 0.6,
        color: Math.random() > 0.5 ? colorA : colorB,
      });
    }
    return shapes;
  }, [count, radius, colorA, colorB]);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime() * speed;
    group.current.rotation.y = t * 0.02;
    group.current.children.forEach((child, i) => {
      const it = items[i];
      if (!it) return;
      child.rotation.x = t * 0.15 * it.speed;
      child.rotation.y = t * 0.2 * it.speed;
      child.position.y = it.position[1] + Math.sin(t * it.speed + i) * 0.25;
    });
  });
  return (
    <group ref={group}>
      {items.map((it, i) => (
        <mesh key={i} position={it.position} scale={it.scale}>
          {it.kind === 0 && <boxGeometry args={[1, 1, 1]} />}
          {it.kind === 1 && <octahedronGeometry args={[0.8, 0]} />}
          {it.kind === 2 && <icosahedronGeometry args={[0.8, 0]} />}
          <meshBasicMaterial color={it.color} wireframe transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}
