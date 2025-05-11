import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router'

import { Layout } from '@/shared/ui'

const _ = () => {
  const path = `/home`

  return (
    <Layout>
      <section className="pattern flex size-full flex-col items-center justify-center">
        <div className="bg-base-300 flex flex-col items-center justify-center gap-8 rounded-4xl pb-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="bg-base-200 rounded-4xl px-8 py-2">
              <img src="ui/preview_greeting.png" className="size-56" />
            </div>
            <h1 className="text-base-content/70 text-3xl font-semibold">
              Ghoest App
            </h1>
          </div>
          <Link
            to={path}
            className="btn btn-xl btn-soft btn-primary gap-4 rounded-4xl"
          >
            <ArrowRightCircleIcon className="size-12" />
            <span>Proceed</span>
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export { _ }
