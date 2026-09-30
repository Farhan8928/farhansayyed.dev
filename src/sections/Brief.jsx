import { profile } from '../data/profile.js'

// The 30-second version. If a reader sees nothing else, they leave knowing
// who this is, what he does, the proof, and what he wants.
const stats = [
  { v: profile.years, l: 'years shipping' },
  { v: profile.shipped, l: 'apps in production' },
  { v: '6', l: 'industries' },
  { v: '4.5M', l: 'records load-tested' }
]

const rows = [
  ['Builds', 'Multi-tenant SaaS for web, Android, iOS and desktop: TypeScript, Node.js, React, React Native, MongoDB, PostgreSQL.'],
  ['Ships', 'Docker, NGINX, GitHub Actions, AWS. One merge releases five products.'],
  ['Proof', '83 of 83 endpoints inside their latency budget at 4.5M records. 473 accessibility violations taken to zero. 1,520 permission checks, every route as every role.'],
  ['Now', `${profile.employer.role} at ${profile.employer.name} since ${profile.employer.since}. ${profile.studio.role} of ${profile.studio.name}.`],
  ['Wants', `A full-stack, backend or cloud role. ${profile.availability.regions.join(', ')}. ${profile.availability.notice}.`]
]

export default function Brief() {
  return (
    <section id="brief" className="container-x scroll-mt-28 pt-14 md:pt-20">
      <div className="grid grid-cols-2 border-y border-ink md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.l} className={`px-1 py-5 md:px-5 ${i % 2 ? 'border-l border-ink/20' : ''} ${i >= 2 ? 'border-t border-ink/20 md:border-t-0' : ''} ${i === 2 ? 'md:border-l md:border-ink/20' : ''} ${i === 0 ? 'md:pl-0' : ''}`}>
            <p className="font-serif text-5xl leading-none md:text-6xl">{s.v}</p>
            <p className="label mt-2">{s.l}</p>
          </div>
        ))}
      </div>

      <dl className="divide-y divide-ink/15 border-b border-ink/15">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 py-3.5 md:grid-cols-12 md:gap-6">
            <dt className="label pt-0.5 md:col-span-2">{k}</dt>
            <dd className="text-[15.5px] leading-relaxed text-ink md:col-span-10">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
