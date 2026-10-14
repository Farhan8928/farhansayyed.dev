// Every product on the site. One entry drives three places: the icon on the
// hero phone's home screen, the case-study card in Work, and the site accent
// colour while that product is open or in view.
//
// Icons and screens are the real ones, generated from each product's own repo
// by scripts/prepare-assets.py into public/apps/<id>/.
//
//   rgb      accent colour as an "r g b" triplet (bright enough for a dark page)
//   phones   phone screens, shown inside the hero phone and the case card
//   wides    desktop screens, shown in a browser frame
//   glyph    used instead of an icon image when the product has no app icon

const dir = (id) => `/apps/${id}`
const phones = (id, n) => Array.from({ length: n }, (_, i) => `${dir(id)}/phone-${i + 1}.jpg`)
const wides = (id, n) => Array.from({ length: n }, (_, i) => `${dir(id)}/wide-${i + 1}.jpg`)

export const apps = [
  {
    id: 'hms',
    name: 'HMS',
    title: 'Hospital Management System',
    category: 'Healthcare',
    year: '2026',
    rgb: '56 132 255',
    icon: `${dir('hms')}/icon.svg`,
    phones: phones('hms', 3),
    wides: wides('hms', 2),
    platforms: ['Web', 'Android', 'iOS', 'Windows'],
    tagline: 'One patient, one record, one hospital platform.',
    summary:
      'Reception, consultation, wards, laboratory, pharmacy and billing in a single platform. Each of nine staff roles sees only what their job needs.',
    points: [
      'Made the yearly billing report 69× faster: from 10.5 seconds down to 152 milliseconds.',
      'Kept every core screen fast on 4.5 million records, with speed checks that run on every code push.',
      'Built access control for 9 staff roles, verified by 1,500+ automated permission checks.'
    ],
    metrics: [{ v: '69×', l: 'faster reports' }, { v: '4.5M', l: 'records tested' }, { v: '9', l: 'staff roles' }],
    stack: ['Node.js', 'Express', 'MongoDB', 'React Native', 'Expo', 'Electron', 'Docker'],
    link: { label: 'Visit live site', href: 'https://hms.fiveminfotech.com/' },
    featured: true
  },
  {
    id: 'plusveda',
    name: 'Plusveda',
    title: 'Pharmacy Inventory & Billing SaaS',
    category: 'Retail · SaaS',
    year: '2026',
    rgb: '34 197 94',
    icon: `${dir('plusveda')}/icon.png`,
    iconBg: '#ffffff',
    phones: phones('plusveda', 3),
    wides: wides('plusveda', 1),
    platforms: ['Web', 'Android', 'iOS', 'Windows'],
    tagline: 'Stock, billing and finance for pharmacies.',
    summary:
      'Pharmacies scan a supplier bill to receive stock, never sell an expired batch, and raise GST invoices. One product serves many pharmacies, each with its own private data.',
    points: [
      'A new pharmacy is onboarded with settings, not a new deployment: one product, many private tenants.',
      'Point the camera at a supplier bill and AI fills in the stock. No typing.',
      'One TypeScript codebase ships the Android, iOS, web and Windows desktop apps.'
    ],
    metrics: [{ v: '4', l: 'platforms' }, { v: '1', l: 'codebase' }, { v: '182', l: 'API endpoints' }],
    stack: ['Node.js', 'MongoDB', 'React Native', 'Expo', 'Electron', 'Docker', 'Gemini AI'],
    link: { label: 'Visit live site', href: 'https://plusveda.online/' },
    featured: true
  },
  {
    id: 'roadaxis',
    name: 'RoadAxis',
    title: 'Garage & Recovery Booking',
    category: 'Marketplace · UK & UAE',
    year: '2026',
    rgb: '249 115 22',
    icon: `${dir('roadaxis')}/icon.svg`,
    phones: phones('roadaxis', 3),
    wides: wides('roadaxis', 3),
    platforms: ['Web', 'Mobile web'],
    tagline: 'Find a garage you can trust, in the UK or the UAE.',
    summary:
      'Drivers find and book garages, tyre centres and recovery firms near them, and each business gets its requests on WhatsApp. One site serves both countries, with every listing in its own currency, time zone and address format.',
    points: [
      'Made the slowest search 11× faster, from 1.1 seconds to 99 milliseconds. Every search now answers in under 100 ms across 10,000 listings.',
      'Added the UAE as a second market on the same site. Everything that differs by country lives in one table, so a third country is one new entry.',
      'Handed over with 965 API checks and 707 UI checks on phone and laptop, none failing.'
    ],
    metrics: [{ v: '99 ms', l: 'slowest search' }, { v: '2', l: 'countries' }, { v: '1,672', l: 'automated checks' }],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Leaflet', 'WhatsApp API'],
    link: { label: 'Visit live site', href: 'https://rx.fiveminfotech.com/' },
    featured: true
  },
  {
    id: 'ashshifa',
    name: 'AshShifa',
    title: 'Islamic Companion App',
    category: 'Lifestyle · Mobile',
    year: '2026',
    rgb: '214 176 62',
    icon: `${dir('ashshifa')}/icon.png`,
    phones: phones('ashshifa', 4),
    wides: wides('ashshifa', 2),
    wideLabel: 'AshShifa on Android TV',
    platforms: ['Android', 'iOS', 'Android TV'],
    tagline: 'Quran, prayer times, Qibla and azan in one app.',
    summary:
      'An all-in-one Islamic app: the full Quran, accurate prayer times with azan, Qibla direction, duas, tasbeeh, hadith, the 99 Names and a nearby-masjid finder. Live on Google Play in 176 countries, on phones and on Android TV.',
    points: [
      'Prayer times with an azan that plays on time, even when the app is closed.',
      'The full Quran in page-by-page mushaf mode, plus Qibla, duas, tasbeeh and hadith: 15 features in one app.',
      'A separate Android TV app: a prayer clock for the living-room wall, Quran recitation and azan, all on the remote, reusing the phone app’s prayer and Quran logic.'
    ],
    metrics: [{ v: '176', l: 'countries' }, { v: '15', l: 'features' }, { v: '3', l: 'platforms' }],
    stack: ['React Native', 'Expo', 'Android TV', 'Zustand', 'Node.js', 'MongoDB', 'Firebase'],
    link: { label: 'View on Google Play', href: 'https://play.google.com/store/apps/details?id=com.ashshifa.app' },
    featured: true
  },
  {
    id: 'parentai',
    name: 'ParentAI',
    title: 'AI Learning App for Families',
    category: 'Education · AI',
    year: '2026',
    rgb: '45 212 191',
    icon: `${dir('parentai')}/icon.png`,
    phones: phones('parentai', 3),
    wides: wides('parentai', 1),
    platforms: ['Android', 'iOS', 'Web'],
    tagline: 'Tonight’s school topic, taught by a parent.',
    summary:
      'A parent enters what their child is learning at school, and the app turns it into a 30-minute lesson they can teach at home, in their own language.',
    points: [
      'AI writes each lesson in 7 Indian languages, including Hindi, Marathi, Tamil and Urdu.',
      'Every code change is tested and built for Android and iOS automatically. A release takes one click.',
      'If the AI is slow or down, the app falls back to a saved lesson instead of showing an error.'
    ],
    metrics: [{ v: '7', l: 'languages' }, { v: '131', l: 'automated tests' }, { v: '1', l: 'click to release' }],
    stack: ['Node.js', 'MongoDB', 'React Native', 'Expo', 'Gemini AI', 'Razorpay', 'GitHub Actions'],
    link: null,
    featured: true
  },
  {
    id: 'outvue',
    name: 'OutVue',
    title: 'Marketing Spend Analytics',
    category: 'SaaS · UK',
    year: '2026',
    rgb: '168 85 247',
    icon: `${dir('outvue')}/icon.png`,
    iconBg: '#15123A',
    phones: [],
    wides: wides('outvue', 2),
    platforms: ['Web'],
    tagline: 'Where marketing money goes, and what it returns.',
    summary:
      'A dashboard for UK marketing teams that pulls ad spend from Google, Meta and LinkedIn into one place and shows the return on every pound.',
    points: [
      'Connects Google Ads, Meta Ads and LinkedIn Ads, and refreshes the numbers on a schedule.',
      'Scenario modelling: move budget between channels and see the expected result before spending.',
      'Paid plans through Stripe, with features unlocked by plan.'
    ],
    metrics: [{ v: '3', l: 'ad platforms' }, { v: '18', l: 'product screens' }, { v: 'Stripe', l: 'billing' }],
    stack: ['React', 'Redux', 'Node.js', 'MongoDB', 'Stripe', 'Google Ads API'],
    link: { label: 'Visit live site', href: 'https://www.outvue.io/' },
    featured: true
  },
  {
    id: 'rashtrafarm',
    name: 'Rashtrafarm',
    title: 'Goat Farm Management',
    category: 'Agriculture',
    year: '2026',
    rgb: '224 122 72',
    icon: `${dir('rashtrafarm')}/icon.png`,
    iconBg: '#ffffff',
    phones: phones('rashtrafarm', 3),
    wides: [],
    platforms: ['Android', 'iOS', 'Web'],
    tagline: 'Every animal, task and rupee on the farm.',
    summary: 'Animal records, health and breeding, daily tasks, staff, sales and finance for a working goat farm.',
    metrics: [{ v: '128', l: 'API endpoints' }, { v: '2', l: 'languages' }, { v: '3', l: 'platforms' }],
    stack: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'Razorpay'],
    link: null
  },
  {
    id: 'classconnect',
    name: 'ClassConnect',
    title: 'School & Coaching ERP',
    category: 'Education · SaaS',
    year: '2026',
    rgb: '99 125 255',
    icon: `${dir('classconnect')}/icon.png`,
    phones: [],
    wides: [],
    platforms: ['Web', 'Android', 'Windows'],
    tagline: 'A school’s whole day in one system.',
    summary: 'Students, fees, attendance, lessons, exams, HR and messaging for schools and coaching institutes. One product, many schools.',
    metrics: [{ v: '141', l: 'API endpoints' }, { v: '5', l: 'user roles' }, { v: '3', l: 'platforms' }],
    stack: ['React Native', 'Expo', 'Electron', 'Node.js', 'MongoDB', 'Socket.IO'],
    link: null
  },
  {
    id: 'schoolride',
    name: 'SchoolRide',
    title: 'School Bus Live Tracking',
    category: 'Logistics',
    year: '2026',
    rgb: '245 166 35',
    glyph: 'bus',
    phones: [],
    wides: [],
    platforms: ['Android', 'iOS', 'Web'],
    tagline: 'Parents watch the school bus arrive, live.',
    summary: 'Live GPS tracking, trips, alerts and fee collection, with separate apps for the operator, the driver and parents.',
    metrics: [{ v: 'Live', l: 'GPS tracking' }, { v: '3', l: 'user apps' }, { v: '111', l: 'API endpoints' }],
    stack: ['React Native', 'Expo', 'Socket.IO', 'Node.js', 'MongoDB', 'Razorpay'],
    link: null
  },
  {
    id: 'bharatrailgo',
    name: 'BharatRailGo',
    title: 'Railway Parcel Booking SaaS',
    category: 'Logistics · SaaS',
    year: '2026',
    rgb: '239 68 68',
    icon: `${dir('bharatrailgo')}/icon.png`,
    phones: phones('bharatrailgo', 3),
    wides: [],
    platforms: ['Web', 'Android', 'iOS', 'Windows'],
    tagline: 'Bilti, GST invoices and delivery for parcel agents.',
    summary: 'Railway parcel agents issue consignment notes, raise GST invoices, track each parcel to delivery and collect payments. Many agencies share one platform, and each sees only its own data.',
    metrics: [{ v: '109', l: 'API endpoints' }, { v: '101', l: 'backend tests' }, { v: '4', l: 'platforms' }],
    stack: ['Expo', 'Electron', 'Node.js', 'MongoDB', 'Razorpay'],
    link: { label: 'Visit site', href: 'https://saas-bharat-rail-go-web.vercel.app/' }
  }
]

export const byId = (id) => apps.find((a) => a.id === id)
export const featured = apps.filter((a) => a.featured)
export const homeApps = ['hms', 'plusveda', 'roadaxis', 'ashshifa', 'parentai', 'outvue', 'bharatrailgo', 'rashtrafarm', 'classconnect', 'schoolride'].map(byId)

// The rest, one line each.
export const more = [
  { name: 'Rashtrafarm', what: 'Goat farm management: animals, health, tasks, staff and finance', tag: 'Agriculture', appId: 'rashtrafarm' },
  { name: 'ClassConnect Pro', what: 'School and coaching ERP: fees, attendance, exams, HR', tag: 'Education', appId: 'classconnect' },
  { name: 'SchoolRide', what: 'Live GPS school-bus tracking for operators, drivers and parents', tag: 'Logistics', appId: 'schoolride' },
  { name: 'BharatRailGo', what: 'Booking, bilti and GST billing for railway parcel agents', tag: 'Logistics · SaaS', appId: 'bharatrailgo' },
  { name: 'WhatsApp AI Agent', what: 'AI agents on WhatsApp, each business with its own persona and knowledge', tag: 'AI · SaaS', glyph: 'chat', rgb: '37 211 102' },
  { name: 'Baker & Co CRM', what: 'Visa sales pipeline for a UAE consultancy', tag: 'CRM · UAE', glyph: 'briefcase', rgb: '163 230 53' },
  { name: 'ReimburseFlow', what: 'Expense approvals with SAP ERP posting', tag: 'Finance', glyph: 'receipt', rgb: '56 189 248' },
  { name: 'GensetGo', what: 'Multi-tenant SaaS for generator dealers: sales, service contracts, rentals and compliance', tag: 'Manufacturing · SaaS', glyph: 'bolt', rgb: '251 146 60' },
  { name: 'SRF Power CRM', what: 'Generator sales CRM with quotations and lead sync', tag: 'Manufacturing', glyph: 'bolt', rgb: '250 204 21' },
  { name: 'Alwaris Logistics ERP', what: 'Freight bookings, bills of lading, cost sheets and invoices in one system', tag: 'Logistics · ERP', glyph: 'truck', rgb: '129 140 248' },
  { name: 'AllFreshh', what: 'Fruit and vegetable delivery store with OTP login, cart and referral discounts', tag: 'E-commerce', glyph: 'basket', rgb: '74 222 128' },
  { name: 'Khayyat Shamsan', what: 'English and Arabic website for a men’s tailoring house in Saudi Arabia', tag: 'Website · KSA', glyph: 'scissors', rgb: '226 190 130' }
]
