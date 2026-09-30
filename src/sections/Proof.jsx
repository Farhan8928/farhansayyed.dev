import { proof, method } from '../data/proof.js'

// The audit trail. Every figure on the site, how it was measured, and the
// file it lives in.
export default function Proof() {
  return (
    <section id="proof" className="container-x scroll-mt-28 pt-20 md:pt-28">
      <div className="flex flex-col gap-4 border-t border-ink pt-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label">Audit trail</p>
          <h2 className="serif-xl mt-2">Every number, and where it lives.</h2>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
          Nothing on this page is estimated. Ask me for any of these files and I will open it on a call.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto border border-ink bg-paper-white">
        <table className="w-full min-w-[780px] text-left text-[14px]">
          <thead>
            <tr className="border-b border-ink">
              {['What', 'Measured', 'Change', 'How', 'Source'].map((h) => (
                <th key={h} className="label px-4 py-3 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/15">
            {proof.map((r) => (
              <tr key={r.metric} className="align-top hover:bg-marker/30">
                <td className="px-4 py-3 text-ink">{r.metric}</td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-[12.5px] tabular-nums">{r.value}</td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-[12.5px] font-medium tabular-nums text-after">{r.delta}</td>
                <td className="px-4 py-3 text-ink-soft">{r.method}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-ink-mute">{r.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="mt-5 max-w-3xl space-y-1.5 text-[13px] leading-relaxed text-ink-mute">
        {method.map((m, i) => (
          <li key={i}><sup className="mr-1.5 font-mono">{i + 1}</sup>{m}</li>
        ))}
      </ol>
    </section>
  )
}
