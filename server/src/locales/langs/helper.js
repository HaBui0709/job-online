import configs from '../../configs'

/**
 * Generate text for something required
 *
 * @param {String} text target name
 * @param {String} locale locale
 */
const targetRequired = (text, locale = configs.locales.vi) => {
  switch (locale) {
    case configs.locales.en:
      return `${text} is required`
    default:
      return `${text} không được trống`
  }
}

/**
 * Generate text for something not found
 *
 * @param {String} text target name
 * @param {String} locale locale
 */
const targetNotFound = (text, locale = configs.locales.vi) => {
  switch (locale) {
    case configs.locales.en:
      return `${text} not found`
    default:
      return `${text} không tìm thấy`
  }
}

/**
 * Generate text for something invalid
 *
 * @param {String} text target name
 * @param {String} locale locale
 */
const targetInvalid = (text, locale = configs.locales.vi) => {
  switch (locale) {
    case configs.locales.en:
      return `${text} is invalid`
    default:
      return `${text} không đúng định dạng`
  }
}

export {
  targetRequired,
  targetNotFound,
  targetInvalid,
}
