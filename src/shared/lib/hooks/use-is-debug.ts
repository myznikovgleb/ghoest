import { useEffect, useState } from 'react'

const DEBUG_HASH_PROPERTY = '#debug'

const useIsDebug = () => {
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

  return isDebug
}

export { useIsDebug }
