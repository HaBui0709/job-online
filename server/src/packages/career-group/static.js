import { CareerGroupModel } from '../../model'
import { to, validation } from '../../utils'
import dbQuery from './query'

/**
 * Count by condition
 *
 * @param {Object} condition find condition
 */
const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CareerGroupModel.countDocuments(query))
  return data
}

/**
 * Find one document by condition
 *
 * @param {Object} condition query condition
 */
const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const group = await CareerGroupModel.findOne(query)
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
  const { data } = await to(CareerGroupModel.find(query).sort(sort).skip(page * limit).limit(limit))
  return data || []
}

const findDocsByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(CareerGroupModel.find(query))
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
  const group = new CareerGroupModel(doc)
  const result = await to(group.save())
  return result
}

/**
 * Update doc by condition
 *
 * @param {Object} condition condition for query
 * @param {Object} payload data for update
 * @param {Object} options
 */
const updateDoc = async (condition, payload, options = {}) => {
  const query = dbQuery.findByCondition(condition)
  const result = await to(CareerGroupModel.updateOne(query, payload, options))
  return result
}

/**
 * Update doc by id
 *
 * @param {String} id  id
 * @param {Object} payload data for update
 */
const updateDocById = async (id, payload) => {
  const result = await to(CareerGroupModel.updateOne({ _id: id }, payload))
  return result
}

/**
 * Get brief info by id
 *
 * @param {ObjectId} _id id of career group
 *
 */
const getBriefInfoById = async (_id) => {
  if (!validation.isObjectId(_id)) {
    return null
  }
  const career = await findOneByCondition({ _id })
  if (!career) {
    return null
  }
  return career
}


/**
 *  Brief info by ids
 *
 * @param {Array} ids
 */
const getBriefInfoByIds = async (ids) => {
  const careers = await Promise.all(ids.map(async (_id) => {
    const career = await getBriefInfoById(_id)
    return career
  }))
  return careers
}

export default {
  updateDoc,
  saveDoc,
  countByCondition,
  findOneByCondition,
  findByCondition,
  updateDocById,
  findDocsByCondition,
  getBriefInfoById,
  getBriefInfoByIds,
}
