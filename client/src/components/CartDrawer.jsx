import { useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { IconTrash, IconX } from '@tabler/icons-react'
import { useCart } from '../hooks/useCart'

export default function CartDrawer({ open, onClose }) {
  const { items, itemCount, subtotal, updateQuantity, removeItem, isEmpty, formatPrice } = useCart()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleQuantity = useCallback(
    (id, value) => {
      const qty = parseInt(value, 10)
      if (!isNaN(qty) && qty >= 1) updateQuantity(id, qty)
    },
    [updateQuantity],
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-y-0 right-0 z-[70] flex w-screen max-w-sm flex-col bg-white dark:border-gray-700 dark:bg-gray-800"
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-700 sm:px-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Cart {itemCount > 0 && <span className="ml-1 text-sm font-normal text-gray-500 dark:text-gray-400">({itemCount})</span>}
              </h2>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                aria-label="Close cart"
              >
                <IconX size={20} />
              </button>
            </div>

            {isEmpty ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Your cart is empty</p>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="rounded-md bg-racing-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-racing-red-600"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {items.map((item) => (
                      <motion.li
                        key={item._id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4 px-4 py-4 sm:px-6"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-20 shrink-0 rounded-lg object-cover"
                        />

                        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate text-sm font-medium text-gray-900 dark:text-white">{item.name}</h3>
                            <button
                              onClick={() => removeItem(item._id)}
                              className="shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                              aria-label={`Remove ${item.name}`}
                            >
                              <IconTrash size={15} />
                            </button>
                          </div>

                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatPrice(item.price)}</p>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="flex size-7 items-center justify-center rounded border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                              aria-label="Decrease quantity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                                <path d="M3.75 7.25h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5Z" />
                              </svg>
                            </button>
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) => handleQuantity(item._id, e.target.value)}
                              className="w-10 rounded border border-gray-300 bg-white py-1 text-center text-xs tabular-nums text-gray-900 focus:border-racing-red-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="flex size-7 items-center justify-center rounded border border-gray-300 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                              aria-label="Increase quantity"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3">
                                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 px-4 py-4 dark:border-gray-700 sm:px-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/checkout"
                      onClick={onClose}
                      className="block w-full rounded-md bg-racing-red-500 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-racing-red-600"
                    >
                      Checkout
                    </Link>
                    <button
                      onClick={onClose}
                      className="text-sm text-gray-500 underline underline-offset-4 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      Continue shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
