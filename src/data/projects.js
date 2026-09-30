// Four receipts. Hiring managers read three to six projects, not fourteen.
//
// Each project is printed as an itemised receipt: every line is one engineering
// decision (`item`) and what it measured (`figure`). Opening a line shows the
// problem that forced it and what it cost. After reading one receipt a
// reviewer should be able to name a decision — that is the test.
//
// `kind` decides the call-to-action:
//   'site' — public URL, link out.   'app' — store listing.
//   'case' — client-internal, no URL to send anyone to, so ask for a walkthrough.

const make = (p) => ({ kind: 'site', gallery: [], ...p, local: `/projects/${p.image}` })

export const ctaFor = (p) => {
  if (p.kind === 'app') return { label: 'Google Play', href: p.url, external: true }
  if (p.kind === 'case') return { label: 'Ask for a walkthrough', href: '#contact', external: false }
  return { label: 'Open live site', href: p.url, external: true }
}

export const addressFor = (p) => {
  if (p.kind === 'app') return p.pkg
  if (p.kind === 'case') return 'client-internal'
  return p.host
}

export const projects = [
  make({
    id: 'hms',
    short: 'HMS',
    title: 'A hospital platform, load-tested against a full hospital-year.',
    domain: 'Healthcare · multi-tenant SaaS',
    host: 'hms.fiveminfotech.com',
    url: 'https://hms.fiveminfotech.com/',
    year: '2026',
    role: 'Sole full-stack engineer',
    image: 'hms.png',
    caption: 'HMS — a finalised bill',
    gallery: ['/projects/hms-lab.png', '/projects/hms-ward.png', '/projects/hms-ed.png', '/projects/hms-glass.png'],
    summary:
      'Reception, consultation, wards, laboratory, pharmacy and billing on one platform. What each of nine staff roles can see is decided by the server and verified route by route.',
    stack: 'Node.js · Express 5 · MongoDB · React Native / Expo · Electron · Docker',
    totals: [
      ['Load-tested', '4.5M documents'],
      ['Paths inside p95 budget', '83 / 83'],
      ['Permission gate cases', '1,520'],
      ['Test files', '221']
    ],
    ledger: [
      {
        item: 'The bill carries its department',
        figure: '10,465 → 152 ms',
        problem: 'The 365-day billing report ran at 10.5 seconds: two $lookups per bill just to find which department it belonged to.',
        decision: 'Stamp the department on the bill when it is generated. The filter becomes an index range instead of a join per row.',
        tradeoff: 'A one-off backfill of 56,356 bills (9 s), and the stamp must be refreshed if an admission moves department.'
      },
      {
        item: 'Search by prefix, on an index',
        figure: 'p95 21 ms',
        problem: 'Patient search used a “contains” regex. No index can serve that, so every keystroke read all 80,000 patients.',
        decision: 'Match from the start of a name, hospital number or mobile, under a case-insensitive collation index.',
        tradeoff: 'Typing the middle of a name no longer matches. The start of either name does, which is what reception actually types.'
      },
      {
        item: 'Reports read in parallel slices',
        figure: '2,489 → 821 ms',
        problem: 'Six report and dashboard paths still failed their budget at full scale. One pass was fetching 395,158 stock movements.',
        decision: 'Read long date ranges in up to twelve parallel slices that add up exactly, and replace $facet with covering-index passes.',
        tradeoff: '0.56 GB of indexes for 3.4 GB of data. Slower writes accepted on purpose: clinical paths are read-heavy.'
      },
      {
        item: 'Accessibility fixed at the source',
        figure: '473 → 0',
        problem: 'axe found 473 serious and critical WCAG violations across 46 screens, 9 roles and 2 viewports.',
        decision: 'Most traced to one cause in the shared components. Fix it once there, not screen by screen.',
        tradeoff: 'Shared components now carry accessibility props that some native targets ignore.'
      }
    ]
  }),

  make({
    id: 'plusveda',
    short: 'Plusveda',
    title: 'A pharmacy SaaS where a new client is a setting, not a fork.',
    domain: 'Retail · multi-tenant SaaS',
    host: 'plusveda.online',
    url: 'https://plusveda.online/',
    year: '2026',
    role: 'Full-stack engineer',
    image: 'plusveda.jpg',
    caption: 'Plusveda — dashboard, web and Android',
    summary:
      'Stock, billing and finance for pharmacies and warehouses: scan a supplier bill to receive stock, never sell an expired batch, GST invoicing. One TypeScript codebase ships Android, iOS, web and Windows.',
    stack: 'Node.js · Express 5 · MongoDB · Expo · Electron · Docker · NGINX · Gemini',
    totals: [
      ['REST endpoints', '182'],
      ['Data models', '33'],
      ['Platforms, one codebase', '4'],
      ['Test suites', '27']
    ],
    ledger: [
      {
        item: 'Multi-tenant from migration one',
        figure: '1 deployment',
        problem: 'Each new pharmacy used to mean a fork and a separate deployment. Every upgrade multiplied by the number of clients.',
        decision: 'An organisation ID on every record, enforced in the repository layer across 123 files, with a separate platform-admin login.',
        tradeoff: 'Every query carries a tenant filter, and a test asserts no route can read across organisations.'
      },
      {
        item: 'Stock received from a photo',
        figure: '0 typing',
        problem: 'Receiving a supplier invoice meant typing every line by hand: the slowest, most error-prone step in the shop.',
        decision: 'Gemini reads the photographed bill, behind a 9-second timeout with a fallback to manual entry.',
        tradeoff: 'The scan is a draft the pharmacist confirms line by line. It never writes to stock on its own.'
      },
      {
        item: 'Stock writes are all-or-nothing',
        figure: 'atomic',
        problem: 'A sale touches batches, a warehouse and an invoice. A crash between writes leaves stock wrong for weeks.',
        decision: 'Every stock change runs in a MongoDB transaction on a replica set, shipped as a Docker Compose stack behind NGINX.',
        tradeoff: 'Local development needs a replica set, not one database process. Compose makes that a single command.'
      }
    ]
  }),

  make({
    id: 'parentai',
    kind: 'case',
    short: 'ParentAI',
    title: 'An AI learning app that releases itself on every merge.',
    domain: 'Education · AI · mobile',
    year: '2026',
    role: 'Full-stack engineer',
    image: 'parentai.png',
    caption: 'ParentAI — a session in Hindi',
    gallery: ['/projects/parentai-dashboard.png'],
    summary:
      'Turns a school topic into a 30-minute parent-led session in the family’s own language, across seven Indian languages.',
    stack: 'Node.js · MongoDB · Expo · Google Gemini · Razorpay · GitHub Actions · Render',
    totals: [
      ['CI workflows', '5'],
      ['Unit tests in CI', '131'],
      ['Indian languages', '7'],
      ['REST endpoints', '77']
    ],
    ledger: [
      {
        item: 'Builds on free runners, gated',
        figure: '1 merge',
        problem: 'Releases were a manual, credit-limited build followed by a Play Store rejection for a stray permission.',
        decision: 'Build on free GitHub runners, with a check that fails the build if a blocked permission survives, before store review.',
        tradeoff: 'Gradle needed memory tuning to fit 7 GB runners, and build files go to GitHub Releases to stay under quota.'
      },
      {
        item: 'Infrastructure is a file',
        figure: 'render.yaml',
        problem: 'Environment setup was a checklist in someone’s head.',
        decision: 'One blueprint file: region pinned to Singapore for Indian households, a health check that never touches the database, 20+ secrets declared but never stored.',
        tradeoff: 'Render is a managed platform. The next scale step is Terraform, which I am learning now.'
      },
      {
        item: 'The AI call cannot hang bedtime',
        figure: 'fallback',
        problem: 'A model call that hangs would hang a parent’s 8 pm session, which is the only session there is.',
        decision: 'A time limit on every Gemini call, a moderation pass in front, and a fallback to a saved plan.',
        tradeoff: 'Fallback plans are less personal. Chosen over an error screen at bedtime.'
      }
    ]
  }),

  make({
    id: 'ashshifa',
    kind: 'app',
    short: 'AshShifa',
    title: 'A health app on Google Play in 176 countries.',
    domain: 'Healthcare · mobile',
    pkg: 'com.ashshifa.app',
    url: 'https://play.google.com/store/apps/details?id=com.ashshifa.app',
    year: '2026',
    role: 'Full-stack engineer',
    image: 'ashshifa.jpg',
    caption: 'AshShifa — Android',
    summary:
      'Appointments, live video consultation, prescriptions and health records, with automated data retention.',
    stack: 'Node.js · MongoDB · Expo · Agora · Stripe · Twilio · Firebase',
    totals: [
      ['REST endpoints', '140'],
      ['Countries on Play', '176'],
      ['CI pipelines', 'iOS + Android']
    ],
    ledger: [
      {
        item: 'Video keys never leave the server',
        figure: '0 on device',
        problem: 'A video call needs a credential, and anything inside an app bundle is public.',
        decision: 'The server issues a short-lived token per call, scoped to that one channel.',
        tradeoff: 'One extra round-trip before a call connects.'
      },
      {
        item: 'One writer for plan state',
        figure: 'webhooks only',
        problem: 'Subscription state drifted between Stripe and the app when the app asserted its own plan.',
        decision: 'Only signature-verified Stripe webhooks may write plan state. The app reads, never writes.',
        tradeoff: 'The screen shows “activating” for a few seconds after checkout.'
      },
      {
        item: 'Retention runs on a schedule',
        figure: 'automated',
        problem: 'Health records need a retention policy that runs without someone remembering to run it.',
        decision: 'A scheduled job applies documented retention windows per record type.',
        tradeoff: 'The windows themselves need legal review. Engineering implements them; it cannot choose them alone.'
      }
    ]
  })
]

// The rest, one line each.
export const moreWork = [
  { name: 'Baker & Co CRM', what: 'Visa sales pipeline across 8 stages on MySQL with versioned migrations', stack: 'Next.js · TypeScript · MySQL' },
  { name: 'OutVue', what: 'Marketing-spend analytics with Google, Meta and LinkedIn Ads adapters', stack: 'React · Node · Stripe' },
  { name: 'ClassConnect Pro', what: 'Multi-tenant school ERP, 141 endpoints, five role types', stack: 'Express 5 · MongoDB · Expo' },
  { name: 'SchoolRide', what: 'Live GPS fleet tracking with geofencing and Razorpay', stack: 'Socket.IO · Expo' },
  { name: 'ReimburseFlow', what: 'Expense approvals with policy limits and SAP ERP posting', stack: 'React · Node · SAP' },
  { name: 'SRF Power CRM', what: 'Generator sales CRM with IndiaMART sync and a Playwright suite', stack: 'React · Node · Playwright' },
  { name: 'Arabian Darbar', what: 'Custom prerender pipeline; bundle cut 35% (343 → 224 kB)', stack: 'React · Vite' },
  { name: 'Khayyat Shamsan', what: 'Bilingual English/Arabic site with full right-to-left layout', stack: 'React · Tailwind' }
]
