// Prerender the page into static HTML so crawlers see the finished page.
//
// LinkedIn, Slack, WhatsApp, Bing and most AI crawlers do not run JavaScript.
// Without this step they would see only a loading square. Runs as the last
// step of `npm run build`, after Vite has built the client and the server
// entry (src/entry-server.jsx).
//
// It uses React's own server renderer, not a browser, so it runs anywhere
// Node runs, including Vercel's build machine, which has no Chromium.
//
// Two rules:
//   1. One build path. If a step matters, it goes in `build`.
//   2. Check the output, not the exit code. A run that writes an empty shell
//      exits 0 and looks like success.

import { readFile, writeFile, rm } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const SSR = join(ROOT, 'dist-ssr')

// Framer Motion renders each animated block in its starting pose, for example
// `opacity:0;transform:translateY(24px)`. A crawler that reads CSS would treat
// those blocks as hidden, so they are written in their finished pose. React
// replaces this markup when the page loads (main.jsx uses createRoot), and the
// animations then play as usual.
function settle(html) {
  let n = 0
  const out = html.replace(/style="([^"]*)"/g, (whole, css) => {
    const m = css.match(/(?:^|;)\s*opacity:\s*([\d.]+)/)
    if (!m || parseFloat(m[1]) >= 1) return whole
    n++
    const fixed = css
      .replace(/(^|;)\s*opacity:\s*[\d.]+/, '$1opacity:1')
      .replace(/(^|;)\s*transform:\s*[^;]*/, '$1transform:none')
    return `style="${fixed}"`
  })
  return { html: out, settled: n }
}

function textOf(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#x27;|&#39;|&quot;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function check(app) {
  const text = textOf(app)
  const words = text ? text.split(' ').length : 0
  const h1 = (app.match(/<h1[\s>]/g) || []).length
  const missing = ['work', 'skills', 'experience', 'stack', 'contact'].filter((id) => !app.includes(`id="${id}"`))
  const fail = (m) => { throw new Error(`prerender produced unusable HTML: ${m}`) }
  if (words < 400) fail(`only ${words} words of rendered text`)
  if (!text.includes('Farhan')) fail('name absent from rendered text')
  if (!text.includes('Plusveda') || !text.includes('AshShifa')) fail('the products are missing from the rendered text')
  if (h1 !== 1) fail(`expected 1 <h1>, found ${h1}`)
  if (missing.length) fail(`sections missing: ${missing.join(', ')}`)
  return { words, h1 }
}

async function main() {
  console.log('🔧 Prerender: rendering the page with React')
  const { render } = await import(pathToFileURL(join(SSR, 'entry-server.js')).href)
  const { html: app, settled } = settle(render())
  if (settled) console.log(`   settled ${settled} animated block(s) into their finished pose`)
  const { words, h1 } = check(app)

  const file = join(DIST, 'index.html')
  const shell = await readFile(file, 'utf8')
  const slot = /<div id="root">[\s\S]*?<\/div><\/div>/
  if (!slot.test(shell)) throw new Error('could not find <div id="root"> with its boot loader in dist/index.html')
  const out = shell.replace(slot, () => `<div id="root">${app}</div>`)
  await writeFile(file, out, 'utf8')
  await rm(SSR, { recursive: true, force: true })
  console.log(`✅ Prerendered → dist/index.html (${(out.length / 1024).toFixed(1)} KB, ${words} words, ${h1} h1)`)
}

main().catch((err) => { console.error('❌ Prerender failed:', err); process.exit(1) })
