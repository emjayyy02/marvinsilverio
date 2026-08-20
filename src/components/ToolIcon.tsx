import type { ReactNode } from 'react'
import type { SkillIconName } from '../data/content'

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.45,
}

export function ToolIcon({ name, className = 'size-6' }: { name: SkillIconName; className?: string }) {
  const icons: Record<SkillIconName, ReactNode> = {
    react: (
      <>
        <ellipse cx="12" cy="12" rx="9" ry="3.6" {...strokeProps} />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" {...strokeProps} />
        <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" {...strokeProps} />
        <circle cx="12" cy="12" r="1.45" fill="currentColor" />
      </>
    ),
    tailwind: (
      <>
        <path d="M3 9.5c2.1-3 4.4-4.2 6.9-3.6 1.9.5 3.1 2.3 4.5 2.5 2 .4 3.9-.5 5.6-2.6-1.2 4.1-3.5 6.1-6.8 5.7-2.1-.2-3.2-2.2-4.8-2.5-1.9-.3-3.7.2-5.4 1.5Z" {...strokeProps} />
        <path d="M4 15.7c2-2.7 4.2-3.7 6.5-3.1 1.8.5 2.8 2.1 4.2 2.4 1.9.4 3.6-.4 5.3-2.2-1.2 3.8-3.4 5.5-6.4 5.1-1.9-.3-3-2-4.5-2.3-1.8-.3-3.5.1-5.1 1.1Z" {...strokeProps} />
      </>
    ),
    supabase: (
      <>
        <path d="m13.5 2.8-8.1 11h6.8l-1.7 7.4 8.1-11h-6.8l1.7-7.4Z" {...strokeProps} />
        <path d="M5.4 13.8h6.8" {...strokeProps} />
      </>
    ),
    html: (
      <>
        <path d="M4.4 3.5h15.2L18.2 20 12 21.8 5.8 20 4.4 3.5Z" {...strokeProps} />
        <path d="M8 8h8l-.4 3.4H8.4l.4 4.1 3.2.9 3.2-.9.2-1.7" {...strokeProps} />
      </>
    ),
    css: (
      <>
        <path d="M4.4 3.5h15.2L18.2 20 12 21.8 5.8 20 4.4 3.5Z" {...strokeProps} />
        <path d="M8.1 8h8l-.3 3H9l.3 3.8 2.7.8 2.8-.8.2-1.6" {...strokeProps} />
      </>
    ),
    javascript: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="1.5" {...strokeProps} />
        <path d="M10.6 8.3v6.3c0 1.4-.7 2.1-2 2.1-.7 0-1.3-.2-1.7-.7M13.3 15.7c.6.7 1.3 1 2.1 1 1 0 1.7-.5 1.7-1.3 0-.9-.7-1.2-1.9-1.7-1.1-.4-1.8-1.1-1.8-2.3 0-1.3 1-2.2 2.5-2.2.8 0 1.5.2 2 .7" {...strokeProps} />
      </>
    ),
    zapier: (
      <>
        <path d="M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21M5.6 5.6l3.9 3.9M14.5 14.5l3.9 3.9M18.4 5.6l-3.9 3.9M9.5 14.5l-3.9 3.9" {...strokeProps} />
        <circle cx="12" cy="12" r="2.4" {...strokeProps} />
      </>
    ),
    n8n: (
      <>
        <path d="M5.5 7.5 10 11m4 2 4.5 3.5M10 13l-4.5 3.5M14 11l4.5-3.5" {...strokeProps} />
        <circle cx="4" cy="6.5" r="2" {...strokeProps} />
        <circle cx="4" cy="17.5" r="2" {...strokeProps} />
        <circle cx="12" cy="12" r="2.5" {...strokeProps} />
        <circle cx="20" cy="6.5" r="2" {...strokeProps} />
        <circle cx="20" cy="17.5" r="2" {...strokeProps} />
      </>
    ),
    microsoft365: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" {...strokeProps} />
        <rect x="13.5" y="3.5" width="7" height="7" {...strokeProps} />
        <rect x="3.5" y="13.5" width="7" height="7" {...strokeProps} />
        <rect x="13.5" y="13.5" width="7" height="7" {...strokeProps} />
      </>
    ),
    googleWorkspace: (
      <>
        <path d="M12 3.5a8.5 8.5 0 1 0 5.9 14.6" {...strokeProps} />
        <path d="M12 12h8.5v5.5M16.2 8.2 20 12l-3.8 3.8" {...strokeProps} />
      </>
    ),
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>{icons[name]}</svg>
}
