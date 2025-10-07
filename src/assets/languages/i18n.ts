import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import en from './en.json'
import vi from './vi.json'
import {store} from '~/redux/store'
import utils from '~/utils'

// http://i18n.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: async callback => {
    const savedDataJSON = await store.getState().language.language
    const lng = savedDataJSON ? savedDataJSON : null
    const selectLanguage = lng || 'en'
    utils.log('i18n', `Detect selected language [${selectLanguage}]`)
    callback(selectLanguage)
  },
  init: () => {},
  cacheUserLanguage: () => {},
}

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {en, vi},
    compatibilityJSON: 'v3',
    // have a common namespace used around the full app
    // ns: ["common"],
    // defaultNS: "common",

    debug: true,
    react: {
      useSuspense: false,
    },
    //   cache: {
    //  enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  })

export default i18next
