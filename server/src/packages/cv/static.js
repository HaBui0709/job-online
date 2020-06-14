import lodash from 'lodash'
import { to } from '../../utils'
import dbQuery from './query'
import { CVModel, CareerGroupModel, UserModel } from '../../model'

/**
 * Count by condition
 *
 * @param {Object} condition find condition
 */
const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CVModel.countDocuments(query))
  return data
}

/**
 * Find one document by condition
 *
 * @param {Object} condition query condition
 */
const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const cv = await CVModel.findOne(query)
  return cv
}

/**
 * Find docs by condition
 *
 * @param {Object} condition query condition
 * @param {Object} pagination pagination data
 * @param {String} sort sort
 */
const findByCondition = async (condition, { page = 0, limit }, sort = '-createdAt') => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CVModel.find(query).sort(sort).skip(page * limit).limit(limit))
  return data || []
}

/**
 * Find  document by condition
 *
 * @param {Object} condition query condition
 */
const findDocsByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CVModel.find(query))
  return data || []
}

/**
 * ****************************************
 * FUNCTION SECTION
 * ****************************************
 */

/**
 * Save doc
 *
 * @param {Object} doc data save
 */
const saveDoc = async (doc) => {
  const cv = new CVModel(doc)
  const result = await to(cv.save())
  return result
}

/**
 * Delete CV
 *
 * @param {ObjectId} _id
 *
 */
const deleteCV = async (_id) => {
  const result = await to(CVModel.findByIdAndRemove({ _id }))
  return result
}

/**
 * Brief Info CV
 *
 * @param {Object} cv data
 */
const briefInfo = async (cv) => {
  const jsonData = cv.toJSON()
  const { overviewInfo: { desiredCareer } } = jsonData
  const result = await Promise.all([{
    desiredCareer: await CareerGroupModel.getBriefInfoByIds(desiredCareer),
    user: await UserModel.getBriefInfoById(jsonData.user),
  }])
  jsonData.overviewInfo.desiredCareer = result[0].desiredCareer
  jsonData.user = result[0].user
  return jsonData
}

/**
 *
 * Get Cv approved and active
 *
 * @param {Object} condition
 */
const getCvActive = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CVModel.find(query))
  if (!data.length) {
    return null
  }
  return data
}

const getBriefInfoById = async (_id) => {
  const cv = await findOneByCondition({ _id })
  const result = lodash.pick(await briefInfo(cv),
    ['_id', 'overviewInfo', 'user'])
  return result
}

const getBriefInfoByIdForDownload = async (_id) => {
  const cv = await findOneByCondition({ _id })
  const result = await briefInfo(cv)
  return result
}

/**
 * Get careers by condition
 *
 * @param {Object} condition
 *
 */
const getCareersByUser = async (condition) => {
  const data = await findDocsByCondition(condition)
  let careers = []
  data.forEach((element) => {
    const arr = element.toJSON().overviewInfo.desiredCareer
    careers = [...careers, ...arr]
  })

  // Format string to unique
  careers = lodash.uniq(careers.map(item => item.toString()))
  return careers
}

export default {
  saveDoc,
  findByCondition,
  findOneByCondition,
  countByCondition,
  deleteCV,
  briefInfo,
  findDocsByCondition,
  getCvActive,
  getBriefInfoById,
  getBriefInfoByIdForDownload,
  getCareersByUser,
}
