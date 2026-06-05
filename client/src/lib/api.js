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

function authHeaders() {
  const token = localStorage.getItem('admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function adminLogin(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Invalid credentials')
  return res.json()
}

export async function adminGetStats() {
  const res = await fetch(`${BASE_URL}/products?limit=1`)
  if (!res.ok) throw new Error('Failed to fetch stats')
  const { total } = await res.json()
  return { totalProducts: total }
}

export async function adminFetchProducts({ page = 1, limit = 50 } = {}) {
  const res = await fetch(`${BASE_URL}/products?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function adminCreateProduct(data) {
  const res = await fetch(`${BASE_URL}/admin/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to create product')
  return res.json()
}

export async function adminUpdateProduct(id, data) {
  const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to update product')
  return res.json()
}

export async function adminDeleteProduct(id) {
  const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Failed to delete product')
  return res.json()
}

