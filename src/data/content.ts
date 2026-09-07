export type ContactIconName = 'email' | 'linkedin' | 'instagram'

export interface ContactLink {
  label: string
  href: string
  icon: ContactIconName
}

export interface Certification {
  name: string
  issuer: string
  issued: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
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
  greeting: string
  inputPlaceholder: string
  thinkingMessage: string
  errorMessage: string
  timeoutErrorMessage: string
  rateLimitErrorMessage: string
  interruptedErrorMessage: string
  retryLabel: string
  newConversationLabel: string
  closeLabel: string
  avatar: {
    src: string
    alt: string
  }
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
    professionalTitle: 'Technical VA / Automation Specialist',
    heroSummary: 'I build workflow automations and web interfaces that turn repetitive processes into reliable, usable systems. My current work focuses on n8n, JavaScript, AI-assisted workflows, APIs, and modern frontend development. Test sync: portfolio knowledge pipeline active.',
    profileImage: {
      src: '/images/marvin-silverio-profile.jpg' as string | null,
      alt: 'Portrait of Marvin Silverio',
    } satisfies ProfileImageContent,
    resumeUrl: '/Marvin_Silverio_Resume.pdf' as string | null,
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
      architecture: 'Classify → Validate → Review → Route → Draft',
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
      title: 'Certifications.',
    },
    education: {
      eyebrow: '06 / Education',
      title: 'Education.',
    },
    contact: {
      eyebrow: '07 / Contact',
      title: 'Have an idea worth building?',
      description: "Let's turn it into something that works.",
      panelCopy: 'Choose a channel.',
    },
  },
  certifications: [
    {
      name: 'In Practice: AI, Testing & Best Practices',
      issuer: 'n8n Academy',
      issued: 'Aug 2026',
      image: {
        src: '/images/n8n-academy-ai-testing-best-practices-certificate.png',
        alt: 'n8n Academy certificate for In Practice: AI, Testing & Best Practices',
        width: 1123,
        height: 799,
      },
    },
  ] satisfies Certification[],
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
    triggerLabel: 'Need a hand?',
    heading: 'M',
    description: 'Portfolio assistant',
    greeting: "Hey! I'm M. I can help you explore Marvin's projects, skills, and experience.",
    inputPlaceholder: 'Ask M something...',
    thinkingMessage: 'M is thinking...',
    errorMessage: "M couldn't respond right now. Please try again.",
    timeoutErrorMessage: 'M took too long to respond. Please try again.',
    rateLimitErrorMessage: 'M needs a quick breather. Try again in a moment.',
    interruptedErrorMessage: "M's response was interrupted. Please try again.",
    retryLabel: 'Retry',
    newConversationLabel: 'New conversation',
    closeLabel: 'Close assistant',
    avatar: {
      src: '/images/m-assistant-avatar.jpg',
      alt: 'M assistant avatar',
    },
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
