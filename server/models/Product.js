import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  badge: { type: String, default: null },
  image: { type: String, default: '' },
  colors: { type: [String], default: [] },
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
