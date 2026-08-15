import { useReducedMotion } from "../hooks/useReducedMotion";
import MagneticButton from "../ui/MagneticButton";
import heroPortrait from "../assets/hero/hero-portrait.webp";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="hero" className="hero-pin-wrapper">
      <div className="hero-inner container">
        {/* Text sits in its own column so it never lands on top of the
            portrait — no headline or button overlaps the photo. */}
        <div className="hero-content">
          <span className="hero-eyebrow">AI Engineer · Full Stack Developer</span>
          <h1 className="hero-name-wrap">
            <span className="hero-name gradient-text">GAJAANANTH</span>
            {!reducedMotion && (
              <>
                <span className="hero-name hero-name-fx" aria-hidden="true">GAJAANANTH</span>
                <span className="hero-name hero-name-scan" aria-hidden="true">GAJAANANTH</span>
              </>
            )}
          </h1>
          <p className="hero-role">Building AI powered web, mobile, and business software.</p>
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
