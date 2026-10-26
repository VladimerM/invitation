import { config } from '../config'
import SectionHead from './SectionHead'
import { Phone } from './icons'

export default function Contact() {
  const { contact } = config
  return (
    <section className="section" id="contact">
      <div className="container container--narrow">
        <SectionHead kicker="Связь" title="Контакты" />
        <div className="contact-card" data-reveal>
          <p className="contact-text">{contact.text}</p>
          <div className="contact-person">
            <p className="contact-name">{contact.name}</p>
            <a className="contact-phone" href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>
              <Phone />
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
