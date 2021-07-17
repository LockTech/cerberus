import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en_app from './locales/en/app.json'
import en_permissions from './locales/en/permissions.json'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    interpolation: { escapeValue: false }, // React already does escaping
    lng: 'en',
    fallbackLng: 'en',
    ns: ['app', 'permissions'],
    defaultNS: 'app',
    resources: {
      en: {
        app: en_app,
        permissions: en_permissions,
      },
    },
  })
export default i18n
