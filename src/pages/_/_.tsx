import { Link } from 'react-router'

import { Layout } from '@/shared/ui'

const _ = () => {
  const path = `/home`

  return (
    <Layout>
      <section className="flex flex-col items-center justify-center gap-32">
        <h1 className="text-4xl font-thin tracking-[0.5em]">GHOEST</h1>
        <h2 className="text-8xl">👻</h2>
        <Link
          to={path}
          className="btn btn-primary btn-xl btn-wide font-thin tracking-[0.25em]"
        >
          START
        </Link>
      </section>
    </Layout>
  )
}

export { _ }
