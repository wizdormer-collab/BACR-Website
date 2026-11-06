import { useEffect } from 'react'
import { setPendingTitle } from './meta.js'

const SUFFIX = 'BACR - Bodija Advanced Centre for Rehabilitation'

export default function usePageTitle(title) {
  const full = title ? `${title} | ${SUFFIX}` : SUFFIX
  // Effects never run on the server, so the prerender step reads the title
  // from this render-time record instead. Purely idempotent: a second call
  // (StrictMode, re-render) overwrites the same value.
  setPendingTitle(full)
  useEffect(() => {
    document.title = full
  }, [full])
}
