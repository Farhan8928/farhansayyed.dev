import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { featured, more, byId } from '../data/apps.js'
import { Phone, Browser } from '../components/Frames.jsx'
import AppIcon from '../components/AppIcon.jsx'
import Reveal from '../components/Reveal.jsx'
import { useAccent } from '../lib/accent.jsx'

export default function Work() {
  const { setTint } = useAccent()
  return (
    <motion.section id="work" className="relative scroll-mt-20 py-24 md:py-32" onViewportLeave={() => setTint(null)}>
      <div className="container-x">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="h-sec mt-3">Products I built,<br />start to finish.</h2>
          </div>
          <p className="max-w-sm text-[16px] leading-relaxed text-zinc-400">
            Five of them up close. Each one is live or in daily use, and I worked on all of it: database, API, apps and deployment.
          </p>
        </Reveal>

        <div className="mt-14 space-y-8">
          {featured.map((app, i) => <Case key={app.id} app={app} i={i} onEnter={() => setTint(app.rgb)} onBack={() => i > 0 && setTint(featured[i - 1].rgb)} />)}
        </div>

        {/* everything else */}
        <div id="more-work" className="scroll-mt-24 pt-24">
          <Reveal>
            <p className="eyebrow">More work</p>
            <h3 className="h-card mt-3">And {COUNT[more.length] ?? more.length} more.</h3>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((m, i) => {
              const app = m.appId ? byId(m.appId) : { glyph: m.glyph, rgb: m.rgb }
              return (
                <Reveal key={m.name} delay={(i % 4) * 0.05}>
                  <div className="panel group h-full p-5 transition hover:border-white/20" style={{ '--c': app.rgb }}>
                    <div className="flex items-center justify-between">
                      <AppIcon app={app} size={44} />
                      <span className="chip">{m.tag}</span>
                    </div>
                    <p className="mt-5 font-display text-xl font-semibold">{m.name}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{m.what}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

const COUNT = { 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve' }

function Case({ app, i, onEnter, onBack }) {
  const hasWide = app.wides.length > 0
  const hasPhone = app.phones.length > 0

  // Each card sticks under the header and the next one slides over it. A card
  // taller than the window sticks higher up instead, so its last line is
  // always seen before it is covered.
  const ref = useRef(null)
  const [top, setTop] = useState(84 + i * 18)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const fit = () => setTop(Math.min(84 + i * 18, window.innerHeight - el.offsetHeight - 16))
    fit()
    const ro = new ResizeObserver(fit); ro.observe(el)
    window.addEventListener('resize', fit)
    return () => { ro.disconnect(); window.removeEventListener('resize', fit) }
  }, [i])
  return (
    <motion.article
      ref={ref}
      id={`case-${app.id}`}
      onViewportEnter={onEnter}
      onViewportLeave={(entry) => { if (entry && entry.boundingClientRect.top > 0) onBack() }}
      viewport={{ amount: 0.5 }}
      className="stack-card scroll-mt-24 overflow-hidden rounded-[34px] border border-white/10 bg-base-800 shadow-[0_-20px_60px_-20px_rgba(0,0,0,.8)]"
      style={{ '--c': app.rgb, top }}
    >
      <div className="grid lg:grid-cols-2">
        {/* the story */}
        <div className="p-7 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">0{i + 1}</span>
            <span className="chip">{app.category}</span>
            {app.platforms.map((p) => <span key={p} className="chip">{p}</span>)}
          </div>

          <div className="mt-7 flex items-center gap-4">
            <AppIcon app={app} size={58} />
            <div>
              <p className="font-display text-2xl font-semibold leading-none">{app.name}</p>
              <p className="mt-1.5 text-sm text-zinc-400">{app.title}</p>
            </div>
          </div>

          <h3 className="h-card mt-6">{app.tagline}</h3>
          <p className="mt-3 text-[15.5px] leading-relaxed text-zinc-400">{app.summary}</p>

          <ul className="mt-6 space-y-3">
            {app.points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-zinc-200">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[rgb(var(--c)_/_0.18)] text-[rgb(var(--c))]"><Check size={12} strokeWidth={3} /></span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-6">
            {app.metrics.map((m) => (
              <div key={m.l}>
                <p className="font-display text-3xl font-semibold text-[rgb(var(--c))]">{m.v}</p>
                <p className="mt-1 text-xs text-zinc-400">{m.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {app.stack.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>

          {app.link && (
            <a href={app.link.href} target="_blank" rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[rgb(var(--c))] px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-110">
              {app.link.label} <ArrowUpRight size={15} />
            </a>
          )}
        </div>

        {/* the product itself */}
        <div className="relative min-h-[380px] overflow-hidden lg:min-h-[640px]"
          style={{ background: `radial-gradient(110% 90% at 80% 10%, rgb(${app.rgb} / .38), rgb(${app.rgb} / .08) 55%, transparent 80%)` }}>
          {hasWide && (
            <Browser url={app.link?.href?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') ?? app.name.toLowerCase()}
              src={app.wides[0]} alt={`${app.name} on desktop`}
              className="absolute left-8 top-10 w-[135%] sm:left-12 lg:top-16 lg:w-[150%]" />
          )}
          {hasWide && hasPhone && (
            <Phone width={170} className="!absolute bottom-[-6%] left-5 sm:left-8 lg:bottom-10 lg:left-6">
              <img src={app.phones[0]} alt={`${app.name} on a phone`} loading="lazy" className="h-full w-full object-cover object-top" />
            </Phone>
          )}
          {!hasWide && hasPhone && (
            <div className="absolute inset-0 flex items-center justify-center gap-0">
              <Phone width={190} className="hidden translate-x-10 translate-y-10 -rotate-6 opacity-90 sm:block">
                <img src={app.phones[1] ?? app.phones[0]} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
              </Phone>
              <Phone width={230} className="z-10">
                <img src={app.phones[0]} alt={`${app.name} on a phone`} loading="lazy" className="h-full w-full object-cover object-top" />
              </Phone>
              <Phone width={190} className="hidden -translate-x-10 translate-y-10 rotate-6 opacity-90 sm:block">
                <img src={app.phones[2] ?? app.phones[0]} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
              </Phone>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}
