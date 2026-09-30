import { profile } from './profile.js'

// What the "copy a pitch" button puts on the clipboard. A recruiter pastes it
// straight into a message to the hiring manager, so it has to stand alone.
export const pitch = [
  `${profile.name} — Full-Stack Engineer, ${profile.city} (${profile.years} yrs).`,
  'Multi-tenant SaaS in TypeScript, Node.js and React; ships with Docker, CI/CD and AWS. Cut a hospital billing report 98.5% (10.5 s → 152 ms) at 4.5M records; 12+ apps in production.',
  `Portfolio: ${profile.siteUrl} · ${profile.phoneDisplay} · ${profile.email}`
].join('\n')
