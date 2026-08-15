import { useState } from "react";
import RevealOnScroll from "../ui/RevealOnScroll";
import GlassPanel from "../ui/GlassPanel";
import { projects, type Project } from "../data/projects";

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="project-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="project-modal glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="project-modal-close" onClick={onClose} aria-label="Close project details">
          ×
        </button>

        <div className="project-modal-media">
          <img src={project.image} alt={`${project.title} preview`} loading="eager" />
        </div>

        <div className="project-modal-body">
          <div className="project-card-meta project-modal-meta">
            <span className="project-category">{project.category}</span>
            <span className="project-status">{project.status}</span>
          </div>

          <h3 id="project-modal-title">{project.title}</h3>
          <p className="project-modal-tagline">{project.tagline}</p>

          <div className="project-modal-section">
            <h4>Overview</h4>
            <p>{project.description}</p>
          </div>

          <div className="project-modal-section">
            <h4>The Problem</h4>
            <p>{project.problem}</p>
          </div>

          <div className="project-modal-section">
            <h4>The Solution</h4>
            <p>{project.solution}</p>
          </div>

          <div className="project-modal-section">
            <h4>Key Features</h4>
            <ul className="project-detail-list">
              {project.features.map((feature) => <li key={feature}>{feature}</li>)}
            </ul>
          </div>

          <div className="project-modal-section">
            <h4>Technical Architecture</h4>
            <ul className="project-detail-list">
              {project.architecture.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div className="project-modal-section">
            <h4>My Contribution</h4>
            <p>{project.contribution}</p>
          </div>

          <div className="project-modal-actions">
            <a className="primary-button" href={project.github} target="_blank" rel="noopener noreferrer">
              View GitHub
            </a>
            {project.demo && (
              <a className="secondary-button" href={project.demo} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section">
      <div className="container">
        <RevealOnScroll className="section-header">
          <span className="heading-tag">Projects</span>
          <h2>Selected work across AI, web and mobile.</h2>
        </RevealOnScroll>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.id} delay={(i % 3) * 90}>
              <GlassPanel className={`project-card ${project.featured ? "project-card-featured" : ""}`}>
                <div className="project-card-media">
                  <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
                </div>
                <div className="project-card-body">
                  <div className="project-card-meta">
                    <span className="project-category">{project.category}</span>
                    <span className="project-status">{project.status}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-tagline">{project.tagline}</p>
                  <p className="project-summary">{project.description}</p>

                  <div className="project-chips">
                    {project.technologies.slice(0, 4).map((t) => (
                      <span key={t} className="project-chip">{t}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    <button type="button" className="project-link project-link-button" onClick={() => setSelectedProject(project)}>
                      View details
                    </button>
                    <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                      GitHub →
                    </a>
                  </div>
                </div>
              </GlassPanel>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
