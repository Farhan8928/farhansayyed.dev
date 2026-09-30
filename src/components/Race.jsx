import { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { race } from '../data/proof.js'

// The first thing on the page. Two bars run at the real measured durations:
// the fixed report finishes in 152 ms; the old one takes the full 10.5
// seconds. The reader finishes the headline before the old bar finishes —
// they feel the wait that was removed, instead of being told about it.
//
// Both bars share one time scale, so the new one is a sliver. That is the point.

const fmt = (n) => Math.round(n).toLocaleString('en-US')

export default function Race({ instant = false }) {
  const { beforeMs, afterMs } = race
  const [t, setT] = useState(instant ? beforeMs : 0)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (instant) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setT(beforeMs); return }
    let raf = 0
    let start = 0
    const tick = (now) => {
      if (!start) start = now
      const elapsed = Math.min(now - start, beforeMs)
      setT(elapsed)
      if (elapsed < beforeMs) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, instant, beforeMs])

  const done = t >= beforeMs
  const afterDone = t >= afterMs
  const left = Math.ceil((beforeMs - t) / 1000)

  return (
    <div className="mt-8 md:mt-10">
      <div className="border-y border-ink py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="label">{race.what} · {race.scale} · real durations</p>
          <button type="button" onClick={() => { setT(0); setRun((r) => r + 1) }}
            className="label inline-flex items-center gap-1.5 hover:text-ink no-print">
            <RotateCcw size={11} /> run again
          </button>
        </div>

        {/* After */}
        <div className="mt-5 grid grid-cols-[58px_1fr] items-center gap-x-3 md:grid-cols-[84px_1fr]">
          <span className="label !text-after">After</span>
          <div className="relative h-8 bg-ink/[0.06]">
            <div className="absolute inset-y-0 left-0 bg-after" style={{ width: afterDone ? `max(${(afterMs / beforeMs) * 100}%, 5px)` : 0 }} />
            <span className="absolute inset-y-0 flex items-center font-mono text-[13px] tabular-nums" style={{ left: `calc(${(afterMs / beforeMs) * 100}% + 12px)` }}>
              {afterDone ? <><b className="font-medium text-after">{afterMs} ms</b><span className="ml-2 text-ink-mute">done</span></> : null}
            </span>
          </div>
        </div>

        {/* Before */}
        <div className="mt-3 grid grid-cols-[58px_1fr] items-center gap-x-3 md:grid-cols-[84px_1fr]">
          <span className="label !text-before">Before</span>
          <div className="relative h-8 bg-ink/[0.06]">
            <div className="absolute inset-y-0 left-0 bg-before" style={{ width: `${(t / beforeMs) * 100}%` }} />
            <span className={`absolute inset-y-0 right-2 flex items-center font-mono text-[13px] tabular-nums ${t / beforeMs > 0.82 ? 'text-paper-white' : 'text-ink'}`}>
              <b className="font-medium">{fmt(t)} ms</b>
              <span className={`ml-2 ${t / beforeMs > 0.82 ? 'text-paper-white/80' : 'text-ink-mute'}`}>{done ? 'done' : 'loading…'}</span>
            </span>
          </div>
        </div>
      </div>

      <p className="serif-lg mt-5 italic text-ink-soft" aria-live="off">
        {done
          ? 'That was 10.5 seconds. Every report, every time, until the fix.'
          : `The slow one is still loading. ${left}s to go.`}
      </p>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-mute">
        {race.fix} <span className="font-mono text-[11px]">({race.source})</span>
      </p>
    </div>
  )
}
