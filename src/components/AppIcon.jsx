import { Bus, TrainFront, MessageCircle, Briefcase, Receipt, Zap, Box, Car, Truck, ShoppingBasket, Scissors } from 'lucide-react'

const glyphs = { bus: Bus, train: TrainFront, chat: MessageCircle, briefcase: Briefcase, receipt: Receipt, bolt: Zap, car: Car, truck: Truck, basket: ShoppingBasket, scissors: Scissors }

// A product's real app icon, or a coloured glyph tile when it has none.
export default function AppIcon({ app, size = 56, className = '' }) {
  const radius = Math.round(size * 0.235)
  if (app.icon) {
    return (
      <img
        src={app.icon} alt="" width={size} height={size} loading="lazy" decoding="async"
        style={{ width: size, height: size, borderRadius: radius, background: app.iconBg ?? 'transparent', padding: app.iconBg ? size * 0.12 : 0 }}
        className={`shrink-0 object-contain ${className}`}
      />
    )
  }
  const Glyph = glyphs[app.glyph] ?? Box
  return (
    <span
      style={{ width: size, height: size, borderRadius: radius, background: `rgb(${app.rgb})` }}
      className={`grid shrink-0 place-items-center text-black ${className}`}
    >
      <Glyph size={size * 0.5} strokeWidth={2.2} />
    </span>
  )
}
