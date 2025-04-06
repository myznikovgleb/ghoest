import { RouterProvider } from 'react-router'

import './index.css'

import { router } from '@/pages'

const App = () => {
  return <RouterProvider router={router} />
}

export { App }
