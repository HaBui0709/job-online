import { fetchAllCV, fetchDetailCV } from './service'
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
