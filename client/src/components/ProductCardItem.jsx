import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import GImage from 'vite-image-react'
import { useCart } from '../hooks/useCart'

export default function ProductCardItem({ product }) {
  const { addItem } = useCart()

  return (
    <motion.div
      className="group overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700 sm:h-64">
          {product.badge && (
            <motion.span
              className="absolute left-3 top-3 z-10 rounded bg-racing-red-500 px-2 py-0.5 text-xs font-semibold text-white"
              whileHover={{ y: -2 }}
            >
              {product.badge}
            </motion.span>
          )}
          <GImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <motion.div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            initial={false}
          />
        </div>

        <motion.div
          className="p-4 sm:p-5"
          initial={false}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="truncate text-base font-bold text-gray-900 dark:text-white sm:text-lg">{product.name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
              <svg className="size-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{product.rating}</span>
              <span className="text-gray-400 dark:text-gray-500">({product.reviews})</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <motion.span
              className="text-xl font-bold text-racing-red-500"
              whileHover={{ scale: 1.05 }}
            >
              {product.price}
            </motion.span>
          </div>
        </motion.div>
      </Link>

      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <motion.button
          onClick={() => addItem(product)}
          className="w-full cursor-pointer rounded-md bg-racing-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm"
          whileHover={{ backgroundColor: '#b81414', scale: 1.02, boxShadow: '0 4px 12px rgba(230,25,25,0.4)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}
