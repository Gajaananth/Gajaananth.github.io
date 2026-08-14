import RevealOnScroll from "../ui/RevealOnScroll";
import GlassPanel from "../ui/GlassPanel";
import AmbientCanvas from "../ui/AmbientCanvas";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <AmbientCanvas className="ambient-3d--projects-bl" count={6} spread={3.4} colorA="#d66bff" colorB="#5fd4ff" />
      <div className="container">
        <RevealOnScroll className="section-header">
          <span className="heading-tag">Projects</span>
          <h2>Selected work across AI, web and mobile.</h2>
        </RevealOnScroll>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.id} delay={(i % 3) * 90}>
              <GlassPanel className="project-card">
                <div className="project-card-media">
                  <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
                </div>
                <div className="project-card-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-chips">
                    {project.technologies.map((t) => (
                      <span key={t} className="project-chip">{t}</span>
                    ))}
                  </div>
                  <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                    View Project →
                  </a>
                </div>
              </GlassPanel>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
