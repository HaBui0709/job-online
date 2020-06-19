import lodash from 'lodash'
import { notification } from '../../../utils'
import { fetch, changeBan, confirmPhone, unblockUser, blockUser } from './service'

export default {
  namespace: 'userShow',
  state: {
    user: {
      statistic: {},
      statuses: {},
    },
    filter: {},
  },
  subscriptions: {},
  effects: {
    * fetch({ payload }, { call, put }) {
      const data = yield call(fetch, payload._id)
      const response = data.data
      if (!response.data) {
        return notification.error(response.message)
      }
      yield put({
        type: 'updateState',
        payload: {
          user: response.data.userData,
        },
      })
    },
    * changeBan({ payload }, { call, put, select }) {
      const response = yield call(changeBan, payload._id)
      const { data: { success, message } } = response
      if (!success) {
        return notification.error(message)
      }
      notification.success(message)
      const { user } = yield select(state => state.userShow)
      user.statuses.banned = !user.statuses.banned
      yield put({
        type: 'updateState',
        payload: {
          user,
        },
      })
    },
    * confirmPhone({ payload }, { call, put, select }) {
      const response = yield call(confirmPhone, payload._id, payload.data)
      const { data: { success, message } } = response
      if (!success) {
        return notification.error(message)
      }
      notification.success(message)
      const { user } = yield select(_ => _.userShow)
      user.phone = payload.data.phone
      yield put({
        type: 'updateState',
        payload: {
          user,
        },
      })
    },
    * unblockUser({ payload }, { call, put, select }) {
      const response = yield call(unblockUser, payload._id)
      const { data: { success, message } } = response
      if (!success) {
        return notification.error(message)
      }
      notification.success(message)
      const { businessBlocks } = yield select(_ => _.userShow)
      lodash.remove(businessBlocks, item => item._id === payload._id)

      yield put({
        type: 'updateState',
        payload: {
          businessBlocks,
        },
      })
    },
    * blockUser({ payload }, { call, put, select }) {
      const { businessBlocks } = yield select(_ => _.userShow)
      const index = lodash.findIndex(businessBlocks, item => item.business._id === payload._id)
      if (index >= 0) {
        return notification.error('Thành viên đã bị khóa tại cửa hàng!')
      }

      const response = yield call(blockUser, payload._id, payload.data)
      const { data: { success, message } } = response
      if (!success) {
        return notification.error(message)
      }

      notification.success(message)
      yield put({
        type: 'fetchBusinessBlock',
        payload: {
          _id: payload.data.users[0],
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
