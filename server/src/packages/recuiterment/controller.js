import lodash from 'lodash'
import { helper, response, getError, to } from '../../utils'
import { RecuitermentModel } from '../../model'
import configs from '../../configs'
import { localesKey } from '../../locales'

// import { sendEmail } from '../../modules/mailer'

/**
 * Create recuiterment
 */
const create = async (req, res) => {
  const locale = helper.getLocale(req)
  const doc = req.body
  // Add User auth
  const { user: { _id, business } } = req

  doc.user = _id
  doc.business = business
  // Create doc
  const { error, data } = await RecuitermentModel.saveDoc(doc)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  // const businessData = await BusinessModel.findOneByCondition({ _id: business })
  // Get target to send email
  // const target = {
  //   title: data.title,
  //   business: businessData.name,
  // }

  // // TODO: Send mail for admin
  // const adminEmails = await UserModel.getListAdminMails()
  // console.log('Mails ', adminEmails)
  // adminEmails.map(async (email) => {
  //   // Send mail for tracking
  //   const mailData = {
  //     user: {
  //       email,
  //     },
  //     target,
  //     campaign: data.toJSON(),
  //   }
  //   await sendEmail(mailData, 'recuitermentCreatedNotify')
  // })
  return response.r200(res, locale, { recuiterment: data.toJSON() })
}

/**
 * Get all recuiterments
 */
const all = async (req, res) => {
  const locale = helper.getLocale(req)
  const { page = 0 } = req.query
  const condition = lodash.pick(req.query, ['keyword', 'status'])
  const limit = configs.limit.recuiterment.all
  // CHeck role
  const { user: { business, role } } = req

  if (role === 'recuiter') {
    condition.business = business
  }

  const data = await Promise.all([{
    recuiterments: await RecuitermentModel.findByCondition(condition, { page, limit }),
    total: await RecuitermentModel.countByCondition(condition),
    limitPerPage: limit,
  }])

  const result = data[0]

  // Process recuiterment
  result.recuiterments = await Promise.all(result.recuiterments.map(async (item) => {
    const obj = await RecuitermentModel.briefInfo(item)
    return obj
  }))

  if (role === 'recuiter') {
    // Get total quantiy recuiterments
    result.totalRecuitermentActive = await RecuitermentModel.countByCondition(
      {
        business,
        status: 'approved',
        active: true,
      },
    )

    result.totalRecuitermentPending = await RecuitermentModel.countByCondition(
      {
        business,
        status: 'pending',
      },
    )

    result.totalRecuitermentComplete = await RecuitermentModel.countByCondition({
      business,
      status: 'completed',
    })

    result.totalRecuiterment = await RecuitermentModel.countByCondition({
      business,
    })
  }
  return response.r200(res, locale, result)
}

/**
 * Show recuiterment
 */
const showIsPosting = async (req, res) => {
  const locale = helper.getLocale(req)
  const { recuitermentData } = req

  // Get data is posting
  const condition = {
    active: true,
    status: 'approved',
    _id: recuitermentData._id,
  }
  const data = await RecuitermentModel.findOneByCondition(condition)
  if (lodash.isEmpty(data)) {
    return response.r400(res, locale, localesKey.recuiterment.recuitermentNotFound)
  }

  const resuiterment = await RecuitermentModel.briefInfo(data)
  return response.r200(res, locale, resuiterment)
}

const show = async (req, res) => {
  const locale = helper.getLocale(req)
  const { recuitermentData } = req
  const resuiterment = await RecuitermentModel.briefInfo(recuitermentData)
  return response.r200(res, locale, resuiterment)
}

/**
 * Admin change status cv
 *
 */
const adminChangeStatus = async (req, res) => {
  const locale = helper.getLocale(req)
  const { status } = req.body
  const { recuitermentData } = req
  // Change status
  recuitermentData.status = status

  if (status === 'approved') {
    recuitermentData.approvedAt = Date.now()
    recuitermentData.active = true
  } else if (status === 'rejected') {
    recuitermentData.rejectedAt = Date.now()
    recuitermentData.active = false
  }

  const { error, data } = await to(recuitermentData.save())
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }
  return response.r200(res, locale, data)
}

/**
 * Get jobs home
 */
const jobHome = async (req, res) => {
  const locale = helper.getLocale(req)
  const { limit = 10 } = req.query
  const condition = {
    status: 'approved',
    active: true,
  }
  const sort = { 'salary.value.to': -1 }
  const data = await RecuitermentModel.findDataByCondition(condition, { limit, sort })
  return response.r200(res, locale, { data })
}


const allApproved = async (req, res) => {
  const locale = helper.getLocale(req)
  const { page = 0 } = req.query
  const condition = lodash.pick(req.query, ['keyword'])
  const limit = configs.limit.recuiterment.all
  // CHeck role
  const { user: { business, role } } = req

  if (role === 'recuiter') {
    condition.business = business
  }
  condition.status = 'approved'

  const data = await Promise.all([{
    recuiterments: await RecuitermentModel.findByCondition(condition, { page, limit }),
    total: await RecuitermentModel.countByCondition(condition),
    limitPerPage: limit,
  }])

  const result = data[0]

  // Process recuiterment
  result.recuiterments = await Promise.all(result.recuiterments.map(async (item) => {
    const obj = await RecuitermentModel.briefInfoAndQuantityApply(item)
    return obj
  }))

  return response.r200(res, locale, result)
}

/**
 * Similar jobs
 */
const similarJobs = async (req, res) => {
  const locale = helper.getLocale(req)
  const { recuitermentData } = req

  // Find doc by careers
  const condition = {
    status: 'approved',
    active: true,
    careers: recuitermentData.careers,
  }
  const limit = 10
  const page = 0
  const recuitermentsData = await RecuitermentModel.findByCondition(condition, { page, limit })

  const recuiterments = recuitermentsData.filter(item => item._id.toString() !== recuitermentData._id.toString())

  return response.r200(res, locale, { data: recuiterments })
}

export default {
  create,
  all,
  showIsPosting,
  show,
  adminChangeStatus,
  jobHome,
  allApproved,
  similarJobs,
}
