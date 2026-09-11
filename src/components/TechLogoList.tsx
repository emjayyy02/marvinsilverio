const logoSources: Record<string, string> = {
  n8n: '/icons/tech/n8n.svg',
  JavaScript: '/icons/tech/javascript.svg',
  TypeScript: '/icons/tech/typescript.svg',
  React: '/icons/tech/react.svg',
  HTML: '/icons/tech/html5.svg',
  CSS: '/icons/tech/css.svg',
  'Tailwind CSS': '/icons/tech/tailwindcss.svg',
  Vite: '/icons/tech/vite.svg',
  'Google Sheets': '/icons/tech/googlesheets.svg',
  Gmail: '/icons/tech/gmail.svg',
  OpenRouter: '/icons/tech/openrouter.svg',
  GitHub: '/icons/tech/github.svg',
  'Cloudflare Workers': '/icons/tech/cloudflareworkers.svg',
  Supabase: '/icons/tech/supabase.svg',
  Slack: '/icons/tech/slack.svg',
  Vercel: '/icons/tech/vercel.svg',
}

const fallbackLabels: Record<string, string> = {
  'HTTP APIs': 'API',
  Webhooks: 'WH',
  JSON: '{}',
  'Local Storage': 'LS',
  'Open-Meteo API': 'OM',
  Motion: 'MO',
  Lenis: 'LE',
  PostgreSQL: 'PG',
  Vitest: 'VT',
}

export function TechLogoList({
  technologies,
  label,
  compact = false,
}: {
  technologies: string[]
  label: string
  compact?: boolean
}) {
  return (
    <ul className={`flex flex-wrap items-center ${compact ? 'gap-3' : 'gap-2.5'}`} aria-label={label}>
      {technologies.map((technology) => {
        const source = logoSources[technology]

        return (
          <li key={technology}>
            <span
              role="img"
              aria-label={technology}
              title={technology}
              className={`${compact ? 'size-9' : 'size-10'} inline-flex items-center justify-center rounded-card border border-border bg-white p-1.5 shadow-card`}
            >
              {source ? (
                <img src={source} alt="" aria-hidden="true" className="size-full object-contain" loading="lazy" />
              ) : (
                <span aria-hidden="true" className="font-mono text-[0.58rem] font-semibold tracking-[-0.02em] text-neutral-700">
                  {fallbackLabels[technology] ?? technology.slice(0, 2).toUpperCase()}
                </span>
              )}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
