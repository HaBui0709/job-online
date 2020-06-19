import { notification } from '../../../utils'
import { fetchListCVDetail, fetchAllCV, saveBeautyCV, previewCVBeauty, deleteCVBeauty } from './service'

export default {
  namespace: 'cvBeautyModel',
  state: {
    cvBeautys: [],
    isCVExisted: false,
    cvs: [],
  },
  effects: {
    *deleteCVBeauty({ cvBeautyId }, { call }) {
      const data = yield call(deleteCVBeauty, cvBeautyId)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
    },
    *fetchListCVDetail({}, { call, put }) {
      const data = yield call(fetchListCVDetail)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const { result: { cvBeautys, isCVExisted } } = response.data
      yield put({
        type: 'updateState',
        payload: {
          cvBeautys,
          isCVExisted,
        },
      })
    },

    *fetchAllCV({}, { call, put }) {
      const data = yield call(fetchAllCV)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      const { cvs } = response.data
      yield put({
        type: 'updateState',
        payload: {
          cvs,
        },
      })
    },

    *saveBeautyCV({ payload }, { call }) {
      const data = yield call(saveBeautyCV, payload)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
    },

    *previewCVBeauty({ payload }, { call }) {
      const data = yield call(previewCVBeauty, payload.cvBeautyId)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      window.location.href = response.data.url
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
