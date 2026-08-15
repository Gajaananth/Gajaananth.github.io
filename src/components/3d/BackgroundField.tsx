import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BackgroundFieldProps {
  count?: number;
  reducedMotion?: boolean;
  isMobile?: boolean;
}

interface ParticleData {
  color: string;
  scale: number;
  phase: number;
  driftX: number;
  driftY: number;
  driftZ: number;
  speed: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  spinX: number;
  spinY: number;
  spinZ: number;
}

export default function BackgroundField({
  count = 120,
  reducedMotion = false,
  isMobile = false,
}: BackgroundFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());

  const particles = useMemo<ParticleData[]>(() => {
    const palette = ["#5fd4ff", "#8b7bff", "#d66bff", "#c5d7ff"];
    return Array.from({ length: count }, () => ({
      color: palette[Math.floor(Math.random() * palette.length)],
      scale: 0.05 + Math.random() * 0.18,
      phase: Math.random() * Math.PI * 2,
      driftX: 0.25 + Math.random() * 0.75,
      driftY: 0.25 + Math.random() * 0.8,
      driftZ: 0.25 + Math.random() * 0.9,
      speed: 0.28 + Math.random() * 0.9,
      baseX: (Math.random() - 0.5) * 18,
      baseY: (Math.random() - 0.5) * 12,
      baseZ: (Math.random() - 0.5) * 10,
      spinX: 0.08 + Math.random() * 0.28,
      spinY: 0.12 + Math.random() * 0.32,
      spinZ: 0.1 + Math.random() * 0.25,
    }));
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    const color = new THREE.Color();
    particles.forEach((particle, index) => {
      color.set(particle.color);
      meshRef.current!.setColorAt(index, color);
    });
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [particles]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const pointerX = isMobile ? 0 : state.pointer.x * 0.8;
    const pointerY = isMobile ? 0 : state.pointer.y * 0.7;

    particles.forEach((particle, index) => {
      const x =
        particle.baseX +
        Math.sin(time * particle.speed + particle.phase) * particle.driftX +
        pointerX * (1.2 + particle.baseZ * 0.1);
      const y =
        particle.baseY +
        Math.cos(time * (particle.speed * 1.2) + particle.phase) * particle.driftY +
        pointerY * (1.1 + particle.baseZ * 0.12);
      const z =
        particle.baseZ +
        Math.sin(time * 0.7 + particle.phase) * particle.driftZ +
        (reducedMotion ? 0 : Math.cos(time * particle.speed * 0.8 + particle.phase) * 0.6);

      dummy.current.position.set(x, y, z);
      dummy.current.rotation.set(
        time * particle.spinX + particle.phase,
        time * particle.spinY + particle.phase,
        time * particle.spinZ + particle.phase,
      );
      dummy.current.scale.setScalar(
        reducedMotion ? particle.scale * 0.8 : particle.scale * (0.9 + Math.sin(time * 2 + particle.phase) * 0.25),
      );
      dummy.current.updateMatrix();
      meshRef.current!.setMatrixAt(index, dummy.current.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particles.length]}>
      <icosahedronGeometry args={[0.28, 1]} />
      <meshBasicMaterial transparent opacity={0.7} vertexColors toneMapped={false} />
    </instancedMesh>
  );
}
