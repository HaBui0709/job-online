import { registerCandidate, registerRecuiter } from './service'
import { notification } from '../../utils'
// import { AppConst, MessageConst, RoleConst } from '../../configs'

export default {
  namespace: 'register',
  state: {
    logoBusiness: '',
    business: {},
  },
  effects: {
    *registerCandidate({ payload }, { call }) {
      const data = yield call(registerCandidate, payload)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      window.location.href = '/login/candidate'
    },

    *registerRecuiter({ payload }, { call }) {
      const data = yield call(registerRecuiter, payload)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      window.location.href = '/login/recuiter'
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
