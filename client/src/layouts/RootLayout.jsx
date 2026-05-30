import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CartDrawer from '../components/CartDrawer'
import Footer from '../components/Footer'

export default function RootLayout() {
  const { pathname } = useLocation()
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar onCartOpen={() => setCartOpen(true)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}
