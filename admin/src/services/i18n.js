import translationEN from 'src/locales/en/translation.json'
import translationVI from 'src/locales/vi/translation.json'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
// import HttpApi from 'i18next-http-backend'
const resources = {
  en: {
    translation: translationEN,
  },
  vi: {
    translation: translationVI,
  },
}
// .use(HttpApi) // Remove resource to split language file if too big
i18next.use(initReactI18next).init({
  resources,
  lng: window.localStorage.getItem('i18nextLng') || 'vi',

  // Good idea to provide a fallback when loading
  // translations from a back-end, to avoid unsuccessful
  // attempts to load default fallbackLng ("dev").
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV === 'development',
})

export default i18next
