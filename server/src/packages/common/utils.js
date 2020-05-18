import { token } from '../../utils'
import { UserModel } from '../../model'

/**
 * Get Data to login
 *
 * @param {Object} user
 *
 */
const getDataToLogin = async (user) => {
  const userInfo = await UserModel.briefInfo(user)
  return {
    token: token(userInfo.toJSON()),
    user: userInfo,
  }
}

export default {
  getDataToLogin,
}
