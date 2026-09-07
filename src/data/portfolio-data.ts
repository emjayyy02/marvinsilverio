import { projects } from './projectCatalog'
import { content } from './content'
import { currentSkillCategories } from './skills'

export interface PortfolioProject {
  id: string
  title: string
  category: string
  summary: string
  technologies: string[]
  featured?: boolean
}

export interface PortfolioCertification {
  provider: string
  title: string
  issued: string
}

export interface PortfolioEducation {
  degree: string
  institution: string
  location?: string
  period: string
}

export interface PortfolioPersonalContext {
  age?: number
  location?: string
  currentStatus?: string
  interests?: string[]
  goals?: string[]
}

export interface PortfolioSkill {
  name: string
  description: string
}

export interface PortfolioSkillCategory {
  category: string
  skills: PortfolioSkill[]
}

export interface PortfolioData {
  identity: {
    name: string
    nickname: string
    role: string
    description: string
  }

  projects: PortfolioProject[]
  skills: PortfolioSkillCategory[]
  certifications: PortfolioCertification[]
  education: PortfolioEducation[]
  personalContext: PortfolioPersonalContext
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
    technologies: project.cardTechnologies,
    featured: project.featured,
  })),

  skills: currentSkillCategories.map((category) => ({
    category: category.title,
    skills: category.skills.map((skill) => ({
      name: skill.name,
      description: skill.description,
    })),
  })),

  certifications: content.certifications.map((certification) => ({
    provider: certification.issuer,
    title: certification.name,
    issued: certification.issued,
  })),

  personalContext: {
  age: 19,
  location: 'Las Piñas City, Philippines',
  currentStatus: 'College student studying Information Systems',
  interests: [
    'web development',
    'workflow automation',
    'AI-assisted systems',
  ],
  goals: [
    'grow into automation engineering',
    'deepen full-stack development skills',
  ],
},

  education: [
    {
      degree: content.education.degree,
      institution: content.education.school,
      location: content.education.location,
      period: content.education.period,
    },
  ],
} satisfies PortfolioData