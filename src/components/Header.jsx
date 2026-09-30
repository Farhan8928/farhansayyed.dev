import { Download } from 'lucide-react'
import { profile } from '../data/profile.js'
import { MODES, useMode } from '../lib/mode.jsx'

// No menu. The only control is the one question that matters to a busy
// reader: how long do you have?
export default function Header() {
  const { mode, setMode } = useMode()
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/90 backdrop-blur no-print">
      <div className="container-x flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2.5">
        <a href="#top" className="font-serif text-[1.35rem] leading-none">{profile.name}</a>

        <div className="order-3 flex w-full items-center gap-3 md:order-none md:w-auto">
          <span className="label whitespace-nowrap"><span className="sm:hidden">I have</span><span className="hidden sm:inline">How long do you have?</span></span>
          <div role="radiogroup" aria-label="Reading depth" className="flex flex-1 border border-ink md:flex-none">
            {MODES.map((m) => (
              <button key={m.id} type="button" role="radio" aria-checked={mode === m.id} onClick={() => setMode(m.id)}
                className={`flex-1 whitespace-nowrap px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] transition sm:px-3 sm:tracking-[0.12em] md:flex-none ${
                  mode === m.id ? 'bg-ink text-paper-white' : 'text-ink hover:bg-marker'
                }`}>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <a href={profile.resume.path} download className="btn-solid !px-3.5 !py-2"><Download size={14} /> Resume</a>
      </div>
    </header>
  )
}
