export interface Project {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  status: "live" | "completed" | "tenure-ended";
  company?: string;
  problem: string;
  outcome: string;
  stack: string[];
  highlights: string[];
  images?: string[];
  featured: boolean;
}

export interface Principle {
  number: string;
  title: string;
  body: string;
}

export const projects: Project[] = [
  {
    slug: "enterprise-contractor-platform",
    title: "Construction Compliance Platform",
    tagline:
      "Contributing to an enterprise construction compliance platform that helps Australian builders streamline building permit approvals and get on-site faster.",
    role: "Full-Stack Developer",
    year: "2025 — Present",
    status: "live",
    company: "Cloudesk Pty Ltd",
    problem:
      "A mature, production-critical compliance platform serving residential and commercial builders, engineers, and local councils across Australia needed continuous feature delivery without disrupting live operations.",
    outcome:
      "Contributing to ongoing feature development, performance optimization, and critical issue resolution — as part of the team maintaining a system with a 97% first-time building permit approval rate across thousands of active applications.",
    stack: [
      "PHP/Symfony",
      "Twig",
      "JavaScript",
      "MySQL",
      "Redis",
      "Docker",
      "Typesense",
      "Auth0",
    ],
    highlights: [
      "Contributor on an enterprise-scale construction compliance platform active across Australia",
      "Feature development and performance work on a live, high-traffic system",
      "Critical issue diagnosis and resolution with zero disruption to live operations",
      "System integrates Auth0 SSO, MYOB accounting sync, and AU government APIs (Vicmap, SPEAR)",
      "Working within an established AU-based stakeholder and agency relationship",
    ],
    featured: true,
  },
  {
    slug: "laundry-platform",
    title: "Laundry Business Platform",
    tagline:
      "From a simple POS to a full multi-branch business operating system.",
    role: "Full-Stack Engineer",
    year: "2023 — Present",
    status: "live",
    problem:
      "A growing laundry business was running entirely on paper — transactions, payroll, attendance, inventory — all manual. There was no visibility across branches and no way to scale.",
    outcome:
      "Fully computerized operations across multiple branches. The business went from paper-based chaos to automated daily workflows. Zero major incidents since deployment in 2023.",
    stack: [
      "PHP/Laravel",
      "Quasar/Vue",
      "MySQL",
      "Electron",
      "Docker",
      "Java",
      "Websockets",
    ],
    highlights: [
      "Multi-branch architecture",
      "Biometric attendance integration",
      "OTA updates — web and desktop builds",
      "Payroll and cashflow tracking",
      "Role-based access control (RBAC)",
      "Inventory and business analytics",
    ],
    featured: true,
  },
  {
    slug: "consultare",
    title: "Consultare Inc. Group",
    tagline:
      "Contributed to an enterprise food-tech compliance platform across two tenures, alongside IT operations, infrastructure, and internal tooling work.",
    role: "Full-Stack Developer → Senior IT Coordinator",
    year: "2022 — 2024",
    status: "tenure-ended",
    company: "Consultare Inc.",
    problem:
      "A US-based food technology company needed to extend a multi-module enterprise compliance platform covering FDA-regulated processes — from food safety plans and supplier verification to inventory, formulation, and time tracking.",
    outcome:
      "Contributed key modules across two tenures as the sole developer on each. Progressed through three consecutive promotions. Platform remains live and in active use.",
    stack: ["PHP", "JavaScript", "jQuery", "MySQL"],
    highlights: [
      "First tenure: Service Logs, COA, Inventory, and Formulation modules",
      "Second tenure: HACCP, FSVP, and FS Plan modules",
      "Primary developer on each module — handled full-stack development, SME comms, and research",
      "Progressed from entry-level to Senior IT Coordinator across two stints",
      "Introduced version control and CI/CD pipelines to the team's workflow",
      "Authored IT SOPs for AWS server setup and management",
    ],
    featured: true,
  },
  {
    slug: "tollfast",
    title: "Tollfast",
    tagline:
      "Automated location-based toll payment — no cash, no RFID required.",
    role: "Developer — Team of 3",
    year: "2022",
    status: "completed",
    problem:
      "Cash and RFID toll payments created stop-and-wait friction for drivers. There was no seamless, automated alternative that worked without physical interaction.",
    outcome:
      "Reached the final exhibit of the MPTC Innovation Olympics and delivered a working app. Around the same time, our division sponsor CCLEX awarded our school a scholarship program.",
    stack: [
      "Mobile",
      "GCP",
      "Payment Integration",
      "NodeJS",
      "TypeScript",
      "ExpressJS",
      "Ionic/Vue",
    ],
    highlights: [
      "Competed in the MPTC Innovation Olympics — made it to the final exhibit",
      "Led a team of three from planning, through development, to exhibition",
      "Presented the Tollfast app to MPTC executives, highlighting its potential impact and technical innovation",
    ],
    images: [
      "/snapshots/tollfast/01.svg",
      "/snapshots/tollfast/02.svg",
      "/snapshots/tollfast/03.svg",
    ],
    featured: false,
  },
];

export const principles: Principle[] = [
  {
    number: "01",
    title: "Own what you ship.",
    body: "I don't ship because it passes a test. I ship because I understand the problem and the solution completely. Full ownership means full accountability — no handoffs, no excuses.",
  },
  {
    number: "02",
    title: "Simple first.",
    body: "Start with the simplest solution that solves the problem. Prove it works. Then optimize when reality demands it — not before. Complexity earned is complexity justified.",
  },
  {
    number: "03",
    title: "Think in what-ifs.",
    body: "I take the mind of the client or user and ask what-ifs before they hit production. Flexibility is designed in, not bolted on after something breaks.",
  },
  {
    number: "04",
    title: "Debt is a choice.",
    body: "Technical debt doesn't just happen. It's a decision made by someone who'd rather move fast than move right. I choose to move right — every time.",
  },
];
