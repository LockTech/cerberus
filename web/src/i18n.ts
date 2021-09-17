import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false, // React already does escaping
      format: (value: string, format: string, lng: string) => {
        if (format === 'pluralPossessive' && lng === 'en')
          value += value.endsWith('s') ? "'" : "'s"

        if (format === 'friendlyDate')
          value = new Date(value).toLocaleDateString(lng, {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        if (format === 'friendlyTime')
          value = new Date(value).toLocaleTimeString(lng, {
            timeStyle: 'short',
          })

        return value
      },
    },
    detection: {
      order: ['querystring', 'navigator'],
      lookupQuerystring: 'lng',
    },
    debug: true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    ns: ['app', 'errors', 'languages', 'permissions'],
    defaultNS: 'app',
    backend: {
      loadPath: 'http://localhost:8911/locales/{{lng}}/{{ns}}.json',
    },
    initImmediate: true,
  })

export default i18n
