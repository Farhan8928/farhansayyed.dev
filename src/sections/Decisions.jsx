import { decisions } from '../data/decisions.js'

// Case notes: four engineering calls, written the way I would answer them in
// an interview. Situation, decision, why, and what it cost.
export default function Decisions() {
  return (
    <section id="decisions" className="container-x scroll-mt-28 pt-20 md:pt-28">
      <div className="border-t border-ink pt-5">
        <p className="label">Case notes</p>
        <h2 className="serif-xl mt-2">Four calls I’d make again.</h2>
      </div>

      <div className="mt-8 divide-y divide-ink/20 border-y border-ink/20">
        {decisions.map((d) => (
          <article key={d.n} className="grid gap-5 py-10 md:grid-cols-12 md:gap-8 md:py-14">
            <div className="md:col-span-2">
              <p className="font-serif text-7xl leading-none text-ink/25">{d.n}</p>
              <p className="label mt-3">{d.tag}</p>
            </div>
            <div className="md:col-span-10">
              <h3 className="serif-lg">{d.title}</h3>
              <p className="mt-3 max-w-3xl font-serif text-[1.45rem] italic leading-snug text-ink-soft">“{d.hook}”</p>
              <dl className="mt-7 grid gap-x-10 gap-y-6 text-[15px] leading-relaxed md:grid-cols-2">
                <Note k="Situation" v={d.situation} />
                <Note k="Decision" v={d.decision} />
                <Note k="Why" v={d.why} />
                <Note k="What it cost" v={d.cost} />
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const Note = ({ k, v }) => (
  <div>
    <dt className="label">{k}</dt>
    <dd className="mt-1.5 text-ink-soft">{v}</dd>
  </div>
)
