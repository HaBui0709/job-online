import key from '../../key'
import { targetRequired, targetInvalid } from '../helper'
import configs from '../../../configs'

const LOCALE_VI = configs.locales.vi
const notificationKey = key.notification

// 700 -> 799
export default {
  [notificationKey.emailInvalid]: targetInvalid('Email', LOCALE_VI),
  [notificationKey.emailRequired]: targetRequired('Email', LOCALE_VI),

  [notificationKey.salaryInvalid]: targetInvalid('Salary', LOCALE_VI),
  [notificationKey.careersMustBeArray]: 'Danh mục ngành nghề yêu cầu phải là một mảng ObjectId',
  [notificationKey.careersItemMustBeObjectId]: 'Danh mục ngành nghề yêu cầu phải là một mảng ObjectId',
  [notificationKey.careersRequired]: targetRequired('Careers', LOCALE_VI),

  [notificationKey.notificationIsExisted]: 'Thông báo việc làm đã tồn tại',
}
