import RevealOnScroll from "../ui/RevealOnScroll";
import GlassPanel from "../ui/GlassPanel";
import AmbientCanvas from "../ui/AmbientCanvas";
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <AmbientCanvas className="ambient-3d--experience-tr" count={5} spread={3} colorA="#5fd4ff" colorB="#8b7bff" />
      <div className="container">
        <RevealOnScroll className="section-header">
          <span className="heading-tag">Experience</span>
          <h2>A track record of building real products.</h2>
        </RevealOnScroll>

        <div className="timeline">
          <div className="timeline-track" aria-hidden="true" />
          {experience.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 90} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true" />
              <span className="timeline-year">{item.year}</span>
              <GlassPanel className="timeline-card" tilt={false}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </GlassPanel>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
