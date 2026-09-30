import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Mail, Github, Linkedin, Signal, Wifi, BatteryFull, ChevronLeft } from 'lucide-react'
import { Phone } from './Frames.jsx'
import AppIcon from './AppIcon.jsx'
import { homeApps, byId } from '../data/apps.js'
import { profile, contact } from '../data/profile.js'
import { useAccent } from '../lib/accent.jsx'

// The hero phone. Its home screen holds the products I have shipped, with
// their real icons. Tapping one opens it, showing real screens from that app.
export default function HomePhone({ width = 320 }) {
  const { open, setOpen } = useAccent()
  const app = byId(open)
  const screenRef = useRef(null)
  const [origin, setOrigin] = useState('50% 50%')
  const [now, setNow] = useState(new Date())

  useEffect(() => { const id = setInterval(() => setNow(new Date()), 30_000); return () => clearInterval(id) }, [])
  const time = now.toLocaleTimeString('en-IN', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit', hour12: false })

  const launch = (id, e) => {
    const s = screenRef.current?.getBoundingClientRect()
    const b = e.currentTarget.getBoundingClientRect()
    if (s) setOrigin(`${((b.left + b.width / 2 - s.left) / s.width) * 100}% ${((b.top + b.height / 2 - s.top) / s.height) * 100}%`)
    setOpen(id)
  }

  const k = width / 320 // scale type and spacing with the phone

  return (
    <Phone width={width} ratio="9 / 20">
      <div ref={screenRef} className="absolute inset-0">
        {/* wallpaper */}
        <div className="absolute inset-0 bg-[#0B0B10]">
          <div className="tint absolute -top-[18%] left-1/2 h-[55%] w-[120%] -translate-x-1/2 rounded-full bg-accent/60 blur-3xl" />
          <div className="tint absolute -bottom-[20%] -left-[20%] h-[45%] w-[90%] rounded-full bg-accent/25 blur-3xl" />
        </div>

        <div className="relative flex h-full flex-col" style={{ padding: `${44 * k}px ${16 * k}px ${12 * k}px` }}>
          {/* status bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between text-white" style={{ padding: `${12 * k}px ${24 * k}px 0`, fontSize: 12 * k }}>
            <span className="font-bold tabular-nums">{time}</span>
            <span className="flex items-center gap-1"><Signal size={12 * k} /><Wifi size={12 * k} /><BatteryFull size={15 * k} /></span>
          </div>

          {/* widget */}
          <div className="rounded-[22px] border border-white/10 bg-white/10 backdrop-blur-md" style={{ padding: 14 * k, marginTop: 6 * k }}>
            <p className="font-medium uppercase tracking-[0.16em] text-white/60" style={{ fontSize: 9 * k }}>Farhan’s work</p>
            <p className="font-display font-semibold leading-tight text-white" style={{ fontSize: 21 * k, marginTop: 4 * k }}>{profile.shipped} products shipped</p>
            <p className="text-white/70" style={{ fontSize: 11 * k, marginTop: 3 * k }}>Tap an app. Every one is real.</p>
          </div>

          {/* app grid */}
          <div className="grid grid-cols-4" style={{ marginTop: 20 * k, rowGap: 16 * k }}>
            {homeApps.map((a, i) => (
              <button key={a.id} type="button" onClick={(e) => launch(a.id, e)} aria-label={`Open ${a.name}`}
                className="group flex flex-col items-center" style={{ gap: 5 * k }}>
                <motion.span whileTap={{ scale: 0.86 }} className="relative block">
                  <AppIcon app={a} size={54 * k} className="shadow-lg shadow-black/40 transition group-hover:brightness-110" />
                  {i === 0 && !open && <span className="absolute -inset-1 animate-ping rounded-[30%] border-2 border-white/50" />}
                </motion.span>
                <span className="max-w-full truncate text-white/90" style={{ fontSize: 9.5 * k }}>{a.name}</span>
              </button>
            ))}
          </div>

          <div className="flex-1" />

          {/* dock: these are real links */}
          <div className="flex items-center justify-around rounded-[26px] border border-white/10 bg-white/10 backdrop-blur-md" style={{ padding: 10 * k }}>
            {[
              { href: profile.resume.path, icon: FileText, label: 'Resume', download: true },
              { href: contact.mailto, icon: Mail, label: 'Email' },
              { href: profile.social.github, icon: Github, label: 'GitHub', ext: true },
              { href: profile.social.linkedin, icon: Linkedin, label: 'LinkedIn', ext: true }
            ].map(({ href, icon: Icon, label, download, ext }) => (
              <a key={label} href={href} aria-label={label} title={label} {...(download ? { download: true } : {})} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="grid place-items-center bg-white/15 text-white transition hover:bg-white/30"
                style={{ width: 46 * k, height: 46 * k, borderRadius: 13 * k }}>
                <Icon size={20 * k} />
              </a>
            ))}
          </div>
        </div>

        {/* an opened app */}
        <AnimatePresence>
          {app && <OpenApp key={app.id} app={app} origin={origin} k={k} onClose={() => setOpen(null)} />}
        </AnimatePresence>
      </div>
    </Phone>
  )
}

function OpenApp({ app, origin, k, onClose }) {
  const [i, setI] = useState(0)
  const shots = app.phones
  useEffect(() => {
    if (shots.length < 2) return
    const id = setInterval(() => setI((v) => (v + 1) % shots.length), 2800)
    return () => clearInterval(id)
  }, [shots.length])

  const bar = 42 * k // status row: keeps the camera island and the Home button off the app's own screen

  return (
    <motion.div
      initial={{ scale: 0.12, opacity: 0, borderRadius: 60 }}
      animate={{ scale: 1, opacity: 1, borderRadius: 0 }}
      exit={{ scale: 0.12, opacity: 0, borderRadius: 60 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: origin }}
      className="absolute inset-0 z-30 overflow-hidden bg-[#0B0B10]"
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between" style={{ height: bar, padding: `0 ${14 * k}px 0 ${9 * k}px` }}>
        <button type="button" onClick={onClose}
          className="inline-flex items-center gap-0.5 rounded-full bg-white/15 font-medium text-white transition hover:bg-white/30"
          style={{ padding: `${4 * k}px ${10 * k}px ${4 * k}px ${5 * k}px`, fontSize: 11 * k }}>
          <ChevronLeft size={13 * k} /> Home
        </button>
        {shots.length > 1 && (
          <span className="flex items-center gap-1" aria-hidden>
            {shots.map((s, n) => <span key={s} className={`h-1 rounded-full transition-all ${n === i ? 'w-4 bg-white' : 'w-1 bg-white/40'}`} />)}
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0" style={{ top: bar }}>
        {shots.length > 0 ? (
          <button type="button" onClick={() => setI((v) => (v + 1) % shots.length)} className="absolute inset-0 block" aria-label="Next screen">
            <AnimatePresence initial={false}>
              <motion.img key={shots[i]} src={shots[i]} alt={`${app.name} screen ${i + 1}`}
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35 }}
                className="absolute inset-0 h-full w-full object-cover object-top" />
            </AnimatePresence>
          </button>
        ) : (
          // No phone screens for this product: show its card instead.
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ padding: 22 * k, background: `radial-gradient(120% 80% at 50% 0%, rgb(${app.rgb} / .45), #0B0B10 70%)` }}>
            <AppIcon app={app} size={84 * k} className="shadow-2xl shadow-black/50" />
            <p className="font-display font-semibold text-white" style={{ fontSize: 24 * k, marginTop: 16 * k }}>{app.name}</p>
            <p className="text-white/70" style={{ fontSize: 12 * k, marginTop: 4 * k }}>{app.title}</p>
            <p className="leading-snug text-white/85" style={{ fontSize: 12.5 * k, marginTop: 14 * k }}>{app.summary}</p>
            <div className="grid w-full grid-cols-3" style={{ gap: 6 * k, marginTop: 18 * k }}>
              {app.metrics.map((m) => (
                <div key={m.l} className="rounded-xl bg-white/10" style={{ padding: `${8 * k}px ${4 * k}px` }}>
                  <p className="font-display font-semibold text-white" style={{ fontSize: 16 * k }}>{m.v}</p>
                  <p className="leading-tight text-white/60" style={{ fontSize: 8.5 * k }}>{m.l}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button type="button" onClick={onClose} aria-label="Go home" className="absolute inset-x-0 z-10 mx-auto block rounded-full bg-black/60 ring-1 ring-white/40"
        style={{ bottom: 7 * k, width: 110 * k, height: 5 * k }} />
    </motion.div>
  )
}
