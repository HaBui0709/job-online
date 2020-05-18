import lodash from 'lodash'
import { CVBeautyModel, CVModel, UserModel } from '../../model';
import { to } from '../../utils';

import dbQuery from './query'

/**
 * Count by condition
 *
 * @param {Object} condition find condition
 */
const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CVBeautyModel.countDocuments(query))
  return data
}

/**
 * Find one document by condition
 *
 * @param {Object} condition query condition
 */
const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const group = await CVBeautyModel.findOne(query)
  return group || {}
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
  const { data } = await to(CVBeautyModel.find(query).sort(sort).skip(page * limit).limit(limit))
  return data || []
}

const findDocsByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CVBeautyModel.find(query))
  return data || []
}

/**
 * Get brief info by condition
 *
 * @param {Object} condition
 */
const getBriefInfoByCondition = async (condition) => {
  let cvBeautyData = await findDocsByCondition(condition)

  // Process
  cvBeautyData = await Promise.all(cvBeautyData.map(async (item) => {
    const obj = await briefInfo(item)
    return obj
  }))
  return cvBeautyData
}

/**
 * Brief info
 */
const briefInfo = async (data) => {
  const jsonData = data.toJSON()
  const infoData = await Promise.all([{
    cv: await CVModel.getBriefInfoByIdForDownload(jsonData.cv),
    user: await UserModel.getBriefInfoById(jsonData.user),
  }])

  const result = Object.assign(
    lodash.pick(jsonData, ['_id', 'typeCV', 'createdAt']),
    infoData[0],
  )
  return result
}

/**
 * Get detail
 */
const getDetail = async (data) => {
  const cvBeauty = await briefInfo(data)
  return cvBeauty
}

export default {
  countByCondition,
  findDocsByCondition,
  findByCondition,
  findOneByCondition,
  getBriefInfoByCondition,
  getDetail,
}
