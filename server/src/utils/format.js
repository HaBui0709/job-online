import lodash from 'lodash'
import xss from 'xss'
import moment from 'moment'
import diacritics from 'diacritics'
import crypto from 'crypto'
import configs from '../configs'

const removeDiacritics = diacritics.remove

/**
 * Transform string to searchable string
 *
 * @param  {String} string
 * @return {String}
 */
const searchString = (string) => {
  // Remove all special characters, except: _ - .
  string = string.replace(/[`~!@#$%^&*()|+=?;:'",<>{}[]\/]/gi, '')
  return new RegExp(removeDiacritics(string).toLowerCase(), 'i')
}

/**
 * Format phone number
 *
 * @param  {String} phone
 */
const phone = (value = '') => {
  if (!value) {
    return ''
  }

  // Cast to string
  value = value.toString()

  // Remove all space character in phone number
  value = value.split(' ').join('')

  if (value[0] !== '0' && (value[0] !== '8' && value[1] !== '4') && (value.indexOf('+84') === -1)) {
    value = `0${value}`
  }

  // If format is 0xxx xxx xxx, change to +84 xxx xxx xxx
  if (value[0] === '0') {
    value = `+84${value.substring(1)}`
  } else if (value[0] === '8' && value[1] === '4') {
    // If format is 84 xxx xxx xxx, add '+' to the first of phone number
    value = `+${value}`
  }
  return value
}

/**
 * Lowercase first letter of string
 * @param {String} str
 */
const lowerCaseFirstLetter = (str) => {
  if (!str) {
    return ''
  }
  return str.charAt(0).toLowerCase() + str.slice(1)
}


// converting Vietnamese to non accent
function nonAccentVietnamese(str) {
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '')
  str = str.replace(/\u02C6|\u0306|\u031B/g, '')
  return str
}

/**
 * Prevent xss attack
 *
 * @param {String} string
 */
const xssString = (string) => {
  return xss(string)
}


// Format number
function number(value) {
  if (!value) {
    return '0'
  }
  if (typeof value === 'string') {
    value = parseFloat(value)
  }
  return Number(value.toFixed(1))
    .toLocaleString()
}

/**
 * encrypt session
 * @param {String} text
 */
const encrypt = (text) => {
  const cipher = crypto.createCipher(configs.crypto.algorithm, configs.crypto.key)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

/**
 * Format ISODate to date and time
 *
 * @param {Date} value date need to be format
 */
const date = (value) => {
  if (!value) {
    return ''
  }

  return moment(value)
    .format(configs.format.date)
}


/**
 * Format date with no hour value
 *
 * @param {String} value
 */
const dateWithNoHour = (value) => {
  if (!value) {
    return ''
  }

  return moment(value)
    .format(configs.format.dateWithNoHour)
}


/**
 * Format date with no hour value
 *
 * @param {String} value
 */
const dateWithNoHourNoDay = (value) => {
  if (!value) {
    return ''
  }

  return moment(value)
    .format(configs.format.month)
}

/**
 * Convert statistic data
 *
 * @param {Array} data
 * @param {String} startAt
 * @param {String} endAt
 */
const convertStatisticData = (data, startAt, endAt, dateField) => {
  const result = []
  const startDate = moment(startAt).set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  const endDate = moment(endAt)
  // store index of element in data array that will be check in next loop
  let index = 0

  while (startDate.isSameOrBefore(endDate)) {
    if (index < data.length
        && startDate.isSameOrBefore(moment(data[index][dateField]))
        && startDate.dayOfYear() === moment(data[index][dateField]).dayOfYear()) {
      result.push({ ...lodash.pick(data[index], 'total'), date: data[index][dateField] })
      index++
    } else {
      result.push({
        date: startDate.toISOString(),
        total: 0,
      })
    }
    startDate.add(1, 'd')
  }
  return result
}

/**
 * Format date with day and month
 *
 * @param {String} value
 */
const dateWithDayMonthOnly = (value) => {
  if (!value) {
    return ''
  }

  return moment(value)
    .format(configs.format.dateWithDayMonthOnly)
}

export default {
  searchString,
  phone,
  lowerCaseFirstLetter,
  nonAccentVietnamese,
  xssString,
  number,
  encrypt,
  dateWithNoHour,
  date,
  dateWithNoHourNoDay,
  convertStatisticData,
  dateWithDayMonthOnly,
}
