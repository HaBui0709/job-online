import HttpStatus from 'http-status-codes'
import configs from '../configs'
import { getCodeByKey, localesKey } from '../locales'


const defaultLocale = configs.locales.vi
const { success, serverError, invalidParams, dataNotFound, noPermission } = localesKey.common
/**
 * Response data with status code 200 (OK)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {Object} data return data
 * @param {String} errorKey key to get code and message
 */
const r200 = (res, locale = defaultLocale, data = {}, errorKey = success) => {
  const info = getCodeByKey(errorKey, locale)
  return res.status(HttpStatus.OK).jsonp({
    data,
    ...info,
  })
}

/**
 * Response data with status code 400 (BAD REQUEST)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {String} errorKey key to get code and message
 */
const r400 = (res, locale = defaultLocale, errorKey = invalidParams) => {
  const info = getCodeByKey(errorKey, locale)
  return res.status(HttpStatus.BAD_REQUEST).jsonp({
    ...info,
  })
}

/**
 * Response data with status code 401 (UNAUTHORIZED)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {String} errorKey key to get code and message
 */
const r401 = (res, locale = defaultLocale, errorKey = noPermission) => {
  const info = getCodeByKey(errorKey, locale)
  return res.status(HttpStatus.UNAUTHORIZED).jsonp({
    ...info,
  })
}

/**
 * Response data with status code 404 (NOT FOUND)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 * @param {String} errorKey key to get code and message
 */
const r404 = (res, locale = defaultLocale, errorKey = dataNotFound) => {
  const info = getCodeByKey(errorKey, locale)
  return res.status(HttpStatus.NOT_FOUND).jsonp({
    ...info,
  })
}

/**
 * Response data with status code 500 (SERVER ERROR)
 *
 * @param {Object} res response object from nodejs
 * @param {String} locale locale of user
 */
const r500 = (res, locale = defaultLocale) => {
  const info = getCodeByKey(serverError, locale)
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).jsonp({
    ...info,
  })
}

/**
 * Return response if validation params error
 *
 * @param  {Object}   res response object
 * @param  {Object}   error error object
 */
const validation = (res, error) => {
  let info = getCodeByKey(invalidParams)

  if (error && error.details) {
    info = getCodeByKey(error.details[0].message)
  }

  return res.status(HttpStatus.BAD_REQUEST).jsonp(info)
}

export default {
  r200,
  r400,
  r401,
  r404,
  r500,
  validation,
}
