import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './lib/i18n'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gray-500 dark:text-gray-300">Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
