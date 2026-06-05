import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  IconLayoutDashboard,
  IconPackage,
  IconLogout,
  IconMenu2,
  IconX,
} from '@tabler/icons-react'
import AnimatedThemeToggler from '../components/AnimatedThemeToggler'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: IconLayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: IconPackage },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) navigate('/admin/login', { replace: true })
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login')
  }

  function isActive(path) {
    if (path === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform dark:bg-gray-800 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b px-6 dark:border-gray-700">
          <Link to="/admin" className="text-xl font-bold text-racing-red-500">ShopMSC</Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-racing-red-500">
            <IconX size={22} />
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.to)
                  ? 'bg-racing-red-50 text-racing-red-600 dark:bg-racing-red-900/30 dark:text-racing-red-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t p-4 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <IconLogout size={20} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-racing-red-500">
            <IconMenu2 size={24} />
          </button>
          <div className="flex-1" />
          <AnimatedThemeToggler className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" />
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
