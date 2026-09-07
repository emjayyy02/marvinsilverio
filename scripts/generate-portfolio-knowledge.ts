import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { portfolioData } from '../src/data/portfolio-data'

function generatePortfolioKnowledge() {
  const lines: string[] = []

  lines.push('# Portfolio Knowledge')
  lines.push('')

  lines.push('## Identity')
  lines.push(`Name: ${portfolioData.identity.name}`)
  lines.push(`Nickname: ${portfolioData.identity.nickname}`)
  lines.push(`Role: ${portfolioData.identity.role}`)
  lines.push(`Summary: ${portfolioData.identity.description}`)
  lines.push('')

  lines.push('## Projects')
  lines.push('')

  for (const project of portfolioData.projects) {
    lines.push(`### ${project.title}`)
    lines.push(`Type: ${project.category}`)
    lines.push(`Summary: ${project.summary}`)
    lines.push(`Technologies: ${project.technologies.join(', ')}`)

    if (project.featured) {
      lines.push('Featured: Yes')
    }

    lines.push('')
  }

lines.push('## Skills & Capabilities')
lines.push('')

for (const category of portfolioData.skills) {
  lines.push(`### ${category.category}`)

  for (const skill of category.skills) {
    lines.push(`- ${skill.name}: ${skill.description}`)
  }

  lines.push('')
}

  lines.push('## Certifications')
  lines.push('')

  for (const certification of portfolioData.certifications) {
    lines.push(`### ${certification.title}`)
    lines.push(`Provider: ${certification.provider}`)
    lines.push(`Issued: ${certification.issued}`)
    lines.push('')
  }

  lines.push('## Education')
  lines.push('')

  for (const education of portfolioData.education) {
    lines.push(`### ${education.degree}`)
    lines.push(`Institution: ${education.institution}`)
    lines.push(`Period: ${education.period}`)

    if (education.location) {
      lines.push(`Location: ${education.location}`)
    }

    lines.push('')
  }

  lines.push('## Personal Context')
lines.push('')

if (portfolioData.personalContext.age) {
  lines.push(`Age: ${portfolioData.personalContext.age}`)
}

if (portfolioData.personalContext.location) {
  lines.push(`Location: ${portfolioData.personalContext.location}`)
}

if (portfolioData.personalContext.currentStatus) {
  lines.push(`Current status: ${portfolioData.personalContext.currentStatus}`)
}

  return lines.join('\n')
}

const outputPath = resolve(
  process.cwd(),
  'portfolio-generated.md',
)

writeFileSync(
  outputPath,
  generatePortfolioKnowledge(),
  'utf8',
)

console.log(`Generated portfolio knowledge at ${outputPath}`)
