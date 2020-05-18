import { fetch, deleteFavoriteJob } from './service'
import { notification } from '../../../utils'

export default {
  namespace: 'favoriteHistories',
  state: {
    favoriteHistories: [],
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
      const { favoriteHistories, total, limitPerPage } = response.data
      yield put({
        type: 'updateState',
        payload: {
          favoriteHistories,
          filter: {
            ...payload,
            total,
            limit: limitPerPage,
          },
        },
      })
    },

    *deletefavoriteHistory({ payload }, { call, put, select }) {
      const data = yield call(deleteFavoriteJob, payload)
      const response = data.data
      if (!response.data) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      const { filter } = yield select(state => state.favoriteHistories)
      yield put({
        type: 'fetch',
        payload: {
          ...filter,
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
