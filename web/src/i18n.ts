import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en_app from './locales/en/app.json'
import en_errors from './locales/en/errors.json'
import en_permissions from './locales/en/permissions.json'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    interpolation: {
      escapeValue: false, // React already does escaping
      format: (value: string, format: string, lng: string) => {
        if (format === 'pluralPossessive' && lng === 'en') {
          if (!value.endsWith('s') && !value.endsWith('S')) {
            value += "'s"
          } else {
            value += "'"
          }
        }

        if (format === 'friendlyDate') {
          value = new Date(value).toLocaleDateString(lng, {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        }
        if (format === 'friendlyTime') {
          value = new Date(value).toLocaleTimeString(lng, {
            timeStyle: 'short',
          })
        }

        return value
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: ['app', 'errors', 'permissions'],
    defaultNS: 'app',
    resources: {
      en: {
        app: en_app,
        errors: en_errors,
        permissions: en_permissions,
      },
    },
  })
export default i18n
