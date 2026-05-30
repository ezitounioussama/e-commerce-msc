import 'dotenv/config'
import mongoose from 'mongoose'
import Product from './models/Product.js'

const FAKE_STORE_URL = 'https://fakestoreapi.com/products'

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('[seed] Connected to MongoDB')

    const res = await fetch(FAKE_STORE_URL)
    const data = await res.json()

    const products = data.map((p) => ({
      name: p.title,
      price: `$${p.price}`,
      rating: String(p.rating.rate),
      reviews: String(p.rating.count),
      badge: null,
      image: p.image,
      colors: [],
    }))

    await Product.deleteMany({})
    await Product.insertMany(products)
    console.log(`[seed] Inserted ${products.length} products`)
    await mongoose.disconnect()
  } catch (err) {
    console.error('[seed] Error:', err.message)
    process.exit(1)
  }
}

seed()
