import { fetch, deleteRecruitment } from './service'
import { notification } from '../../../utils'
import { AppConst } from '../../../configs'

export default {
  namespace: 'recuiterments',
  state: {
    recuiterments: [],
    statistic: {
      totalRecuitermentActive: 0,
      totalRecuitermentPending: 0,
      totalRecuitermentComplete: 0,
      totalRecuiterment: 0,
    },
    filter: {
      keyword: '',
      status: AppConst.status.default,
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
      const { recuiterments, total, limitPerPage, totalRecuiterment, totalRecuitermentActive, totalRecuitermentPending, totalRecuitermentComplete } = response.data
      yield put({
        type: 'updateState',
        payload: {
          recuiterments,
          statistic: {
            totalRecuitermentActive,
            totalRecuitermentPending,
            totalRecuitermentComplete,
            totalRecuiterment,
          },
          filter: {
            ...payload,
            total,
            limit: limitPerPage,
          },
        },
      })
    },
    *deleteRecruitment({ payload }, { call, put, select }) {
      const data = yield call(deleteRecruitment, payload)
      const response = data.data
      if (!response.data) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      const { filter } = yield select(state => state.recuiterments)
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
