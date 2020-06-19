import { fetchBusiness, fecthAllJobs } from './service'
import { notification } from '../../utils'

export default {
  namespace: 'business',
  state: {
    business: {
      location: {
        coordinates: [
          108.220629394054,
          16.0727167550719,
        ],
        type: 'Point',
      },
    },
    recuiterments: [],
    filter: {
      limit: 10,
      total: 0,
      page: 0,
    },
  },
  effects: {
    *fetchDetail({ payload }, { call, put }) {
      const data = yield call(fetchBusiness, payload.businessId)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const { business } = response.data
      yield put({
        type: 'updateState',
        payload: {
          business,
        },
      })
    },
    *fecthAllJobs({ payload }, { call, put }) {
      const data = yield call(fecthAllJobs, payload.businessId)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const { recuiterments } = response.data
      yield put({
        type: 'updateState',
        payload: {
          recuiterments,
        },
      })
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
