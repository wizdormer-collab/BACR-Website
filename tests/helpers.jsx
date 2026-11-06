import { render as renderRoute } from '../src/ssr.jsx'

// renderToString emits HTML-escaped text (You don't -> You don&#x27;t,
// Physical & -> Physical &amp;). Asserting against raw source strings then
// fails for reasons that have nothing to do with the content, so decode the
// handful of entities React produces before matching.
export function decode(html) {
  return html
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

// Tests and tools/prerender.mjs share this one render path (src/ssr.jsx), so
// a route that renders here prerenders identically on the build machine.
export function render(path) {
  return decode(renderRoute(path).html)
}
