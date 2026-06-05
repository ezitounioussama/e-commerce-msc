import { useEffect, useState } from 'react'
import { IconEdit, IconTrash, IconPlus, IconX } from '@tabler/icons-react'
import { z } from 'zod'
import { adminFetchProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct } from '../lib/api'
import { formatPrice } from '../lib/utils'

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z
    .string()
    .min(1, 'Price is required')
    .transform((v) => v.trim())
    .refine((v) => /^\d+(\.\d{1,2})?$/.test(v.replace(/^\$/, '')), 'Must be a valid number (e.g. 49.99)'),
  image: z.string().optional().default(''),
  badge: z.string().optional().default(''),
  rating: z
    .string()
    .optional()
    .default('')
    .refine((v) => !v || /^\d+(\.\d)?$/.test(v), 'Must be a number (e.g. 4.5)'),
  reviews: z
    .string()
    .optional()
    .default('')
    .refine((v) => !v || /^\d+$/.test(v), 'Must be a whole number'),
  colors: z.string().optional().default(''),
})

const emptyForm = { name: '', price: '', image: '', badge: '', rating: '', reviews: '', colors: '' }
const emptyErrors = {}

function toForm(product) {
  return {
    name: product.name || '',
    price: product.price ?? '',
    image: product.image || '',
    badge: product.badge || '',
    rating: product.rating ?? '',
    reviews: product.reviews ?? '',
    colors: (product.colors || []).join(', '),
  }
}

function toPayload(form) {
  return {
    name: form.name,
    price: parseFloat(form.price.replace(/^\$/, '')),
    image: form.image || '',
    badge: form.badge || null,
    rating: form.rating ? parseFloat(form.rating) : 0,
    reviews: form.reviews ? parseInt(form.reviews, 10) : 0,
    colors: form.colors ? form.colors.split(',').map((c) => c.trim()).filter(Boolean) : [],
  }
}

function validateField(schema, data) {
  const result = schema.safeParse(data)
  if (result.success) return {}
  const errors = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0]
    if (!errors[key]) errors[key] = issue.message
  }
  return errors
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState(emptyErrors)
  const [submitting, setSubmitting] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const data = await adminFetchProducts({ limit: 100 })
      setProducts(data.products)
    } catch {
      console.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openCreate() {
    setEditing(null)
    setForm(emptyForm)
    setErrors(emptyErrors)
    setShowModal(true)
  }

  function openEdit(product) {
    setEditing(product)
    setForm(toForm(product))
    setErrors(emptyErrors)
    setShowModal(true)
  }

  function handleChange(field, value) {
    const next = { ...form, [field]: value }
    setForm(next)
    const fieldErrors = validateField(productSchema, next)
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] || null }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    const allErrors = validateField(productSchema, form)
    setErrors(allErrors)
    if (Object.keys(allErrors).length > 0) {
      setSubmitting(false)
      return
    }

    try {
      const payload = toPayload(form)
      if (editing) {
        await adminUpdateProduct(editing._id, payload)
      } else {
        await adminCreateProduct(payload)
      }
      setShowModal(false)
      load()
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return
    try {
      await adminDeleteProduct(id)
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Products</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-racing-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-racing-red-600"
        >
          <IconPlus size={18} />
          Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm dark:bg-gray-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b dark:border-gray-700">
              <tr className="text-gray-500 dark:text-gray-400">
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Rating</th>
                <th className="px-4 py-3 font-medium">Badge</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {products.map((p) => (
                <tr key={p._id} className="text-gray-700 dark:text-gray-300">
                  <td className="px-4 py-3">
                    {p.image && (
                      <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    )}
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">{p.rating ?? '—'}</td>
                  <td className="px-4 py-3">
                    {p.badge ? (
                      <span className="inline-block rounded-full bg-racing-red-100 px-2 py-0.5 text-xs font-medium text-racing-red-600 dark:bg-racing-red-900/30 dark:text-racing-red-400">
                        {p.badge}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-racing-red-500 dark:hover:bg-gray-700"
                      >
                        <IconEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700"
                      >
                        <IconTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                {editing ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-racing-red-500">
                <IconX size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Field label="Name *" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={inputClass(errors.name)}
                />
              </Field>

              <Field label="Price *" error={errors.price}>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder="49.99"
                  className={inputClass(errors.price)}
                />
              </Field>

              <Field label="Image URL" error={errors.image}>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                  className={inputClass(errors.image)}
                />
              </Field>

              <div className="grid grid-cols-3 gap-3">
                <Field label="Badge" error={errors.badge}>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => handleChange('badge', e.target.value)}
                    placeholder="New"
                    className={inputClass(errors.badge)}
                  />
                </Field>
                <Field label="Rating" error={errors.rating}>
                  <input
                    type="text"
                    value={form.rating}
                    onChange={(e) => handleChange('rating', e.target.value)}
                    placeholder="4.5"
                    className={inputClass(errors.rating)}
                  />
                </Field>
                <Field label="Reviews" error={errors.reviews}>
                  <input
                    type="text"
                    value={form.reviews}
                    onChange={(e) => handleChange('reviews', e.target.value)}
                    placeholder="128"
                    className={inputClass(errors.reviews)}
                  />
                </Field>
              </div>

              <Field label="Colors (comma separated)" error={errors.colors}>
                <input
                  type="text"
                  value={form.colors}
                  onChange={(e) => handleChange('colors', e.target.value)}
                  placeholder="Red, Blue, Black"
                  className={inputClass(errors.colors)}
                />
              </Field>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-racing-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-racing-red-600 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function inputClass(error) {
  return `mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-1 dark:bg-gray-700 dark:text-white ${
    error
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:border-racing-red-500 focus:ring-racing-red-500 dark:border-gray-600'
  }`
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
