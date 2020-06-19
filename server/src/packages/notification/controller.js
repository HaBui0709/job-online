import lodash from 'lodash'
import { helper, response, to, getError } from '../../utils'
import { NotificationModel } from '../../model'
import { localesKey } from '../../locales'

/**
 *
 * Get notification by user
 *
 */
const getNotificationByUser = async (req, res) => {
  const locale = helper.getLocale(req)
  const { user: { _id } } = req

  // Find doc notification
  const notificationdata = await NotificationModel.findOneByCondition({ user: _id })

  if (lodash.isEmpty(notificationdata)) {
    return response.r200(res, locale, { notificationJob: {} })
  }
  const notificationJob = await NotificationModel.briefInfo(notificationdata)

  return response.r200(res, locale, { notificationJob })
}

/**
 *
 * Create notification by user
 *
 */
const create = async (req, res) => {
  const locale = helper.getLocale(req)
  const { user: { _id } } = req
  const notificationFind = await NotificationModel.findOneByCondition({ user: _id })
  // Check doc existsed
  if (!lodash.isEmpty(notificationFind)) {
    return response.r400(res, locale, localesKey.notification.notificationIsExisted)
  }

  // Create new Doc
  const doc = lodash.pick(req.body, ['email', 'city', 'salary', 'experience', 'careers', 'frequency', 'academicLevel'])
  doc.user = _id

  // Save doc
  const newDoc = new NotificationModel(doc)
  const { error, data } = await to(newDoc.save())
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  return response.r200(res, locale, { notification: data })
}

/**
 * Destroy notification
 */
const destroy = async (req, res) => {
  const locale = helper.getLocale(req)
  const { user: { _id } } = req
  // Find notification
  const data = await NotificationModel.findOneByCondition({ user: _id })
  await NotificationModel.removeNotification(data._id)
  return response.r200(res, locale, {})
}

export default {
  getNotificationByUser,
  create,
  destroy,
}
