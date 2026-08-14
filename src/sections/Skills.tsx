import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import RevealOnScroll from "../ui/RevealOnScroll";
import GlassPanel from "../ui/GlassPanel";
import NeuralNetwork from "../components/3d/NeuralNetwork";
import AmbientCanvas from "../ui/AmbientCanvas";
import { skillCategories } from "../data/skills";
import { useIsMobile } from "../hooks/useMediaQuery";

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);
  const isMobile = useIsMobile();
  return (
    <section id="skills" className="section">
      <AmbientCanvas className="ambient-3d--skills-tr" count={4} spread={2.6} colorA="#8b7bff" colorB="#d66bff" />
      <div className="container">
        <RevealOnScroll className="section-header">
          <span className="heading-tag">Skills</span>
          <h2>An engineering ecosystem, not a checklist.</h2>
        </RevealOnScroll>

        <div className="skills-layout">
          <RevealOnScroll className="skill-tabs">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                className={`skill-tab glass-panel ${active === cat.id ? "active" : ""}`}
                onMouseEnter={() => setActive(cat.id)}
                onFocus={() => setActive(cat.id)}
                onMouseLeave={() => setActive(null)}
                onBlur={() => setActive(null)}
                style={{ borderColor: active === cat.id ? cat.color : undefined }}
              >
                <h4 style={{ color: active === cat.id ? cat.color : undefined }}>{cat.label}</h4>
                <ul>
                  {cat.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </button>
            ))}
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <GlassPanel className="skills-3d-panel" tilt={false}>
              <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1]} gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.7} />
                  <NeuralNetwork activeCategory={active} />
                </Suspense>
              </Canvas>
            </GlassPanel>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
