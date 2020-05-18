import queryString from 'query-string'
import { routerRedux } from 'dva/router'
import { AppConst, RoleConst, MessageConst } from '../../configs'
import { getUserInfo } from './service'
import { helper, notification } from '../../utils'

export default {
  namespace: 'app',
  state: {
    user: {
      role: '',
      _id: '',
      username: '',
    },
    appFilters: {},
    isLoggedIn: false,
    locationPathname: '',
    locationQuery: {},
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
      dispatch({ type: 'init' })
    },
  },

  effects: {
    * init({}, { put, call, select }) {
      // Get token saved in storage
      const token = localStorage.getItem(AppConst.localStorage.authKey)
      const role = localStorage.getItem(AppConst.localStorage.roleKey)
      const userId = localStorage.getItem(AppConst.localStorage.userIdKey)
      // if have no token, redirect to login page
      if (!token || !role || !userId || role === 'undefined') {
        localStorage.removeItem(AppConst.localStorage.authKey)
        localStorage.removeItem(AppConst.localStorage.roleKey)
        localStorage.removeItem(AppConst.localStorage.userIdKey)
        return yield put(routerRedux.push('/login'))
      }
      const { locationPathname } = yield select(_ => _.app)

      // Get user info
      const data = yield call(getUserInfo)
      const response = data.data
      if (!response) {
        return notification.error(response ? response.message : MessageConst.serverError)
      }
      const { user } = response.data
      const userRole = user.admin.role


      // Write user current role to storage, for redirect to exact page
      localStorage.setItem(AppConst.localStorage.roleKey, userRole)

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
        yield put(routerRedux.push(RoleConst[userRole].pages[0].id))
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
      window.location.href = '/login'
    },
    * loadProfile({}, { call, put }) {
      // Get user info
      const data = yield call(getUserInfo)
      const response = data.data

      if (!response) {
        return notification.error(response ? response.message : MessageConst.serverError)
      }
      const { user } = response.data
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
