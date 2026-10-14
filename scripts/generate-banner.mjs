// LinkedIn cover image, 1584×396, in the portfolio's style.
//   OUT=<file.png> node scripts/generate-banner.mjs
// LinkedIn puts the round profile photo over the bottom-left of the cover on
// desktop and crops the sides on phones, so all text sits in the right-hand
// two thirds and nothing important touches the edges.
import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const OUT = process.env.OUT || join(root, '..', 'linkedin-banner.png')
const uri = async (p, mime) => `data:${mime};base64,${(await readFile(join(root, p))).toString('base64')}`
const icons = [
  [await uri('apps/hms/icon.svg', 'image/svg+xml'), 'transparent'],
  [await uri('apps/plusveda/icon.png', 'image/png'), '#fff'],
  [await uri('apps/ashshifa/icon.png', 'image/png'), 'transparent'],
  [await uri('apps/parentai/icon.png', 'image/png'), 'transparent'],
  [await uri('apps/outvue/icon.png', 'image/png'), '#15123A'],
  [await uri('apps/rashtrafarm/icon.png', 'image/png'), '#fff'],
  [await uri('apps/classconnect/icon.png', 'image/png'), 'transparent']
]

const html = `<!doctype html><html><head><meta charset="utf-8"/>
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@600&f[]=satoshi@400,500,700&display=swap" rel="stylesheet"/>
<style>
  html,body{margin:0}
  body{width:1584px;height:396px;background:#09090B;color:#F4F4F5;font-family:'Satoshi',system-ui,sans-serif;position:relative;overflow:hidden}
  .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:44px 44px}
  .glow{position:absolute;right:-120px;top:-260px;width:820px;height:640px;border-radius:50%;background:#FF6A3D;opacity:.26;filter:blur(120px)}
  .glow2{position:absolute;left:180px;bottom:-320px;width:600px;height:420px;border-radius:50%;background:#FF6A3D;opacity:.10;filter:blur(110px)}
  .c{position:absolute;left:520px;right:96px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:26px}
  .role{font-size:19px;color:#A1A1AA;letter-spacing:.02em}
  .role b{color:#F4F4F5;font-weight:700}
  h1{font-family:'Clash Display';font-weight:600;font-size:62px;line-height:1;letter-spacing:-.02em;margin:0}
  h1 span{color:#FF6A3D}
  .row{display:flex;align-items:center;gap:12px}
  .row img{width:48px;height:48px;border-radius:12px;object-fit:contain;box-sizing:border-box}
  .meta{margin-left:14px;color:#A1A1AA;font-size:17px;line-height:1.35}.meta b{color:#fff;display:block;font-size:19px}
  .url{margin-left:auto;padding:10px 18px;border:1px solid rgba(255,255,255,.14);border-radius:999px;font-size:17px;font-weight:500;color:#F4F4F5;background:rgba(255,255,255,.04)}
</style></head><body><div class="grid"></div><div class="glow"></div><div class="glow2"></div>
<div class="c">
  <div class="role"><b>Full-Stack Engineer</b> &nbsp;·&nbsp; TypeScript · React · Node.js · React Native · AWS</div>
  <h1>I build products that ship to <span>every screen.</span></h1>
  <div class="row">${icons.map(([src, bg]) => `<img src="${src}" style="background:${bg};padding:${bg === 'transparent' ? 0 : 6}px"/>`).join('')}
    <div class="meta"><b>12+ products shipped</b>web · Android · iOS · desktop</div>
    <div class="url">farhansayyed-dev.vercel.app</div></div>
</div></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1584, height: 396 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: OUT, type: 'png' })
await browser.close()
console.log('✓ wrote ' + OUT)
