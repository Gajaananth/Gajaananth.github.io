import { useEffect, useState } from "react";
interface LoadingScreenProps { onDone: () => void; }
export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [stage, setStage] = useState<"mark" | "name" | "out">("mark");
  useEffect(() => {
    const t1 = setTimeout(() => setStage("name"), 500);
    const t2 = setTimeout(() => setStage("out"), 1300);
    const t3 = setTimeout(onDone, 1750);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);
  return (
    <div className={`loading-screen ${stage === "out" ? "loading-screen-out" : ""}`}>
      <div className="loading-mark">GN</div>
      <div className={`loading-name ${stage !== "mark" ? "loading-name-visible" : ""}`}>GAJAANANTH</div>
    </div>
  );
}
