import type { SkillLogo } from '../data/skills'

export function ToolIcon({ logo, className = 'size-6' }: { logo: SkillLogo; className?: string }) {
  if (logo.kind === 'brand') {
    return <img src={logo.src} alt="" aria-hidden="true" className={`${className} object-contain`} loading="lazy" />
  }

  return (
    <span aria-hidden="true" className={`${className} inline-flex items-center justify-center font-mono text-[0.55rem] font-semibold tracking-[-0.04em] text-neutral-700`}>
      {logo.mark}
    </span>
  )
}
