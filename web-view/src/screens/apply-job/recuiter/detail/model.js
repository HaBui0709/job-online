import { fetchDetailRecuitermentApproved, fetch, fetchCVById, changeStatusAndNotification, fetchUserApplyJobs } from './service'
import { notification } from '../../../../utils'

export default {
  namespace: 'applyJob',
  state: {
    applyJobs: [],
    cv: null,
    recuiterment: null,
    filter: {
      recuiterment: '',
      page: 0,
      keyword: '',
      total: 0,
      limit: 10,
      status: 'all',
    },
  },

  subscriptions: {},

  effects: {

    *changeStatusAndNotification({ payload }, { call, select }) {
      const data = yield call(changeStatusAndNotification, payload.data, payload.applyJobId)
      const response = data.data
      if (!response.data) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      const { recuiterment: { _id } } = yield select(state => state.applyJob)
      setTimeout(() => {
        window.location.href = `/recuiter/apply-jobs/${_id}`
      }, 2000)
    },
    *resetState({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload,
      })
    },
    * fetch({ payload }, { call, put }) {
      const data = yield call(fetch, payload)
      const response = data.data
      if (!response.data) {
        return notification.error(response.message)
      }
      const { applyJobs, total, limitPerPage, recuiterment } = response.data
      yield put({
        type: 'updateState',
        payload: {
          applyJobs,
          recuiterment,
          filter: {
            ...payload,
            total,
            limit: limitPerPage,
          },
        },
      })
    },
    * fetchDetailRecuitermentApproved({ payload }, { call, put }) {
      const dataRes = yield call(fetchDetailRecuitermentApproved, payload.recuitermentId)
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

    *fetchCVById({ payload }, { call, put }) {
      const data = yield call(fetchCVById, payload.cvId)
      const response = data.data
      if (!response.data) {
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

    *fetchUserApplyJobs({ payload }, { call, put }) {
      const data = yield call(fetchUserApplyJobs, payload)
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
