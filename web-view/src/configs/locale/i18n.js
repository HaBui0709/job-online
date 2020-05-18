import sprintf from 'i18next-sprintf-postprocessor'
import i18n from 'i18next'
import en from './en'
import vi from './vi'
import key from './key'

const language = localStorage.getItem(key.i18nLanguage) || 'vi'

i18n.use(sprintf).init({
  resources: {
    en,
    vi,
  },
  lng: language,
  fallbackLng: 'vi',

  ns: [
    key.translations,
    key.menu,
  ],
  defaultNS: key.translations,
  fallbackNS: [
    key.translations,
    key.menu,
  ],
  // debug: true,

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
})

export default i18n
