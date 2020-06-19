import { routerRedux } from 'dva/router'
import { createCV, fetchCareerGroup } from './service'
import { notification } from '../../../../utils'

export default {
  namespace: 'candidateCV',
  state: {
    experiences: [],
    qualifications: [],
    foreignLanguages: [],
    careerGroups: [],
  },
  effects: {
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
    *create({ payload }, { call, put }) {
      const data = yield call(createCV, payload)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      notification.success(response.message)
      yield put(routerRedux.push('/candidate/cv'))
    },
    *deleteExperienceItem({ payload }, { select, put }) {
      const { experiences } = yield select(state => state.candidateCV)
      const data = experiences.filter(item => item._id !== payload.id)
      yield put({
        type: 'updateState',
        payload: {
          experiences: data,
        },
      })
    },
    *deleteQualificationItem({ payload }, { select, put }) {
      const { qualifications } = yield select(state => state.candidateCV)
      const data = qualifications.filter(item => item._id !== payload.id)
      yield put({
        type: 'updateState',
        payload: {
          qualifications: data,
        },
      })
    },
    *deleteLanguageItem({ payload }, { select, put }) {
      const { foreignLanguages } = yield select(state => state.candidateCV)
      const data = foreignLanguages.filter(item => item._id !== payload.id)
      yield put({
        type: 'updateState',
        payload: {
          foreignLanguages: data,
        },
      })
    },
    *updateExperience({ payload, itemId }, { select, put }) {
      const { experiences } = yield select(state => state.candidateCV)
      const data = experiences.map((item) => {
        if (item._id === itemId) {
          item = {
            _id: item._id,
            ...payload,
          }
        }
        return item
      })
      yield put({
        type: 'updateState',
        payload: {
          experiences: data,
        },
      })
    },
    *updateQualification({ payload, itemId }, { select, put }) {
      const { qualifications } = yield select(state => state.candidateCV)
      const data = qualifications.map((item) => {
        if (item._id === itemId) {
          item = {
            _id: item._id,
            ...payload,
          }
        }
        return item
      })
      yield put({
        type: 'updateState',
        payload: {
          qualifications: data,
        },
      })
    },
    *updateLanguage({ payload, itemId }, { select, put }) {
      const { foreignLanguages } = yield select(state => state.candidateCV)
      const data = foreignLanguages.map((item) => {
        if (item._id === itemId) {
          item = {
            _id: item._id,
            ...payload,
          }
        }
        return item
      })
      yield put({
        type: 'updateState',
        payload: {
          foreignLanguages: data,
        },
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
    addExperience(state, { payload }) {
      const { experiences } = state
      experiences.push({
        _id: new Date().toISOString(),
        ...payload,
      })
      return {
        ...state,
        experiences,
      }
    },
    addQualification(state, { payload }) {
      const { qualifications } = state
      qualifications.push({
        _id: new Date().toISOString(),
        ...payload,
      })
      return {
        ...state,
        qualifications,
      }
    },
    addLanguage(state, { payload }) {
      const { foreignLanguages } = state
      foreignLanguages.push({
        _id: new Date().toISOString(),
        ...payload,
      })
      return {
        ...state,
        foreignLanguages,
      }
    },
  },
}
