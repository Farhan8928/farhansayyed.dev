# Farhan Sayyed — Portfolio

Personal portfolio of Farhan Sayyed, full-stack engineer in Mumbai.
Built with Vite, React 18, Tailwind CSS and Framer Motion. One page, prerendered to static HTML on build.

## Run it

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # production build + prerender into dist/
npm run preview    # serve dist/ locally
```

## The idea

The hero is a phone that works. Its home screen holds the products Farhan has shipped, with their real icons.
Tapping an icon opens that app and plays real screens from it, and the accent colour of the whole page
changes to match the product. The dock on the phone holds working links: resume, email, GitHub, LinkedIn.

Below the hero:

| Section      | What it shows                                                        |
| ------------ | -------------------------------------------------------------------- |
| Work         | Five products as stacked cards, then a grid of twelve more           |
| What I do    | Five tiles: one codebase, speed, multi-tenant SaaS, CI/CD, AI        |
| Experience   | Short story, three numbers, timeline                                 |
| Stack        | Tools grouped by area, plus what is being learned now                |
| Contact      | Click-to-copy email, WhatsApp, resume, LinkedIn, GitHub              |

## Folder pattern

Content lives in `src/data`, page sections in `src/sections`, shared pieces in `src/components`.
To change text, edit the data files. The sections read from them.

```
src/
  data/         profile.js  apps.js  stack.js  timeline.js
  sections/     Hero  Strip  Work  Skills  Experience  Stack  Contact
  components/   Nav  HomePhone  Frames  AppIcon  Reveal
  lib/          accent.jsx (page accent colour)  env.js
  entry-server.jsx  used only at build time to prerender the page
  styles/       index.css
public/
  apps/<id>/    icon, phone-N.jpg, wide-N.jpg for each product
  Farhan_Sayyed_Full_Stack_Engineer.pdf
scripts/
  prerender.mjs        renders the page with React into dist/index.html and checks it
  generate-og.mjs      builds public/og.jpg (link preview image)
  shots.mjs            screenshots of dist/ at desktop, laptop and phone sizes
  prepare-assets.py    rebuilds public/apps from the project folders
```

## Common changes

- **Name, email, phone, links, availability:** `src/data/profile.js`
- **Add or edit a product:** `src/data/apps.js`. Put its images in `public/apps/<id>/`.
- **Replace the resume:** overwrite the PDF in `public/` and keep the same file name.
- **Domain:** the site lives at `https://farhansayyed-dev.vercel.app`. To move it, replace that address in `src/data/profile.js` and `index.html`, then run `npm run og`.

## Other scripts

```bash
npm run og            # regenerate the link preview image
npm run screenshots   # capture dist/ into .snapshots/ and report console errors
python scripts/prepare-assets.py   # rebuild product images (needs Pillow)
```

## Deploy

`vercel.json` is included. Import the repository into Vercel, or upload `dist/` to any static host.
The build needs only Node. The prerender step uses React's server renderer, not a browser.
Playwright is used only by the local `og` and `screenshots` scripts.
