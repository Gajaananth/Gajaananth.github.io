import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface HeroRingProps {
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export default function HeroRing({ reducedMotion = false, isMobile = false }: HeroRingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);

  const ringOneRadius = isMobile ? 2.05 : 2.9;
  const ringTwoRadius = isMobile ? 2.3 : 3.3;

  const orbitPoints = useMemo(
    () =>
      Array.from({ length: isMobile ? 9 : 16 }, (_, index) => ({
        angle: (index / (isMobile ? 9 : 16)) * Math.PI * 2,
        radius: isMobile ? 2.1 : 2.8,
        offset: index * 0.22,
      })),
    [isMobile],
  );

  useFrame((state) => {
    if (!groupRef.current || document.visibilityState === "hidden") return;

    const time = state.clock.getElapsedTime();
    const speed = reducedMotion ? 0.12 : 1;
    const drift = reducedMotion ? 0.18 : 1;

    if (ringOneRef.current) {
      const ringOneTilt = 0.82 + Math.sin(time * 0.32) * 0.12 * drift;
      ringOneRef.current.rotation.z = time * 0.18 * speed;
      ringOneRef.current.rotation.x = Math.max(0.7, Math.min(1.0, ringOneTilt));
      ringOneRef.current.rotation.y = Math.sin(time * 0.2) * 0.15;
    }

    if (ringTwoRef.current) {
      const ringTwoTilt = 0.88 + Math.cos(time * 0.42) * 0.1 * drift;
      ringTwoRef.current.rotation.z = -time * 0.14 * speed;
      ringTwoRef.current.rotation.x = Math.max(0.72, Math.min(1.02, ringTwoTilt));
      ringTwoRef.current.rotation.y = 0.24 + Math.sin(time * 0.24) * 0.12;
    }

    groupRef.current.position.y = isMobile ? 0.38 : 0.12;
    groupRef.current.rotation.y = Math.sin(time * 0.18) * 0.16;
  });

  return (
    <group ref={groupRef} position={[0, 0.12, 0]}>
      <mesh ref={ringOneRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ringOneRadius, 0.04, 18, 180]} />
        <meshBasicMaterial color="#5fd4ff" transparent opacity={0.8} toneMapped={false} />
      </mesh>

      <mesh ref={ringTwoRef} rotation={[0.9, 0.4, 0]}>
        <torusGeometry args={[ringTwoRadius, 0.03, 18, 200]} />
        <meshBasicMaterial color="#8b7bff" transparent opacity={0.7} toneMapped={false} />
      </mesh>

      {orbitPoints.map((point, index) => {
        const x = Math.cos(point.angle + point.offset) * point.radius;
        const y = Math.sin(point.angle * 1.6 + point.offset) * 1.1;
        const z = Math.sin(point.angle + point.offset) * 0.8;

        return (
          <mesh key={index} position={[x, y, z]}>
            <icosahedronGeometry args={[0.06, 0]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#5fd4ff" : "#d66bff"}
              transparent
              opacity={0.72}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}
