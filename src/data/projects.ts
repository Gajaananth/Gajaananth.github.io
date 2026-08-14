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
    tagline: "Fullstack system for loans, savings, customers, and branch level financial workflows.",
    description:
      "A production oriented finance platform for managing customer relationships, loan operations, savings tracking, and operational reporting in one place.",
    problem:
      "Small and medium finance businesses often rely on fragmented systems and manual tracking for customer records, loan schedules, overdue management, and reports.",
    solution:
      "A role based web application with dashboards, customer records, loan and savings workflows, reminders, and reporting designed around operational clarity.",
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
      "I designed the frontend experience, implemented the role aware workflows, and integrated the business logic with the backend and reporting layers.",
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
    tagline: "Disaster resilient SOS platform built for failsafe communication and emergency response.",
    description:
      "A Flutter and Django based emergency communication system designed to keep critical messaging functional under stress and connectivity loss.",
    problem:
      "In emergency scenarios, a single communication channel is not reliable enough. Rescue and reporting workflows need layered redundancy and clear response coordination.",
    solution:
      "The application combines a mobile SOS experience with a backend communication layer designed around resilience, fallback communication patterns, and structured emergency workflows.",
    features: [
      "Emergency SOS workflows",
      "Mobile first response experience",
      "Backend communication orchestration",
      "Failsafe and layered communication design",
      "Offline and resiliency focused architecture",
    ],
    architecture: [
      "Mobile: Flutter",
      "Backend: Django",
      "Communication model: layered failsafe design",
      "Security and response flow: backend orchestration",
      "Project structure: mobile app + backend services",
    ],
    contribution:
      "I built the mobile experience, designed the emergency system flow, and developed the backend architecture needed for resilient communication.",
    technologies: ["Flutter", "Django", "Python", "SOS", "Resilient UX"],
    status: "Prototype",
    image: "/assets/projects/SelvaNaDhanam.jpg",
    github: "https://github.com/Gajaananth/Selva_NaDhanam",
    featured: true,
  },
  {
    id: "mabuddy-v2",
    title: "MAbuddy v2",
    category: "AI Application",
    tagline: "AI assisted workspace for workflow orchestration, task handling, and decision support.",
    description:
      "An AI first application focused on turning repetitive operational work into structured, intelligent workflow support.",
    problem:
      "Users needed a clearer way to manage ongoing tasks, workflow context, and assistance without scattered tools and manual coordination.",
    solution:
      "The product combines a client interface with server side orchestration to support task driven interactions and AI assisted decision workflows.",
    features: [
      "AI assisted workflow interaction",
      "Client/server orchestration model",
      "Operational task support",
      "Workflow centric design",
      "Deployment ready application structure",
    ],
    architecture: [
      "Frontend: React + TypeScript",
      "Application logic: client/server workflow model",
      "Backend services: orchestrated task handling",
      "Deployment: Vercel ready architecture",
      "Language stack: TypeScript first implementation",
    ],
    contribution:
      "I developed the architecture for the application, built the client experience, and integrated the core workflow logic for the assistant system.",
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
    tagline: "Technology brand and service platform focused on product positioning and business presentation.",
    description:
      "A fullstack digital presence for a technology driven brand, designed to clearly communicate service offerings and product value.",
    problem:
      "The business needed a modern web presence that could present technical capabilities and product positioning clearly to clients and partners.",
    solution:
      "A responsive website with a structured service narrative, polished presentation layer, and fullstack deployment setup suited for product storytelling.",
    features: [
      "Professional brand presentation",
      "Service oriented information architecture",
      "Responsive front end experience",
      "Deployment ready fullstack structure",
      "Product and brand storytelling",
    ],
    architecture: [
      "Frontend: React + Vite",
      "Backend/API layer: fullstack service architecture",
      "Styling: modern responsive UI",
      "Deployment: Vercel hosted frontend",
      "Project structure: client/server split",
    ],
    contribution:
      "I implemented the presentation layer, shaped the product storytelling, and built the deployment ready structure for the platform.",
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
    tagline: "Conversational product support experience designed around guidance and intelligent interaction.",
    description:
      "This project explores AI assisted interaction for product support and guided user assistance in a cleaner, more conversational format.",
    problem:
      "Support and discovery experiences can become fragmented when users are forced to navigate static content or rigid flows.",
    solution:
      "A conversational interface that brings product guidance into a lighter, interactive experience with AI supported flows.",
    features: [
      "Conversational guidance experience",
      "AI style interaction workflow",
      "Support oriented product discovery",
      "Prototype UI experience",
      "Assisted decision flow",
    ],
    architecture: [
      "Frontend experience: product facing AI interaction",
      "Backend logic: service and guidance orchestration",
      "API driven architecture",
      "Prototype first implementation",
      "Assistive experience design",
    ],
    contribution:
      "I developed the interaction model and product exploration flow for the assistant experience, focused on usability and delivery of guidance.",
    technologies: ["Python", "AI", "FastAPI", "Prototype"],
    status: "Experimental",
    image: "/assets/projects/ZIUM_Companion.png",
    github: "https://github.com/Gajaananth/TRADIQ_ZIUM_TECHS",
  },
  {
    id: "treatooo-hotels",
    title: "Treatooo Hotels",
    category: "Hospitality Web Platform",
    tagline: "Multi property hospitality website aimed at presenting a hotel group with a unified digital brand.",
    description:
      "A hospitality focused web experience built around a consistent multi property brand presentation and guest first storytelling.",
    problem:
      "Hospitality brands need a unified digital experience across properties while still presenting each location clearly and professionally.",
    solution:
      "A responsive web layout focused on hospitality storytelling, brand clarity, and a more organized property discovery experience.",
    features: [
      "Multi property web presence",
      "Responsive hospitality UI",
      "Brand consistency across properties",
      "Property focused digital storytelling",
      "Service presentation and booking context",
    ],
    architecture: [
      "Frontend: React based interface",
      "Backend integration: Django ready structure",
      "Design: responsive hospitality marketing layout",
      "Deployment: portfolio ready web build",
      "Content structure: multi property presentation",
    ],
    contribution:
      "I designed the hospitality storytelling flow and built the responsive web structure for a consistent multi-property experience.",
    technologies: ["React", "Django", "Hospitality", "Web Platform"],
    status: "Prototype",
    image: "/assets/projects/Treatooo_Hotels_Website.png",
    github: "https://github.com/Gajaananth",
  },
];
