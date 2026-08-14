import { useRef, type ReactNode, type MouseEvent } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
interface GlassPanelProps { children: ReactNode; className?: string; tilt?: boolean; }
export default function GlassPanel({ children, className = "", tilt = true }: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const handleMove = (e: MouseEvent) => {
    if (!tilt || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };
  const handleLeave = () => { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"; };
  return (
    <div ref={ref} className={`glass-panel tilt-card ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}
