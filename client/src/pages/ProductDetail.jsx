import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { fetchProductById } from '../lib/api'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../lib/utils'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProductById(id)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-800/50">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-sm text-gray-500 dark:text-gray-400">Product not found</p>
        <Link to="/products" className="text-sm text-racing-red-500 underline underline-offset-4">Back to products</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-racing-red-500 dark:text-gray-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Back to products
        </Link>

        <motion.div
          className="grid gap-8 lg:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center rounded-xl bg-white p-8 dark:bg-gray-900">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-96 object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            {product.badge && (
              <span className="mb-3 inline-block w-fit rounded bg-racing-red-500 px-2 py-0.5 text-xs font-semibold text-white">
                {product.badge}
              </span>
            )}

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>

            <div className="mt-2 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <svg className="size-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium text-gray-900 dark:text-white">{product.rating}</span>
              <span>({product.reviews} reviews)</span>
            </div>

            <p className="mt-6 text-4xl font-bold text-racing-red-500">{formatPrice(product.price)}</p>

            <motion.button
              onClick={() => addItem(product)}
              className="mt-8 w-full rounded-md bg-racing-red-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-racing-red-600 sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
