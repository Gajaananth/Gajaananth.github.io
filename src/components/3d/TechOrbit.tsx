import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { techStack } from "../../data/skills";
interface NodeDef { label: string; radius: number; speed: number; offset: number; tilt: number; }
function useOrbitNodes(): NodeDef[] {
  return useMemo(
    () =>
      techStack.map((label, i) => ({
        label,
        radius: 2.6 + (i % 3) * 0.9,
        speed: 0.12 + (i % 4) * 0.05,
        offset: (i / techStack.length) * Math.PI * 2,
        tilt: ((i % 5) - 2) * 0.18,
      })),
    []
  );
}
function OrbitNode({ node }: { node: NodeDef }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * node.speed + node.offset;
    ref.current.position.set(
      Math.cos(t) * node.radius,
      Math.sin(t * 0.6) * node.radius * node.tilt,
      Math.sin(t) * node.radius
    );
  });
  return (
    <group ref={ref}>
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} scale={hovered ? 1.4 : 1}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#d66bff" : "#5fd4ff"} />
      </mesh>
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: hovered ? "#d66bff" : "rgba(238,243,255,0.75)", whiteSpace: "nowrap", textShadow: "0 0 12px rgba(0,0,0,0.8)", transition: "color 0.2s ease" }}>
          {node.label}
        </span>
      </Html>
    </group>
  );
}
export default function TechOrbit() {
  const coreRef = useRef<THREE.Mesh>(null);
  const nodes = useOrbitNodes();
  useFrame((state) => {
    if (!coreRef.current) return;
    const t = state.clock.getElapsedTime();
    coreRef.current.rotation.y = t * 0.15;
    coreRef.current.rotation.x = t * 0.08;
    const s = 1 + Math.sin(t * 1.2) * 0.05;
    coreRef.current.scale.setScalar(s);
  });
  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial color="#5fd4ff" emissive="#5fd4ff" emissiveIntensity={0.6} wireframe />
      </mesh>
      <pointLight color="#8b7bff" intensity={8} distance={8} />
      {nodes.map((n) => <OrbitNode key={n.label} node={n} />)}
    </group>
  );
}
