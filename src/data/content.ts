export type ContactIconName = 'email' | 'linkedin' | 'instagram'

export interface ContactLink {
  label: string
  href: string
  icon: ContactIconName
}

export interface Certification {
  name: string
  issuer: string
}

export interface Education {
  period: string
  degree: string
  school: string
  location: string
}

export interface ChatWidgetContent {
  triggerLabel: string
  heading: string
  description: string
  closeLabel: string
}

export interface ProfileImageContent {
  src: string | null
  alt: string
}

const portfolioEmail = 'marvinsilverio.dev@gmail.com'
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioEmail}`

export const content = {
  person: {
    name: 'Marvin Silverio',
    professionalTitle: 'Automation Engineer & Frontend Developer',
    heroSummary: 'I build workflow automations and web interfaces that turn repetitive processes into reliable, usable systems. My current work focuses on n8n, JavaScript, AI-assisted workflows, APIs, and modern frontend development.',
    profileImage: {
      src: '/images/marvin-silverio-profile.jpg' as string | null,
      alt: 'Portrait of Marvin Silverio',
    } satisfies ProfileImageContent,
    resumeUrl: null as string | null,
    primaryAction: {
      label: 'View Projects',
      href: '/#projects',
    },
  },
  navigation: [
    { label: 'Projects', href: '/#projects' },
    { label: 'Capabilities', href: '/skills' },
    { label: 'Contact', href: '/#contact' },
  ],
  sections: {
    featuredBuild: {
      eyebrow: '02 / Featured build',
      title: 'AI assistance with deterministic control.',
      description: 'A support-operations workflow that uses an LLM for interpretation while keeping validation, routing, review policy, and failure handling inside the workflow.',
    },
    projects: {
      eyebrow: '03 / Selected projects',
      title: 'Selected projects.',
      description: 'A few recent builds across automation and frontend work. Explore the full archive for more.',
    },
    skills: {
      eyebrow: '04 / Tools & capabilities',
      title: 'Tools in practice.',
      description: 'A growing toolkit shaped by the systems and interfaces I build.',
      detail: "Explore the full set of technologies and tools I've worked with.",
    },
    certifications: {
      eyebrow: '05 / Certifications',
      title: 'Credentials, listed plainly.',
      description: 'A direct record of learning credentials without ratings, progress bars, or decorative badges.',
    },
    education: {
      eyebrow: '05 / Education',
      title: 'Education.',
    },
    contact: {
      eyebrow: '06 / Contact',
      title: 'Start a conversation.',
      description: 'Choose the channel that works best for you.',
      panelCopy: 'Choose a channel.',
    },
  },
  certifications: [] as Certification[],
  education: {
    period: '2025 — 2029',
    degree: 'Bachelor of Science in Information Systems',
    school: 'Dr. Filemon C. Aguilar Memorial College of Las Piñas',
    location: 'Las Piñas City, Philippines',
  } satisfies Education,
  contacts: [
    { label: 'Email', href: gmailComposeUrl, icon: 'email' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/silveriomarvin1emj', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/_emm.jayyy/', icon: 'instagram' },
  ] satisfies ContactLink[],
  chat: {
    triggerLabel: 'Contact Marvin',
    heading: 'Choose a channel.',
    description: 'Reach me through any of these.',
    closeLabel: 'Close contact panel',
  } satisfies ChatWidgetContent,
  footer: {
    philosophy: [
      'Obsession beats talent.',
      'Discipline outlasts obsession.',
    ],
    name: 'Marvin Silverio',
    line: 'Keep going',
    location: 'Las Piñas City, PH',
    copyright: '© 2026 All rights reserved.',
  },
} as const
