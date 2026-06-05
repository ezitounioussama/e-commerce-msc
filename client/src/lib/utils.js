export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`
}
