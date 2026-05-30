import { Link, useRouteError } from 'react-router-dom'

export default function ErrorBoundary() {
  const error = useRouteError()

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-6xl">⚠️</div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        Something went wrong
      </h1>
      <p className="mb-6 max-w-md text-gray-500 dark:text-gray-400">
        {error?.message || 'An unexpected error occurred.'}
      </p>
      <Link
        to="/"
        className="rounded-md bg-racing-red-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-racing-red-600"
      >
        Back to Home
      </Link>
    </div>
  )
}
