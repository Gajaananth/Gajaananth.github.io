import { useEffect, useState } from "react";

interface LoadingScreenProps { onDone: () => void; }

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
        <div className="loading-orbit loading-orbit-a" />
        <div className="loading-orbit loading-orbit-b" />
        <div className="loading-ring" />
        <div className="loading-core">
          <span>AI</span>
        </div>
        <span className="loading-node node-1" />
        <span className="loading-node node-2" />
        <span className="loading-node node-3" />
        <span className="loading-node node-4" />
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
