import Product from '../models/Product.js'

export async function getProducts(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 6))
    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit).lean(),
      Product.countDocuments(),
    ])

    res.json({
      products,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    })
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
