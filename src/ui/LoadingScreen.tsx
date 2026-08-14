import { useEffect, useState } from "react";

interface LoadingScreenProps { onDone: () => void; }

const chipTiles = [
  { top: "18%", left: "18%", delay: "0s" },
  { top: "22%", left: "68%", delay: "0.4s" },
  { top: "54%", left: "20%", delay: "0.8s" },
  { top: "68%", left: "62%", delay: "1.2s" },
  { top: "56%", left: "74%", delay: "1.6s" },
  { top: "36%", left: "50%", delay: "0.3s" },
];

const nodes = [
  { className: "node-1", delay: "0s" },
  { className: "node-2", delay: "0.5s" },
  { className: "node-3", delay: "1s" },
  { className: "node-4", delay: "1.5s" },
  { className: "node-5", delay: "2s" },
  { className: "node-6", delay: "2.5s" },
];

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [stage, setStage] = useState<"mark" | "name" | "out">("mark");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("name"), 500);
    const t2 = setTimeout(() => setStage("out"), 1500);
    const t3 = setTimeout(onDone, 1850);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div className={`loading-screen ${stage === "out" ? "loading-screen-out" : ""}`}>
      <div className="loading-scene" aria-hidden="true">
        <div className="loading-board">
          {chipTiles.map((chip, index) => (
            <span
              key={index}
              className="loading-chip"
              style={{ top: chip.top, left: chip.left, animationDelay: chip.delay }}
            />
          ))}
        </div>

        <span className="loading-link link-1" />
        <span className="loading-link link-2" />
        <span className="loading-link link-3" />
        <span className="loading-link link-4" />
        <span className="loading-link link-5" />

        <div className="loading-orbit loading-orbit-a" />
        <div className="loading-orbit loading-orbit-b" />
        <div className="loading-ring" />

        <div className="loading-core">
          <span>AI</span>
        </div>

        {nodes.map((node) => (
          <span key={node.className} className={`loading-node ${node.className}`} style={{ animationDelay: node.delay }} />
        ))}
      </div>

      <div className={`loading-tag ${stage !== "mark" ? "loading-tag-visible" : ""}`}>
        Neural systems booting
      </div>

      <div className={`loading-name ${stage !== "mark" ? "loading-name-visible" : ""}`}>
        GAJAANANTH
      </div>
    </div>
  );
}
