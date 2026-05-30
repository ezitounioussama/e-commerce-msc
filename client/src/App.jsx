import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Landing from './pages/Landing'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import ErrorBoundary from './components/ErrorBoundary'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/products', element: <Products /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
