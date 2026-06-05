import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item._id === product._id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item._id !== id) }
          }
          return {
            items: state.items.map((item) =>
              item._id === id ? { ...item, quantity } : item,
            ),
          }
        }),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'ecommerce-cart-v2' },
  ),
)

export default useCartStore
