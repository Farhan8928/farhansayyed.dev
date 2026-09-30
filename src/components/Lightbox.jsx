import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// Full-size screenshots. Esc closes, arrow keys walk the gallery.
export default function Lightbox({ project, onClose }) {
  const [i, setI] = useState(0)
  const images = project ? [project.local, ...(project.gallery ?? [])] : []

  useEffect(() => { setI(0) }, [project])
  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setI((v) => (v + 1) % images.length)
      if (e.key === 'ArrowLeft') setI((v) => (v - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [project, onClose, images.length])

  if (!project) return null

  return (
    <div onClick={onClose} className="fixed inset-0 z-[90] grid place-items-center bg-ink/80 p-3 sm:p-8">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-6xl border border-ink bg-paper-white p-2">
        <div className="flex items-center justify-between px-1 pb-2">
          <p className="label">{project.short} · screen {i + 1} of {images.length}</p>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-8 w-8 place-items-center border border-ink hover:bg-marker"><X size={14} /></button>
        </div>
        <div className="relative bg-paper-deep">
          <img src={images[i]} alt={`${project.short} — screen ${i + 1}`} className="mx-auto block max-h-[76vh] w-auto max-w-full" />
          {images.length > 1 && (
            <>
              <button type="button" aria-label="Previous screen" onClick={() => setI((v) => (v - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-ink bg-paper-white hover:bg-marker"><ChevronLeft size={16} /></button>
              <button type="button" aria-label="Next screen" onClick={() => setI((v) => (v + 1) % images.length)}
                className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-ink bg-paper-white hover:bg-marker"><ChevronRight size={16} /></button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
