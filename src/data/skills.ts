export type SkillStatus = 'current' | 'learning' | 'planned'

export type SkillLogo =
  | { kind: 'brand'; src: string }
  | { kind: 'concept'; mark: string }

export interface Skill {
  id: string
  name: string
  description: string
  status: SkillStatus
  logo: SkillLogo
}

export interface SkillCategory {
  id: string
  title: string
  skills: Skill[]
}

const brand = (src: string): SkillLogo => ({ kind: 'brand', src: `/icons/tech/${src}.svg` })
const concept = (mark: string): SkillLogo => ({ kind: 'concept', mark })

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { id: 'html', name: 'HTML', description: 'Semantic page structure', status: 'current', logo: brand('html5') },
      { id: 'css', name: 'CSS', description: 'Responsive interface styling', status: 'current', logo: brand('css') },
      { id: 'javascript', name: 'JavaScript', description: 'Browser logic and interaction', status: 'current', logo: brand('javascript') },
      { id: 'react', name: 'React', description: 'Component-based interfaces', status: 'current', logo: brand('react') },
      { id: 'typescript', name: 'TypeScript', description: 'Typed application code', status: 'current', logo: brand('typescript') },
      { id: 'tailwind-css', name: 'Tailwind CSS', description: 'Utility-first interface systems', status: 'current', logo: brand('tailwindcss') },
      { id: 'vite', name: 'Vite', description: 'Frontend build tooling', status: 'current', logo: brand('vite') },
    ],
  },
  {
    id: 'programming',
    title: 'Programming',
    skills: [
      { id: 'python', name: 'Python', description: 'Scripts and automation logic', status: 'current', logo: brand('python') },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    skills: [
      { id: 'n8n', name: 'n8n', description: 'Workflow automation', status: 'current', logo: brand('n8n') },
      { id: 'zapier', name: 'Zapier', description: 'App-to-app workflows', status: 'current', logo: brand('zapier') },
    ],
  },
  {
    id: 'ai-llm-workflows',
    title: 'AI / LLM Workflows',
    skills: [
      { id: 'openrouter', name: 'OpenRouter', description: 'LLM routing and integration', status: 'current', logo: brand('openrouter') },
      { id: 'llm-integrations', name: 'LLM integrations', description: 'Model-assisted workflows', status: 'current', logo: concept('LLM') },
      { id: 'prompt-engineering', name: 'Prompt Engineering', description: 'Task-focused model instructions', status: 'current', logo: concept('PR') },
      { id: 'structured-output', name: 'Structured Output / JSON Schema', description: 'Validated model responses', status: 'current', logo: concept('{}') },
    ],
  },
  {
    id: 'apis-data',
    title: 'APIs & Data',
    skills: [
      { id: 'http', name: 'HTTP', description: 'Web request fundamentals', status: 'current', logo: concept('HTTP') },
      { id: 'webhooks', name: 'Webhooks', description: 'Event-driven integrations', status: 'current', logo: concept('WH') },
      { id: 'rest-apis', name: 'REST APIs', description: 'Service integration', status: 'current', logo: concept('API') },
      { id: 'json', name: 'JSON', description: 'Structured data exchange', status: 'current', logo: concept('{}') },
    ],
  },
  {
    id: 'business-tools',
    title: 'Business Tools',
    skills: [
      { id: 'google-sheets', name: 'Google Sheets', description: 'Operational data and tracking', status: 'current', logo: brand('googlesheets') },
      { id: 'gmail', name: 'Gmail', description: 'Email workflow integration', status: 'current', logo: brand('gmail') },
      { id: 'google-workspace', name: 'Google Workspace', description: 'Collaborative business tools', status: 'current', logo: brand('googleworkspace') },
      { id: 'microsoft-365', name: 'Microsoft 365', description: 'Documents and productivity', status: 'current', logo: brand('microsoft365') },
    ],
  },
  {
    id: 'design-build-tools',
    title: 'Design / Build Tools',
    skills: [
      { id: 'canva', name: 'Canva', description: 'Visual asset creation', status: 'current', logo: brand('canva') },
      { id: 'supabase', name: 'Supabase', description: 'Backend application services', status: 'current', logo: brand('supabase') },
    ],
  },
  {
    id: 'development-tools',
    title: 'Development Tools & Version Control',
    skills: [
      { id: 'git', name: 'Git', description: 'Version control', status: 'current', logo: brand('git') },
      { id: 'github', name: 'GitHub', description: 'Source collaboration', status: 'current', logo: brand('github') },
      { id: 'visual-studio-code', name: 'Visual Studio Code', description: 'Code editing', status: 'current', logo: brand('vscode') },
      { id: 'npm', name: 'npm', description: 'Package management', status: 'current', logo: brand('npm') },
    ],
  },
  {
    id: 'application-concepts',
    title: 'Application Concepts',
    skills: [
      { id: 'local-storage', name: 'Local Storage', description: 'Browser-side persistence', status: 'current', logo: concept('LS') },
    ],
  },
]

export const currentSkillCategories = skillCategories
  .map((category) => ({
    ...category,
    skills: category.skills.filter((skill) => skill.status === 'current'),
  }))
  .filter((category) => category.skills.length > 0)

const currentSkillsById = new Map(
  currentSkillCategories.flatMap((category) => category.skills.map((skill) => [skill.id, { ...skill, category: category.title }] as const)),
)

const homepageSkillIds = [
  'n8n',
  'javascript',
  'react',
  'typescript',
  'html',
  'css',
  'tailwind-css',
  'github',
  'google-sheets',
  'openrouter',
  'webhooks',
] as const

export const homepageSkills = homepageSkillIds.map((id) => {
  const skill = currentSkillsById.get(id)
  if (!skill) throw new Error(`Missing current homepage skill: ${id}`)
  return skill
})
