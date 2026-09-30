// Serve dist/ and capture what a visitor sees, including the hero phone with
// an app open. Logs console errors.   OUT=<dir> node scripts/shots.mjs
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, stat, mkdir } from 'node:fs/promises'
import { extname, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const OUT = process.env.OUT || join(__dirname, '..', '.snapshots')
const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.pdf': 'application/pdf', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain' }

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (p === '/') p = '/index.html'
    let f = join(DIST, p)
    try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html') } catch { f = join(DIST, 'index.html') }
    res.writeHead(200, { 'Content-Type': MIME[extname(f)] ?? 'application/octet-stream' })
    res.end(await readFile(f))
  } catch { res.writeHead(404).end() }
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const base = `http://127.0.0.1:${server.address().port}`
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const errors = []
const watch = (page, name) => {
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${name}] console: ${m.text()}`) })
  page.on('pageerror', (e) => errors.push(`[${name}] pageerror: ${e.message}`))
  page.on('requestfailed', (r) => errors.push(`[${name}] requestfailed: ${r.url()}`))
}
const walk = async (page) => {
  await page.evaluate(async () => {
    const s = window.innerHeight * 0.6
    for (let y = 0; y < document.body.scrollHeight; y += s) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 160)) }
  })
  await page.waitForTimeout(700)
}
const CASES = ['hms', 'plusveda', 'ashshifa', 'parentai', 'outvue']
// A work card is sticky, so its own position says nothing once it is stuck.
// Its place in normal flow is the list's top plus everything above it.
const caseTop = (page, id) => page.evaluate((id) => {
  const el = document.getElementById('case-' + id); const list = el.parentElement
  let y = list.getBoundingClientRect().top + window.scrollY
  for (const c of list.children) { if (c === el) break; y += c.offsetHeight + 32 }
  return { y, stick: parseFloat(getComputedStyle(el).top) || 0, sticky: getComputedStyle(el).position === 'sticky' }
}, id)

const VIEWS = [['desktop', { width: 1440, height: 900 }], ['laptop', { width: 1366, height: 680 }], ['phone', { width: 390, height: 844 }]]
for (const [name, vp] of VIEWS) {
  const page = await browser.newPage({ viewport: vp }); watch(page, name)
  await page.goto(base + '/', { waitUntil: 'networkidle' }); await page.waitForTimeout(1800)
  await page.screenshot({ path: join(OUT, `${name}-hero.png`) })
  if (name === 'phone') {
    await page.evaluate(() => window.scrollTo(0, 640)); await page.waitForTimeout(500)
    await page.screenshot({ path: join(OUT, 'phone-hero-2.png') })
  }
  for (const app of ['AshShifa', 'HMS', 'SchoolRide']) {
    await page.getByRole('button', { name: `Open ${app}` }).click(); await page.waitForTimeout(1100)
    await page.screenshot({ path: join(OUT, `${name}-open-${app.toLowerCase()}.png`) })
    await page.getByRole('button', { name: 'Home', exact: true }).click(); await page.waitForTimeout(700)
  }
  await walk(page)
  for (const id of CASES) {
    const t = await caseTop(page, id)
    await page.evaluate((y) => window.scrollTo(0, y), t.sticky ? t.y - t.stick : t.y - 70); await page.waitForTimeout(900)
    await page.screenshot({ path: join(OUT, `${name}-case-${id}.png`) })
    if (name === 'phone') {
      await page.evaluate(() => window.scrollBy(0, 760)); await page.waitForTimeout(500)
      await page.screenshot({ path: join(OUT, `${name}-case-${id}-2.png`) })
    }
  }
  if (name === 'desktop') {
    const t = await caseTop(page, 'ashshifa')
    await page.evaluate((y) => window.scrollTo(0, y), t.y - 420); await page.waitForTimeout(900)
    await page.screenshot({ path: join(OUT, 'desktop-stack-midscroll.png') })
  }
  for (const id of ['more-work', 'skills', 'experience', 'stack', 'contact']) {
    await page.evaluate((id) => { const el = document.getElementById(id); window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70) }, id)
    await page.waitForTimeout(900)
    await page.screenshot({ path: join(OUT, `${name}-${id}.png`) })
    if (name === 'phone' && id !== 'contact') {
      await page.evaluate(() => window.scrollBy(0, 760)); await page.waitForTimeout(500)
      await page.screenshot({ path: join(OUT, `${name}-${id}-2.png`) })
    }
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  console.log(name, 'page height', await page.evaluate(() => document.body.scrollHeight), '| sideways overflow', overflow)
  await page.close()
}
await browser.close(); server.close()
console.log(errors.length ? `ERRORS (${errors.length}):\n  ` + [...new Set(errors)].join('\n  ') : 'no console errors, page errors, or failed requests')
