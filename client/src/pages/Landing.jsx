import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'

const features = [
  {
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $50. Fast and reliable delivery.',
    icon: (
      <svg className="size-8 text-racing-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  {
    title: '24/7 Support',
    description: 'Our team is here to help you anytime, anywhere.',
    icon: (
      <svg className="size-8 text-racing-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 11-12.728 0M12 7v4m0 4h.01" />
      </svg>
    ),
  },
  {
    title: 'Secure Payments',
    description: 'Your payment information is always encrypted and protected.',
    icon: (
      <svg className="size-8 text-racing-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Easy Returns',
    description: 'Not satisfied? Return any item within 30 days for a full refund.',
    icon: (
      <svg className="size-8 text-racing-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Landing() {
  return (
    <div>
      <Hero />

      <motion.section
        className="bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-gray-900"
            variants={itemVariants}
          >
            Why Choose Us
          </motion.h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feat) => (
              <motion.div
                key={feat.title}
                className="text-center"
                variants={itemVariants}
              >
                <div className="flex justify-center">{feat.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feat.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="bg-gray-50 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-gray-900"
            variants={itemVariants}
          >
            Featured Products
          </motion.h2>
          <div className="mt-12">
            <ProductCard />
          </div>
        </div>
      </motion.section>

      <motion.section
        className="bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-racing-red-600 to-racing-red-900 px-8 py-12 text-center sm:px-16"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Ready to Start Shopping?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-racing-red-100">
              Join thousands of happy customers and get exclusive deals delivered to your inbox.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/products"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-racing-red-600 shadow-sm transition-colors hover:bg-racing-red-50"
              >
                Get Started
              </Link>
              <Link
                to="/contact"
                className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
