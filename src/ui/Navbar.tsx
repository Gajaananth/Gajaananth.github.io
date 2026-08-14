import { useEffect, useState } from "react";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Hide the navbar entirely while the hero section fills the viewport,
  // and bring it back in as soon as the user scrolls past it. Re-hide if
  // they scroll back up into the hero.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setPastHero(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once less than ~65% of the hero is visible, treat the user as
        // "past" it and reveal the nav. Scrolling back up re-hides it.
        setPastHero(entry.intersectionRatio < 0.65);
      },
      { threshold: [0, 0.65, 1] }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!pastHero) setOpen(false);
  }, [pastHero]);

  return (
    <nav className={`navbar ${pastHero ? "" : "navbar-hidden"}`} aria-label="Primary" aria-hidden={!pastHero}>
      <div className="navbar-inner">
        <a href="#hero" className="navbar-mark">GN</a>
        <button className="navbar-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? "✕" : "☰"}
        </button>
        <div className={`navbar-links ${open ? "open" : ""}`}>
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "active" : ""} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="primary-button navbar-cta">Let's Connect</a>
      </div>
    </nav>
  );
}
