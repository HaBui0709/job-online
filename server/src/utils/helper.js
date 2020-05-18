import slug from 'slug'
import moment from 'moment'
import redis from '../init/redis'
import env from './env'
import configs from '../configs'

/**
 * Get locale
 *
 * @param {Object} req
 */
const getLocale = (req) => {
  return req.user.locale
}

/**
 * Parse JSON
 *
 * @param value
 * @param defaultValue
 */
const parseJSONString = (value, defaultValue) => {
  try {
    JSON.parse(value)
    return JSON.parse(value)
  } catch (e) {
    return defaultValue
  }
}

/**
 * Get slug string
 *
 * @param {String} value
 */
const getSlug = (value) => {
  return slug(value).toLowerCase()
}

/**
 * Delay ms
 *
 * @param {Number} ms
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Get location of object
 *
 * @param {Object} obj object contain location
 */
const getLocation = ({ location }) => {
  if (!location || !location.coordinates || !location.coordinates.length) {
    return null
  }
  return {
    lat: location.coordinates[1],
    lon: location.coordinates[0],
  }
}

/**
 * Set key value to redis
 *
 * @param {String} key
 * @param {Any} value
 */
const setRedisKeyValue = async (key, value) => {
  if (!key) return
  value = JSON.stringify(value)

  // Set key for test env
  if (env.isTest) {
    key = `test_${key}`
  }

  await redis.set(key, value)
}


/**
 * Get key data from redis
 *
 * @param {String} key
 * @param {Boolean} parseToObject parse string to object after get
 */
const getRedisDataByKey = async (key, parseToObject) => {
  // Set key for test env
  if (env.isTest) {
    key = `test_${key}`
  }

  const value = await redis.get(key)
  return parseToObject ? JSON.parse(value) : value
}

/**
 * Publish data to a channel
 *
 * @param {String} channel channel name
 * @param {String} message message will send
 */
const redisPublish = async (channel, message) => {
  const store = await redis.getStore()
  store.publish(channel, message)
}

/**
 * Reload data
 */
const reloadData = () => {
  redisPublish(configs.redisKeys.channel, configs.redisKeys.pubSub.reloadConfig)
}

const getCity = (type) => {
  return type ? (configs.cities.list).filter(item => item._id === type)[0].name : ''
}


/**
 *
 * @param {String} type type
 */
const getGender = (type) => {
  return type ? (configs.gender.list).filter(item => item._id === type)[0].name : ''
}

/**
 *
 * @param {String} type type
 */
const getRank = (type) => {
  return type ? (configs.positions.list).filter(item => item._id === type)[0].name : ''
}

/**
 *
 * @param {String} type type
 */
const getAducation = (type) => {
  return type ? (configs.aducationLevel.list).filter(item => item.name === type)[0].title : ''
}

const getTotalYearExperience = (type) => {
  return (configs.experience.list).filter(item => item._id === type)[0].name
}

const getWorkMode = (type) => {
  return type ? (configs.workModes.list).filter(item => item._id === type)[0].name : ''
}

const getLanguage = (type) => {
  return type ? (configs.typeLanguage).filter(item => item._id === type)[0].name : ''
}

const getLearning = (type) => {
  return type ? (configs.computerLiteracy.list).filter(item => item._id === type)[0].name : ''
}

const getMainSkills = (type) => {
  return type ? (configs.mainSkills.list).filter(item => item._id === type)[0].name : ''
}

const getSalary = (type) => {
  return type ? (configs.salary.list).filter(item => item.key === type)[0].name : ''
}

const getFrequency = (type) => {
  return type ? (configs.frequency.list).filter(item => item._id === type)[0].name : ''
}

const graduationType = (type) => {
  return type ? (configs.graduationType.list).filter(item => item._id === type)[0].name : ''
}

/**
 *
 * @param {moment} start
 * @param {moment} end
 *
 */
const getArrayTimesByRangeForChart = (start, end) => {
  const startAt = moment(start).startOf('d')
  const sunAtFirst = moment(startAt).day(7).endOf('d')
  const endAt = moment(end).endOf('d')

  if (endAt.endOf('d') <= sunAtFirst.endOf('d')) {
    return [[startAt, endAt]]
  }

  // Lớn hơn 1 tuần
  const listTimeQuery = [
    [startAt, sunAtFirst],
  ]

  // Loop
  let n = 0
  while (getDiffDay(moment(sunAtFirst).day(n + 1).endOf('day'), endAt) >= 7) {
    const range = [
      moment(sunAtFirst).day(n + 1).startOf('d'),
      moment(sunAtFirst).day(n + 7).endOf('d'),
    ]
    listTimeQuery.push(range)
    n += 7
  }

  const rangeFinal = [
    moment(sunAtFirst).day(n + 1).startOf('d'),
    moment(endAt).endOf('d'),
  ]
  listTimeQuery.push(rangeFinal)

  // LOG TIMES FINAL QUERY
  return listTimeQuery
}

/**
 *
 * Get diff day
 *
 * @param {moment} start
 * @param {moment} end
 *
 */
const getDiffDay = (start, end) => {
  const diffDays = moment(end).endOf('d').diff(moment(start).startOf('d'), 'days')
  return diffDays
}

export default {
  parseJSONString,
  getLocale,
  getSlug,
  delay,
  getLocation,
  setRedisKeyValue,
  getRedisDataByKey,
  redisPublish,
  reloadData,
  getCity,

  getFrequency,
  getSalary,
  getMainSkills,
  getLearning,
  getLanguage,
  getWorkMode,
  getTotalYearExperience,
  getAducation,
  getGender,
  getRank,
  graduationType,
  getArrayTimesByRangeForChart,
}
