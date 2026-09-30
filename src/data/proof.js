// Every number on this site, with how it was measured and where it lives.
// Nothing here is estimated. If a figure cannot name its file, it does not
// go on the page.

// The hero race runs at these real durations.
export const race = {
  beforeMs: 10465,
  afterMs: 152,
  what: 'Billing report · one department · 365 days',
  scale: '4.5M records',
  fix: 'Each bill is stamped with its department, so the filter is an index range instead of two $lookups per bill.',
  source: 'p95 · HMS docs/PERFORMANCE.md'
}

export const proof = [
  { metric: 'Billing report, 365 days, one department', value: '10,465 ms → 152 ms', delta: '−98.5%', method: 'p95 over sequential requests, warm, full-scale seed', source: 'HMS · docs/PERFORMANCE.md' },
  { metric: 'Billing report, 30 days', value: '938 ms → 51 ms', delta: '−94.6%', method: 'p95, same run', source: 'HMS · docs/PERFORMANCE.md' },
  { metric: 'Laboratory report, 365 days', value: '2,489 ms → 821 ms', delta: '−67.0%', method: 'p95, 167,621 order documents in range', source: 'HMS · docs/PERFORMANCE.md' },
  { metric: 'Inventory report, 365 days', value: '2,333 ms → 1,118 ms', delta: '−52.1%', method: 'p95, 395,158 stock movements in range', source: 'HMS · docs/PERFORMANCE.md' },
  { metric: 'Pharmacy dashboard waiting count', value: '44,459 docs fetched → index only', delta: '−100%', method: 'explain("executionStats") on the emitted query', source: 'HMS · docs/PERFORMANCE.md' },
  { metric: 'Endpoints inside p95 budget at full scale', value: '83 / 83', delta: '6 failing → 0', method: 'Every hot path timed; CI fails on any COLLSCAN or more than 50 docs examined per doc returned', source: 'HMS · tests/perf/perf.mjs · ci.yml' },
  { metric: 'Accessibility, serious + critical', value: '473 → 0', delta: '−100%', method: 'axe on 46 screens × 9 roles × 2 viewports, WCAG 2.1 AA', source: 'HMS · docs/PHASES.md' },
  { metric: 'Permission gate cases', value: '1,520', delta: '190 routes × 8 roles', method: 'Every route called as every role; 403 asserted where the spec says CANNOT', source: 'HMS · permissionMatrix.int.test.js' },
  { metric: 'Load-test dataset', value: '4.5M documents · 3.4 GB', delta: '1 hospital-year', method: 'Deterministic seed through the Mongoose models, in calendar order', source: 'HMS · scripts/seedVolume.js' },
  { metric: 'Marketing site bundle', value: '343 kB → 224 kB', delta: '−35%', method: 'vite build output after dropping the animation dependency', source: 'Arabian Darbar · build log' },
  { metric: 'Release pipeline', value: '1 merge', delta: '5 products · 13 workflows', method: 'Lint, unit tests, Android/iOS builds, OTA update, store-compliance gate', source: '.github/workflows across 5 repos' }
]

export const method = [
  'Machine: Intel Core i5-1235U, 16 GB, Node 22.17, MongoDB 7.0.24.',
  'A run fails on p95 over budget on any path, any COLLSCAN, or any paged query examining more than 50 documents per document returned.',
  'API and database ran on one laptop, so the numbers isolate query and assembly cost. A hosted cluster adds network latency, not contention.'
]
