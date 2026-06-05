import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { getProducts, getProductById } from './controllers/products.js'
import { login, register, authenticate } from './controllers/auth.js'
import { createProduct, updateProduct, deleteProduct } from './controllers/adminProducts.js'
import { validate } from './middleware/validate.js'
import { createProductSchema, updateProductSchema } from './validation/product.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.get('/api/products', getProducts)
app.get('/api/products/:id', getProductById)

app.post('/api/auth/register', register)
app.post('/api/auth/login', login)

app.post('/api/admin/products', authenticate, validate(createProductSchema), createProduct)
app.put('/api/admin/products/:id', authenticate, validate(updateProductSchema), updateProduct)
app.delete('/api/admin/products/:id', authenticate, deleteProduct)

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('[db] Connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`[server] Listening on http://localhost:${PORT}`)
      console.log(`[server] Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (err) {
    console.error('[db] Connection failed:', err.message)
    process.exit(1)
  }
}

start()

export default app
