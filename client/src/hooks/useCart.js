import useCartStore from '../store/useCartStore'
import { formatPrice } from '../lib/utils'

export function useCart() {
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)

  const itemCount = items.length

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const isEmpty = items.length === 0

  return {
    items,
    itemCount,
    subtotal,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    formatPrice,
  }
}
