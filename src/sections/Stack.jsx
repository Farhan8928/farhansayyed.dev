import { stackGroups, learning } from '../data/stack.js'

// A plain list, with the reason beside each tool. No logo wall.
export default function Stack() {
  return (
    <section id="stack" className="container-x scroll-mt-28 pt-20 md:pt-28">
      <div className="border-t border-ink pt-5">
        <p className="label">Stack</p>
        <h2 className="serif-xl mt-2">What I reach for, and why.</h2>
      </div>

      <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {stackGroups.map((g) => (
          <div key={g.label}>
            <p className="label border-b border-ink pb-2">{g.label}</p>
            <ul className="mt-3 space-y-3">
              {g.items.map((t) => (
                <li key={t.name}>
                  <p className="text-[15px] font-medium leading-tight">{t.name}</p>
                  <p className="mt-0.5 text-[13px] leading-snug text-ink-mute">{t.why}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-3xl border-l-2 border-ink pl-4 text-[15px] leading-relaxed text-ink-soft">
        <span className="marker font-medium text-ink">Not on this list yet:</span>{' '}
        {learning.join(', ')}. I am learning them now, and they go on the list when I have shipped something with them.
      </p>
    </section>
  )
}
