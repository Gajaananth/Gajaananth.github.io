import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import AmbientField from "../components/3d/AmbientField";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useMediaQuery";

interface AmbientCanvasProps {
  className?: string;
  count?: number;
  spread?: number;
  colorA?: string;
  colorB?: string;
}

/**
 * Decorative, non-interactive 3D scatter dropped into otherwise-empty
 * corners of a section. Skipped on mobile and when the user prefers
 * reduced motion, since it's purely ambient flourish.
 */
export default function AmbientCanvas({ className = "", count = 6, spread, colorA, colorB }: AmbientCanvasProps) {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  if (isMobile || reducedMotion) return null;
  return (
    <div className={`ambient-3d ${className}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1]} gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}>
        <Suspense fallback={null}>
          <AmbientField count={count} spread={spread} colorA={colorA} colorB={colorB} />
        </Suspense>
      </Canvas>
    </div>
  );
}
