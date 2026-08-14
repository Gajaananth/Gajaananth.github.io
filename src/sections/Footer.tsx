import AmbientCanvas from "../ui/AmbientCanvas";

const SOCIALS = [
  { id: "github", label: "GitHub", href: "https://github.com/Gajaananth", icon: "github-icon" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/gajaananth/", icon: "linkedin-icon" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/gajaan08/", icon: "instagram-icon" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/gajaan8", icon: "facebook-icon" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <AmbientCanvas className="ambient-3d--footer" count={5} spread={3.6} colorA="#8b7bff" colorB="#5fd4ff" />
      <div className="footer-socials">
        {SOCIALS.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label={s.label}
          >
            <svg className="footer-social-icon" aria-hidden="true">
              <use xlinkHref={`/icons.svg#${s.icon}`} />
            </svg>
          </a>
        ))}
      </div>
      <p>&copy; {new Date().getFullYear()} Gajaananth. Designed for modern digital experiences.</p>
    </footer>
  );
}
