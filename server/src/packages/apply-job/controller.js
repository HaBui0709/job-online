import lodash from 'lodash'
import { helper, response, to, getError } from '../../utils'
import { ApplyJobModel, RecuitermentModel, CVModel, UserModel } from '../../model'
import { localesKey } from '../../locales'
import configs from '../../configs'
import { sendEmail } from '../../modules/mailer'


/**
 * Apply Job
 */
const apply = async (req, res) => {
  const locale = helper.getLocale(req)

  // Check Cv
  // Check recuiterment
  const conditionRecuiterment = {
    _id: req.body.recuiterment,
    status: 'approved',
    active: true,
  }

  // check if recruiterment post exist
  const recuitermentCount = RecuitermentModel.countByCondition(conditionRecuiterment)
  if (!recuitermentCount) {
    return response.r400(res, locale, localesKey.common.serverError)
  }


  // Check nganh nghe to see whether candidate's desired career matches recruiterment's careers
  const careerOfCV = (await CVModel.getBriefInfoById(req.body.cv)).overviewInfo.desiredCareer
  const careersRecuiterments = (await RecuitermentModel.getBriefInfoById(req.body.recuiterment)).careers

  if (!careersRecuiterments.map(item => item._id.toString()).includes(careerOfCV._id.toString())) {
    return response.r400(res, locale, localesKey.common.notSameCareer)
  }

  // Kiểm tra người dùng đã từng nộp cv vào tin tuyển  dụng này chưa
  const isApply = await ApplyJobModel.countByCondition({
    recuiterment: req.body.recuiterment,
    cv: req.body.cv,
  })

  if (isApply) {
    return response.r400(res, locale, localesKey.cv.cvIsApplied)
  }


  // Apply job
  const body = lodash.pick(req.body, ['recuiterment', 'cv'])

  const doc = new ApplyJobModel(body)
  const { error, data } = await to(doc.save())
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  // Send email
  response.r200(res, locale, data)

  // Send email for recuiter
  // Get data send email

  // Get emaill of recuiter and get data to send
  const recuitermentData = await RecuitermentModel.findOneByCondition({ _id: req.body.recuiterment })
  const recuiter = await UserModel.findOneByCondition({ _id: recuitermentData.user })
  const candidate = await CVModel.getBriefInfoById(req.body.cv)

  const dataSendEmail = {
    recuiter: recuiter.fullName,
    recuiterment: {
      ...lodash.pick(recuitermentData, ['_id', 'title']),
    },
    candidate,
  }
  // Send mail for tracking
  const mailData = {
    user: {
      email: recuiter.email,
    },
    data: dataSendEmail,
  }
  await sendEmail(mailData, 'applyJobCreatedNotify')
  return true
}

/**
 * List apply job for candidate
 */
const listApplyJobForCandidate = async (req, res) => {
  const locale = helper.getLocale(req)
  const { page = 0 } = req.query
  const limit = configs.limit.careerGroup.all
  const { user: { _id } } = req
  // Get list cv
  const cvs = await CVModel.findDocsByCondition({ user: _id, status: 'approved' })

  const cvIds = cvs.map(item => item._id)
  if (!cvIds.length) {
    return response.r200(res, locale, {
      applyJobs: [],
      total: 0,
      limitPerPage: limit,
    })
  }
  // const applyJobs = await ApplyJobModel.findDocsByCondition({ cvs: cvIds })
  // console.log('apply jos', applyJobs.length)

  const query = {
    ...lodash.pick(req.query, ['status', 'keyword']),
    cvs: cvIds,
  }
  const data = await Promise.all([{
    applyJobs: await ApplyJobModel.findByCondition(query, { page, limit }),
    total: await ApplyJobModel.countByCondition(query),
    limitPerPage: limit,
  }])

  const result = data[0]

  // Process recuiterment
  result.applyJobs = await Promise.all(result.applyJobs.map(async (item) => {
    const obj = await ApplyJobModel.briefInfoForCandidate(item)
    return obj
  }))

  return response.r200(res, locale, result)
}

/**
 * Get list candidate is apply job into recuiments id
 */
const managerCandidate = async (req, res) => {
  const locale = helper.getLocale(req)
  const { page = 0 } = req.query
  const limit = configs.limit.careerGroup.all
  const query = lodash.pick(req.query, ['recuiterment', 'status'])
  // Get list
  const data = await Promise.all([{
    recuiterment: await RecuitermentModel.getBriefInfoById(req.query.recuiterment),
    applyJobs: await ApplyJobModel.findByCondition(query, { page, limit }),
    total: await ApplyJobModel.countByCondition(query),
    limitPerPage: limit,
  }])

  const result = data[0]

  // Process recuiterment
  result.applyJobs = await Promise.all(result.applyJobs.map(async (item) => {
    const obj = await ApplyJobModel.briefInfo(item)
    return obj
  }))

  return response.r200(res, locale, result)
}

/**
 * Change status and notifications
 */
const changeStatusAndNotificaiton = async (req, res) => {
  const locale = helper.getLocale(req)
  const { status, notification } = req.body
  const { applyJobData } = req
  // Update doc
  applyJobData.status = status
  applyJobData.notification = {
    title: '',
    message: '',
  }
  applyJobData.notification.title = notification.title
  applyJobData.notification.message = notification.message
  if (status === 'approved') {
    applyJobData.approvedAt = Date.now()
  } else if (status === 'rejected') {
    applyJobData.rejectedAt = Date.now()
  }

  // Save doc
  const { error, data } = await to(applyJobData.save())
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  response.r200(res, locale, { data })
  // Send Gmail
  const recuitermentData = await RecuitermentModel.findOneByCondition({ _id: applyJobData.recuiterment })
  const recuiter = await UserModel.findOneByCondition({ _id: recuitermentData.user })
  const cv = await CVModel.getBriefInfoById(applyJobData.cv)

  const dataSendEmail = {
    cv,
    notification,
    recuitermentData,
  }

  // Send mail for tracking
  const mailData = {
    user: {
      email: cv.user.email,
      from: recuiter.email,
    },
    data: dataSendEmail,
  }

  await sendEmail(mailData, 'approvedApplyjobNotify')
  return true
}
export default {
  apply,
  listApplyJobForCandidate,
  managerCandidate,
  changeStatusAndNotificaiton,
}
