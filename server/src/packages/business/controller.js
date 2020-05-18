import lodash from 'lodash'
import { BusinessModel, FileModel, RecuitermentModel } from '../../model'
import { helper, response, getError, photo } from '../../utils'
import { localesKey } from '../../locales'
import configs from '../../configs';

/**
 * Create business
 *
 * @param {Object} business
 * @param {ObjectId} manager
 */
const create = async (business, manager) => {
  const doc = {
    ...business,
    manager,
  }
  const { data } = await BusinessModel.saveDoc(doc)
  return data
}

/**
 * Show business by userId
 */
const show = async (req, res) => {
  const locale = helper.getLocale(req)
  const { businessData, user } = req

  // Check user
  if (user._id.toString() !== businessData.toJSON().manager.toString()) {
    return response.r400(res, locale, localesKey.common.noPermission)
  }

  const business = await BusinessModel.getBriefInfoById(businessData._id)

  return response.r200(res, locale, { business })
}


/**
 * Update business
 */
const update = async (req, res) => {
  const locale = helper.getLocale(req)
  const { body } = req
  const { businessData, user } = req
  // Check user
  if (user._id.toString() !== businessData.toJSON().manager.toString()) {
    return response.r400(res, locale, localesKey.common.noPermission)
  }

  // Doc update
  const doc = {
    $set: {
      ...body,
      updatedAt: Date.now(),
    },
  }
  const { error } = await BusinessModel.updateById(businessData._id, doc)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  return response.r200(res, locale, {})
}


/**
 * Change logo
 */
const changeLogo = async (req, res) => {
  const locale = helper.getLocale(req)
  const { logo } = req.body
  const { businessData } = req
  // Check exsits of cover
  const coverData = await FileModel.findOneByCondition({ _id: logo })
  if (!coverData) {
    return response.r400(res, locale, localesKey.file.fileNotFound)
  }

  // Update cover db voucher
  const { error } = await BusinessModel.changeLogo(businessData._id, coverData)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  return response.r200(res, locale, { cover: photo.cover(coverData.name) })
}

/**
 * All business
 */
const all = async (req, res) => {
  const { page = 0 } = req.query
  const locale = helper.getLocale(req)
  const query = {
    ...lodash.pick(req.query, ['keyword']),
  }

  const limit = configs.limit.business.all
  const data = await Promise.all([{
    businesses: await BusinessModel.findByCondition(query, { page, limit }),
    total: await BusinessModel.countByCondition(query),
    limitPerPage: limit,
  }])

  const result = data[0]
  // process businesses
  result.businesses = await Promise.all(result.businesses.map(async (item) => {
    const obj = await BusinessModel.breifInfo(item.toJSON())
    return obj
  }))

  return response.r200(res, locale, result)
}

/**
 * Show view web
 */
const showViewWeb = async (req, res) => {
  const locale = helper.getLocale(req)
  const { businessData } = req
  const business = await BusinessModel.getBriefInfoById(businessData._id)
  return response.r200(res, locale, { business })
}

const allJobsOfBusiness = async (req, res) => {
  const locale = helper.getLocale(req)
  const { businessData } = req

  const recuiterments = await RecuitermentModel.findDocsByCondition({
    business: businessData._id,
    status: 'approved',
    active: true,
  })
  return response.r200(res, locale, { recuiterments })
}

/**
 * All for admin
 */
const allForAdmin = async (req, res) => {
  const { page = 0 } = req.query
  const locale = helper.getLocale(req)
  const query = {
    ...lodash.pick(req.query, ['keyword', 'active']),
  }

  const limit = configs.limit.business.all
  const data = await Promise.all([{
    businesses: await BusinessModel.findByCondition(query, { page, limit }),
    total: await BusinessModel.countByCondition(query),
    limitPerPage: limit,
  }])

  const result = data[0]
  // process businesses
  result.businesses = await Promise.all(result.businesses.map(async (item) => {
    const obj = await BusinessModel.breifInfo(item.toJSON())
    return obj
  }))

  return response.r200(res, locale, result)
}

/**
 * Show business by userId
 */
const showForAdmin = async (req, res) => {
  const locale = helper.getLocale(req)
  const { businessData } = req

  const business = await BusinessModel.getBriefInfoById(businessData._id)

  return response.r200(res, locale, { business })
}

/**
 * Fetch recuiterments
 */
const fetchrecuiterment = async (req, res) => {
  const locale = helper.getLocale(req)
  const { page = 0 } = req.query
  const condition = lodash.pick(req.query, ['keyword', 'status'])
  const limit = configs.limit.recuiterment.all
  const { businessData } = req

  condition.business = businessData._id

  const data = await Promise.all([{
    recuiterments: await RecuitermentModel.findByCondition(condition, { page, limit }),
    total: await RecuitermentModel.countByCondition(condition),
    limitPerPage: limit,
  }])

  const result = data[0]

  // Process recuiterments
  result.recuiterments = await Promise.all(result.recuiterments.map(async (item) => {
    const obj = await RecuitermentModel.briefInfo(item)
    return obj
  }))

  return response.r200(res, locale, result)
}

export default {
  all,
  create,
  show,
  update,
  changeLogo,
  showViewWeb,
  allJobsOfBusiness,
  allForAdmin,
  showForAdmin,
  fetchrecuiterment,
}
