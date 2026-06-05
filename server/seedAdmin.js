import 'dotenv/config'
import mongoose from 'mongoose'
import Admin from './models/Admin.js'

const email = process.env.ADMIN_EMAIL || 'admin@shopmsc.com'
const password = process.env.ADMIN_PASSWORD || 'admin123'

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('[seed] Connected to MongoDB')

  const existing = await Admin.findOne({ email })
  if (existing) {
    console.log(`[seed] Admin ${email} already exists`)
    await mongoose.disconnect()
    return
  }

  await Admin.create({ email, password })
  console.log(`[seed] Admin created: ${email} / ${password}`)
  await mongoose.disconnect()
}

seed()
