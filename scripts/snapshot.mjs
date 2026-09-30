// Serve dist/ and capture what a visitor sees: the live first screen mid-race,
// each reading depth, and every section at full size. Logs console errors.
//   OUT=<dir> node scripts/snapshot.mjs
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, stat, mkdir } from 'node:fs/promises'
import { extname, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const OUT = process.env.OUT || join(__dirname, '..', '.snapshots')
const MIME = { '.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf','.webmanifest':'application/manifest+json','.txt':'text/plain' }
const server = createServer(async (req,res)=>{ try{ let p=decodeURIComponent(new URL(req.url,'http://x').pathname); if(p==='/')p='/index.html'; let f=join(DIST,p); try{ if((await stat(f)).isDirectory()) f=join(f,'index.html') }catch{ f=join(DIST,'index.html') } res.writeHead(200,{'Content-Type':MIME[extname(f)]??'application/octet-stream'}); res.end(await readFile(f)) }catch{ res.writeHead(404).end() } })
await new Promise(r=>server.listen(0,'127.0.0.1',r))
const base=`http://127.0.0.1:${server.address().port}`
await mkdir(OUT,{recursive:true})
const browser=await chromium.launch()
const errors=[]
const watch=(page,name)=>{ page.on('console',m=>{ if(m.type()==='error') errors.push(`[${name}] console: ${m.text()}`) }); page.on('pageerror',e=>errors.push(`[${name}] pageerror: ${e.message}`)); page.on('requestfailed',r=>{ if(!/fonts\.g/.test(r.url())) errors.push(`[${name}] requestfailed: ${r.url()}`) }) }
const walk=async(page)=>{ await page.evaluate(async()=>{ const s=window.innerHeight*0.7; for(let y=0;y<document.body.scrollHeight;y+=s){window.scrollTo(0,y); await new Promise(r=>setTimeout(r,140))} window.scrollTo(0,0) }); await page.waitForTimeout(1300) }

for (const [name,vp] of [['desktop',{width:1440,height:900}],['phone',{width:390,height:844}]]) {
  const page=await browser.newPage({viewport:vp}); watch(page,name)
  await page.goto(base+'/',{waitUntil:'networkidle'})
  await page.waitForTimeout(3200)                       // mid-race
  await page.screenshot({path:join(OUT,`${name}-live-fold.png`)})
  await page.waitForTimeout(8000)                       // race finished
  await page.screenshot({path:join(OUT,`${name}-done-fold.png`)})
  await walk(page)
  await page.screenshot({path:join(OUT,`${name}-short-full.png`),fullPage:true})
  console.log(name,'3-min page height', await page.evaluate(()=>document.body.scrollHeight))
  if (name==='desktop') {
    for (const id of ['brief','work','stack','contact']) await page.locator('#'+id).screenshot({path:join(OUT,`sec-${id}.png`)})
    await page.getByRole('radio',{name:'Everything'}).click(); await walk(page)
    for (const id of ['decisions','proof','about']) await page.locator('#'+id).screenshot({path:join(OUT,`sec-${id}.png`)})
    console.log('everything page height', await page.evaluate(()=>document.body.scrollHeight))
    await page.getByRole('radio',{name:'30 sec'}).click(); await page.waitForTimeout(400)
    await page.screenshot({path:join(OUT,'desktop-brief-full.png'),fullPage:true})
  }
  await page.close()
}
await browser.close(); server.close()
console.log(errors.length? `ERRORS (${errors.length}):\n  `+errors.join('\n  ') : 'no console errors, page errors, or failed requests')
