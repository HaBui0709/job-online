/* eslint-disable guard-for-in */
import lodash from 'lodash'
import { key } from '../configs/locale'
import { AppConst } from '../configs';

/**
 * Check array contains path or not
 *
 * @param {Array}   array array of url
 * @param {String}  path url
 */
const checkPathPermission = (array, path) => {
  for (const item of array) {
    if (item.value.test(path)) {
      return true
    }
  }
  return false
}

/**
 * Merge 2 objects
 *
 * @param {Object} obj1
 * @param {Object} obj2
 */
const mergeObjects = (obj1, obj2) => {
  return lodash.merge(obj1, obj2)
}

/**
 * Process object contain codes
 *
 * @param {Object} data
 */
const processCodes = (data) => {
  for (const k in data) {
    data[k] = data[k] && typeof data[k] === 'string' ?
      data[k].split('\n')
      :
      []
    data[k] = data[k].filter(item => !!item)
  }
  return data
}

/**
 * Convert array property of object to string
 *
 * @param {Object} obj
 */
const objArrayToObjString = (obj) => {
  for (const k in obj) {
    obj[k] = obj[k] ? obj[k].toString().replace(/,/g, '\n') : ''
  }
  return obj
}

/**
 * Convert array to string
 *
 * @param {Array} array array
 */
const arrayToString = (array) => {
  let result = ''
  array.map((item) => {
    result += `${item}\n`
    return item
  })
  return result.trim()
}

const concatString = (str1, str2) => {
  return str1 ? str1.concat('\n', str2) : str2
}
/**
 * Convert minutes to milseconds
 *
 * @param {Number} value minutes value
 */
const minToMilliseconds = (value) => {
  if (!value) {
    return 0
  }
  return parseFloat(value) * 60 * 1000
}

/**
 * Convert milliseconds to minutes
 *
 * @param {Number} value milliseconds value
 */
const millisecondsToMinutes = (value) => {
  if (!value) {
    return 0
  }
  return parseFloat(value) / (60 * 1000)
}

/**
 * Get current language
 *
 */
const getCurrentLanguage = () => {
  return localStorage.getItem(key.i18nLanguage) || 'vi'
}

/**
 * Slice array in object
 *
 * @param {Object} obj object contain array
 * @param {Number} indexStart
 * @param {Number} indexEnd
 */
const sliceObjectArray = (obj, indexStart = 0, indexEnd = 5) => {
  for (const k in obj) {
    const arr = obj[k] || []
    obj[k] = Array.isArray(arr) ? arr.slice(indexStart, indexEnd) : []
  }
  return obj
}

/**
 * Get game type
 *
 * @param {String} type type
 */
const getGameType = (type) => {
  return (AppConst.games.list).filter(item => item._id === type)[0].name
}

/**
 *
 * Get status name and color by id
 *
 * @param {String} id
 */
const getStatusNameAndColorById = (id) => {
  const { name } = AppConst.status.list.filter(item => item._id === id)[0]
  let color = ''
  switch (id) {
    case 'closed':
      color = 'red'
      break
    case 'approved':
      color = 'green'
      break
    case 'completed':
      color = '#f60'
      break
    case 'pending':
      color = 'rgb(255, 204, 117)'
      break
    case 'published':
      color = 'blue'
      break
    case 'rejected':
      color = 'black'
      break
    default:
      break
  }
  return { name, color }
}

/**
 *
 * @param {String} id
 */
const getStatusNameAndColorByIdOfCVs = (id) => {
  const { name } = AppConst.cv.status.list.filter(item => item._id === id)[0]
  let color = ''
  switch (id) {
    case 'pending':
      color = 'rgb(255, 204, 117)'
      break
    case 'approved':
      color = 'green'
      break
    case 'rejected':
      color = 'black'
      break
    default:
      break
  }
  return { name, color }
}

/**
 *
 * @param {String} type type
 */
const getGender = (type) => {
  return type ? (AppConst.gender.list).filter(item => item._id === type)[0].name : ''
}

/**
 *
 * @param {String} type type
 */
const getRank = (type) => {
  return type ? (AppConst.positions.list).filter(item => item._id === type)[0].name : ''
}

/**
 *
 * @param {String} type type
 */
const getAducation = (type) => {
  return type ? (AppConst.aducationLevel.list).filter(item => item.name === type)[0].title : ''
}

const getTotalYearExperience = (type) => {
  return (AppConst.experience.list).filter(item => item._id === type)[0].name
}

const getCity = (type) => {
  return type ? (AppConst.cities.list).filter(item => item._id === type)[0].name : ''
}

const getWorkMode = (type) => {
  return type ? (AppConst.workModes.list).filter(item => item._id === type)[0].name : ''
}

const getLanguage = (type) => {
  return type ? (AppConst.typeLanguage).filter(item => item._id === type)[0].name : ''
}

const getLearning = (type) => {
  return type ? (AppConst.computerLiteracy.list).filter(item => item._id === type)[0].name : ''
}

const getMainSkills = (type) => {
  return type ? (AppConst.mainSkills.list).filter(item => item._id === type)[0].name : ''
}
const getRole = (type) => {
  return type ? (AppConst.roles.list).filter(item => item._id === type)[0].name : ''
}
export default {
  checkPathPermission,
  mergeObjects,
  processCodes,
  objArrayToObjString,
  minToMilliseconds,
  millisecondsToMinutes,
  arrayToString,
  concatString,
  getCurrentLanguage,
  sliceObjectArray,
  getGameType,
  getStatusNameAndColorById,
  getStatusNameAndColorByIdOfCVs,

  getRank,
  getAducation,
  getGender,
  getLanguage,
  getMainSkills,
  getLearning,
  getCity,
  getTotalYearExperience,
  getWorkMode,
  getRole,
}
