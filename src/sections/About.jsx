import { profile } from '../data/profile.js'
import { timeline } from '../data/timeline.js'

export default function About() {
  return (
    <section id="about" className="container-x scroll-mt-28 pt-20 md:pt-28">
      <div className="border-t border-ink pt-5">
        <p className="label">About</p>
        <h2 className="serif-xl mt-2">The short version of me.</h2>
      </div>

      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        <div className="space-y-4 text-[16px] leading-relaxed text-ink-soft lg:col-span-6">
          <p className="font-serif text-[1.6rem] leading-snug text-ink">
            I care most about what happens at volume. A feature that works on ten rows and quietly breaks at ten thousand is the bug I go looking for.
          </p>
          <p>
            I graduated in 2023, spent a year building financial dashboards at Allied, and since February 2025 I have been the
            engineer behind twelve production applications at FiveM Infotech: a hospital platform, a pharmacy SaaS, an AI
            learning app, a health app, and CRMs for logistics, sales and visas.
          </p>
          <p>
            Alongside that I co-founded{' '}
            <a href={profile.studio.url} target="_blank" rel="noopener noreferrer" className="border-b border-ink text-ink hover:bg-marker">{profile.studio.name}</a>,
            a two-person studio. Running it taught me the part of engineering nobody teaches: scoping, saying no, and handing a
            system over so the client never needs me again.
          </p>
          <p>Based in {profile.city}. English and Hindi, conversational Marathi.</p>
        </div>

        <ol className="lg:col-span-6">
          {timeline.map((t) => (
            <li key={t.title + t.org} className="grid gap-1 border-t border-ink/20 py-4 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-5">
              <p className="label pt-1 md:col-span-4">{t.when}</p>
              <div className="md:col-span-8">
                <p className="font-serif text-[1.35rem] leading-tight">{t.title}</p>
                <p className="text-[14px] text-ink-mute">{t.org}</p>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">{t.what}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
