import configs from '../configs'
import code from './code'
import { en, vi } from './langs'

const deepCode = Object.assign({},
  code.common,
  code.user,
  code.cv,
  code.careerGroup,
  code.notification)

/*
 *
 * Get locale file
 *
 * @param {String} locale
 *
 * */
const getLocaleFile = (locale) => {
  switch (locale) {
    case configs.locales.en:
      return en
    default:
      return vi
  }
}

/*
 * Get code by key
 *
 * @param {string} key
 * @param {string} locale
 *
 * */
const getCodeByKey = (key, locale) => {
  const localeFile = getLocaleFile(locale)
  return {
    code: deepCode[key],
    message: localeFile[key],
  }
}

/*
 *
 * Get key by code
 *
 * @param {string} theCode
 * @param {string} locale
 *
 */
const getKeyByCode = (theCode, locale) => {
  if (!Number.isInteger(theCode)) {
    theCode = parseInt(theCode, 0)
  }
  const localeFile = getLocaleFile(locale)
  const codeKey = global.codeMap[theCode]
  if (codeKey) {
    return {
      key: codeKey,
      message: localeFile[codeKey],
    }
  }
}

/*
 *
 * Stop server duplicate code
 *
 * @param {String} first key
 * @param {String} second key
 * @param {Number} code
 *
 * */
const throwErrorLocale = (first, second, theCode) => {
  const message = `The code is duplicate: ${first} and ${second} with value: ${theCode}`
  console.log('\x1b[31m', message, '\x1b[0m')
  process.exit(1)
}

/*
 *
 * Validate code
 *
 * */
const validateCode = () => {
  const keys = Object.keys(code)
  const map = []
  keys.forEach((item) => {
    const subCode = code[item]
    const subKeys = Object.keys(subCode)
    subKeys.forEach((subKey) => {
      const firstKey = map[subCode[subKey]]
      if (firstKey) {
        throwErrorLocale(firstKey, subKey, subCode[subKey])
      }
      map[subCode[subKey]] = subKey
    })
  })
  global.codeMap = map
}

export {
  getCodeByKey,
  getKeyByCode,
  validateCode,
}
