import { motion } from 'framer-motion'
import { isPrerender } from '../lib/env.js'

// Thermal-paper receipt with torn edges. It "prints" — feeds down from the
// top edge — the first time it scrolls into view.
//
// The outer box is what the viewport observer watches and is never clipped;
// only the inner layer animates. Clipping the observed element itself to zero
// height made the observer miss it on some receipts, so they never appeared.
const feed = {
  hidden: { clipPath: 'inset(0% -10% 100% -10%)' },
  shown: { clipPath: 'inset(0% -10% -10% -10%)', transition: { duration: 1.1, ease: [0.3, 0, 0.2, 1] } }
}

export function Receipt({ children, className = '' }) {
  const paper = <div className="receipt">{children}</div>
  if (isPrerender) return <div className={className}><div className="receipt-wrap">{paper}</div></div>
  return (
    <motion.div className={className} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.05 }}>
      <motion.div className="receipt-wrap" variants={feed}>{paper}</motion.div>
    </motion.div>
  )
}

// "Label ........ value"
export function Row({ k, v, strong = false, href, external }) {
  const cls = `flex items-baseline gap-2 ${strong ? 'font-medium' : ''}`
  const inner = (
    <>
      <span>{k}</span>
      <span className="leader" />
      <span className="text-right tabular-nums">{v}</span>
    </>
  )
  if (href) {
    return (
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`${cls} -mx-1 px-1 py-0.5 hover:bg-marker`}>
        {inner}
      </a>
    )
  }
  return <div className={cls}>{inner}</div>
}

export const Rule = () => <div className="rule my-3" />
