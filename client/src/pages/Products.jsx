import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import ProductCardItem from '../components/ProductCardItem'
import { fetchProducts } from '../lib/api'
import { useTranslation } from '../hooks/useTranslation'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

export default function Products() {
  const { t } = useTranslation()
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchProducts({ page, limit: 6 })
      .then((data) => {
        setProducts(data.products)
        setTotalPages(data.totalPages)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t('products.title')}</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-300">{t('products.subtitle')}</p>
        </motion.div>

        {loading ? (
          <p className="text-center text-sm text-gray-400">Loading...</p>
        ) : (
          <>
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={page}
            >
              {products.map((product) => (
                <ProductCardItem key={product._id} product={product} />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`rounded-md px-3 py-2 text-sm transition-colors ${
                      p === page
                        ? 'bg-racing-red-500 text-white'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
