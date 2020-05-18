import { notification } from '../../../../utils'
import {
  fetchcurriculumVitaes,
} from '../service'

export default {
  namespace: 'candidateInfo',
  state: {
    curriculumVitaes: {
      data: [],
      filter: {
        page: 0,
        type: 'all',
        limit: 0,
        total: 0,
      },
    },
    submissionHistories: {
      data: [],
      filter: {
        page: 0,
        type: 'all',
        limit: 0,
        total: 0,
      },
    },
    following: {
      data: [],
      filter: {
        page: 0,
        type: 'all',
        limit: 0,
        total: 0,
      },
    },
  },
  subscriptions: {},
  effects: {
    * curriculumVitaes({ payload }, { call, put }) {
      const data = yield call(fetchcurriculumVitaes, payload._id, payload.data)
      const response = data.data
      const { curriculumVitaes, limitPerPage, total } = response.data
      if (!response.data) {
        return notification.error(response.message)
      }
      yield put({
        type: 'updateState',
        payload: {
          curriculumVitaes: {
            data: curriculumVitaes,
            filter: {
              limit: limitPerPage,
              total,
              ...payload.data,
            },
          },
        },
      })
    },
    * resetState({}, { put }) {
      yield put({
        type: 'updateState',
        payload: {
          zpoint: {
            data: [],
            filter: {
              page: 0,
              type: 'all',
              limit: 0,
              total: 0,
            },
          },
          submissionHistories: {
            data: [],
            filter: {
              page: 0,
              type: 'all',
              limit: 0,
              total: 0,
            },
          },
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
