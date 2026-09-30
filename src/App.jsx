import { MotionConfig } from 'framer-motion'
import Header from './components/Header.jsx'
import Hero from './sections/Hero.jsx'
import Brief from './sections/Brief.jsx'
import Work from './sections/Work.jsx'
import Decisions from './sections/Decisions.jsx'
import Proof from './sections/Proof.jsx'
import Stack from './sections/Stack.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import { ModeProvider, useMode } from './lib/mode.jsx'
import { profile } from './data/profile.js'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ModeProvider>
        <Page />
      </ModeProvider>
    </MotionConfig>
  )
}

function Page() {
  const { level, go } = useMode()
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <Brief />
        {level >= 1 && <Work />}
        {level >= 2 && <Decisions />}
        {level >= 2 && <Proof />}
        {level >= 1 && <Stack />}
        {level >= 2 && <About />}

        {/* Tell the reader where they are, and offer the next depth. */}
        {level < 2 && (
          <div className="container-x pt-16 no-print">
            <div className="flex flex-col gap-4 border border-ink bg-paper-white p-5 md:flex-row md:items-center md:justify-between">
              <p className="font-serif text-2xl leading-tight">
                {level === 0 ? 'That was the 30-second version.' : 'That was the 3-minute version.'}
                <span className="block font-sans text-[14px] leading-relaxed text-ink-mute">
                  {level === 0
                    ? 'The receipts for four products are one tap away.'
                    : 'The full version adds four case notes, the audit trail for every number, the rest of the work, and about me.'}
                </span>
              </p>
              <div className="flex flex-wrap gap-3">
                {level === 0 && <button type="button" className="btn" onClick={() => go('short', 'work')}>See the receipts · 3 min</button>}
                <button type="button" className="btn-solid" onClick={() => go('full', level === 0 ? 'work' : 'decisions')}>Read everything</button>
              </div>
            </div>
          </div>
        )}

        <Contact />
      </main>
      <footer className="border-t border-ink/15">
        <div className="container-x flex flex-col gap-1 py-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} {profile.name} · {profile.city}</span>
          <span>React · Vite · prerendered · no trackers</span>
        </div>
      </footer>
    </div>
  )
}
