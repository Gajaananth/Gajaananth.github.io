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
            <h2>I build real software for real business needs.</h2>
            <p>
              I'm <strong>Nadarasa Gajaananth</strong>, a freelance AI and full stack developer based in Sri Lanka. I work with founders and teams to build web applications, mobile apps, backend systems, AI powered workflows, and automation for finance, hospitality, education, and enterprise.
            </p>
            <p>
              My work spans React, Next.js, Django, Python, FastAPI, and Flutter on the frontend and backend. I focus on building products that solve real problems, scale with your business, and can be maintained and extended over time.
            </p>
            <div className="about-stats">
              <GlassPanel className="about-stat" tilt={false}>
                <strong>6+</strong>
                <span>Products Built</span>
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
