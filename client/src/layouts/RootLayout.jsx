import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react'

export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header — HyperUI-inspired: icon left, links center, CTA right */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/85 backdrop-blur supports-backdrop-filter:bg-white/85">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4">
          <Link to="/" className="text-xl font-semibold tracking-tight text-gray-900">
            ShopMSC
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <Link to="/" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              Products
            </Link>
            <Link to="/cart" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              Cart
            </Link>
            <Link to="/contact" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
              Contact
            </Link>
          </nav>

          <div className="flex flex-1 items-center justify-end gap-4 lg:hidden">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden lg:block">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="border-t border-gray-200 bg-white px-4 pb-4 pt-2 lg:hidden">
            <Link to="/" className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/products" className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              Products
            </Link>
            <Link to="/cart" className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              Cart
            </Link>
            <Link to="/contact" className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer — HyperUI-inspired: simple stacked */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <Link to="/" className="text-lg font-semibold text-gray-900">
              ShopMSC
            </Link>
            <nav className="flex gap-6">
              <Link to="/" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                Home
              </Link>
              <Link to="/products" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                Products
              </Link>
              <Link to="/cart" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                Cart
              </Link>
              <Link to="/contact" className="text-sm text-gray-500 transition-colors hover:text-gray-900">
                Contact
              </Link>
            </nav>
          </div>
          <div className="mt-8 border-t border-gray-100 pt-8 text-center">
            <p className="text-xs text-gray-400">
              &copy; 2026 ShopMSC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
