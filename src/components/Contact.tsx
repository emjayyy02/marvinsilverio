import { content } from '../data/content'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Contact() {
  const section = content.sections.contact

  return (
    <section id="contact" className="bg-surface" aria-labelledby="contact-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-14 lg:py-20">
        <Reveal>
          <SectionHeading id="contact-heading" eyebrow={section.eyebrow} title={section.title} description={section.description} />
        </Reveal>
        <Reveal delay={0.18}>
          <div className="pixel-panel bg-primary p-6 text-primary-foreground sm:p-8">
            <p className="text-xl font-medium tracking-[-0.03em]">{section.panelCopy}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {content.contacts.map((contact) => (
                <a key={contact.label} href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="interactive-control contact-channel group flex min-h-11 items-center justify-between overflow-hidden border border-primary-foreground/30 px-4 py-4 text-sm font-medium text-primary-foreground">
                  <span className="flex items-center gap-3"><Icon name={contact.icon} className="size-5" />{contact.label}</span>
                  <Icon name="arrow" className="contact-channel-arrow size-4" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
