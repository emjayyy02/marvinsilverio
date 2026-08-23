import { content } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-24 pt-9 text-sm sm:px-8 sm:pb-20 sm:pt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-8">
        <div>
          <div className="space-y-1 text-muted-foreground" aria-label="Personal philosophy">
            {content.footer.philosophy.map((line) => (
              <p key={line} className="italic leading-6">{line}</p>
            ))}
          </div>

          <p className="mt-6 flex flex-wrap items-baseline gap-x-2 leading-6 text-muted-foreground">
            <span className="whitespace-nowrap font-medium text-foreground">{content.footer.name}</span>
            <span className="whitespace-nowrap">/ {content.footer.line}</span>
            <span className="whitespace-nowrap">/ {content.footer.location}</span>
          </p>
        </div>

        <p className="text-muted-foreground lg:self-end lg:text-right">{content.footer.copyright}</p>
      </div>
    </footer>
  )
}
