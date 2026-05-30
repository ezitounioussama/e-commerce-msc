import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  rating: String,
  reviews: String,
  badge: { type: String, default: null },
  image: String,
  colors: Array,
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
