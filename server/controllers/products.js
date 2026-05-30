import Product from '../models/Product.js'

export async function getProducts(_req, res) {
  try {
    const products = await Product.find().lean()
    res.json(products)
  } catch (err) {
    console.error('[products] Error:', err.message)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
}

export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).lean()
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    console.error('[products] Error:', err.message)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
}
