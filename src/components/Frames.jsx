// Device frames drawn in CSS, sized by one number so the same phone works at
// 320px in the hero and 150px inside a case card.

export function Phone({ width = 300, ratio = '9 / 19.2', children, className = '', style }) {
  const pad = Math.max(5, Math.round(width * 0.03))
  return (
    <div
      className={`relative shrink-0 bg-[#1C1C21] ${className}`}
      style={{
        width, aspectRatio: ratio, borderRadius: width * 0.16, padding: pad,
        boxShadow: '0 0 0 1.5px rgba(255,255,255,.14), 0 50px 90px -30px rgba(0,0,0,.9)', ...style
      }}
    >
      <div className="relative h-full w-full overflow-hidden bg-black" style={{ borderRadius: width * 0.13 }}>
        {children}
        {/* camera island */}
        <span className="pointer-events-none absolute left-1/2 z-40 -translate-x-1/2 rounded-full bg-black"
          style={{ top: width * 0.028, width: width * 0.27, height: width * 0.072 }} />
      </div>
    </div>
  )
}

export function Browser({ url, src, alt, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-[#0F0F12] shadow-[0_40px_80px_-30px_rgba(0,0,0,.9)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" />
        {url && <span className="ml-2 truncate rounded-md bg-white/[0.06] px-2.5 py-0.5 text-[10px] text-zinc-400">{url}</span>}
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block w-full" />
    </div>
  )
}
