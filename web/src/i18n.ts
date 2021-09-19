import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
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
    debug: false,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    ns: ['app', 'errors', 'languages', 'permissions'],
    defaultNS: 'app',
    backend: {
      loadPath: `${global.__REDWOOD__API_PROXY_PATH}/locales/{{lng}}/{{ns}}.json`,
    },
  })

export default i18n
