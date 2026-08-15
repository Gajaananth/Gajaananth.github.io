import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { skillCategories } from "../../data/skills";
interface NeuralNetworkProps { activeCategory: string | null; }
interface NodePoint { position: THREE.Vector3; categoryId: string; color: string; }
export default function NeuralNetwork({ activeCategory }: NeuralNetworkProps) {
  const group = useRef<THREE.Group>(null);
  const nodes: NodePoint[] = useMemo(() => {
    const pts: NodePoint[] = [];
    skillCategories.forEach((cat, ci) => {
      const clusterAngle = (ci / skillCategories.length) * Math.PI * 2;
      const clusterX = Math.cos(clusterAngle) * 2.6;
      const clusterZ = Math.sin(clusterAngle) * 2.6;
      cat.items.forEach((_, ii) => {
        const a = (ii / cat.items.length) * Math.PI * 2;
        pts.push({
          position: new THREE.Vector3(clusterX + Math.cos(a) * 0.8, (ii - cat.items.length / 2) * 0.35, clusterZ + Math.sin(a) * 0.8),
          categoryId: cat.id,
          color: cat.color,
        });
      });
    });
    return pts;
  }, []);
  const lines = useMemo(() => {
    const segs: { start: THREE.Vector3; end: THREE.Vector3; categoryId: string }[] = [];
    skillCategories.forEach((cat) => {
      const clusterNodes = nodes.filter((n) => n.categoryId === cat.id);
      for (let i = 0; i < clusterNodes.length; i++) {
        const a = clusterNodes[i];
        const b = clusterNodes[(i + 1) % clusterNodes.length];
        segs.push({ start: a.position, end: b.position, categoryId: cat.id });
      }
    });
    return segs;
  }, [nodes]);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.getElapsedTime() * 0.04;
  });
  return (
    <group ref={group}>
      {lines.map((seg, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([seg.start, seg.end]);
        const lineColor = seg.categoryId === "frontend" ? "#7ae7ad" : "#5fd4ff";
        const material = new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: seg.categoryId === "frontend" ? 0.18 : 0.15 });
        return <primitive key={i} object={new THREE.Line(geometry, material)} />;
      })}
      {nodes.map((n, i) => {
        const isActive = activeCategory === n.categoryId;
        const isDimmed = activeCategory !== null && !isActive;
        const nodeColor = n.categoryId === "frontend" ? "#7ae7ad" : n.color;
        const nodeOpacity = isDimmed ? 0.15 : n.categoryId === "frontend" ? 1 : 0.9;
        return (
          <mesh key={i} position={n.position} scale={isActive ? 1.8 : n.categoryId === "frontend" ? 1.25 : 1}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color={nodeColor} transparent opacity={nodeOpacity} />
          </mesh>
        );
      })}
    </group>
  );
}
