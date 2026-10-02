import { useEffect } from 'react'

const SUFFIX = 'BACR - Bodija Advanced Care & Rehabilitation Centre'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : SUFFIX
  }, [title])
}
