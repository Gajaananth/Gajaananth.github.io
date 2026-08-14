export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
}
export const projects: Project[] = [
  {
    id: "tradiq-zium",
    title: "TRADIQ ZIUM TECHS",
    description:
      "Brand and service platform for a modern business with AI driven products and enterprise presentation.",
    technologies: ["Next.js", "React", "Tailwind"],
    image: "/assets/projects/TRADIQ_ZIUM_TECH_Website.png",
    link: "https://github.com/Gajaananth/TRADIQ_ZIUM_TECHS",
  },
  {
    id: "mabuddy-v2",
    title: "MAbuddy v2",
    description:
      "Karuppu themed intelligent assistant product built for smarter workflows, insights, and automation.",
    technologies: ["React", "TypeScript", "AI workflow"],
    image: "/assets/karuppu-logo.png",
    link: "https://github.com/Gajaananth/MAbuddyv2",
  },
  {
    id: "selva-nadhanam",
    title: "Selva NaDhanam",
    description:
      "Disaster resilient emergency communication app with layered fail safe messaging and offline capability.",
    technologies: ["Flutter", "Django", "Offline SOS"],
    image: "/assets/projects/SelvaNaDhanam.jpg",
    link: "https://github.com/Gajaananth/Selva_NaDhanam",
  },
  {
    id: "treatooo-hotels",
    title: "Treatooo Hotels",
    description:
      "Responsive multi hotel platform for centralizing the brand experience across property sites.",
    technologies: ["React", "Django", "Multi property"],
    image: "/assets/projects/Treatooo_Hotels_Website.png",
    link: "https://github.com/Gajaananth",
  },
  {
    id: "zium-companion",
    title: "ZIUM Companion",
    description:
      "Conversational assistant experience that blends product support with intelligent interaction design.",
    technologies: ["Python", "AI", "FastAPI"],
    image: "/assets/projects/ZIUM_Companion.png",
    link: "https://github.com/Gajaananth/TRADIQ_ZIUM_TECHS",
  },
  {
    id: "gvc-ecosystem",
    title: "GVC Ecosystem",
    description:
      "Full stack product platform combining frontend and backend workflows as a unified digital business system.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    image: "/assets/gvc-logo.png",
    link: "https://github.com/Gajaananth/GVC_frontend",
  },
];
