import moment from 'moment'
import lodash from 'lodash'
import { AppConst } from '../configs'

/**
 * Converting Vietnamese to non accent
 *
 * @param {String} str input string
 */
const nonAccentVietnamese = (str) => {
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
 * Format ISODate to date and time
 *
 * @param {Date} value date need to be format
 */
const date = (value) => {
  if (!value) {
    return ''
  }

  return moment(value)
    .format(AppConst.format.date)
}

// Phone number
function phone(value) {
  if (!value) {
    return ''
  }

  // Replace +84 to 0
  value = value.replace('+84', '0')

  // Reverse string
  value = value.split('')
    .reverse()
    .join('')

  // Add space to position 4 + 8
  value = `${value.substr(0, 3)} ${value.substr(3)}`
  value = `${value.substr(0, 7)} ${value.substr(7)}`

  // Reverse again
  value = value.split('')
    .reverse()
    .join('')

  return value
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
 * Capitalize first letter
 *
 * @param {String} string
 */
function capitalizeFirstLetter(string) {
  if (!string) {
    return ''
  }

  return string.charAt(0)
    .toUpperCase() + string.slice(1)
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
    .format(AppConst.format.dateWithNoHour)
}

// Get city text
const city = (value) => {
  const obj = lodash.find(AppConst.cities.list, item => item._id === value)
  return obj ? obj.name : 'N/A'
}

/**
 * Format text gender
 *
 * @param {String} value
 */
const gender = (value) => {
  const text = lodash.find(AppConst.gender.list, item => item._id === value).name
  return text
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
    .format(AppConst.format.dateWithDayMonthOnly)
}


export default {
  nonAccentVietnamese,
  date,
  phone,
  number,
  capitalizeFirstLetter,
  dateWithNoHour,
  city,
  gender,
  dateWithDayMonthOnly,
}

