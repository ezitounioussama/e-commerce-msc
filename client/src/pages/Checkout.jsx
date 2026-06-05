import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { IconBrandWhatsapp, IconTrash } from '@tabler/icons-react'
import { useCart } from '../hooks/useCart'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER

export default function Checkout() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, formatPrice } = useCart()
  const isEmpty = items.length === 0

  function buildWhatsAppMessage() {
    const origin = window.location.origin
    const lines = items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name} — ${formatPrice(i.price)} x ${i.quantity} = ${formatPrice(
          i.price * i.quantity,
        )}\n   ${origin}/products/${i._id}`,
    )
    const msg = [`🛒 *New Order*`, '', ...lines, '', `*Total: ${formatPrice(subtotal)}*`]
    return encodeURIComponent(msg.join('\n'))
  }

  function handleCheckout() {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`
    window.open(url, '_blank')
  }

  if (isEmpty) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-sm text-gray-500 dark:text-gray-400">Your cart is empty</p>
        <Link
          to="/products"
          className="rounded-md bg-racing-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-racing-red-600"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="space-y-4">
            {items.map((item) => (
              <motion.li
                key={item._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-16 shrink-0 rounded-sm object-cover"
                />

                <div className="min-w-0">
                  <h3 className="truncate text-sm text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{formatPrice(item.price)}</p>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const qty = parseInt(e.target.value, 10)
                      if (!isNaN(qty) && qty >= 1) updateQuantity(item._id, qty)
                    }}
                    className="h-8 w-12 rounded-sm border border-gray-300 bg-white p-0 text-center text-xs text-gray-700 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-gray-600 transition hover:text-red-600 dark:text-gray-300 dark:hover:text-red-300"
                  >
                    <span className="sr-only">Remove item</span>
                    <IconTrash size={16} />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="mt-8 space-y-6 border-t border-gray-200 pt-8 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <dl className="ml-auto max-w-sm space-y-1 text-sm text-gray-700 dark:text-gray-200">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>

            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd className="text-green-600 dark:text-green-400">Free</dd>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-2 font-semibold dark:border-gray-700">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>

          <div className="ml-auto max-w-sm">
            <button
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              <IconBrandWhatsapp size={20} />
              Order via WhatsApp
            </button>
          </div>

          <div className="text-right">
            <Link
              to="/products"
              className="inline-block text-sm text-gray-600 underline underline-offset-4 transition-colors hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
            >
              Continue shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
