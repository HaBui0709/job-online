import { fetch } from './service'
import { notification } from '../../../../utils'

export default {
  namespace: 'candidateApplyJob',
  state: {
    applyJobs: [],
    filter: {
      keyword: '',
      page: 0,
      limit: 20,
      total: 0,
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
      const { applyJobs, total, limitPerPage } = response.data
      yield put({
        type: 'updateState',
        payload: {
          applyJobs,
          filter: {
            ...payload,
            total,
            limit: limitPerPage,
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
