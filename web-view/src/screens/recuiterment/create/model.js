
import { routerRedux } from 'dva/router'
import { fetchCareerGroup, createRecuiterment, uploadCover } from './service'
import socket from '../../../socket/service'
import { notification } from '../../../utils'
import { AppConst } from '../../../configs'

export default {
  namespace: 'recuitermentCreate',
  state: {
    recuiterments: [],
    careerGroups: [],
    cover: '',
  },

  subscriptions: {
    socket({ dispatch }) { // socket
      socket.on('uploadPhotoSuccess', (data) => {
        const socketData = JSON.parse(data)
        if (socketData.data.clientData.name === AppConst.nameType.recucitermentCover) {
          dispatch({
            type: 'updateStateModel',
            payload: {
              cover: socketData.data.dimensions.medium.url,
            },
          })
        }
      })
    },
  },

  effects: {
    *updateStateModel({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: {
          cover: payload.cover,
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
    *create({ payload }, { call, put, select }) {
      const { cover } = yield select(state => state.recuitermentCreate)
      payload.cover = cover
      const data = yield call(createRecuiterment, payload)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      yield put(routerRedux.push('/recuiter/recuiterments'))
    },

    *uploadCover({ payload }, { call }) {
      const response = yield call(uploadCover, payload.file)
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
