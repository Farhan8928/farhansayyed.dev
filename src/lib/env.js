// `?prerender=1` is set by scripts/prerender.mjs at build time. Components
// read this to skip the loader, cursor and typing effects so the snapshot
// captures the finished page — the HTML that LinkedIn, Slack and search
// engines actually read. Lives in its own module so sections can import it
// without pulling in App.jsx (which imports them back).
export const isPrerender =
  typeof window !== 'undefined' && /[?&]prerender=1\b/.test(window.location.search)
