import { fetchNotification, create, deleteNotification } from './service'
import { notification } from '../../utils'

export default {
  namespace: 'notificationJobs',
  state: {
    notificationJob: null,
  },
  effects: {
    *fetchNotification({}, { call, put }) {
      const data = yield call(fetchNotification)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const { notificationJob } = response.data
      yield put({
        type: 'updateState',
        payload: {
          notificationJob,
        },
      })
    },

    *create({ payload }, { call, put }) {
      const data = yield call(create, payload)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      yield put({
        type: 'fetchNotification',
      })
    },

    *delete({}, { call, put }) {
      const data = yield call(deleteNotification)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      yield put({
        type: 'fetchNotification',
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
