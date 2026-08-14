import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import RevealOnScroll from "../ui/RevealOnScroll";
import GlassPanel from "../ui/GlassPanel";
import TechOrbit from "../components/3d/TechOrbit";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <RevealOnScroll className="about-copy">
            <span className="heading-tag">About</span>
            <h2>Creating products that feel modern and useful.</h2>
            <p>
              I'm <strong>Nadarasa Gajaananth</strong>, a freelance AI and fullstack developer
              based in Sri Lanka, building web and mobile products for clients across finance,
              hospitality, and education. My work
              blends practical software engineering with AI assisted development, using tools
              like Cursor AI and Claude to move fast without cutting corners.
            </p>
            <p>
              My stack spans React, Next.js, Django, Python, FastAPI and Flutter, with
              PostgreSQL underneath and Figma driving the design. I work independently with
              founders and teams building product experiences that are practical, polished, and
              ready for real-world use.
            </p>
            <div className="about-stats">
              <GlassPanel className="about-stat" tilt={false}>
                <strong>6+</strong>
                <span>Shipped products</span>
              </GlassPanel>
              <GlassPanel className="about-stat" tilt={false}>
                <strong>3</strong>
                <span>Industries served</span>
              </GlassPanel>
              <GlassPanel className="about-stat" tilt={false}>
                <strong>Remote</strong>
                <span>Worldwide</span>
              </GlassPanel>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <GlassPanel className="about-3d-panel" tilt={false}>
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1]} gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} />
                  <TechOrbit />
                </Suspense>
              </Canvas>
            </GlassPanel>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
