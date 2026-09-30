import { createContext, useContext, useState } from 'react'
import { isPrerender } from './env.js'

// "How long do you have?" — the page reshapes itself to the reader's time.
// A recruiter decides in seconds; a hiring manager wants the ledgers; an
// engineer wants the case notes. One page, three depths.
//
//   brief  (0)  the race, the brief, the contact receipt
//   short  (1)  + the four project receipts and the stack
//   full   (2)  + case notes, audit trail, the rest of the work, about
//
// The prerendered HTML is always `full`, so crawlers and link previews see
// everything regardless of what a visitor's default is.
export const MODES = [
  { id: 'brief', label: '30 sec', level: 0 },
  { id: 'short', label: '3 min', level: 1 },
  { id: 'full', label: 'Everything', level: 2 }
]

const FULL_ONLY_HASHES = ['#decisions', '#proof', '#about']
const Ctx = createContext({ mode: 'full', level: 2, setMode: () => {}, go: () => {} })

export function ModeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (isPrerender) return 'full'
    if (typeof window !== 'undefined' && FULL_ONLY_HASHES.includes(window.location.hash)) return 'full'
    return 'short'
  })
  const level = MODES.find((m) => m.id === mode).level

  // Switch depth, then land the reader on the first thing that just appeared.
  const go = (next, id) => {
    setMode(next)
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  return <Ctx.Provider value={{ mode, level, setMode, go }}>{children}</Ctx.Provider>
}

export const useMode = () => useContext(Ctx)
