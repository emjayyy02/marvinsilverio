import type { ContactIconName } from '../data/content'

interface IconProps {
  name: ContactIconName | 'sun' | 'moon' | 'menu' | 'close' | 'arrow' | 'arrowLeft' | 'arrowUp' | 'message' | 'image' | 'check'
  className?: string
}

const sharedProps = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export function Icon({ name, className = 'size-4' }: IconProps) {
  const paths = {
    email: <><rect x="3" y="5" width="18" height="14" rx="2" {...sharedProps} /><path d="m4 7 8 6 8-6" {...sharedProps} /></>,
    linkedin: <><rect x="4" y="4" width="16" height="16" rx="2" {...sharedProps} /><path d="M8 10v6M8 7.5v.01M12 16v-3.5a2.5 2.5 0 0 1 5 0V16M12 10v6" {...sharedProps} /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" {...sharedProps} /><circle cx="12" cy="12" r="4" {...sharedProps} /><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" /></>,
    sun: <><circle cx="12" cy="12" r="3.5" {...sharedProps} /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" {...sharedProps} /></>,
    moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" {...sharedProps} />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" {...sharedProps} />,
    close: <path d="m6 6 12 12M18 6 6 18" {...sharedProps} />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" {...sharedProps} />,
    arrowLeft: <path d="M19 12H5m6 6-6-6 6-6" {...sharedProps} />,
    arrowUp: <path d="M12 19V5m-6 6 6-6 6 6" {...sharedProps} />,
    message: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.4-.68L4 20l1.47-4A7.5 7.5 0 1 1 20 11.5Z" {...sharedProps} /><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" {...sharedProps} /></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" {...sharedProps} /><circle cx="8.5" cy="9" r="1.5" {...sharedProps} /><path d="m5 17 4.5-4 3.25 2.75L15.5 13l3.5 4" {...sharedProps} /></>,
    check: <path d="m6.5 12.5 3.3 3.3 7.7-8" {...sharedProps} />,
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>{paths[name]}</svg>
}
