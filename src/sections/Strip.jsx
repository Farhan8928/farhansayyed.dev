import AppIcon from '../components/AppIcon.jsx'
import { apps, more } from '../data/apps.js'

// A slow band of everything shipped, with the real icons.
const items = [
  ...apps.map((a) => ({ key: a.id, name: a.name, app: a })),
  ...more.filter((m) => !m.appId).map((m) => ({ key: m.name, name: m.name, app: { glyph: m.glyph, rgb: m.rgb } }))
]

export default function Strip() {
  const row = [...items, ...items]
  return (
    <section aria-label="Products shipped" className="relative border-y border-white/[0.07] bg-base-900 py-5">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-base-900 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-base-900 to-transparent" />
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap pr-10">
          {row.map((it, i) => (
            <span key={it.key + i} className="flex items-center gap-2.5 text-[15px] font-medium text-zinc-300">
              <AppIcon app={it.app} size={28} /> {it.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
