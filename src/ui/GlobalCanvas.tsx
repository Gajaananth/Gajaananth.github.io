import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import BackgroundField from "../components/3d/BackgroundField";
import { useIsMobile } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function GlobalCanvas() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  return (
    <div className="global-ambient" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 50 }}
        dpr={isMobile ? [1, 1.5] : [1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <BackgroundField count={isMobile ? 90 : 160} reducedMotion={reducedMotion} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
