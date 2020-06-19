/* eslint-disable prefer-destructuring */
import lodash from 'lodash'
import { UserModel } from '../../model'
import { to, validation, photo } from '../../utils'
import dbQuery from './query'


/**
 * ****************************************
 * QUERY SECTION
 * ****************************************
 */

/**
 * Find by condition
 *
 * @param {Object} condition find condition
 * @param {Object} pagination pagination data
 * @param {String} sort sort
 *
 */
const findByCondition = async (condition, { page = 0, limit }, sort = '-createdAt') => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(UserModel.find(query).skip(page * limit).limit(limit).sort(sort))
  return data || []
}

/**
 *
 * Find one document by condition
 *
 * @param {Object} condition query condition
 */
const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const user = await UserModel.findOne(query)
  return user
}

/**
 * Count by condition
 *
 * @param {Object} condition find condition
 */
const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(UserModel.countDocuments(query))
  return data
}

/**
 * Find users by keyword
 *
 * @param {String} keyword
 */

const findByKeyword = async (keyword, limit) => {
  const query = dbQuery.findByCondition({ keyword })
  const { data } = await to(UserModel.find(query).limit(limit).lean())
  return data || []
}

/**
 * Get detail user by id
 *
 * @param {String} userId user id
 */
const getDetail = async (userId) => {
  const user = await findOneByCondition({ _id: userId })
  return lodash.pick(user, ['_id', 'info', 'username', 'createdAt'])
}

/**
 * ****************************************
 * FUNCTION SECTION
 * ****************************************
 */

/**
 * Update doc by condition
 *
 * @param {Object} condition condition for query
 * @param {Object} payload data for update
 * @param {Object} options
 */
const updateDoc = async (condition, payload, options = {}) => {
  const query = dbQuery.findByCondition(condition)
  const result = await to(UserModel.update(query, payload, options))
  return result
}

/**
 * Save user doc
 *
 * @param {Object} doc data user save
 */
const saveDoc = async (doc) => {
  const user = new UserModel(doc)
  const result = await to(user.save())
  return result
}


/**
 * Brief info for user
 *
 * @param {Object} user
 */
const briefInfo = async (user) => {
  const result = await Promise.all([{
    avatar: photo.avatar(user.avatar),
    // statistic: await briefStatistic(user.statistic),
  }])
  return Object.assign(user, result[0])
}

/**
 * Current info by id
 *
 * @param {String} _id
 */
const currentInfoById = async (_id) => {
  if (!_id && validation.isObjectId(_id)) {
    return null
  }
  const user = await findOneByCondition({ _id })
  if (!user) {
    return null
  }
  const result = briefInfo(user)
  return result
}

/**
 * Get brief info by user id
 *
 * @param {String} userId user id
 */
const getBriefInfoById = async (userId) => {
  if (!validation.isObjectId(userId)) {
    return null
  }
  const user = await findOneByCondition({ _id: userId })
  if (!user) {
    return null
  }
  const result = await briefInfo(user)
  return result
}

/**
 * Get information for users
 *
 * @param {Array} userIds ids
 */
const getBriefInfoByIds = async (userIds = []) => {
  const result = await Promise.all(userIds.map(async (item) => {
    const user = await getBriefInfoById(item)
    return user
  }))
  return result
}

/**
 * Update user by id
 *
 * @param {String} userId user id
 * @param {Object} payload data for update
 */
const updateById = async (userId, payload) => {
  const result = await to(UserModel.updateOne({ _id: userId }, payload))
  return result
}

/**
 * Change password
 *
 * @param {String} userId user id
 * @param {String} newPassword new password for update
 */
const changePassword = async (userId, newPassword) => {
  const user = await findOneByCondition({ _id: userId })
  user.password = newPassword
  const result = await to(user.save())
  return result
}


/**
 * Brief info for user
 * @param {Object} user
 */
const info = async (user) => {
  const result = await Promise.all([{
    avatar: photo.avatar(user.avatar),
  }])
  return Object.assign(lodash.pick(user, [
    '_id', 'fullName', 'username', 'phone', 'avatar', 'admin', 'email', 'city', 'statuses', 'role',
  ]), result[0])
}

/**
 * Get list admin mails
 */
const getListAdminMails = async () => {
  const condition = {
    roleAdmin: 'admin',
  }
  const admins = await findByCondition(condition)
  // Get mails
  const adminMails = admins.map(item => item.email)
  return adminMails
}


/**
 * Update cover voucher
 *
 * @param {Object} data cover data
 * @param {String} _id id of voucher
 *
 */
const changeAvatar = async (_id, data) => {
  // Update doc voucher cover
  const payload = {
    $set: {
      avatar: data.name,
    },
  }
  const result = await updateDoc({ _id }, payload)
  return result
}

/**
 *
 * Get email by condition
 *
 * @param {Objecty} condition
 *
 */
const getEmail = async (condition) => {
  const user = await findOneByCondition(condition)
  return user.email
}

export default {
  countByCondition,
  findOneByCondition,
  saveDoc,
  briefInfo,
  currentInfoById,
  findByCondition,
  findByKeyword,
  getBriefInfoByIds,
  getBriefInfoById,
  updateById,
  changePassword,
  getDetail,
  info,

  getListAdminMails,
  changeAvatar,
  getEmail,
  updateDoc,
}
