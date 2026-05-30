import { motion } from 'motion/react'

export default function Hero() {
  return (
    <motion.section
      className="bg-white dark:bg-gray-900 lg:grid lg:h-screen lg:place-content-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          className="mx-auto max-w-prose text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            Understand user flow and
            <strong className="text-racing-red-500"> increase </strong>
            conversions
          </motion.h1>

          <motion.p
            className="mt-4 text-base text-pretty text-gray-700 dark:text-gray-300 sm:text-lg/relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi. Natus, provident
            accusamus impedit minima harum corporis iusto.
          </motion.p>

          <motion.div
            className="mt-4 flex justify-center gap-4 sm:mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          >
            <a
              className="inline-block rounded-md bg-racing-red-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-racing-red-600"
              href="#"
            >
              Get Started
            </a>

            <a
              className="inline-block rounded-md border border-racing-red-500 px-5 py-2.5 text-sm font-medium text-racing-red-500 shadow-sm transition-colors hover:bg-racing-red-500 hover:text-white"
              href="#"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
