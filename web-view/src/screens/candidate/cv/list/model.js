import { deleteCV, fetchAllCV, fetchDetailCV } from './service'
import { notification } from '../../../../utils'

export default {
  namespace: 'cvModel',
  state: {
    cvs: [],
    cv: null,
  },
  effects: {
    *fetchAllCV({}, { call, put }) {
      const data = yield call(fetchAllCV)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const { cvs } = response.data
      yield put({
        type: 'updateState',
        payload: {
          cvs,
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
    *deleteCV({ payload }, { call, put, select }) {
      const data = yield call(deleteCV, payload)
      const response = data.data
      if (!response.data) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      const { filter } = yield select(state => state.cvs)
      yield put({
        type: 'fetchAllCV',
        payload: {
          ...filter,
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
