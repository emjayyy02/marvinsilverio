export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  featured?: boolean;
  workflow?: string[];
}

export interface PortfolioCertification {
  provider: string;
  title: string;
  issued: string;
  credentialUrl?: string;
}

export interface PortfolioEducation {
  degree: string;
  institution: string;
  location?: string;
  period: string;
}

export interface PortfolioData {
  identity: {
    name: string;
    nickname: string;
    role: string;
    description: string;
  };
  projects: PortfolioProject[];
  certifications: PortfolioCertification[];
  education: PortfolioEducation[];
}

export const portfolioData: PortfolioData = {
  identity: {
    name: "Marvin Silverio",
    nickname: "Mj",
    role: "Technical VA / Automation Specialist",
    description:
      "I build automation workflows, API-connected systems, and practical web interfaces.",
  },

  projects: [
    {
      id: "ai-support-operations",
      title: "AI Support Operations Triage System",
      category: "AI-Assisted Automation",
      summary:
        "Turns unstructured support requests into validated records while keeping consequential decisions under deterministic control.",
      technologies: ["n8n", "AI", "Google Sheets"],
      featured: true,
      workflow: [
        "Classify",
        "Validate",
        "Review",
        "Route",
        "Draft",
      ],
    },

    {
      id: "invoice-collections",
      title: "Invoice Collections Automation",
      category: "Automation Workflow",
      summary:
        "Automates invoice intake, validation, discrepancy checks, and priority routing.",
      technologies: [
        "n8n",
        "Webhooks",
        "Google Sheets",
        "Gmail",
        "HTTP APIs",
      ],
    },

    {
      id: "workflow-operations-manager",
      title: "Workflow Operations Manager",
      category: "JavaScript Application",
      summary:
        "A lightweight operations dashboard powered by stored data, derived metrics, and workflow controls.",
      technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
    },

    {
      id: "novatech-solutions",
      title: "NovaTech Solutions",
      category: "Fictional Automation Agency",
      summary:
        "A responsive automation-agency website focused on clear service positioning, conversion flow, and polished frontend interaction.",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
  ],

  certifications: [
    {
      provider: "n8n Academy",
      title: "In Practice: AI, Tooling & Best Practices",
      issued: "Aug 2026",
    },
  ],

  education: [
    {
      degree: "Bachelor of Science in Information Systems",
      institution: "DFCAMCLP",
      period: "2025–2029",
    },
  ],
};
