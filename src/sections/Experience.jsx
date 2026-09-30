import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { timeline } from '../data/timeline.js'
import { profile } from '../data/profile.js'

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-white/[0.07] py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">Experience</p>
          <h2 className="h-sec mt-3">{profile.years} years,<br />always shipping.</h2>
          <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-zinc-400">
            I graduated in 2023 and have been building production software since. By day I’m the engineer behind a dozen client
            products at FiveM Infotech. I also co-founded DuoStack, a two-person studio, where I learned to scope a project,
            talk to clients, and hand over something they can run without me.
          </p>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
            {[[profile.years, 'years'], [profile.shipped, 'products'], ['6', 'industries']].map(([v, l]) => (
              <div key={l} className="panel !rounded-2xl p-4">
                <p className="tint font-display text-3xl font-semibold text-accent">{v}</p>
                <p className="mt-1 text-xs text-zinc-400">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <ol className="lg:col-span-7">
          {timeline.map((t, i) => (
            <Reveal key={t.title + t.org} delay={i * 0.06}>
              <li className="group grid gap-2 border-t border-white/[0.08] py-7 first:border-t-0 first:pt-0 sm:grid-cols-12 sm:gap-6">
                <p className="pt-1 text-sm text-zinc-500 sm:col-span-4">{t.when}</p>
                <div className="sm:col-span-8">
                  <h3 className="font-display text-2xl font-semibold leading-tight">{t.title}</h3>
                  <p className="tint mt-1 text-[15px] font-medium text-accent">
                    {t.link ? <a href={t.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">{t.org} <ArrowUpRight size={14} /></a> : t.org}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">{t.what}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">{t.tags.map((g) => <span key={g} className="chip">{g}</span>)}</div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
