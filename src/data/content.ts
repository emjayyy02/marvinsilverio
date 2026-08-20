export type ContactIconName = 'email' | 'linkedin' | 'instagram'

export type SkillIconName =
  | 'react'
  | 'tailwind'
  | 'supabase'
  | 'html'
  | 'css'
  | 'javascript'
  | 'zapier'
  | 'n8n'
  | 'microsoft365'
  | 'googleWorkspace'

export interface ContactLink {
  label: string
  href: string
  icon: ContactIconName
}

export interface SkillGroup {
  title: string
  items: {
    label: string
    icon: SkillIconName
  }[]
}

export interface FeaturedBuild {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  tags: string[]
  status: string
  sourceHref: string
  caseStudy: {
    label: string
    body: string
  }[]
}

export interface ProjectPreview {
  title: string
  tags: string[]
  status: string
}

export interface Certification {
  name: string
  issuer: string
}

export interface ChatWidgetContent {
  triggerLabel: string
  heading: string
  description: string
  closeLabel: string
}

export const content = {
  person: {
    name: 'Marvin Silverio',
    wordmark: 'Marvin',
    positioning: 'Software development + workflow automation',
    summary: [
      "I build responsive software interfaces and workflow automations that turn repetitive operations into reliable tools. I'm currently deepening my React, Tailwind CSS, and Supabase stack while specializing in automation with Zapier and n8n.",
    ],
    mascotSrc: '/images/tarsier-pixel-v2.png?v=2',
    mascotAlt: 'A grayscale pixel-art Philippine tarsier mascot with large round eyes.',
  },
  navigation: [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],
  skills: [
    {
      title: 'Web Dev',
      items: [
        { label: 'React', icon: 'react' },
        { label: 'Tailwind CSS', icon: 'tailwind' },
        { label: 'Supabase', icon: 'supabase' },
        { label: 'HTML', icon: 'html' },
        { label: 'CSS', icon: 'css' },
        { label: 'JavaScript', icon: 'javascript' },
      ],
    },
    {
      title: 'Automation',
      items: [
        { label: 'Zapier', icon: 'zapier' },
        { label: 'n8n', icon: 'n8n' },
      ],
    },
    {
      title: 'Productivity',
      items: [
        { label: 'Microsoft 365', icon: 'microsoft365' },
        { label: 'Google Workspace', icon: 'googleWorkspace' },
      ],
    },
  ] satisfies SkillGroup[],
  featuredBuild: {
    title: 'Personal developer portfolio',
    description: 'A focused React portfolio rebuilt from a visual audit, with clearer hierarchy, responsive behavior, accessible motion, and one maintainable source for content.',
    imageSrc: '/images/portfolio-build-preview.png',
    imageAlt: 'The portfolio Hero rendered at desktop width in light mode.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
    status: 'Currently building',
    sourceHref: 'https://github.com/silveriomarvin3-sys/personal-developer-profile',
    caseStudy: [
      {
        label: 'Problem',
        body: 'Working code still produced an unclear first impression and exposed content that was not ready to publish.',
      },
      {
        label: 'Approach',
        body: 'Repair the highest-impact issues first, then accept changes only after reviewing the rendered experience at real viewport widths.',
      },
      {
        label: 'Current state',
        body: 'The portfolio now keeps its identity, theme behavior, responsive layout, content source, and documentation in agreement.',
      },
      {
        label: 'Lesson',
        body: 'A passing build confirms compilation; browser review confirms whether a visitor can see, understand, and trust the result.',
      },
    ],
  } satisfies FeaturedBuild,
  projects: [
    {
      title: 'Project placeholder 01',
      tags: ['Web development', 'Details coming soon'],
      status: 'Placeholder',
    },
    {
      title: 'Project placeholder 02',
      tags: ['Workflow automation', 'Details coming soon'],
      status: 'Placeholder',
    },
  ] satisfies ProjectPreview[],
  certifications: [
    { name: 'n8n Level Certification', issuer: 'n8n' },
    { name: 'Airtable Academy', issuer: 'Airtable' },
  ] satisfies Certification[],
  contacts: [
    { label: 'Email', href: 'mailto:beefmarvin@gmail.com', icon: 'email' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/silveriomarvin1emj', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/_emm.jayyy/', icon: 'instagram' },
  ] satisfies ContactLink[],
  chat: {
    triggerLabel: 'Contact Marvin',
    heading: 'Choose a channel.',
    description: 'There is no bot here—just three direct ways to reach me.',
    closeLabel: 'Close contact panel',
  } satisfies ChatWidgetContent,
} as const
