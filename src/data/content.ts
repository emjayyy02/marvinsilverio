export type ContactIconName = 'email' | 'linkedin' | 'instagram'

export interface ContactLink {
  label: string
  href: string
  icon: ContactIconName
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Project {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  imageCaption: string
  tags: string[]
  status: string
  details: {
    label: string
    body: string
  }[]
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
    { title: 'Web Dev', items: ['React', 'Tailwind CSS', 'Supabase', 'HTML', 'CSS', 'JavaScript'] },
    { title: 'Automation', items: ['Zapier', 'n8n'] },
    { title: 'Productivity', items: ['Microsoft 365', 'Google Workspace'] },
  ] satisfies SkillGroup[],
  projects: [
    {
      title: 'Personal developer portfolio',
      description: 'This site is the project: a React portfolio being rebuilt from a visual audit that proved working code is not the same as a clear, credible experience.',
      imageSrc: '/images/portfolio-build-preview.png',
      imageAlt: 'The portfolio Hero rendered at desktop width in light mode.',
      imageCaption: 'Working build / 1440px browser review / light theme',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
      status: 'Currently building',
      details: [
        {
          label: 'Problem',
          body: 'The previous revision kept an outdated centered Hero, exposed placeholder work, and shipped signature motion that was technically present but visually easy to miss.',
        },
        {
          label: 'Approach',
          body: 'Correct the highest-impact failures first, then review the rendered result at real viewport widths and in the target browser before accepting any item.',
        },
        {
          label: 'Current state',
          body: 'The Hero, mascot, theme transition, content truth, responsive behavior, and documentation are being brought back into agreement.',
        },
        {
          label: 'Lesson',
          body: 'A passing build confirms that code compiles. It does not confirm that a visitor can see, understand, or trust the experience.',
        },
      ],
    },
  ] satisfies Project[],
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
