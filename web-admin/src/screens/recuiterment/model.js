import { fetch, fetchDetail, changeStatus } from './service'
import { notification } from '../../utils'

export default {
  namespace: 'recuiterments',
  state: {
    recuiterments: [],
    recuiterment: null,
    filter: {
      keyword: '',
      page: 0,
      status: 'all',
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
    *fetchDetail({ recuitermentId }, { call, put }) {
      const dataRes = yield call(fetchDetail, recuitermentId)
      const response = dataRes.data
      if (!response.data) {
        return notification.error(response.message)
      }
      const { data } = response
      yield put({
        type: 'updateState',
        payload: {
          recuiterment: data,
        },
      })
    },
    *changeStatus({ payload }, { call, put }) {
      const data = yield call(changeStatus, payload, payload.recuitermentId)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      yield put({
        type: 'fetchDetail',
        recuitermentId: payload.recuitermentId,
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
