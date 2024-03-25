import { useCallback, useEffect, useState } from 'react'

import { Layout } from '@/shared/ui'
import { Experience } from '@/widgets/experience'

const DEBUG_MARKER_HASH_PROPERTY = '#debug'

const _ = () => {
  const [isDebug, setIsDebug] = useState<boolean>(
    window.location.hash === DEBUG_MARKER_HASH_PROPERTY
  )

  const handleHashChange = useCallback(() => {
    setIsDebug(window.location.hash === DEBUG_MARKER_HASH_PROPERTY)
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [handleHashChange])

  return (
    <Layout>
      <Experience isDebug={isDebug} />
    </Layout>
  )
}

export { _ }
