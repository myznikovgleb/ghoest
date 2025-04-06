import { createBrowserRouter } from 'react-router'

import { _ } from './_'
import { _home_ } from './_home_'

const router = createBrowserRouter([
  {
    path: '/',
    element: <_ />,
  },
  {
    path: '/home',
    element: <_home_ />,
  },
])

export { router }
