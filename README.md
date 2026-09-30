# Farhan Sayyed — Portfolio

Same folder pattern as the DuoStack site (Vite + React + Tailwind, `src/data`
→ `src/sections` → `src/components`, prerendered on build). The design is its
own: paper, ink and receipts.

## The idea

1. **The first screen runs the proof.** Two bars race at the real measured
   durations: the fixed billing report finishes in 152 ms, the old one takes
   the full 10.5 seconds. The reader feels the wait that was removed.
2. **Every project is a receipt.** Each line is a decision and what it
   measured. Tapping a line opens the problem behind it and what it cost.
3. **"How long do you have?"** The header switch reshapes the page:
   30 seconds (race, brief, contact), 3 minutes (+ four receipts, stack),
   everything (+ case notes, audit trail, more work, about).
4. **Copy a pitch.** One button puts a 3-line summary on the recruiter's
   clipboard, ready to forward to a hiring manager.

## Run

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # vite build + prerender (what Vercel runs)
npm run og         # regenerate public/og.jpg
```

## Map

```
src/
  data/        profile.js   identity, links, resume path — edit once
               projects.js  the four receipts + moreWork
               decisions.js case notes
               proof.js     audit trail + the race durations
               stack.js     tools with a reason each; learning[]
               timeline.js  career dates (must match the resume PDF)
               pitch.js     the clipboard pitch
  sections/    Hero, Brief, Work, Decisions, Proof, Stack, About, Contact
  components/  Header (depth switch), Race, Receipt, Lightbox, CopyPitch
  lib/         mode.jsx (reading depth), env.js (prerender flag)
public/        projects/ screenshots, resume PDF, og.jpg
scripts/       prerender.mjs, generate-og.mjs, snapshot.mjs, capture-screenshots.mjs
```

## Rules

- A number goes on the page only if `proof.js` can name its method and file.
- The prerendered HTML is always the full depth, so crawlers and link
  previews see everything.
- `profile.siteUrl` and the URLs in `index.html` say `farhansayyed.dev`.
  Change them when the real domain exists, then run `npm run og`.
