import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import { AppConst, RoleConst, MessageConst } from '../../configs'
import { getUserInfo, fetchCareerGroup, fetchJobSuggest, fetchNewJobs } from './service'
import { helper, notification, modalNotification } from '../../utils'

export default {
  namespace: 'app',
  state: {
    user: {
      role: '',
    },
    appFilters: {},
    isLoggedIn: false,
    locationPathname: '',
    locationQuery: {},
    careerGroups: [],
    jobsSuggest: [],
    newJobs: [],
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        const token = localStorage.getItem(AppConst.localStorage.authKey)
        dispatch({
          type: 'updateState',
          payload: {
            isLoggedIn: !!token,
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },
    setup({ dispatch }) {
      dispatch({
        type: 'setup',
      })
    },
  },

  effects: {
    *fetchNewJobs({}, { call, put }) {
      const data = yield call(fetchNewJobs)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      yield put({
        type: 'updateState',
        payload: {
          newJobs: response.data.newJobs,
        },
      })
    },
    *fetchJobSuggest({}, { call, put }) {
      const data = yield call(fetchJobSuggest)
      const response = data.data
      if (!response.success) {
        return notification.error(response.message)
      }
      yield put({
        type: 'updateState',
        payload: {
          jobsSuggest: response.data.jobsSuggest,
        },
      })
    },
    notifications({ payload }) {
      modalNotification.success(payload)
    },
    *setup({}, { select, put }) {
      const { isLoggedIn } = yield select(_ => _.app)
      if (isLoggedIn) {
        yield put({
          type: 'init',
        })
      }
    },
    * init({}, { put, call, select }) {
      // Get token saved in storage
      const token = localStorage.getItem(AppConst.localStorage.authKey)
      const role = localStorage.getItem(AppConst.localStorage.roleKey)
      const userId = localStorage.getItem(AppConst.localStorage.userIdKey)
      const businessId = localStorage.getItem(AppConst.localStorage.businessKey)
      // if have no token, redirect to login page
      if (!token || !role || !userId || role === 'undefined' || (role === 'recuiter' && !businessId)) {
        localStorage.removeItem(AppConst.localStorage.authKey)
        localStorage.removeItem(AppConst.localStorage.roleKey)
        localStorage.removeItem(AppConst.localStorage.userIdKey)
        localStorage.removeItem(AppConst.localStorage.businessKey)
        return yield put(routerRedux.push('/home'))
      }
      const { locationPathname } = yield select(_ => _.app)

      // Get user info
      const data = yield call(getUserInfo)
      const response = data.data

      if (!response) {
        return notification.error(response ? response.message : MessageConst.serverError)
      }
      const { user } = response.data
      const userRole = user.role


      // Write user current role to storage, for redirect to exact page
      localStorage.setItem(AppConst.localStorage.roleKey, userRole)
      localStorage.setItem(AppConst.localStorage.cityKey, user.city)

      // Update state to models
      yield put({
        type: 'updateState',
        payload: {
          user,
          appFilters: AppConst,
        },
      })
      // Push to page based to role
      if (!helper.checkPathPermission(RoleConst[userRole].pages, locationPathname)) {
        window.location.href = '/home'
      }
    },

    * logout(data, { put }) {
      // Do some stuff (remove token, ...)
      localStorage.removeItem(AppConst.localStorage.authKey)
      localStorage.removeItem(AppConst.localStorage.roleKey)
      localStorage.removeItem(AppConst.localStorage.userIdKey)

      yield put({
        type: 'updateState',
        payload: {
          user: null,
        },
      })

      // Redirect to login page
      window.location.href = '/home'
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

    *updateAvatarUser({ payload }, { put, select }) {
      const { user } = yield select(state => state.app)
      user.avatar = payload
      yield put({
        type: 'updateState',
        payload: {
          user,
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
  },
}
