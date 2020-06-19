import { BusinessModel } from '../../model'
import { to, validation, photo } from '../../utils'
import dbQuery from './query'


/**
 * Find one doc from condition
 *
 * @param {Object} condition condition
 */
const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(BusinessModel.findOne(query))
  return data
}

/**
 * Count by condition
 *
 * @param {Object} condition find condition
 */
const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(BusinessModel.countDocuments(query))
  return data
}

/**
 * Find docs by condition
 *
 * @param {Object} condition query condition
 * @param {Object} pagination pagination data
 * @param {String} sort sort
 */
const findByCondition = async (condition, { page = 0, limit }, sort = 'createdAt') => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(BusinessModel.find(query).sort(sort).skip(page * limit).limit(limit))
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
  const busienss = new BusinessModel(doc)
  const result = await to(busienss.save())
  return result
}

/**
 * Get brief Info
 *
 * @param {Object} data
 *
 */
const breifInfo = async (data) => {
  const result = await Promise.all([{
    logo: photo.avatar(data.logo),
  }])

  return {
    ...data,
    ...result[0],
  }
}

/**
 * Get brief info by id
 *
 * @param {String} businessId business id
 */
const getBriefInfoById = async (businessId) => {
  if (!validation.isObjectId(businessId)) {
    return null
  }
  const business = await findOneByCondition({ _id: businessId })
  if (!business) {
    return null
  }

  const result = await breifInfo(business.toJSON())
  return result
}

/**
 * Update user by id
 *
 * @param {String} userId user id
 * @param {Object} payload data for update
 */
const updateById = async (userId, payload) => {
  const result = await to(BusinessModel.updateOne({ _id: userId }, payload))
  return result
}

/**
 * Update logo business
 *
 * @param {Object} data cover data
 * @param {String} _id id of business
 *
 */
const changeLogo = async (_id, data) => {
  // Update doc voucher cover
  const payload = {
    $set: {
      logo: data.name,
    },
  }
  const result = await updateDoc({ _id }, payload)
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
  const result = await to(BusinessModel.update(query, payload, options))
  return result
}

export default {
  saveDoc,
  getBriefInfoById,
  updateById,
  changeLogo,
  countByCondition,
  findByCondition,
  breifInfo,
}
