import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useMediaQuery";
import FloatingGeometry from "../components/3d/FloatingGeometry";
import MagneticButton from "../ui/MagneticButton";
import heroPortrait from "../assets/hero/hero-portrait.webp";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="hero" className="hero-pin-wrapper">
      {!isMobile && (
        <div className="hero-bg-3d" aria-hidden="true">
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 1]} gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}>
            <Suspense fallback={null}>
              <FloatingGeometry count={10} radius={7} speed={reducedMotion ? 0 : 1} />
            </Suspense>
          </Canvas>
        </div>
      )}

      <div className="hero-inner container">
        {/* Text sits in its own column so it never lands on top of the
            portrait — no headline or button overlaps the photo. */}
        <div className="hero-content">
          <span className="hero-eyebrow">AI Engineer &middot; Software Builder</span>
          <h1 className="hero-name-wrap">
            <span className="hero-name gradient-text">GAJAANANTH</span>
            {!reducedMotion && (
              <>
                <span className="hero-name hero-name-fx" aria-hidden="true">GAJAANANTH</span>
                <span className="hero-name hero-name-scan" aria-hidden="true">GAJAANANTH</span>
              </>
            )}
          </h1>
          <p className="hero-role">AI Engineer &bull; Software Builder &bull; Problem Solver</p>
          <p className="hero-sub">Building future-ready digital products.</p>
          <div className="hero-actions">
            <MagneticButton href="#projects" variant="primary">View Projects</MagneticButton>
            <MagneticButton href="#contact" variant="secondary">Let's Connect</MagneticButton>
          </div>
        </div>

        <div className="hero-visual">
          <img
            src={heroPortrait}
            alt="Gajaananth, AI Engineer and Software Builder, sitting in a chair holding a mug"
            className="hero-portrait-image"
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </section>
  );
}
