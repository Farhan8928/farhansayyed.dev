import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { profile } from '../data/profile.js'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'What I do' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' }
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-white/[0.07] bg-base/80 backdrop-blur-xl' : ''}`}>
      <div className="container-x flex h-[68px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${profile.name}, home`}>
          <span className="tint grid h-9 w-9 place-items-center rounded-xl bg-accent font-display text-[15px] font-bold text-black">FS</span>
          <span className="font-display text-[17px] font-semibold tracking-tight">{profile.name}</span>
        </a>

        <nav className="hidden items-center gap-7 text-[14.5px] text-zinc-300 md:flex">
          {links.map((l) => <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>)}
        </nav>

        <div className="flex items-center gap-2">
          <a href={profile.resume.path} download className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium transition hover:bg-white/10 sm:inline-flex">
            <Download size={14} /> Résumé
          </a>
          <a href="#contact" className="btn-primary !px-4 !py-2 !text-sm">Hire me</a>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-label="Menu" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 md:hidden">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="container-x pb-4 md:hidden">
          <div className="panel p-2">
            {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-zinc-200 hover:bg-white/5">{l.label}</a>)}
            <a href={profile.resume.path} download className="block rounded-2xl px-4 py-3 text-zinc-200 hover:bg-white/5">Download résumé</a>
          </div>
        </nav>
      )}
    </header>
  )
}
