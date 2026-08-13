import { content } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 pb-20 pt-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-7">
        <p>{content.person.name} <span aria-hidden="true">·</span> © {year}</p>
        <p className="font-mono text-xs uppercase tracking-[0.1em]">React / TypeScript / Tailwind</p>
      </div>
    </footer>
  )
}
