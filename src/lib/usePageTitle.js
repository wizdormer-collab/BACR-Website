import { useEffect } from 'react'

const SUFFIX = 'BACR - Bodija Advanced Centre for Rehabilitation'

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : SUFFIX
  }, [title])
}
