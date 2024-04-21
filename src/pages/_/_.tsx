import { useEffect, useState } from 'react'

import { Layout } from '@/shared/ui'
import { Experience } from '@/widgets/experience'

const DEBUG_HASH_PROPERTY = '#debug'

const _ = () => {
  const [isDebug, setIsDebug] = useState<boolean>(
    window.location.hash === DEBUG_HASH_PROPERTY
  )

  useEffect(() => {
    const handleHashChange = () => {
      setIsDebug(window.location.hash === DEBUG_HASH_PROPERTY)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <Layout>
      <Experience isDebug={isDebug} />
    </Layout>
  )
}

export { _ }
