import { login } from './service'
import { notification } from '../../utils'
import { AppConst, MessageConst, RoleConst } from '../../configs'

export default {
  namespace: 'login',
  state: {},
  effects: {
    *login({ payload }, { put, call }) {
      const data = yield call(login, payload)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const userInfo = response.data.user
      const role = userInfo.admin.role || ''
      const permittedRoles = Object.keys(RoleConst)
      if (!permittedRoles.includes(role)) {
        return notification.error(MessageConst.noPermission)
      }
      notification.success(response.message)
      // save localStorage
      localStorage.setItem(AppConst.localStorage.authKey, response.data.token)
      localStorage.setItem(AppConst.localStorage.roleKey, userInfo.admin.role)
      localStorage.setItem(AppConst.localStorage.userIdKey, userInfo._id)

      // App init state
      yield put({ type: 'app/init' })
    },
  },
}
