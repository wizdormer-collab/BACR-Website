// Page titles are normally applied by usePageTitle's effect, and effects never
// run on the server. usePageTitle also records the title during render so the
// prerender step can read it back and give every static page a real <title>.
let pendingTitle = null

export function setPendingTitle(title) {
  pendingTitle = title
}

export function takePendingTitle() {
  const title = pendingTitle
  pendingTitle = null
  return title
}
