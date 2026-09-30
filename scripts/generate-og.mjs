// Social share image, 1200×630: what LinkedIn, WhatsApp and Slack show when the
// link is pasted. Uses the real app icons from public/apps.
import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
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
  body{width:1200px;height:630px;background:#09090B;color:#F4F4F5;font-family:'Satoshi',system-ui,sans-serif;position:relative;overflow:hidden}
  .glow{position:absolute;right:-160px;top:-220px;width:760px;height:760px;border-radius:50%;background:#FF6A3D;opacity:.28;filter:blur(120px)}
  .c{position:relative;padding:68px 76px;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between}
  .row{display:flex;align-items:center;gap:14px}
  .fs{width:46px;height:46px;border-radius:13px;background:#FF6A3D;color:#09090B;display:grid;place-items:center;font-family:'Clash Display';font-weight:600;font-size:19px}
  .name{font-family:'Clash Display';font-weight:600;font-size:24px}
  .role{color:#A1A1AA;font-size:17px}
  h1{font-family:'Clash Display';font-weight:600;font-size:88px;line-height:.98;letter-spacing:-.02em;margin:0;max-width:900px}
  h1 span{color:#FF6A3D}
  .icons{display:flex;gap:14px;align-items:center}
  .icons img{width:66px;height:66px;border-radius:16px;object-fit:contain;box-sizing:border-box}
  .meta{margin-left:14px;color:#A1A1AA;font-size:19px}.meta b{color:#fff;display:block;font-size:22px}
</style></head><body><div class="glow"></div>
<div class="c">
  <div class="row"><div class="fs">FS</div><div><div class="name">Farhan Sayyed</div><div class="role">Full-Stack Engineer · Mumbai</div></div></div>
  <h1>I build products that ship to <span>every screen.</span></h1>
  <div class="icons">${icons.map(([src, bg]) => `<img src="${src}" style="background:${bg};padding:${bg === 'transparent' ? 0 : 8}px"/>`).join('')}
    <div class="meta"><b>12+ products shipped</b>web · Android · iOS · desktop</div></div>
</div></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: join(root, 'og.jpg'), type: 'jpeg', quality: 92 })
await browser.close()
console.log('✓ wrote public/og.jpg')
