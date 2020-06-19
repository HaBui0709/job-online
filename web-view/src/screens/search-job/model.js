import { searchJob } from './service'
import { notification } from '../../utils'

export default {
  namespace: 'searchJobs',
  state: {
    jobs: [],
    filter: {
      keyword: '',
      city: 'all',
      total: 0,
      limit: 20,
    },
  },

  subscriptions: {},

  effects: {
    * searchJob({ payload }, { call, put }) {
      const dataRes = yield call(searchJob, payload)
      const response = dataRes.data
      if (!response.data) {
        return notification.error(response.message)
      }
      const { recuiterments, total, limitPerPage } = response.data
      yield put({
        type: 'updateState',
        payload: {
          jobs: recuiterments,
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
