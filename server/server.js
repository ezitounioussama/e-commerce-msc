import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { getProducts, getProductById } from './controllers/products.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.get('/api/products', getProducts)
app.get('/api/products/:id', getProductById)

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
