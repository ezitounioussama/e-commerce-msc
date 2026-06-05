import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IconPackage, IconShoppingCart } from '@tabler/icons-react'
import { adminGetStats } from '../lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    adminGetStats().then(setStats).catch(() => {})
  }, [])

  const cards = [
    {
      label: 'Total Products',
      value: stats?.totalProducts ?? '—',
      icon: IconPackage,
      color: 'bg-blue-500',
      link: '/admin/products',
    },
    {
      label: 'Total Orders',
      value: '—',
      icon: IconShoppingCart,
      color: 'bg-green-500',
    },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${card.color}`}>
                <card.icon size={24} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{card.value}</p>
              </div>
            </div>
            {card.link && (
              <Link
                to={card.link}
                className="mt-4 inline-block text-sm font-medium text-racing-red-500 hover:text-racing-red-600"
              >
                View details →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
