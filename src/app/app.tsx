import { RouterProvider } from 'react-router-dom'

import './index.css'

import { router } from '@/pages'

const App = () => {
  return <RouterProvider router={router} />
}

export { App }
