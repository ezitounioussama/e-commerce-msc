import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20">
      <motion.h1
        className="text-4xl font-bold bg-gradient-to-r from-racing-red-500 to-racing-red-800 bg-clip-text text-transparent md:text-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        404 Not Found
      </motion.h1>

      <motion.div
        className="my-5 h-px w-80 rounded bg-gradient-to-r from-racing-red-300 to-racing-red-700 md:my-7"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      <motion.p
        className="max-w-lg text-center text-gray-500 md:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        The page you are looking for does not exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link
          to="/"
          className="group mt-10 flex items-center gap-1 rounded-full bg-racing-red-500 px-7 py-2.5 font-medium text-white transition-all hover:bg-racing-red-600 active:scale-95"
        >
          Back to Home
          <svg className="transition group-hover:translate-x-0.5" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.583 11h12.833m0 0L11 4.584M17.416 11 11 17.417" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </div>
  )
}
