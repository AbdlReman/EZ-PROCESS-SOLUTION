import type { ReactNode } from "react";

export type CaseStudy = {
  id: number;
  category: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  bannerImage: string;
  results: string[];
  tech: string[];
  industry: string;
  year: string;
  duration: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 1, category: "E-commerce", tag: "Web Platform",
    title: "Fashion Resale Platform Scales to 100K+ Monthly Transactions",
    description: "Replatformed a fashion resale startup onto a composable, headless architecture with real-time inventory, AI-driven recommendations, and personalised discovery.",
    image: "/images/webportfolio_1.png", bannerImage: "/images/banerwebportfolio_1.png",
    results: ["3× conversion rate", "100K+ monthly txns", "40% faster loads"],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    industry: "E-commerce", year: "2024", duration: "14 weeks",
  },
  {
    id: 2, category: "Fintech", tag: "AI Analytics",
    title: "AI Financial Modelling Platform Secures $2M+ in Growth Funding",
    description: "Built a predictive analytics engine and investor-ready dashboards for a fintech startup. Automated modelling reduced reporting from days to minutes.",
    image: "/images/webportfolio_2.png", bannerImage: "/images/banerwebportfolio_2.png",
    results: ["$2M+ secured", "95% accuracy", "10× faster reporting"],
    tech: ["React", "Python", "TensorFlow", "GCP", "BigQuery"],
    industry: "Fintech", year: "2024", duration: "10 weeks",
  },
  {
    id: 3, category: "Healthcare", tag: "SaaS Platform",
    title: "HIPAA-Compliant Clinic System Deployed Across 50+ Locations",
    description: "Full-stack clinic management with telemedicine, EHR integration, and real-time scheduling for a multi-location provider. Role-based access and full audit trails.",
    image: "/images/webportfolio_3.png", bannerImage: "/images/banerwebportfolio_3.png",
    results: ["50+ clinics live", "HIPAA-compliant", "60% admin time saved"],
    tech: ["Vue.js", "Django", "PostgreSQL", "Azure", "FHIR API"],
    industry: "Healthcare", year: "2023", duration: "20 weeks",
  },
  {
    id: 4, category: "Travel", tag: "AI Reconciliation",
    title: "AI Platform Reconciles $300M+ in OTA Commissions",
    description: "Automated data pipelines and anomaly-detection models cut reconciliation from weeks to hours for a major hospitality group, recovering millions in missed revenue.",
    image: "/images/webportfolio_4.png", bannerImage: "/images/banerwebportfolio_4.png",
    results: ["$300M+ reconciled", "95% less manual work", "Weeks → hours"],
    tech: ["React", "Python", "Apache Spark", "AWS", "ML Pipeline"],
    industry: "Travel & Hospitality", year: "2023", duration: "16 weeks",
  },
];

export type ServiceItem = {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
};

export const services: ServiceItem[] = [
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Web & Custom Software",
    description: "High-performance web apps, internal tools, and enterprise platforms using battle-tested modern stacks.",
    features: ["Multi-tenant SaaS platforms", "B2B & B2C portals", "Design systems & architecture", "API-first microservices"],
    image: "/images/services/web.jpg",
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    title: "Mobile & Experience",
    description: "Native-quality mobile experiences with consistent journeys across every device and platform.",
    features: ["iOS, Android & cross-platform", "Product discovery & UX workshops", "Prototyping & usability testing", "App store optimisation"],
    image: "/images/services/mobile.jpg",
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Data & AI",
    description: "Intelligent automation, predictive analytics, and GenAI-powered experiences built for production scale.",
    features: ["GenAI copilots & chatbots", "Analytics dashboards", "ML model development", "Process automation"],
    image: "/images/services/ai.jpg",
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Cloud, DevOps & Security",
    description: "Resilient, observable, and secure infrastructures engineered to grow reliably with your business.",
    features: ["Cloud architecture & migration", "CI/CD & SRE practices", "Security-first engineering", "Cost optimisation"],
    image: "/images/services/devops.jpg",
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    title: "UI/UX Design",
    description: "Design systems and user experiences that convert visitors into loyal, returning customers.",
    features: ["UX research & strategy", "Design system creation", "Interactive prototypes", "Accessibility compliance"],
    image: "/images/uibanner-1.png",
  },
  {
    icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Digital Strategy & Product Consulting",
    description: "High-value advisory that aligns technology investments with business outcomes — from product vision to market execution.",
    features: ["Product roadmap & vision", "Go-to-market strategy", "Tech stack advisory", "OKR-driven delivery"],
    image: "/images/services/digitalstrategy.jpg",
  },
];

export const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Django", "PostgreSQL",
  "MongoDB", "Redis", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform",
  "GraphQL", "React Native", "Flutter", "TensorFlow", "PyTorch", "Figma", "Storybook",
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Django", "PostgreSQL",
  "MongoDB", "Redis", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform",
  "GraphQL", "React Native", "Flutter", "TensorFlow", "PyTorch", "Figma", "Storybook",
];

export type IndustryItem = { name: string; desc: string; icon: ReactNode };

export const industries: IndustryItem[] = [
  { name: "Banking & Fintech", desc: "Secure, compliant, and scalable financial products built to regulatory standard.", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: "E-commerce & Retail", desc: "Conversion-optimised storefronts, inventory systems, and loyalty platforms.", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: "Healthcare & Pharma", desc: "HIPAA-compliant patient management, EHR integration, and telehealth.", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: "Travel & Hospitality", desc: "Real-time booking engines, revenue management, and guest experience platforms.", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8"/></svg> },
  { name: "Public Sector", desc: "Secure, accessible government digital services built for public-scale demands.", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { name: "Startups & Scale-ups", desc: "From validated MVP to market leader — fast, lean, and built to scale.", icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

export const stats = [
  { num: "70+", label: "Digital products delivered" },
  { num: "23+", label: "Countries supported" },
  { num: "98%", label: "Client satisfaction" },
  { num: "5+", label: "Years of excellence" },
];

export const blogPosts = [
  {
    date: "June 15, 2025",
    image: "/images/webportfolio_1.png",
    title: "How AI is Transforming E-Commerce: Lessons from 100K Transactions",
    excerpt: "We break down the technical approach behind our fashion resale platform and what it means for the future of AI-driven commerce.",
    slug: "ai-ecommerce-transformation",
  },
  {
    date: "May 28, 2025",
    image: "/images/webportfolio_2.png",
    title: "Building HIPAA-Compliant SaaS: Architecture Decisions That Matter",
    excerpt: "A technical deep-dive into the decisions we made when building a multi-location clinic management system used across 50+ sites.",
    slug: "hipaa-saas-architecture",
  },
  {
    date: "April 10, 2025",
    image: "/images/webportfolio_3.png",
    title: "The 5 Cloud Architecture Patterns We Use on Every Enterprise Project",
    excerpt: "From multi-region failover to cost-optimized auto-scaling — the patterns that underpin our most resilient production systems.",
    slug: "cloud-architecture-patterns",
  },
];

export const faqItems = [
  {
    q: "How Does It Work?",
    a: "We start with a discovery call to understand your goals, then move into scoping, design, and engineering. Most projects kick off within 2 weeks of our first conversation.",
  },
  {
    q: "What Platforms Do You Advertise On?",
    a: "We build and market across web, iOS, Android, and enterprise platforms. Our digital strategy team also covers Google, Meta, LinkedIn, and programmatic channels.",
  },
  {
    q: "What Is The Commission?",
    a: "Our engagement models range from fixed-price projects to monthly retainers. We share detailed pricing after a discovery call to ensure the best fit for your needs and budget.",
  },
  {
    q: "How Do We Start?",
    a: "Simply reach out via our contact page or schedule a strategy call. We will respond within 24 hours to arrange a meeting with our solutions team.",
  },
  {
    q: "What Will Be The Revisions System?",
    a: "All projects include dedicated revision rounds. Our design sprints use iterative feedback loops, and engineering milestones include review periods built into the timeline.",
  },
];
