// Social share image, 1200×630 — what LinkedIn, WhatsApp and Slack show when
// the link is pasted. Same paper-and-receipt language as the site.

import { chromium } from 'playwright'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'og.jpg')

const html = /* html */ `<!doctype html><html><head><meta charset="utf-8"/>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  html,body{margin:0}
  body{width:1200px;height:630px;background:#F3EFE6;color:#14130F;display:grid;grid-template-columns:1fr 360px;gap:56px;padding:64px 72px;box-sizing:border-box;font-family:'JetBrains Mono',monospace}
  .label{font-size:14px;letter-spacing:.16em;text-transform:uppercase;color:#7B7567}
  h1{font-family:'Instrument Serif',Georgia,serif;font-weight:400;font-size:92px;line-height:.98;letter-spacing:-.02em;margin:22px 0 0}
  .m{background:linear-gradient(transparent 56%,#FFE14D 56%,#FFE14D 92%,transparent 92%)}
  .bars{margin-top:34px;border-top:1.5px solid #14130F;border-bottom:1.5px solid #14130F;padding:16px 0}
  .bar{height:26px;margin:7px 0;display:flex;align-items:center;font-size:15px}
  .b{background:#C8321F;width:100%;height:100%;color:#FFFDF8;display:flex;align-items:center;justify-content:flex-end;padding-right:10px;box-sizing:border-box}
  .a{background:#0B6E45;width:9px;height:100%;margin-right:12px}
  .r{background:#FFFDF8;padding:30px 24px;font-size:14.5px;line-height:1.7;box-shadow:0 18px 30px rgba(20,19,15,.14);align-self:center}
  .row{display:flex;gap:8px;align-items:baseline}.row i{flex:1;border-bottom:1px dotted #B9B2A1;transform:translateY(-4px)}
  .g{color:#0B6E45;font-weight:500}.c{text-align:center}.rule{border-top:1px dashed #B9B2A1;margin:10px 0}
</style></head><body>
<div>
  <div class="label">Farhan Sayyed · Full-Stack Engineer · Mumbai</div>
  <h1>I made a hospital’s billing report <span class="m">69× faster.</span></h1>
  <div class="bars">
    <div class="bar"><div class="a"></div><b class="g">152 ms</b>&nbsp; after</div>
    <div class="bar"><div class="b">10,465 ms before</div></div>
  </div>
</div>
<div class="r">
  <div class="c" style="letter-spacing:.2em;font-weight:500">RECEIPT</div>
  <div class="c" style="color:#7B7567">farhansayyed.dev</div>
  <div class="rule"></div>
  <div class="row"><span>Billing report</span><i></i><span class="g">−98.5%</span></div>
  <div class="row"><span>a11y violations</span><i></i><span class="g">473 → 0</span></div>
  <div class="row"><span>Paths in budget</span><i></i><span class="g">83 / 83</span></div>
  <div class="row"><span>Records tested</span><i></i><span class="g">4.5M</span></div>
  <div class="row"><span>Apps shipped</span><i></i><span class="g">12+</span></div>
  <div class="rule"></div>
  <div class="row"><b>Amount due</b><i></i><b>1 conversation</b></div>
</div>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle' })
await page.screenshot({ path: OUT, type: 'jpeg', quality: 92 })
await browser.close()
console.log('✓ wrote public/og.jpg')
