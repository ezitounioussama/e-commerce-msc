import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me'

export async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const admin = await Admin.findOne({ email })
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '24h' })
    res.json({ token, admin: { id: admin._id, email: admin.email } })
  } catch (err) {
    console.error('[auth] Login error:', err.message)
    res.status(500).json({ error: 'Login failed' })
  }
}

export async function register(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const exists = await Admin.findOne({ email })
    if (exists) return res.status(409).json({ error: 'Admin already exists' })

    const admin = await Admin.create({ email, password })
    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '24h' })
    res.status(201).json({ token, admin: { id: admin._id, email: admin.email } })
  } catch (err) {
    console.error('[auth] Register error:', err.message)
    res.status(500).json({ error: 'Registration failed' })
  }
}

export function authenticate(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    req.admin = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
