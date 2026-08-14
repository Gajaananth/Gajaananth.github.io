import { useRef, type ReactNode, type MouseEvent } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useMediaQuery";
interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit";
}
export default function MagneticButton({ href, onClick, children, variant = "primary", className = "", type = "button" }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const handleMove = (e: MouseEvent) => {
    if (reducedMotion || isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = "translate(0, 0)"; };
  const cls = `${variant === "primary" ? "primary-button" : "secondary-button"} magnetic-button ${className}`;
  if (href) {
    return (
      <a ref={ref as never} href={href} className={cls} onMouseMove={handleMove} onMouseLeave={handleLeave} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <button ref={ref as never} type={type} className={cls} onClick={onClick} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </button>
  );
}
