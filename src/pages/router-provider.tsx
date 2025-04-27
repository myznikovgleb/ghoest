import { BrowserRouter, Route, Routes } from 'react-router'

import { _ } from './_'
import { _home_ } from './_home_'

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<_ />} />
        <Route path="home" element={<_home_ />} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterProvider }
