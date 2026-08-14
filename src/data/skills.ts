export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  items: string[];
  color: string;
}
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "desktop",
    color: "#7af0ff",
    items: ["React and Next.js", "TypeScript", "Tailwind CSS", "Responsive interface design"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server",
    color: "#7c8cff",
    items: ["Node.js", "Django and Python", "REST APIs", "PostgreSQL"],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: "mobile",
    color: "#ff6ec7",
    items: ["Flutter", "Dart", "Cross platform product design", "Offline first solutions"],
  },
  {
    id: "ai",
    label: "AI & automation",
    icon: "robot",
    color: "#ffb35c",
    items: ["AI product integration", "Workflow automation", "Image processing", "LLM powered assistants"],
  },
];
export const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Django",
  "Flutter",
  "PostgreSQL",
  "AI / ML",
];
