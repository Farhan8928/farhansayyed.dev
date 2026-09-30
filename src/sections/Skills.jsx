import { Smartphone, Monitor, Globe, Tablet, Check, Sparkles } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

// What I actually do, as five tiles. Each has a small drawing of the thing
// instead of an icon and a paragraph.
export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-white/[0.07] py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">What I do</p>
          <h2 className="h-sec mt-3 max-w-3xl">The whole product, not just one layer of it.</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Tile className="lg:col-span-7" title="One codebase, every screen"
            text="I write an app once in TypeScript and ship it to Android, iOS, the web and Windows desktop. Four of my products run this way.">
            <div className="flex items-end justify-center gap-2 sm:gap-5">
              {[{ I: Smartphone, l: 'Android', h: 78 }, { I: Smartphone, l: 'iOS', h: 78 }, { I: Tablet, l: 'Tablet', h: 96 }, { I: Globe, l: 'Web', h: 110 }, { I: Monitor, l: 'Windows', h: 110 }].map(({ I, l, h }, i) => (
                <div key={l} className="flex flex-col items-center gap-2">
                  <div className="tint flex w-[46px] flex-col gap-1.5 rounded-xl border border-accent/40 bg-accent/10 p-1.5 sm:w-[76px] sm:p-2" style={{ height: h }}>
                    <span className="tint h-1.5 w-2/3 rounded bg-accent/70" />
                    <span className="h-1.5 w-full rounded bg-white/15" />
                    <span className="h-1.5 w-4/5 rounded bg-white/15" />
                    <span className="mt-auto flex justify-end"><I size={13} className="text-zinc-400" /></span>
                  </div>
                  <span className="text-[11px] text-zinc-400">{l}</span>
                </div>
              ))}
            </div>
          </Tile>

          <Tile className="lg:col-span-5" title="Fast with real data"
            text="I test with millions of records, not ten. One hospital report went from 10.5 seconds to 152 milliseconds.">
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-[11px] text-zinc-400"><span>Before</span><span>10.5 s</span></div>
                <div className="h-3 rounded-full bg-white/15" />
              </div>
              <div>
                <div className="mb-1 flex justify-between text-[11px] text-zinc-400"><span>After</span><span className="tint font-bold text-accent">152 ms</span></div>
                <div className="h-3 rounded-full bg-white/[0.06]"><div className="tint h-full w-[4%] min-w-[10px] rounded-full bg-accent" /></div>
              </div>
              <p className="pt-1 text-center font-display text-4xl font-semibold">69× <span className="text-base font-normal text-zinc-400">faster</span></p>
            </div>
          </Tile>

          <Tile className="lg:col-span-4" title="One product, many customers"
            text="Multi-tenant SaaS: every customer gets private data inside one shared product. A new customer is a setting, not a new server.">
            <div className="flex flex-col items-center">
              <span className="tint rounded-xl bg-accent px-4 py-2 text-xs font-bold text-black">One product</span>
              <span className="h-5 w-px bg-white/20" />
              <div className="flex flex-wrap justify-center gap-1.5">
                {['Pharmacy A', 'Pharmacy B', 'School C', 'Hospital D', 'Farm E'].map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
          </Tile>

          <Tile className="lg:col-span-4" title="Ships on every merge"
            text="Tests, Android and iOS builds, and deployment run automatically with GitHub Actions and Docker. A release is one click.">
            <div className="flex items-center justify-between">
              {['Test', 'Build', 'Deploy', 'Live'].map((s, i) => (
                <div key={s} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="tint grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/40"><Check size={15} strokeWidth={3} /></span>
                    <span className="text-[11px] text-zinc-400">{s}</span>
                  </div>
                  {i < 3 && <span className="tint mx-1 mb-5 h-px flex-1 bg-accent/40" />}
                </div>
              ))}
            </div>
          </Tile>

          <Tile className="lg:col-span-4" title="AI inside real products"
            text="Reading supplier bills from a photo, writing lessons in 7 languages, WhatsApp AI agents. Always with a fallback when the AI is slow.">
            <div className="relative mx-auto w-44 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-zinc-400"><Sparkles size={11} className="tint text-accent" /> Scanning bill</p>
              {[80, 62, 72, 50].map((w, i) => (
                <div key={i} className="mt-2 flex items-center justify-between gap-2">
                  <span className="h-1.5 rounded bg-white/20" style={{ width: `${w}%` }} />
                  <span className="tint h-1.5 w-5 rounded bg-accent/70" />
                </div>
              ))}
              <span className="tint absolute inset-x-0 h-6 animate-scan bg-gradient-to-b from-transparent via-accent/35 to-transparent" />
            </div>
          </Tile>
        </div>
      </div>
    </section>
  )
}

function Tile({ title, text, children, className = '' }) {
  return (
    <Reveal className={`min-w-0 ${className}`}>
      <div className="panel flex h-full flex-col p-5 sm:p-7">
        <div className="grid min-h-[170px] flex-1 place-items-center rounded-2xl bg-base-900 px-4 py-6">
          <div className="w-full">{children}</div>
        </div>
        <h3 className="mt-6 font-display text-[22px] font-semibold leading-tight">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">{text}</p>
      </div>
    </Reveal>
  )
}
