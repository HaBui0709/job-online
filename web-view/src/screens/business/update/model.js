import lodash from 'lodash'
import { fetchBusiness, updateBusiness, uploadCover, changeLogo, uploadCoverHeader } from './service'
import { notification } from '../../../utils'
import socket from '../../../socket/service'
import { AppConst } from '../../../configs'

export default {
  namespace: 'businessUpdate',
  state: {
    business: {},
  },

  subscriptions: {
    socket({ dispatch }) { // socket
      socket.on('uploadPhotoSuccess', (data) => {
        const socketData = JSON.parse(data)
        if (socketData.data.clientData.name === AppConst.nameType.business) {
          dispatch({
            type: 'fetchSuccessChangeCoverSocket',
            payload: {
              businessId: socketData.data.clientData._id,
              cover: socketData.data._id,
            },
          })
        }
        if (socketData.data.clientData.name === AppConst.nameType.businessHeader) {
          dispatch({
            type: 'updateStateModel',
            payload: {
              businessId: socketData.data.clientData._id,
              logoHeader: socketData.data.dimensions.medium.url,
            },
          })
        }
      })
    },
  },


  effects: {
    *updateStateModel({ payload }, { select, put }) {
      const { business } = yield select(state => state.businessUpdate)
      business.logoHeader = payload.logoHeader
      yield put({
        type: 'updateState',
        payload: {
          business,
        },
      })
    },

    * fetchSuccessChangeCoverSocket({ payload }, { call, put, select }) {
      const response = yield call(changeLogo, payload.businessId, { logo: payload.cover })
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
      const { business } = yield select(state => state.businessUpdate)
      business.logo = response.data.data.cover
      yield put({
        type: 'updateState',
        payload: {
          business,
        },
      })
    },
    *fetchBusinessDetail({ payload }, { call, put }) {
      const data = yield call(fetchBusiness, payload.data, payload.business)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const { business } = response.data
      yield put({
        type: 'updateState',
        payload: {
          business,
        },
      })
    },
    *updateBusiness({ payload }, { call, select }) {
      const { business } = yield select(state => state.businessUpdate)
      const dataUpdate = {
        ...payload.data,
        ...lodash.pick(business, ['location', 'addressComponents']),
      }
      const data = yield call(updateBusiness, dataUpdate, payload.business)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
    },


    * uploadCover({ payload }, { call }) {
      const response = yield call(uploadCover, payload.businessId, payload.file)
      const { success, message } = response.data
      if (!success) {
        return notification.error(message)
      }
      notification.success(message)
    },

    *uploadCoverHeader({ payload }, { call }) {
      const response = yield call(uploadCoverHeader, payload.businessId, payload.file)
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
