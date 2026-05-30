import { motion } from 'motion/react'
import products from '../data/products'
import ProductCardItem from '../components/ProductCardItem'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

export default function Products() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Our Products</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-300">Choose your style, pick your color</p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.map((product) => (
            <ProductCardItem key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
