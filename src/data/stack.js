// Only what I actually ship with, and the reason each one is here.
// Text only — a wall of logos says nothing about how a tool was used.

export const stackGroups = [
  {
    label: 'Frontend',
    items: [
      { name: 'React', why: 'the component model I think in' },
      { name: 'Next.js', why: 'App Router + NextAuth on Baker CRM' },
      { name: 'React Native · Expo', why: 'one codebase to Android, iOS, web' },
      { name: 'TypeScript', why: 'refactors without fear' },
      { name: 'Tailwind CSS', why: 'design tokens in the markup' },
      { name: 'Electron', why: 'the web build as a Windows .exe' }
    ]
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', why: 'same language front to back' },
      { name: 'Express 5', why: 'controller / service / repository modules' },
      { name: 'NestJS', why: 'reporting APIs at Allied' },
      { name: 'Socket.IO', why: 'live GPS, chat, queues' },
      { name: 'Zod', why: 'validation at every boundary' },
      { name: 'OpenAPI', why: 'the contract is the documentation' }
    ]
  },
  {
    label: 'Data',
    items: [
      { name: 'MongoDB', why: 'replica sets, transactions, explain()' },
      { name: 'PostgreSQL', why: 'schema design, −60% query time' },
      { name: 'MySQL', why: 'Baker CRM on TypeORM migrations' },
      { name: 'Redis', why: 'report caching, +40%' },
      { name: 'Prisma', why: 'schema-first on PostgreSQL' },
      { name: 'TypeORM', why: 'migrations that ship reviewably' }
    ]
  },
  {
    label: 'Cloud & DevOps',
    items: [
      { name: 'Docker', why: 'multi-stage, non-root, health checks' },
      { name: 'NGINX', why: 'reverse proxy, WebSocket upgrades' },
      { name: 'AWS', why: 'S3 presigned URLs, IAM, Cognito' },
      { name: 'GitHub Actions', why: '13 workflows, one merge to release' },
      { name: 'Render', why: 'render.yaml as infrastructure' },
      { name: 'Google Cloud', why: 'OAuth, Drive API backups' }
    ]
  },
  {
    label: 'AI & Testing',
    items: [
      { name: 'Gemini', why: 'OCR and 7-language generation, with fallbacks' },
      { name: 'Jest', why: 'unit tests that run in CI' },
      { name: 'Playwright', why: 'end-to-end on SRF Power CRM' },
      { name: 'Supertest', why: 'every route as every role' },
      { name: 'axe', why: '473 → 0, measured' }
    ]
  }
]

// Honest about the gap. A reader who sees this trusts the rest of the page.
export const learning = ['Kubernetes', 'Terraform', 'AWS Solutions Architect (SAA)']
