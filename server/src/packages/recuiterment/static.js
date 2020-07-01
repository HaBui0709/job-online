import lodash from 'lodash'
import { to, format, helper } from '../../utils'
import { RecuitermentModel, BusinessModel, UserModel, CareerGroupModel, ApplyJobModel } from '../../model'
import dbQuery from './query'
/**
 * ****************************************
 * QUERY SECTION
 * ****************************************
 */
/**
 * Count by condition
 *
 * @param {Object} condition find condition
 */
const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(RecuitermentModel.countDocuments(query))
  return data
}

/**
 * Find one document by condition
 *
 * @param {Object} condition query condition
 */
const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const group = await RecuitermentModel.findOne(query)
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
  const { data } = await to(RecuitermentModel.find(query).sort(sort).skip(page * limit).limit(limit))
  return data || []
}

/**
 *
 */
const findDataByCondition = async (condition, { limit }, sort = { approvedAt: -1 }) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(RecuitermentModel.find(query).sort(sort).limit(limit))

  // const recuiterment = await Promise.all(data.map(async (_id) => {
  //   const rec = await getBriefInfoById(_id)
  //   return rec
  // }))
  return data || []
}


const findDocsByCondition = async (condition, sort) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(RecuitermentModel.find(query).sort(sort))
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
  const recuiterment = new RecuitermentModel(doc)
  const result = await to(recuiterment.save())
  return result
}

/**
 * Brief info
 */
const briefInfo = async (data) => {
  const jsonData = data.toJSON()

  const result = await Promise.all([{
    business: await BusinessModel.getBriefInfoById(jsonData.business),
    user: await UserModel.getBriefInfoById(jsonData.user),
    careers: await CareerGroupModel.getBriefInfoByIds(jsonData.careers),
  }])

  return Object.assign(lodash.pick(jsonData, [
    '_id', 'title', 'status', 'deadline', 'city', 'createdAt', 'desc', 'cover',
    'jobRequirements', 'benefit', 'quantity', 'gender', 'workMode',
    'jobPosition', 'experience', 'salary', 'careers', 'degreeRequirement', 'active',
  ]), result[0])
}

/**
 *
 * Get brief info by id
 *
 * @param {ObjectId} id
 *
 */
const getBriefInfoById = async (id) => {
  const recuiterment = await RecuitermentModel.findOneByCondition({ _id: id })
  const result = await briefInfo(recuiterment)
  return result
}

/**
 *  Brief info by ids
 *
 * @param {Array} ids
 */
const getBriefInfoByIds = async (ids) => {
  const recuiterment = await Promise.all(ids.map(async (_id) => {
    const data = await getBriefInfoById(_id)
    return data
  }))
  return recuiterment
}


/**
 *
 * @param {Object} data
 */
const briefInfoAndQuantityApply = async (data) => {
  const result = await briefInfo(data)

  // Total quantity cv apply, cv approved, cv rejected
  result.totalCvApplies = await ApplyJobModel.countByCondition({ recuiterment: result._id })
  result.totalCVApproved = await ApplyJobModel.countByCondition({ recuiterment: result._id, status: 'approved' })
  result.totalCVRejected = await ApplyJobModel.countByCondition({ recuiterment: result._id, status: 'rejected' })
  result.totalCVPending = await ApplyJobModel.countByCondition({ recuiterment: result._id, status: 'pending' })
  return result
}

/**
 *
 * Get manager by condition
 *
 * @param {Object} condition
 *
 */
const getManagerByCondition = async (condition) => {
  const recuiterment = await findOneByCondition(condition)
  return recuiterment.user
}

/**
 *
 * Get brief info by condition
 *
 * @param {Object} condition
 *
 */
const getBriefInfoByCondition = async (condition, sort) => {
  const data = await findDocsByCondition(condition, sort)
  const recuiterments = await Promise.all(data.map(async (item) => {
    const obj = await briefInfo(item)
    return obj
  }))

  return recuiterments
}

/**
 * Get data for chart
 *
 * @param {Object} condition
 */
const getDataForChart = async (condition) => {
  const query = await dbQuery.findByCondition(condition)
  const { data } = await to(RecuitermentModel.aggregate([{
    $match: query,
  },
  {
    $project: {
      year: { $year: { $add: ['$updatedAt', 7 * 60 * 60 * 1000] } },
      month: { $month: { $add: ['$updatedAt', 7 * 60 * 60 * 1000] } },
      day: { $dayOfMonth: { $add: ['$updatedAt', 7 * 60 * 60 * 1000] } },
      updatedAt: 1,
    },
  },
  {
    $group: {
      _id: { year: '$year', month: '$month', day: '$day' },
      updatedAt: { $first: '$updatedAt' },
      total: { $sum: 1 },
    },
  },
  {
    $sort: { updatedAt: 1 },
  },
  ]))

  const result = format.convertStatisticData(data, condition.startAt, condition.endAt, 'updatedAt')
  return result
}


/**
 * Get quantity recuiterments by range times
 *
 * @param {Object} times startAt, endAt
 */
const getQuantityRecuitermentsByRangeTimes = async (condition) => {
  const { startAt, endAt } = condition
  // Get array query
  const listCondition = helper.getArrayTimesByRangeForChart(startAt, endAt)

  const data = await Promise.all(listCondition.map(async (item) => {
    const billCount = await countByCondition({
      startAt: item[0],
      endAt: item[1],
      ...lodash.pick(condition, ['city', 'status']),
    })
    return billCount
  }))
  const zipData = lodash.zip(listCondition, data)
  const result = zipData.map((ele) => {
    const obj = {
      startAt: ele[0][0],
      endAt: ele[0][1],
      name: `${format.dateWithDayMonthOnly(ele[0][0])} - ${format.dateWithDayMonthOnly(ele[0][1])}`,
      total: ele[1],
    }
    return obj
  })
  return result
}

/**
 * Cronjob completed
 */
const cronjobCompleted = async () => {
  const condition = {
    status: 'approved',
    active: true,
    dateNow: Date.now(),
  }

  const recuiterments = await findDocsByCondition(condition)
  // Save update doc
  await recuiterments.map(async (item) => {
    item.status = 'completed'
    item.completedAt = Date.now()
    await item.save()
  })
}

const deleteRecruitment = async (_id) => {
  const result = await to(RecuitermentModel.findByIdAndRemove({ _id }))
  return result
}

export default {
  saveDoc,
  briefInfo,

  countByCondition,
  findByCondition,
  findDocsByCondition,
  findOneByCondition,

  findDataByCondition,
  getBriefInfoById,
  briefInfoAndQuantityApply,
  getManagerByCondition,
  getBriefInfoByIds,
  getBriefInfoByCondition,
  getDataForChart,
  getQuantityRecuitermentsByRangeTimes,
  cronjobCompleted,
  deleteRecruitment,
}
