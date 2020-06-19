import { fetch } from './service'
import { AppConst } from '../../../configs'
import { notification } from '../../../utils'

export default {
  namespace: 'businesses',
  state: {
    businesses: [],
    filter: {
      city: '',
      active: AppConst.businesses.active.default,
      keyword: '',
      total: 0,
      page: 0,
      limit: 20,
    },
  },

  subscriptions: {},

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fetch, payload)
      if (!response.data.data) {
        return notification.error(response.data.message)
      }
      yield put({
        type: 'updateState',
        payload: {
          businesses: response.data.data.businesses,
          filter: {
            total: response.data.data.total,
            limit: response.data.data.limitPerPage,
            ...payload,
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
