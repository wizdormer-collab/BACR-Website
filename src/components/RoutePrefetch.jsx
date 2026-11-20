import { useEffect } from 'react'

// Warm a route's chunk before the user clicks its link. Without this a
// client-side navigation to an unvisited page shows a blank frame for as long
// as the chunk takes to arrive — on a phone, that is the difference between
// feeling instant and feeling broken.
//
// Delegation at the document level means one listener for every link, not one
// per anchor: pointerover covers mouse/touch hover, focusin covers keyboard
// tabbing (the prefetch fires when a link is about to be activated, not when
// it is clicked). The bundler caches dynamic imports, so repeated hovers are
// free. Nothing runs during SSR — and the eager server table has no loaders
// to warm, so those entries are simply skipped.
export default function RoutePrefetch({ routes }) {
  useEffect(() => {
    const loaders = new Map(
      routes.filter(({ load }) => typeof load === 'function').map(({ path, load }) => [path, load]),
    )
    if (loaders.size === 0) return undefined

    const warm = (event) => {
      const anchor = event.target?.closest?.('a[href]')
      if (!anchor) return
      let pathname
      try {
        pathname = new URL(anchor.href, window.location.href).pathname
      } catch {
        return // mailto:, tel: and friends
      }
      loaders.get(pathname)?.()
    }

    document.addEventListener('pointerover', warm, { passive: true })
    document.addEventListener('focusin', warm)
    return () => {
      document.removeEventListener('pointerover', warm)
      document.removeEventListener('focusin', warm)
    }
  }, [routes])

  return null
}
