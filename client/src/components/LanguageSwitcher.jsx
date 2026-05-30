import { IconLanguage } from '@tabler/icons-react'
import { cn } from '../lib/utils'
import { useTranslation } from '../hooks/useTranslation'

export default function LanguageSwitcher({ className }) {
  const { currentLang, toggleLanguage } = useTranslation()

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'flex items-center gap-1 rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
        className
      )}
      type="button"
      aria-label={`Switch language to ${currentLang === 'en' ? 'French' : 'English'}`}
      title={currentLang === 'en' ? 'Français' : 'English'}
    >
      <IconLanguage size={20} />
      <span className="text-xs font-semibold uppercase">{currentLang}</span>
    </button>
  )
}
