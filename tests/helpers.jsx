import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from '../src/App.jsx'

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

export function render(path) {
  return decode(
    renderToString(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    )
  )
}
