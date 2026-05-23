import { motion } from 'motion/react'
import GImage from 'vite-image-react'

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1160',
    rating: '4.8',
    reviews: '2,341',
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: '$199.99',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1160',
    rating: '4.6',
    reviews: '1,892',
    badge: 'New',
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: '$49.99',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=1160',
    rating: '4.7',
    reviews: '856',
    badge: null,
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: '$39.99',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=1160',
    rating: '4.5',
    reviews: '3,421',
    badge: 'Sale',
  },
  {
    id: 5,
    name: 'USB-C Hub',
    price: '$34.99',
    image: 'https://images.unsplash.com/photo-1623874514711-0f321325f318?auto=format&fit=crop&q=80&w=1160',
    rating: '4.4',
    reviews: '1,204',
    badge: null,
  },
  {
    id: 6,
    name: 'Mechanical Keyboard',
    price: '$129.99',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=1160',
    rating: '4.9',
    reviews: '4,567',
    badge: 'Bestseller',
  },
]

export default function ProductCard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <motion.a
          key={product.id}
          href="#"
          className="group block rounded-lg p-4 shadow-xs shadow-racing-red-100/50 dark:bg-gray-800"
          whileHover={{
            y: -6,
            boxShadow: '0 12px 28px rgba(230, 25, 25, 0.12)',
            transition: { duration: 0.25, ease: 'easeOut' },
          }}
        >
          <div className="relative">
            <GImage
              alt={product.name}
              src={product.image}
              className="h-56 w-full rounded-md object-cover"
            />
            {product.badge && (
              <span className="absolute top-2 left-2 rounded bg-racing-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                {product.badge}
              </span>
            )}
          </div>

          <div className="mt-3">
            <dl>
              <div className="flex items-center justify-between">
                <dt className="sr-only">Price</dt>
                <dd className="text-lg font-bold text-racing-red-500">{product.price}</dd>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
                  <svg className="size-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{product.rating}</span>
                  <span className="text-gray-400 dark:text-gray-500">({product.reviews})</span>
                </div>
              </div>

              <div>
                <dt className="sr-only">Name</dt>
                <dd className="mt-1 font-medium text-gray-900 dark:text-white group-hover:text-racing-red-600 transition-colors">
                  {product.name}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center gap-4 text-xs">
              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-1.5">
                <svg className="size-4 text-racing-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Shipping</p>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Free</p>
                </div>
              </div>

              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-1.5">
                <svg className="size-4 text-racing-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Warranty</p>
                  <p className="font-medium text-gray-700 dark:text-gray-300">1 year</p>
                </div>
              </div>

              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-1.5">
                <svg className="size-4 text-racing-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Returns</p>
                  <p className="font-medium text-gray-700 dark:text-gray-300">30 days</p>
                </div>
              </div>
            </div>

            <motion.button
              type="button"
              className="mt-5 w-full rounded-md bg-racing-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm"
              whileHover={{ backgroundColor: '#b81414', scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
