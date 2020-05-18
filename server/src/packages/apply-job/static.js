import lodash from 'lodash'
import { ApplyJobModel, CVModel, RecuitermentModel } from '../../model'
import { to } from '../../utils'
import dbQuery from './query'

/**
 * Count by condition
 *
 * @param {Object} condition find condition
 */
const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(ApplyJobModel.countDocuments(query))
  return data
}

/**
 * Find one document by condition
 *
 * @param {Object} condition query condition
 */
const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const apply = await ApplyJobModel.findOne(query)
  return apply || {}
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
  const { data } = await to(ApplyJobModel.find(query).sort(sort).skip(page * limit).limit(limit))
  return data || []
}

const findDocsByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(ApplyJobModel.find(query))
  return data || []
}
/**
 * ****************************************
 * FUNCTION SECTION
 * ****************************************
 */

const briefInfo = async (data) => {
  const jsonData = data.toJSON()
  const result = await Promise.all([{
    cv: await CVModel.getBriefInfoById(jsonData.cv),
  }])
  return Object.assign(lodash.pick(jsonData, [
    '_id', 'status', 'createdAt', 'approvedAt', 'rejectedAt', 'notification',
  ]), result[0])
}

const briefInfoForCandidate = async (data) => {
  const jsonData = data.toJSON()
  const result = await Promise.all([{
    cv: await CVModel.getBriefInfoById(jsonData.cv),
    recuiterment: await RecuitermentModel.getBriefInfoById(jsonData.recuiterment),
  }])
  return Object.assign(lodash.pick(jsonData, [
    '_id', 'status', 'createdAt', 'approvedAt', 'rejectedAt', 'notification',
  ]), result[0])
}

export default {
  findByCondition,
  countByCondition,
  findDocsByCondition,
  findOneByCondition,
  briefInfo,
  briefInfoForCandidate,

}
