import { z } from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().positive('Price must be a positive number'),
  image: z.string().optional().default(''),
  badge: z.string().nullable().optional().default(null),
  rating: z
    .number()
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating must be at most 5')
    .optional()
    .default(0),
  reviews: z
    .number()
    .int('Reviews must be a whole number')
    .min(0, 'Reviews cannot be negative')
    .optional()
    .default(0),
  colors: z
    .union([z.array(z.string()), z.string()])
    .optional()
    .default([])
    .transform((v) => (typeof v === 'string' ? v.split(',').map((c) => c.trim()).filter(Boolean) : v)),
})

export const updateProductSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  image: z.string().optional(),
  badge: z.string().nullable().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().int().min(0).optional(),
  colors: z
    .union([z.array(z.string()), z.string()])
    .optional()
    .transform((v) => (typeof v === 'string' ? v.split(',').map((c) => c.trim()).filter(Boolean) : v)),
})
