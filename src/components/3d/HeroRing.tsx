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

  const orbitPoints = useMemo(
    () =>
      Array.from({ length: isMobile ? 9 : 16 }, (_, index) => ({
        angle: (index / (isMobile ? 9 : 16)) * Math.PI * 2,
        radius: isMobile ? 2.2 : 2.8,
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
      ringOneRef.current.rotation.z = time * 0.23 * speed;
      ringOneRef.current.rotation.x = Math.PI / 2.3 + Math.sin(time * 0.35) * 0.2 * drift;
    }

    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.z = -time * 0.18 * speed;
      ringTwoRef.current.rotation.y = Math.PI / 2.8 + Math.cos(time * 0.28) * 0.2 * drift;
    }

    groupRef.current.rotation.y = Math.sin(time * 0.18) * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0.12, 0]}>
      <mesh ref={ringOneRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.9, 0.018, 12, 120]} />
        <meshBasicMaterial color="#5fd4ff" wireframe transparent opacity={0.78} toneMapped={false} />
      </mesh>

      <mesh ref={ringTwoRef} rotation={[0.9, 0.4, 0]}>
        <torusGeometry args={[3.3, 0.012, 12, 120]} />
        <meshBasicMaterial color="#8b7bff" wireframe transparent opacity={0.56} toneMapped={false} />
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
