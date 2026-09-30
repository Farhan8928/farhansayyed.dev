// Refresh the live-site screenshots. The committed images under
// public/projects/ come from each product's own docs (HMS docs/shots,
// ParentAI docs/screens) so they show real screens, not landing pages.
// Run this only when you want a landing-page shot instead:
//
//   npm run screenshots
//
// Writes public/projects/<id>-live.jpg at 1600×1000.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(__root, 'public', 'projects')
const VIEWPORT = { width: 1600, height: 1000 }

const targets = [
  { id: 'hms',      url: 'https://hms.fiveminfotech.com/' },
  { id: 'plusveda', url: 'https://plusveda.online/' }
]

async function main() {
  await fs.mkdir(outDir, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  for (const t of targets) {
    const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, locale: 'en-IN', timezoneId: 'Asia/Kolkata' })
    const page = await ctx.newPage()
    page.on('dialog', (d) => d.dismiss().catch(() => {}))
    try {
      await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 45_000 })
      await page.waitForTimeout(2500)
      await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {})
      await page.keyboard.press('Escape').catch(() => {})
      await page.addStyleTag({ content: `*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important}` })
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(400)
      const dest = path.join(outDir, `${t.id}-live.jpg`)
      await page.screenshot({ path: dest, type: 'jpeg', quality: 88, clip: { x: 0, y: 0, ...VIEWPORT } })
      console.log(`✓ ${t.id.padEnd(10)} ${((await fs.stat(dest)).size / 1024).toFixed(0)} KB`)
    } catch (e) {
      console.log(`⚠ ${t.id.padEnd(10)} ${e.message}`)
    } finally { await ctx.close() }
  }
  await browser.close()
}

main().catch((e) => { console.error(e); process.exit(1) })
