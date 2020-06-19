import { saveFavorite, fetchJobInteresting, fetchJobUrgent, fetchCareerGroup, fetchBusinesses } from './service'
import { notification } from '../../../utils'

export default {
  namespace: 'home',
  state: {
    jobsInteresting: [],
    businesses: [],
    jobUrgent: [],
    careerGroups: [],
  },
  effects: {
    *fetchJobInteresting({}, { call, put }) {
      const data = yield call(fetchJobInteresting)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      yield put({
        type: 'updateState',
        payload: {
          jobsInteresting: response.data,
        },
      })
    },
    *fetchJobUrgent({}, { call, put }) {
      const data = yield call(fetchJobUrgent)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      yield put({
        type: 'updateState',
        payload: {
          jobUrgent: response.data,
        },
      })
    },

    *fetchCareerGroup({}, { call, put }) {
      const data = yield call(fetchCareerGroup)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const { careerGroups } = response.data
      yield put({
        type: 'updateState',
        payload: {
          careerGroups,
        },
      })
    },

    *fetchBusinesses({}, { call, put }) {
      const data = yield call(fetchBusinesses)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const { businesses } = response.data
      yield put({
        type: 'updateState',
        payload: {
          businesses,
        },
      })
    },

    *saveFavorite({ payload }, { call }) {
      const data = yield call(saveFavorite, payload.data)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
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
