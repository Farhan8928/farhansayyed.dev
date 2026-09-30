import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects, moreWork, ctaFor, addressFor } from '../data/projects.js'
import { Receipt, Row, Rule } from '../components/Receipt.jsx'
import Lightbox from '../components/Lightbox.jsx'
import { useMode } from '../lib/mode.jsx'

export default function Work() {
  const [zoom, setZoom] = useState(null)
  const { level } = useMode()

  return (
    <section id="work" className="container-x scroll-mt-28 pt-20 md:pt-28">
      <div className="flex flex-col gap-4 border-t border-ink pt-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label">Work</p>
          <h2 className="serif-xl mt-2">Four products. Four receipts.</h2>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
          Each line on a receipt is a decision I made and what it measured. Tap a line to see the problem behind it and what it cost.
        </p>
      </div>

      <div className="mt-12 space-y-20 md:space-y-28">
        {projects.map((p, i) => <Project key={p.id} p={p} n={i + 1} onZoom={() => setZoom(p)} />)}
      </div>

      {level >= 2 && (
        <div className="mt-24">
          <p className="label border-t border-ink pt-5">The rest of the twelve</p>
          <ul className="mt-3 divide-y divide-ink/15">
            {moreWork.map((w) => (
              <li key={w.name} className="grid gap-1 py-3 md:grid-cols-12 md:gap-6">
                <p className="font-serif text-xl leading-tight md:col-span-3">{w.name}</p>
                <p className="text-[15px] text-ink-soft md:col-span-6">{w.what}</p>
                <p className="font-mono text-[11px] text-ink-mute md:col-span-3 md:text-right">{w.stack}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Lightbox project={zoom} onClose={() => setZoom(null)} />
    </section>
  )
}

function Project({ p, n, onZoom }) {
  const cta = ctaFor(p)
  const screens = 1 + (p.gallery?.length ?? 0)

  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <p className="label">No. {String(n).padStart(2, '0')} · {p.domain}</p>
        <h3 className="serif-xl mt-3 !text-[clamp(1.9rem,3.6vw,3rem)]">{p.title}</h3>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-soft">{p.summary}</p>

        <figure className="mt-7">
          <button type="button" onClick={onZoom} aria-label={`Enlarge ${p.short} screenshots`}
            className="block w-full border border-ink bg-paper-white p-1.5 shadow-[7px_7px_0_0_#14130F] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[4px_4px_0_0_#14130F]">
            <img src={p.local} alt={p.caption} loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover object-top" />
          </button>
          <figcaption className="label mt-4 flex flex-wrap justify-between gap-2">
            <span>Fig. {String(n).padStart(2, '0')} — {p.caption}</span>
            <span>{screens > 1 ? `${screens} screens · ` : ''}click to enlarge</span>
          </figcaption>
        </figure>

        <p className="mt-5 font-mono text-[12px] leading-relaxed text-ink-mute">{p.stack}</p>
      </div>

      <div className="lg:col-span-5">
        <Receipt className="mx-auto max-w-md lg:sticky lg:top-24">
          <p className="text-center text-[14px] font-medium uppercase tracking-[0.2em]">{p.short}</p>
          <p className="text-center text-ink-mute">{addressFor(p)} · {p.year}</p>
          <Rule />
          <div className="flex justify-between text-[10.5px] uppercase tracking-[0.14em] text-ink-mute">
            <span>Decision</span><span>Measured</span>
          </div>
          <div className="mt-1.5">
            {p.ledger.map((e, i) => <Item key={e.item} e={e} n={i + 1} defaultOpen={n === 1 && i === 0} />)}
          </div>
          <Rule />
          {p.totals.map(([k, v]) => <Row key={k} k={k} v={v} />)}
          <Rule />
          <Row k="Role" v={p.role} />
          <div className="mt-6 flex items-center justify-between gap-3">
            <span className="stamp text-after">Shipped</span>
            <a href={cta.href} {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex items-center gap-1 border-b border-ink font-medium hover:bg-marker">
              {cta.label} <ArrowUpRight size={13} />
            </a>
          </div>
        </Receipt>
      </div>
    </article>
  )
}

// One line of the receipt. Tapping it opens the problem and the cost.
function Item({ e, n, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}
        className="-mx-1 flex w-[calc(100%+0.5rem)] items-baseline gap-2 px-1 py-1 text-left hover:bg-marker/60">
        <span className="text-ink-mute">{String(n).padStart(2, '0')}</span>
        <span>{e.item}</span>
        <span className="leader" />
        <span className="whitespace-nowrap font-medium text-after">{e.figure}</span>
        <span className="w-3 text-center text-ink-mute">{open ? '−' : '+'}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.3, 0, 0.2, 1] }} className="overflow-hidden">
            <dl className="mb-2 ml-6 space-y-2 border-l border-ink/20 py-1 pl-3 font-sans text-[13.5px] leading-relaxed text-ink-soft">
              <Note k="Problem" v={e.problem} />
              <Note k="Decision" v={e.decision} />
              <Note k="It cost" v={e.tradeoff} />
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Note = ({ k, v }) => (
  <div>
    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{k}</dt>
    <dd>{v}</dd>
  </div>
)
