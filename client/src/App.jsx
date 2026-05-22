import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Landing from './pages/Landing'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Landing /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
