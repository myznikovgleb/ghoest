import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router'

import { Layout } from '@/shared/ui'

const _ = () => {
  const path = `/home`

  return (
    <Layout>
      <section className="flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="bg-base-200 rounded-4xl p-4 md:p-8">
            <img src="ui/preview_greeting.png" className="size-72" />
          </div>
          <h1 className="text-base-content/70 text-4xl font-semibold">
            Ghoest App
          </h1>
        </div>
        <Link
          to={path}
          className="btn btn-xl btn-soft btn-primary gap-8 rounded-4xl"
        >
          <ArrowRightCircleIcon className="size-12" />
          <span>Proceed</span>
        </Link>
      </section>
    </Layout>
  )
}

export { _ }
