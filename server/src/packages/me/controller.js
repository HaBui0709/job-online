import { response, helper } from '../../utils'
import { UserModel } from '../../model'
import { localesKey } from '../../locales'

/**
 *  Get current user info
 */
const currentUserInfo = async (req, res) => {
  const locale = helper.getLocale(req)
  const result = await UserModel.currentInfoById(req.user._id)

  if (!result) {
    return response.r400(res, locale, localesKey.common.requireAuth)
  }

  return response.r200(res, locale, { user: result })
}

export default {
  currentUserInfo,
}
