import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, MessageCircle } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { profile, contact } from '../data/profile.js'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email) } catch { /* clipboard blocked: the mail link still works */ }
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.07] py-24 md:py-36">
      <div aria-hidden className="tint pointer-events-none absolute bottom-[-40%] left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-accent/25 blur-[140px]" />

      <div className="container-x relative text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> {profile.availability.status} · {profile.availability.notice.toLowerCase()}
          </p>
          <h2 className="h-hero mx-auto mt-7 max-w-4xl">Have a role in mind? <span className="tint text-accent">Let’s talk.</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-zinc-400">
            I’m looking for a full-stack, backend or cloud role in {profile.availability.regions.join(', ')}. Send me the role and I’ll reply the same day.
          </p>

          <button type="button" onClick={copy}
            className="group mx-auto mt-10 flex max-w-full items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-2.5 pl-6 pr-2.5 text-left transition hover:bg-white/[0.08]">
            <span className="truncate font-display text-[15px] font-medium sm:text-2xl">{profile.email}</span>
            <span className="tint grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-black">{copied ? <Check size={17} /> : <Copy size={16} />}</span>
          </button>
          <p className="mt-2 h-5 text-sm text-zinc-500">{copied ? 'Copied to your clipboard' : 'Click to copy my email'}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle size={16} /> WhatsApp me</a>
            <a href={profile.resume.path} download className="btn-ghost"><Download size={15} /> Résumé</a>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Linkedin size={15} /> LinkedIn <ArrowUpRight size={14} /></a>
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="btn-ghost"><Github size={15} /> GitHub <ArrowUpRight size={14} /></a>
          </div>
        </Reveal>
      </div>

      <footer className="container-x relative mt-24 flex flex-col items-center justify-between gap-2 border-t border-white/[0.07] pt-6 text-sm text-zinc-500 sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name} · {profile.city}, {profile.country}</span>
        <span>{contact.whatsappLabel}</span>
      </footer>
    </section>
  )
}
