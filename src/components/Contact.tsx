import { content } from '../data/content'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:gap-16 lg:py-24">
        <Reveal>
          <SectionHeading id="contact-heading" eyebrow="03 / Contact" title="Start with a real conversation." description="For a conversation about web development, workflows, or a project, reach out through any of these channels." />
        </Reveal>
        <Reveal delay={0.18}>
          <div className="pixel-panel bg-primary p-6 text-primary-foreground sm:p-8">
            <p className="max-w-lg text-xl leading-8">No chatbot and no form funnel. Choose the channel that suits you and the message goes directly to Marvin.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {content.contacts.map((contact) => (
                <a key={contact.label} href={contact.href} target={contact.href.startsWith('http') ? '_blank' : undefined} rel={contact.href.startsWith('http') ? 'noreferrer' : undefined} className="interactive-control group flex min-h-11 items-center justify-between border border-primary-foreground/30 px-4 py-4 text-sm font-medium text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <span className="flex items-center gap-3"><Icon name={contact.icon} className="size-5" />{contact.label}</span>
                  <Icon name="arrow" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
