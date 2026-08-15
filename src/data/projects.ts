export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string[];
  contribution: string;
  technologies: string[];
  status: "Production" | "In Development" | "Prototype" | "Experimental";
  image: string;
  github: string;
  demo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "gvc-agro",
    title: "GVC Agro",
    category: "Finance Management Platform",
    tagline: "A full stack finance platform for managing loans, savings, customers, and branches.",
    description:
      "Production software for managing customer relationships, loan operations, savings tracking, and operational reporting for finance businesses.",
    problem:
      "Finance businesses waste time on fragmented systems and manual tracking. There's no single place to see customer records, loan schedules, payments, or generate reports.",
    solution:
      "A web application with clear dashboards, customer management, loan and savings workflows, payment tracking, and reports. Built for operators to see what's happening at a glance.",
    features: [
      "Customer, loan, and savings management",
      "Dashboard summaries and transaction visibility",
      "Automated due reminders and late fee logic",
      "Role based access for operational teams",
      "Financial reporting and audit oriented views",
    ],
    architecture: [
      "Frontend: React + Vite + TypeScript",
      "Backend: Node.js + Express + TypeScript",
      "Database: Supabase PostgreSQL",
      "Auth: JWT + role based access control",
      "Deployment: Vercel frontend + Render backend",
    ],
    contribution:
      "I designed and built the frontend, implemented the role based workflows, and connected everything to the backend and reporting systems.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Supabase"],
    status: "Production",
    image: "/assets/gvc-logo.png",
    github: "https://github.com/Gajaananth/GVC_frontend",
    demo: "https://gvcgro.vercel.app/",
    featured: true,
  },
  {
    id: "selva-nadhanam",
    title: "Selva NaDhanam",
    category: "Mobile + Resilience App",
    tagline: "An emergency communication app built to work when connectivity is unreliable.",
    description:
      "A mobile and backend system for emergency response. Designed to send SOS messages reliably and coordinate rescue response even when internet is spotty.",
    problem:
      "When you need help most, your phone might not have reliable internet. A single communication channel isn't enough for emergencies.",
    solution:
      "A mobile app that combines multiple fallback communication methods. The backend coordinates response and makes sure messages get through no matter what.",
    features: [
      "SOS communication that works offline",
      "Multiple redundant communication paths",
      "Clear emergency response workflows",
      "Message delivery confirmation",
      "Designed for high stress scenarios",
    ],
    architecture: [
      "Mobile: Flutter",
      "Backend: Django + Python",
      "Communication: layered failsafe design",
      "Database: resilient message storage",
      "Focus: offline first and reliability",
    ],
    contribution:
      "I built the mobile app, designed the emergency workflows, and developed the backend to handle redundant communication reliably.",
    technologies: ["Flutter", "Django", "Python", "SOS", "Resilient UX"],
    status: "Prototype",
    image: "/assets/projects/SelvaNaDhanam.jpg",
    github: "https://github.com/Gajaananth/Selva_NaDhanam",
    featured: true,
  },
  {
    id: "karuppu",
    title: "Karuppu",
    category: "AI Application",
    tagline: "An AI powered workspace for managing tasks and automating repetitive work.",
    description:
      "A product that helps you manage work tasks and automate repetitive workflows using AI. Built to reduce manual busywork and keep you focused.",
    problem:
      "Teams spend too much time on repetitive tasks, context switching, and manual coordination. There's no single place to manage tasks with AI assistance.",
    solution:
      "A workspace where you manage tasks, automate workflows with AI, and get support for decisions. The frontend and backend work together to reduce friction.",
    features: [
      "Task and workflow management",
      "AI powered automation for repetitive work",
      "Clear task focused interface",
      "Workflow context and history",
      "Team ready structure",
    ],
    architecture: [
      "Frontend: React + TypeScript",
      "Backend: Node.js and orchestration",
      "AI integration: automation and suggestions",
      "Database: task and workflow storage",
      "Deployment: Vercel ready",
    ],
    contribution:
      "I designed the task and workflow system, built the interface, and implemented the AI automation logic.",
    technologies: ["React", "TypeScript", "AI", "Workflow UI", "Vercel"],
    status: "In Development",
    image: "/assets/karuppu-logo.png",
    github: "https://github.com/Gajaananth/MAbuddyv2",
    demo: "https://m-abuddyv2.vercel.app/",
    featured: true,
  },
  {
    id: "tradiq-zium",
    title: "TRADIQ ZIUM TECHS",
    category: "Fullstack Web Platform",
    tagline: "A web platform for a technology company to present services and brand.",
    description:
      "A full stack website for a tech company. Presents services clearly, tells the story of what they do, and leaves visitors understanding what to work with them on.",
    problem:
      "Tech companies need a web presence that shows what they actually do, not generic marketing speak. Visitors should know what problems you solve.",
    solution:
      "A responsive website with clear service descriptions, project examples, and focused messaging. Built on a solid full stack foundation.",
    features: [
      "Professional service presentation",
      "Clear information architecture",
      "Case studies and project showcase",
      "Responsive on all devices",
      "Fast and reliable performance",
    ],
    architecture: [
      "Frontend: React + Vite",
      "Backend: Full stack service structure",
      "Styling: responsive modern design",
      "Deployment: Vercel",
      "CMS ready for content updates",
    ],
    contribution:
      "I built the frontend, designed the information flow, and set up the full stack deployment.",
    technologies: ["React", "TypeScript", "Vercel", "Fullstack", "UI Design"],
    status: "Production",
    image: "/assets/projects/TRADIQ_ZIUM_TECH_Website.png",
    github: "https://github.com/Gajaananth/TRADIQ_ZIUM_TECHS",
    demo: "https://tradiqzium.vercel.app/",
  },
  {
    id: "zium-companion",
    title: "ZIUM Companion",
    category: "AI Experience",
    tagline: "An AI powered support assistant that helps users understand products.",
    description:
      "A conversational AI assistant for product support. Answers questions, guides users through features, and helps them get value from the product.",
    problem:
      "Support tickets take time. Users get stuck and don't know where to find help. You need a way to answer common questions instantly.",
    solution:
      "A conversational interface powered by AI. Users ask questions in natural language and get helpful guidance immediately.",
    features: [
      "Conversational support interface",
      "AI powered answers",
      "Product feature guidance",
      "Instant help for common questions",
      "Learns from support interactions",
    ],
    architecture: [
      "Frontend: conversational UI",
      "Backend: Python + FastAPI",
      "AI: language model integration",
      "Database: support knowledge store",
      "API driven design",
    ],
    contribution:
      "I designed the conversation flow, built the frontend interface, and integrated the AI backend.",
    technologies: ["Python", "AI", "FastAPI", "Prototype"],
    status: "Experimental",
    image: "/assets/projects/ZIUM_Companion.png",
    github: "https://github.com/Gajaananth/TRADIQ_ZIUM_TECHS",
  },
  {
    id: "treatooo-hotels",
    title: "Treatooo Hotels",
    category: "Hospitality Web Platform",
    tagline: "A web platform for hotel groups with multiple properties.",
    description:
      "A website for presenting multiple hotel properties under one consistent brand. Visitors see availability, book rooms, and learn about each location.",
    problem:
      "Hotel groups have multiple properties but no good way to present them together online. Each property needs attention but the brand should feel unified.",
    solution:
      "A responsive website that shows all properties clearly, makes booking simple, and keeps the brand consistent across the board.",
    features: [
      "Multi property presentation",
      "Responsive design for all devices",
      "Consistent brand across locations",
      "Property focused information",
      "Ready for booking integration",
    ],
    architecture: [
      "Frontend: React",
      "Backend: Django ready",
      "Design: responsive hospitality layout",
      "Content: multi property structure",
      "Deployment: production ready build",
    ],
    contribution:
      "I designed and built the website structure, focused on making each property shine while keeping the brand unified.",
    technologies: ["React", "Django", "Hospitality", "Web Platform"],
    status: "Prototype",
    image: "/assets/projects/Treatooo_Hotels_Website.png",
    github: "https://github.com/Gajaananth",
  },
];
