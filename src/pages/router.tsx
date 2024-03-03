import { createBrowserRouter } from 'react-router-dom'

import { ExperiencePage } from './experience'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExperiencePage />,
  },
])

export { router }
