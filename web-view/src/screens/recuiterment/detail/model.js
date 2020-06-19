import {
  fetchDetailRecuitermentPosting, applyJob,
  getCVApproved, fechSimilarJobs, saveJob,
} from './service'
import { notification } from '../../../utils'

export default {
  namespace: 'recuitermentShow',
  state: {
    recuitermentPosting: null,
    cvIsApproved: [],
    recuitermentSimilar: [],
  },

  subscriptions: {},

  effects: {
    * fetchDetailRecuitermentPosting({ payload }, { call, put }) {
      const dataRes = yield call(fetchDetailRecuitermentPosting, payload.recuitermentId)
      const response = dataRes.data
      if (!response.data) {
        return notification.error(response.message)
      }
      const { data } = response
      yield put({
        type: 'updateState',
        payload: {
          recuitermentPosting: data,
        },
      })
    },

    * fechSimilarJobs({ payload }, { call, put }) {
      const dataRes = yield call(fechSimilarJobs, payload.recuitermentId)
      const response = dataRes.data
      if (!response.data) {
        return notification.error(response.message)
      }
      const { data } = response
      yield put({
        type: 'updateState',
        payload: {
          recuitermentSimilar: data.data,
        },
      })
    },

    *applyCV({ payload }, { call }) {
      const responseApply = yield call(applyJob, payload)
      const { data: { success, message } } = responseApply
      if (!success) {
        return notification.error(message)
      }
      notification.success('Hồ sơ của bạn đã được nộp thành công!')
    },

    *getCVApproved({ payload }, { call, put }) {
      const response = yield call(getCVApproved, payload)
      const { data: { success, message } } = response
      if (!success) {
        return notification.error(message)
      }
      const { cvs } = response.data.data
      yield put({
        type: 'updateState',
        payload: {
          cvIsApproved: cvs,
        },
      })
    },

    *saveJob({ payload }, { call }) {
      const response = yield call(saveJob, payload)
      const { data: { success, message } } = response
      if (!success) {
        return notification.error(message)
      }
      notification.success('Lưu tin tuyển dụng thành công!')
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
