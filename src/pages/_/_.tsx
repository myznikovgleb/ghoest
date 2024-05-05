import { Link } from 'react-router-dom'

import { Layout } from '@/shared/ui'

const _ = () => {
  const path = `/home`

  return (
    <Layout>
      <section className="flex flex-col items-center justify-center gap-16">
        <h1 className="text-4xl font-thin tracking-widest text-base-content">
          GHOEST
        </h1>
        <h2 className="animate-bounce text-6xl">👻</h2>
        <Link
          to={path}
          className="btn btn-neutral btn-lg btn-wide text-2xl font-thin tracking-widest"
        >
          START
        </Link>
      </section>
    </Layout>
  )
}

export { _ }
