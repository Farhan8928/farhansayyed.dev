import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Mail, MessageCircle, MapPin } from 'lucide-react'
import HomePhone from '../components/HomePhone.jsx'
import AppIcon from '../components/AppIcon.jsx'
import { profile, contact } from '../data/profile.js'
import { byId, homeApps } from '../data/apps.js'
import { useAccent } from '../lib/accent.jsx'

const rise = (d) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } })

export default function Hero() {
  const { open } = useAccent()
  const app = byId(open)

  // The phone leans a little toward the pointer.
  const area = useRef(null)
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 16 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 16 })
  // While the pointer is on the phone itself it stays flat and still, so the
  // small targets on its screen do not move under a click.
  const onPhone = useRef(false)
  const onMove = (e) => {
    const r = area.current?.getBoundingClientRect(); if (!r || onPhone.current) return
    mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }
  const holdStill = () => { onPhone.current = true; mx.set(0); my.set(0) }
  const release = () => { onPhone.current = false }

  // The phone is sized from the window height so all of it shows on a laptop.
  const [pw, setPw] = useState(300)
  useEffect(() => {
    const fit = () => setPw(window.innerWidth < 1024 ? 300 : Math.round(Math.max(236, Math.min(310, (window.innerHeight - 275) * 0.45))))
    fit(); window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <section id="top" className="page-grid relative overflow-hidden pt-[68px]">
      {/* accent glow */}
      <div aria-hidden className="tint pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[720px] rounded-full bg-accent/20 blur-[130px]" />

      <div className="container-x relative grid items-center gap-12 pb-16 pt-10 lg:min-h-[calc(100vh-68px)] lg:grid-cols-12 lg:gap-6 lg:pb-10 lg:pt-4">
        {/* who I am */}
        <div className="lg:col-span-7">
          <motion.div {...rise(0.05)} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>
              {profile.availability.status}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-zinc-400"><MapPin size={13} /> {profile.city}, {profile.country}</span>
          </motion.div>

          <motion.p {...rise(0.12)} className="mt-7 text-lg text-zinc-300">
            Hi, I’m <span className="font-bold text-white">{profile.name}</span>, a full-stack engineer.
          </motion.p>

          <motion.h1 {...rise(0.18)} className="h-hero mt-3">
            I build products that ship to <span className="tint text-accent">every screen.</span>
          </motion.h1>

          <motion.p {...rise(0.26)} className="mt-6 max-w-xl text-[17px] leading-relaxed text-zinc-400">
            In {profile.years} years I’ve shipped <span className="text-zinc-100">{profile.shipped} products</span> for hospitals, pharmacies, schools and
            logistics teams. I take them from the database to the app store: web, Android, iOS and desktop,
            with TypeScript, Node.js, React and React Native.
          </motion.p>

          <motion.div {...rise(0.34)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-primary">See my work <ArrowDown size={16} /></a>
            <a href={profile.resume.path} download className="btn-ghost"><Download size={15} /> Download résumé</a>
            <span className="ml-1 flex items-center gap-1.5">
              {[
                { href: profile.social.github, icon: Github, label: 'GitHub' },
                { href: profile.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: contact.whatsapp, icon: MessageCircle, label: 'WhatsApp' },
                { href: contact.mailto, icon: Mail, label: 'Email', same: true }
              ].map(({ href, icon: Icon, label, same }) => (
                <a key={label} href={href} aria-label={label} title={label} {...(same ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-zinc-300 transition hover:border-white/30 hover:text-white">
                  <Icon size={17} />
                </a>
              ))}
            </span>
          </motion.div>

          {/* proof */}
          <motion.div {...rise(0.42)} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-5 border-t border-white/[0.08] pt-7">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {homeApps.slice(0, 5).map((a) => <AppIcon key={a.id} app={a} size={36} className="ring-2 ring-base" />)}
              </div>
              <p className="text-sm leading-tight text-zinc-400"><span className="block font-bold text-white">{profile.shipped} products</span>in production</p>
            </div>
            {[['176', 'countries on Play'], ['6', 'industries'], ['4', 'platforms']].map(([v, l]) => (
              <p key={l} className="text-sm leading-tight text-zinc-400"><span className="block font-display text-2xl font-semibold text-white">{v}</span>{l}</p>
            ))}
          </motion.div>
        </div>

        {/* my work, as a phone you can use */}
        <div ref={area} onMouseMove={onMove} onMouseLeave={onLeave} className="relative flex flex-col items-center lg:col-span-5" style={{ perspective: 1400 }}>
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div onMouseEnter={holdStill} onMouseLeave={release} style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
              <HomePhone width={pw} />
            </motion.div>
          </motion.div>

          {/* floating facts when the phone is on its home screen */}
          <AnimatePresence>
            {!app && (
              <motion.div key="facts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none absolute inset-0 hidden xl:block">
                <Fact className="left-[-6%] top-[16%]" delay="0s" v="69× faster" l="hospital billing report" />
                <Fact className="right-[-7%] top-[44%]" delay="1.5s" v="176 countries" l="AshShifa on Google Play" />
                <Fact className="left-[-3%] bottom-[27%]" delay="3s" v="1 codebase" l="Android · iOS · web · desktop" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* details of the open app */}
          <div className="mt-5 min-h-[124px] w-full max-w-[400px]">
            <AnimatePresence mode="wait">
              {app ? (
                <motion.div key={app.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                  className="panel flex items-start gap-3.5 p-4">
                  <AppIcon app={app} size={46} />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg font-semibold leading-tight">{app.name} <span className="ml-1 align-middle text-xs font-normal text-zinc-400">{app.category}</span></p>
                    <p className="mt-1 text-sm leading-snug text-zinc-400">{app.tagline}</p>
                    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
                      {app.metrics.map((m) => <span key={m.l}><b className="tint text-accent">{m.v}</b> {m.l}</span>)}
                    </div>
                    <a href={app.featured ? `#case-${app.id}` : '#more-work'} className="mt-2.5 inline-flex items-center gap-1 text-sm font-medium text-white hover:underline">
                      Read the story <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-2 text-center text-sm text-zinc-500">
                  ↑ That phone works. Tap any app to open it.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Fact({ v, l, className, delay }) {
  return (
    <div className={`absolute animate-floaty rounded-2xl border border-white/10 bg-base-800/90 px-4 py-2.5 shadow-2xl backdrop-blur ${className}`} style={{ animationDelay: delay }}>
      <p className="tint font-display text-lg font-semibold leading-none text-accent">{v}</p>
      <p className="mt-1 text-[11px] text-zinc-400">{l}</p>
    </div>
  )
}
