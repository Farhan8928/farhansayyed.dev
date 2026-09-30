import { createContext, useContext, useEffect, useState } from 'react'
import { byId } from '../data/apps.js'

// The site has one accent colour, and it follows the work:
//   - open an app on the hero phone  → the site takes that app's colour
//   - scroll a case study into view  → same
//   - otherwise                      → the default coral
const DEFAULT = '255 106 61'
const Ctx = createContext({ open: null, setOpen: () => {}, setTint: () => {} })

export function AccentProvider({ children }) {
  const [open, setOpen] = useState(null) // app id open on the hero phone
  const [tint, setTint] = useState(null) // rgb triplet from the case study in view

  useEffect(() => {
    const rgb = tint ?? byId(open)?.rgb ?? DEFAULT
    document.documentElement.style.setProperty('--accent', rgb)
  }, [open, tint])

  return <Ctx.Provider value={{ open, setOpen, setTint }}>{children}</Ctx.Provider>
}

export const useAccent = () => useContext(Ctx)
