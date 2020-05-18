import { fetch } from './service'
import { notification } from '../../../../utils'
import { fetchUserApplyJobs } from '../detail/service'

export default {
  namespace: 'recuciterApplyJob',
  state: {
    recuiterments: [],
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
      const { recuiterments, total, limitPerPage } = response.data
      yield put({
        type: 'updateState',
        payload: {
          recuiterments,
          filter: {
            ...payload,
            total,
            limit: limitPerPage,
          },
        },
      })
    },

    *fetchUserApplyJobs({ payload }, { call, put }) {
      const data = yield call(fetchUserApplyJobs, payload)
      const response = data.data
      if (!response.data) {
        return notification.error(response.message)
      }
      const { applyJobs } = response.data
      yield put({
        type: 'updateState',
        payload: {
          applyJobs,
          filter: {
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
