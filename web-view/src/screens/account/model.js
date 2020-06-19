import { routerRedux } from 'dva/router'

import { updateAccount, uploadCover, changeCover } from './service'
import { notification } from '../../utils'
import { AppConst } from '../../configs'
import socket from '../../socket/service'

export default {
  namespace: 'account',
  state: {
    account: {},
  },
  subscriptions: {
    socket({ dispatch }) { // socket
      socket.on('uploadPhotoSuccess', (data) => {
        const socketData = JSON.parse(data)
        if (socketData.data.clientData.name === AppConst.nameType.account) {
          dispatch({
            type: 'fetchSuccessChangeCoverSocket',
            payload: {
              userId: socketData.data.clientData._id,
              cover: socketData.data._id,
            },
          })
        }
      })
    },
  },

  effects: {
    * fetchSuccessChangeCoverSocket({ payload }, { call, put }) {
      const response = yield call(changeCover, payload.userId, { avatar: payload.cover })
      const { data: { success, message } } = response
      if (!success) {
        return notification.error(message)
      }
      yield put({
        type: 'app/notifications',
        payload: {
          data: response.data.data,
        },
      })
      yield put({
        type: 'app/updateAvatarUser',
        payload: response.data.data.cover,
      })
    },
    *updateAccount({ payload }, { call, put }) {
      const data = yield call(updateAccount, payload.data, payload.user)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)

      yield put(routerRedux.push(`/accounts/${payload.user}`))
    },

    * uploadCover({ payload }, { call }) {
      const response = yield call(uploadCover, payload.userId, payload.file)
      const { success, message } = response.data
      if (!success) {
        return notification.error(message)
      }
      notification.success(message)
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
