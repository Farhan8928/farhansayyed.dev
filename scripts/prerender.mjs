// Prerender the SPA into static HTML so crawlers see the finished page.
//
// Googlebot can run JS but queues it; LinkedIn, Slack, WhatsApp, Bing and
// most LLM crawlers do not run it at all. Without this step a shared link
// previews as a boot spinner. Runs as the last step of `npm run build`.
//
// Two rules, learned the hard way on the studio site:
//   1. One build path. If a step matters, it goes in `build`.
//   2. Assert the output, not the exit code. A run that writes a shell
//      exits 0 and looks like success.

import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, writeFile, stat } from 'node:fs/promises'
import { extname, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const ROUTES = ['/']

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf', '.webmanifest': 'application/manifest+json'
}

function startStaticServer(root) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
        if (p === '/' || p === '') p = '/index.html'
        let file = join(root, p)
        try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html') } catch { file = join(root, 'index.html') }
        const data = await readFile(file)
        res.writeHead(200, { 'Content-Type': MIME[extname(file).toLowerCase()] ?? 'application/octet-stream' })
        res.end(data)
      } catch { res.writeHead(404).end('Not found') }
    })
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }))
  })
}

async function prerenderRoute(browser, baseUrl, route) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(`${baseUrl}${route}?prerender=1`, { waitUntil: 'networkidle', timeout: 30_000 })

  // Walk the page so whileInView reveals fire.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8
    for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)) }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(600)

  // Pin anything still mid-animation to its finished state. Framer writes
  // `opacity:0; transform:…` inline; a crawler that reads CSS but not JS
  // would treat those blocks as invisible. Safe because main.jsx uses
  // createRoot, not hydrateRoot — React discards this DOM on mount.
  const pinned = await page.evaluate(() => {
    let n = 0
    for (const el of document.querySelectorAll('#root [style*="opacity"]')) {
      if (parseFloat(el.style.opacity) >= 1) continue
      el.style.opacity = '1'; el.style.transform = 'none'; n++
    }
    return n
  })
  if (pinned) console.log(`   settled ${pinned} mid-animation element(s)`)

  const stats = await page.evaluate(() => {
    const root = document.getElementById('root')
    const boot = root?.firstElementChild?.classList.contains('boot') ?? true
    const text = (document.body.innerText || '').replace(/\s+/g, ' ').trim()
    return {
      boot,
      words: text ? text.split(' ').length : 0,
      brand: text.includes('Farhan'),
      products: text.includes('Plusveda') && text.includes('AshShifa'),
      h1: document.querySelectorAll('#root h1').length,
      sections: ['work', 'skills', 'experience', 'stack', 'contact'].filter((id) => !document.getElementById(id))
    }
  })

  const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML)
  await page.close()
  return { html, stats }
}

function assertRendered(s, route) {
  const fail = (m) => { throw new Error(`prerender produced unusable HTML for ${route}: ${m}`) }
  if (s.boot) fail('#root still holds the boot spinner — React never mounted')
  if (s.words < 400) fail(`only ${s.words} words of rendered text`)
  if (!s.brand) fail('name absent from rendered text')
  if (!s.products) fail('the products are missing from the rendered text')
  if (s.h1 === 0) fail('no <h1> inside #root')
  if (s.sections.length) fail(`sections missing from DOM: ${s.sections.join(', ')}`)
}

async function main() {
  console.log('🔧 Prerender: serving dist')
  const { server, port } = await startStaticServer(DIST)
  const baseUrl = `http://127.0.0.1:${port}`
  const browser = await chromium.launch()
  try {
    for (const route of ROUTES) {
      const { html, stats } = await prerenderRoute(browser, baseUrl, route)
      assertRendered(stats, route)
      const out = route === '/' ? 'index.html' : join(route.slice(1), 'index.html')
      await writeFile(join(DIST, out), html, 'utf8')
      console.log(`✅ Prerendered → dist/${out} (${(html.length / 1024).toFixed(1)} KB, ${stats.words} words, ${stats.h1} h1)`)
    }
  } finally {
    await browser.close()
    server.close()
  }
  console.log('✨ Prerender done')
}

main().catch((err) => { console.error('❌ Prerender failed:', err); process.exit(1) })
