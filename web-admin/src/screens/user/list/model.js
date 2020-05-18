import { fetch } from './service'
import { notification } from '../../../utils'
// import { AppConst } from '../../../configs'

export default {
  namespace: 'users',
  state: {
    users: [],
    filter: {
      keyword: '',
      page: 0,
      limit: 20,
      total: 0,
      type: 'all',
      city: 'all',
      verified: 'all',
    },
  },

  subscriptions: {},

  effects: {
    * fetch({ payload }, { call, put }) {
      const data = yield call(fetch, payload)
      const response = data.data
      if (!response.data) {
        return notification.error(response.message)
      }
      yield put({
        type: 'updateState',
        payload: {
          users: response.data.users,
          filter: {
            ...payload,
            total: response.data.total,
            limit: response.data.limitPerPage,
          },
        },
      })
    },
  },

  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
