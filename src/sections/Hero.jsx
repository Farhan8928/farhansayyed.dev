import { Download, MessageCircle } from 'lucide-react'
import Race from '../components/Race.jsx'
import CopyPitch from '../components/CopyPitch.jsx'
import { profile, contact } from '../data/profile.js'
import { isPrerender } from '../lib/env.js'

// No greeting, no headshot. The headline is the result, and the race under it
// is the proof running live.
export default function Hero() {
  return (
    <section id="top" className="container-x scroll-mt-28 pt-9 md:pt-14">
      <p className="label flex flex-wrap gap-x-5 gap-y-1">
        <span>{profile.title} · {profile.subtitle}</span>
        <span>{profile.city}, {profile.country}</span>
        <span className="!text-after">● {profile.availability.status}</span>
      </p>

      <h1 className="serif-hero mt-5 max-w-[17ch]">
        I made a hospital’s billing report <span className="marker whitespace-nowrap">69× faster.</span>
      </h1>

      <Race instant={isPrerender} />

      <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
        <p className="text-[17px] leading-relaxed text-ink-soft md:col-span-7">
          I’m {profile.firstName}, a full-stack engineer with {profile.years} years of building multi-tenant SaaS in
          TypeScript, Node.js and React, and shipping it with Docker, CI/CD and AWS. I measure what I build.
          Everything below is a receipt: the decision, and the number it produced.
        </p>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end no-print">
          <a href={profile.resume.path} download className="btn-solid"><Download size={14} /> Download resume</a>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn"><MessageCircle size={14} /> WhatsApp</a>
          <CopyPitch />
        </div>
      </div>
    </section>
  )
}
