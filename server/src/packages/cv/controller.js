import lodash from 'lodash'
import { CVModel } from '../../model'
import { helper, getError, response, to } from '../../utils'
import { localesKey } from '../../locales';
import configs from '../../configs';

/**
 * Create cv
 */
const create = async (req, res) => {
  const locale = helper.getLocale(req)
  const doc = lodash.pick(req.body, ['overviewInfo', 'workExperiences', 'qualifications', 'foreignLanguages', 'forteSkill', 'computerLiteracy'])
  // Add User auth
  const { user: { _id } } = req

  doc.user = _id

  // Create doc
  const { error, data } = await CVModel.saveDoc(doc)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  return response.r200(res, locale, { cv: data.toJSON() })
}

/**
 * Remove cv
 */
const remove = async (req, res) => {
  const locale = helper.getLocale(req)
  const { cVData } = req
  const { error } = await CVModel.deleteCV(cVData._id)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }
  return response.r200(res, locale, { _id: cVData._id })
}

/**
 * Update CV
 */
const update = async (req, res) => {
  // Get locale
  const locale = helper.getLocale(req)
  const { cVData, user } = req
  let cv = req.cVData
  // Check author
  if (user._id.toString() !== cVData.user.toString()) {
    return response.r401(res, locale, localesKey.common.noPermission)
  }
  // Data update
  const doc = lodash.pick(req.body, ['overviewInfo', 'workExperiences', 'qualifications', 'foreignLanguages', 'forteSkill', 'computerLiteracy'])
  cv = Object.assign(cv, doc)
  // Update doc
  const { error, data } = await to(cv.save())
  // Response error
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  // Response success
  return response.r200(res, locale, { data })
}

/**
 * All CV
 */
const all = async (req, res) => {
  const locale = helper.getLocale(req)
  const { user } = req
  // Check user: admin or candiate
  if (user.role === 'candidate') {
    req.query.user = req.user._id
  }

  const data = await Promise.all([{
    cvs: await CVModel.findDocsByCondition(req.query),
    total: await CVModel.countByCondition(req.query),
  }])

  const result = data[0]

  // // Process cv
  result.cvs = await Promise.all(result.cvs.map(async (item) => {
    const obj = await CVModel.briefInfo(item)
    return obj
  }))
  return response.r200(res, locale, result)
}

/**
 * Show cv
 */
const show = async (req, res) => {
  const locale = helper.getLocale(req)
  const { cVData } = req
  const cv = await CVModel.briefInfo(cVData)

  response.r200(res, locale, { cv })
}


const allByAdmin = async (req, res) => {
  const locale = helper.getLocale(req)
  const { page = 0 } = req.query
  const query = {
    ...lodash.pick(req.query, ['keyword', 'status']),
  }
  const limit = configs.limit.cv.all

  const data = await Promise.all([{
    cvs: await CVModel.findByCondition(query, { page, limit }),
    total: await CVModel.countByCondition(query),
    limitPerPage: limit,
  }])

  const result = data[0]

  // // Process cv
  result.cvs = await Promise.all(result.cvs.map(async (item) => {
    const obj = await CVModel.briefInfo(item)
    return obj
  }))
  return response.r200(res, locale, result)
}

/**
 * Admin change status cv
 *
 */
const adminChangeStatus = async (req, res) => {
  const locale = helper.getLocale(req)
  const { status } = req.body
  const { cVData } = req
  // Change status
  cVData.status = status

  if (status === 'approved') {
    cVData.approvedAt = Date.now()
  } else if (status === 'rejected') {
    cVData.rejectedAt = Date.now()
  }

  const { error, data } = await to(cVData.save())
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }
  return response.r200(res, locale, data)
}

const allCVApproved = async (req, res) => {
  const locale = helper.getLocale(req)
  const cvs = await CVModel.findDocsByCondition({ user: req.user._id, status: 'approved' })
  return response.r200(res, locale, { cvs })
}

export default {
  create,
  remove,
  update,
  all,
  show,
  allByAdmin,
  adminChangeStatus,
  allCVApproved,
}
