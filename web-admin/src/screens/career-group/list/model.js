import { fetch, create, update, changeStatus } from './service'
import { notification } from '../../../utils'
import { AppConst } from '../../../configs'

export default {
  namespace: 'careerGroups',
  state: {
    careerGroups: [],
    filter: {
      keyword: '',
      active: AppConst.careerGroups.active.default,
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
      const { careerGroups, total, limitPerPage } = response.data
      yield put({
        type: 'updateState',
        payload: {
          careerGroups,
          filter: {
            ...payload,
            total,
            limit: limitPerPage,
          },
        },
      })
    },

    *create({ payload }, { call, put }) {
      const response = yield call(create, payload)
      const { success, message } = response.data
      if (!success) {
        return notification.error(message)
      }
      yield put({
        type: 'fetch',
      })
    },

    *update({ payload, _id }, { call, put }) {
      const response = yield call(update, _id, payload)
      const { success, message } = response.data
      if (!success) {
        return notification.error(message)
      }
      yield put({
        type: 'fetch',
      })
    },

    *changeStatus({ _id }, { call, select, put }) {
      const response = yield call(changeStatus, _id)
      const { success, message } = response.data
      if (!success) {
        return notification.error(message)
      }
      notification.success(message)
      let { careerGroups } = yield select(state => state.careerGroups)
      careerGroups = careerGroups.map(item => (item._id === _id ? { ...item, active: !item.active } : item))
      yield put({
        type: 'updateState',
        payload: {
          careerGroups,
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
