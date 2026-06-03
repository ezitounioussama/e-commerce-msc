const BASE_URL = import.meta.env.VITE_API_URL

export async function fetchProducts({ page = 1, limit = 6 } = {}) {
  const res = await fetch(`${BASE_URL}/products?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}