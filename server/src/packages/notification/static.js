
import lodash from 'lodash'
import { NotificationModel, CareerGroupModel, UserModel, RecuitermentModel } from '../../model'
import { to } from '../../utils'
import dbQuery from './query'
import help from './help';

/**
 * Find document by condition
 *
 * @param {Object} condition query condition
 */
const findByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const data = await NotificationModel.find(query).lean()
  return data
}

/**
 * Count by condition
 *
 * @param {Object} condition find condition
 */
const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(NotificationModel.countDocuments(query))
  return data
}

/**
 * Find one document by condition
 *
 * @param {Object} condition query condition
 */
const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const group = await NotificationModel.findOne(query)
  return group || {}
}

/**
 *
 * Brief Info
 *
 * @param {Object} data
 *
 */
const briefInfo = async (data) => {
  const jsonData = data.toJSON()
  const careers = await CareerGroupModel.getBriefInfoByIds(jsonData.careers)
  return Object.assign(lodash.pick(jsonData, ['email', '_id', 'city', 'salary', 'experience', 'academicLevel', 'frequency']), { careers })
}


/**
 * Remove by Id
 *
 */
const removeNotification = async ({ _id }) => {
  return await NotificationModel.findByIdAndRemove({ _id })
}

/**
 * Send email notfication
 *
 * @param {Object} condition
 *
 */
const cronjobSendEmailWithFrequency = async (condition) => {
  const notficationData = await findByCondition(condition)
  const result = await Promise.all(notficationData.map(async (item) => {
    const obj = {}
    const user = await UserModel.getBriefInfoById(item.user)
    obj.user = {
      _id: user._id,
      name: user.fullName,
      email: item.email,
      avatar: user.avatar,
    }

    // Get recuiterments phu hop
    const recuiterCondition = {
      ...lodash.pick(item, ['city', 'salary', 'careers', 'experience']),
      degreeRequirement: item.academicLevel,
      active: true,
      status: 'approved',
    }
    const data = await RecuitermentModel.findDocsByCondition(recuiterCondition)
    const recuitermentIds = data.map(ele => ele._id)
    const recuiterments = await RecuitermentModel.getBriefInfoByIds(recuitermentIds)
    obj.recuiterments = recuiterments
    return obj
  }))

  await result.map(async (ele) => {
    await help.sendMailJobs(ele)
  })
}


export default {
  findOneByCondition,
  countByCondition,
  briefInfo,
  removeNotification,
  cronjobSendEmailWithFrequency,
  findByCondition,
}
