import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locale/en.json';
import translationZH from './locale/zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'],
    },
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: 'en',
    resources: {
      en: {
        translation: translationEN
      },
      zh: {
        translation: translationZH
      },
    },
  })

export default i18n;
