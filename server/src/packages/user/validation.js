
import { response, helper } from '../../utils'
import { localesKey } from '../../locales'
import { UserModel } from '../../model'
/**
 * Check unique field ['username', 'email', 'phone']
 */
const checkUniqueField = async (req, res, next) => {
  const locale = helper.getLocale(req)
  const { body: { username, email, phone } } = req
  // Check username, email, phone
  const isUsernameExisted = await checkExistedInDb(req, res, { username })
  if (isUsernameExisted) {
    return response.r400(res, locale, localesKey.user.usernameIsExisted)
  }
  const isEmailExisted = await checkExistedInDb(req, res, { email })
  if (isEmailExisted) {
    return response.r400(res, locale, localesKey.user.emailIsExisted)
  }
  const isPhoneExisted = await checkExistedInDb(req, res, { phone })
  if (isPhoneExisted) {
    return response.r400(res, locale, localesKey.user.phoneIsExisted)
  }
  next()
}

/**
 * Check existed in db by field
 *
 * @param {Object} field [Allow 1 properties]
 *
 */
const checkExistedInDb = async (req, res, field) => {
  // Check field
  const isExisted = await UserModel.countByCondition({
    [`${Object.keys(field)[0]}IsExist`]: Object.values(field)[0],
    userNotSame: req.params.userId,
  })
  return isExisted
}
export default {
  checkUniqueField,
}
