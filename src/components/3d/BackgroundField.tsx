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
      speed: 0.42 + Math.random() * 1.3,
      baseX: (Math.random() - 0.5) * spreadX * 2,
      baseY: (Math.random() - 0.5) * spreadY * 2,
      baseZ: (Math.random() - 0.5) * 8,
      spinX: 0.25 + Math.random() * 0.65,
      spinY: 0.3 + Math.random() * 0.8,
      spinZ: 0.2 + Math.random() * 0.7,
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
    const pointerX = isMobile ? 0 : state.pointer.x * 0.9;
    const pointerY = isMobile ? 0 : state.pointer.y * 0.8;

    particles.forEach((particle, index) => {
      const x =
        particle.baseX +
        Math.sin(time * particle.speed + particle.phase) * particle.driftX +
        pointerX * 1.8;
      const y =
        particle.baseY +
        Math.cos(time * (particle.speed * 1.15) + particle.phase) * particle.driftY +
        pointerY * 1.5;
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
        reducedMotion ? particle.scale * 0.82 : particle.scale * (0.9 + Math.sin(time * 2 + particle.phase) * 0.2),
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
  count = 320,
  reducedMotion = false,
  isMobile = false,
}: BackgroundFieldProps) {
  const desktopCount = isMobile ? Math.min(count, 150) : count;
  const solidCount = Math.max(30, Math.floor(desktopCount * 0.68));
  const wireCount = Math.max(18, desktopCount - solidCount);

  const icosaSolid = useMemo(() => new THREE.IcosahedronGeometry(0.86, 1), []);
  const octaSolid = useMemo(() => new THREE.OctahedronGeometry(0.8, 0), []);
  const torusSolid = useMemo(() => new THREE.TorusGeometry(0.86, 0.13, 8, 28), []);

  return (
    <>
      <FieldCluster geometry={icosaSolid} count={solidCount} reducedMotion={reducedMotion} isMobile={isMobile} wireframe={false} />
      <FieldCluster geometry={octaSolid} count={Math.max(18, Math.floor(wireCount * 0.6))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe={false} />
      <FieldCluster geometry={torusSolid} count={Math.max(18, Math.floor(wireCount * 0.4))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe={false} />
      <FieldCluster geometry={icosaSolid} count={Math.max(16, Math.floor(desktopCount * 0.24))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe />
      <FieldCluster geometry={octaSolid} count={Math.max(12, Math.floor(desktopCount * 0.14))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe />
      <FieldCluster geometry={torusSolid} count={Math.max(12, Math.floor(desktopCount * 0.12))} reducedMotion={reducedMotion} isMobile={isMobile} wireframe />
    </>
  );
}
