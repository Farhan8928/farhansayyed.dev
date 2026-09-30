import { Receipt, Row, Rule } from '../components/Receipt.jsx'
import CopyPitch from '../components/CopyPitch.jsx'
import { profile, contact } from '../data/profile.js'

// The last receipt is the invoice: one conversation.
export default function Contact() {
  return (
    <section id="contact" className="container-x scroll-mt-28 pb-20 pt-20 md:pt-28">
      <div className="grid gap-12 border-t border-ink pt-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="label">Contact</p>
          <h2 className="serif-hero mt-3 !text-[clamp(2.6rem,6.4vw,5.4rem)]">
            Keep the <span className="marker">receipt.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-soft">
            Send me the role and the stack. I reply the same day, and I will tell you straight if it is not a fit.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 no-print">
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-solid">Message me on WhatsApp</a>
            <a href={contact.mailto} className="btn">Email me</a>
            <CopyPitch />
          </div>
        </div>

        <div className="lg:col-span-5">
          <Receipt className="mx-auto max-w-sm">
            <p className="text-center text-[14px] font-medium uppercase tracking-[0.2em]">{profile.name}</p>
            <p className="text-center text-ink-mute">{profile.title} · {profile.city}</p>
            <Rule />
            <Row k="1 × conversation" v="free" />
            <Row k="Reply time" v="same day" />
            <Row k="Notice period" v="30 days" />
            <Row k="Regions" v={profile.availability.regions.join(' · ')} />
            <Rule />
            <Row k="WhatsApp" v={contact.whatsappLabel} href={contact.whatsapp} external />
            <Row k="Email" v="farhan.sayyed.tech@gmail" href={contact.mailto} />
            <Row k="LinkedIn" v="in/farhan-sayyed" href={profile.social.linkedin} external />
            <Row k="GitHub" v="Farhan8928" href={profile.social.github} external />
            <Row k="Resume" v={`PDF · ${profile.resume.updated}`} href={profile.resume.path} />
            <Rule />
            <Row k="Amount due" v="one conversation" strong />
            <div className="barcode mt-6" aria-hidden />
            <p className="mt-2 text-center tracking-[0.3em]">{profile.phoneDisplay}</p>
            <p className="mt-4 text-center text-ink-mute">Thank you. Every number on this page comes from a measured run.</p>
          </Receipt>
        </div>
      </div>
    </section>
  )
}
