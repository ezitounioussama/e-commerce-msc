import { useTranslation as useI18nTranslation } from 'react-i18next'

export function useTranslation() {
  const { t, i18n, ready } = useI18nTranslation()

  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const toggleLanguage = () => {
    changeLanguage(currentLang === 'en' ? 'fr' : 'en')
  }

  return {
    t,
    i18n,
    ready,
    currentLang,
    changeLanguage,
    toggleLanguage,
    isFrench: currentLang === 'fr',
  }
}
