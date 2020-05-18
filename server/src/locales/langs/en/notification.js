import key from '../../key'
import { targetRequired, targetInvalid } from '../helper'
import configs from '../../../configs'

const LOCALE_EN = configs.locales.en
const notificationKey = key.notification

// 700 -> 799
export default {
  [notificationKey.emailInvalid]: targetInvalid('Email', LOCALE_EN),
  [notificationKey.emailRequired]: targetRequired('Email', LOCALE_EN),

  [notificationKey.salaryInvalid]: targetInvalid('Salary', LOCALE_EN),
  [notificationKey.careersMustBeArray]: 'Danh mục ngành nghề yêu cầu phải là một mảng ObjectId',
  [notificationKey.careersItemMustBeObjectId]: 'Danh mục ngành nghề yêu cầu phải là một mảng ObjectId',
  [notificationKey.careersRequired]: targetRequired('Careers', LOCALE_EN),

  [notificationKey.notificationIsExisted]: 'Thông báo việc làm đã tồn tại',
}
