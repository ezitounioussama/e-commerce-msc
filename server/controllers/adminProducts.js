import Product from '../models/Product.js'

export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    console.error('[admin] Create product error:', err.message)
    res.status(500).json({ error: 'Failed to create product' })
  }
}

export async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).lean()
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    console.error('[admin] Update product error:', err.message)
    res.status(500).json({ error: 'Failed to update product' })
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).lean()
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    console.error('[admin] Delete product error:', err.message)
    res.status(500).json({ error: 'Failed to delete product' })
  }
}
