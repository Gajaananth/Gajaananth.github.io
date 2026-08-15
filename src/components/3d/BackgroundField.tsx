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

function FieldCluster({
  geometry,
  count,
  reducedMotion,
  isMobile,
  wireframe,
}: {
  geometry: THREE.BufferGeometry;
  count: number;
  reducedMotion: boolean;
  isMobile: boolean;
  wireframe: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D());
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const particles = useMemo<ParticleData[]>(() => {
    const aspect = typeof window !== "undefined" ? window.innerWidth / Math.max(window.innerHeight, 1) : 1.6;
    const cameraZ = 16;
    const fov = 50;
    const heightAtZ = 2 * Math.tan((fov * Math.PI) / 360) * cameraZ;
    const widthAtZ = heightAtZ * aspect;
    const spreadX = widthAtZ * 0.9 * 0.5;
    const spreadY = heightAtZ * 0.9 * 0.5;
    const palette = ["#5fd4ff", "#8b7bff", "#d66bff", "#c5d7ff"];

    return Array.from({ length: count }, () => ({
      color: palette[Math.floor(Math.random() * palette.length)],
      scale: 0.45 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      driftX: 0.7 + Math.random() * 1.5,
      driftY: 0.8 + Math.random() * 1.8,
      driftZ: 0.7 + Math.random() * 1.8,
      speed: 0.05 + Math.random() * 0.18,
      baseX: (Math.random() - 0.5) * spreadX * 2,
      baseY: (Math.random() - 0.5) * spreadY * 2,
      baseZ: (Math.random() - 0.5) * 8,
      spinX: 0.04 + Math.random() * 0.11,
      spinY: 0.05 + Math.random() * 0.13,
      spinZ: 0.035 + Math.random() * 0.115,
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
    if (!meshRef.current || document.visibilityState === "hidden") return;

    const time = state.clock.getElapsedTime();
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Smooth lerp toward target pointer values with slower response
    if (!isMobile) {
      pointerRef.current.targetX = state.pointer.x * 0.9;
      pointerRef.current.targetY = state.pointer.y * 0.8;
      pointerRef.current.x = lerp(pointerRef.current.x, pointerRef.current.targetX, 0.08);
      pointerRef.current.y = lerp(pointerRef.current.y, pointerRef.current.targetY, 0.08);
    } else {
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
    }

    particles.forEach((particle, index) => {
      const x =
        particle.baseX +
        Math.sin(time * particle.speed + particle.phase) * particle.driftX +
        pointerRef.current.x * 0.6;
      const y =
        particle.baseY +
        Math.cos(time * (particle.speed * 1.15) + particle.phase) * particle.driftY +
        pointerRef.current.y * 0.5;
      const z =
        particle.baseZ +
        Math.sin(time * 0.8 + particle.phase) * particle.driftZ +
        (reducedMotion ? 0 : Math.cos(time * particle.speed * 0.8 + particle.phase) * 0.6);

      dummy.current.position.set(x, y, z);
      dummy.current.rotation.set(
        time * particle.spinX + particle.phase,
        time * particle.spinY + particle.phase,
        time * particle.spinZ + particle.phase,
      );
      dummy.current.scale.setScalar(
        reducedMotion ? particle.scale * 0.82 : particle.scale * (0.9 + Math.sin(time * 0.3 + particle.phase) * 0.2),
      );
      dummy.current.updateMatrix();
      meshRef.current!.setMatrixAt(index, dummy.current.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, particles.length]}>
      <meshBasicMaterial
        transparent
        opacity={wireframe ? 0.95 : 0.86}
        color="#ffffff"
        vertexColors
        wireframe={wireframe}
        toneMapped={false}
        depthWrite={false}
        blending={wireframe ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </instancedMesh>
  );
}

export default function BackgroundField({
  count = 240,
  reducedMotion = false,
  isMobile = false,
}: BackgroundFieldProps) {
  const desktopCount = isMobile ? Math.min(count, 120) : count;
  const solidCount = Math.max(40, Math.floor(desktopCount * 0.78));
  const wireCount = Math.max(12, desktopCount - solidCount);

  const icosaSolid = useMemo(() => new THREE.IcosahedronGeometry(0.86, 1), []);
  const octaSolid = useMemo(() => new THREE.OctahedronGeometry(0.8, 0), []);
  const torusSolid = useMemo(() => new THREE.TorusGeometry(0.86, 0.13, 8, 28), []);

  return (
    <>
      <FieldCluster geometry={icosaSolid} count={Math.max(25, Math.floor(solidCount * 0.4))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe={false} />
      <FieldCluster geometry={octaSolid} count={Math.max(22, Math.floor(solidCount * 0.35))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe={false} />
      <FieldCluster geometry={torusSolid} count={Math.max(20, Math.floor(solidCount * 0.25))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe={false} />
      <FieldCluster geometry={icosaSolid} count={Math.max(6, Math.floor(wireCount * 0.5))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe />
      <FieldCluster geometry={octaSolid} count={Math.max(4, Math.floor(wireCount * 0.3))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe />
      <FieldCluster geometry={torusSolid} count={Math.max(4, Math.floor(wireCount * 0.2))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe />
    </>
  );
}
