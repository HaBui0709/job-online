import { fetch, fetchDetailCV, changeStatus } from './service'
import { notification } from '../../utils'

export default {
  namespace: 'cvs',
  state: {
    cvs: [],
    cv: null,
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
      const { cvs, total, limitPerPage } = response.data
      yield put({
        type: 'updateState',
        payload: {
          cvs,
          filter: {
            ...payload,
            total,
            limit: limitPerPage,
          },
        },
      })
    },
    *fetchDetailCV({ cvId }, { call, put }) {
      const data = yield call(fetchDetailCV, cvId)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const { cv } = response.data
      yield put({
        type: 'updateState',
        payload: {
          cv,
        },
      })
    },
    *changeStatus({ payload }, { call, put }) {
      const data = yield call(changeStatus, payload, payload.cvId)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      yield put({
        type: 'fetchDetailCV',
        cvId: payload.cvId,
      })
    },
    *resetState({}, { put }) {
      yield put({
        type: 'updateState',
        payload: {
          cvs: [],
          cv: null,
          filter: {
            keyword: '',
            page: 0,
            status: 'all',
            limit: 20,
            total: 0,
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
