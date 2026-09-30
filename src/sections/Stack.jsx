import Reveal from '../components/Reveal.jsx'
import { stackGroups, learning } from '../data/stack.js'

const iconUrl = (t) => `https://cdn.simpleicons.org/${t.slug}${t.white ? '/ffffff' : ''}`

export default function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 border-t border-white/[0.07] py-24 md:py-32">
      <div className="container-x">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Stack</p>
            <h2 className="h-sec mt-3">Tools I use every week.</h2>
          </div>
          <p className="max-w-sm text-[16px] leading-relaxed text-zinc-400">Everything here is in a product I’ve shipped. Nothing is listed because I read about it.</p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((g, i) => (
            <Reveal key={g.label} delay={(i % 3) * 0.05}>
              <div className="panel h-full p-6">
                <p className="eyebrow">{g.label}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span key={t.name} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-100">
                      {t.slug && <img src={iconUrl(t)} alt="" width="16" height="16" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} className="h-4 w-4" />}
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div className="tint h-full rounded-[28px] border border-accent/30 bg-accent/[0.07] p-6">
              <p className="tint text-xs font-medium uppercase tracking-[0.2em] text-accent">Learning now</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {learning.map((l) => <span key={l} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100">{l}</span>)}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">These move to the lists above once I’ve shipped something with them.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
