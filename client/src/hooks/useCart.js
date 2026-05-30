import useCartStore from '../store/useCartStore'

function parsePrice(price) {
  return parseFloat(price.replace(/[^0-9.]/g, ''))
}

export function useCart() {
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)

  const itemCount = items.length

  const subtotal = items.reduce((sum, i) => {
    const price = parsePrice(i.price)
    return sum + price * i.quantity
  }, 0)

  const isEmpty = items.length === 0

  const formatPrice = (value) => `$${value.toFixed(2)}`

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
