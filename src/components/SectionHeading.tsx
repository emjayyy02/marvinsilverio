export function SectionHeading({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="section-kicker font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>}
    </div>
  )
}
