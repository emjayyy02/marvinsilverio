import { projects } from './projectCatalog'
import { content } from './content'


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

export const portfolioData = {
  identity: {
    name: content.person.name,
    nickname: 'Mj',
    role: content.person.professionalTitle,
    description: content.person.heroSummary,
  },

  projects: projects.map((project) => ({
    id: project.slug,
    title: project.title,
    category: project.type,
    summary: project.summary,
    technologies: project.technologies,
    featured: project.featured,
  })),

  certifications: content.certifications.map((certification) => ({
    provider: certification.issuer,
    title: certification.name,
    issued: certification.issued,
  })),

  education: [
    {
      degree: content.education.degree,
      institution: content.education.school,
      location: content.education.location,
      period: content.education.period,
    },
  ],
};
