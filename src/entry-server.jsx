// Server entry used only at build time. scripts/prerender.mjs renders the page
// to HTML with this, so the deployed index.html already holds every word of
// the site. No browser is needed, which is why it also works on Vercel.
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export function render() {
  return renderToString(<App />)
}
