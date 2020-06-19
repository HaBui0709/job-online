import lodash from 'lodash'
import { fetchByWeek, getRecuiterments, fetchByDay } from './service'
import { AppConst, ComponentConst } from '../../configs'
import { notification, format } from '../../utils'

const RECUITERMENT_FIELD = ComponentConst.chart.fields.recuiterment

const DEFAULT_STATE = {
  chart: [],
  filter: {
    city: AppConst.cities.default,
    startAt: AppConst.statisticChart.startAt.default,
    endAt: AppConst.statisticChart.endAt.default,
    total: 0,
    page: 0,
    limit: 20,
    startChart: (new Date()).toISOString(),
    endChart: (new Date()).toDateString(),
    date: (new Date()).toISOString(),
    status: AppConst.status.default,
  },
  recuiterments: [],
  typeFilter: AppConst.statisticChart.filter.default,
}

const formatStatisticDateForFilterWeek = (data) => {
  const result = data.map(item => ({
    // ...item,
    date: item.name,
    originalDate: {
      startChart: item.startAt,
      endChart: item.endAt,
    },
    [RECUITERMENT_FIELD]: item.total,
  }))
  return result
}

const formatStatisticDateForFilterDay = (data) => {
  const result = data.map(item => ({
    // ...item,
    date: format.dateWithDayMonthOnly(item.date),
    originalDate: item.date,
    [RECUITERMENT_FIELD]: item.total,
  }))
  return result
}

export default {
  namespace: 'statisticChart',
  state: DEFAULT_STATE,

  subscriptions: {},

  effects: {
    *fetchByWeek({ payload }, { call, put }) {
      // Convert date
      let filter
      if (!payload.startAt || !payload.endAt) {
        filter = {
          ...lodash.pick(payload, ['city', 'status']),
          startAt: AppConst.statisticChart.startAt.default.toISOString(),
          endAt: AppConst.statisticChart.endAt.default.toISOString(),
        }
      } else {
        filter = {
          ...lodash.pick(payload, ['city', 'status']),
          startAt: payload.startAt.toISOString(),
          endAt: payload.endAt.toISOString(),
        }
      }
      const response = yield call(fetchByWeek, filter)
      if (!response.data.data) {
        return notification.error(response.data.message)
      }
      const chart = formatStatisticDateForFilterWeek(response.data.data.chart)
      yield put({
        type: 'updateState',
        payload: {
          chart,
          recuiterments: [],
          filter: {
            ...payload,
            total: 0,
            page: 0,
            limit: 20,
          },
        },
      })
    },

    * clear({}, { put }) {
      yield put({
        type: 'updateState',
        payload: DEFAULT_STATE,
      })
    },

    *fetchRecuiterments({ payload }, { call, put, select }) {
      const { typeFilter } = yield select(state => state.statisticChart)
      let query = {}
      if (typeFilter === AppConst.statisticChart.filter.day) {
        query = lodash.pick(payload, ['page', 'date', 'city', 'status'])
      } else {
        query = lodash.pick(payload, ['page', 'startChart', 'endChart', 'city', 'status'])
      }
      const response = yield call(getRecuiterments, query)
      const { recuiterments, total, limitPerPage } = response.data.data
      // const { filter: { startChart, endChart } } = yield select(_ => _.billChart)
      yield put({
        type: 'updateState',
        payload: {
          recuiterments,
          filter: {
            total,
            limit: limitPerPage,
            ...payload,
          },
        },
      })
    },

    *fetchByDay({ payload }, { call, put }) {
      // Convert date
      let filter
      if (!payload.startAt || !payload.endAt) {
        filter = {
          ...lodash.pick(payload, ['city']),
          startAt: AppConst.statisticChart.startAt.default.toISOString(),
          endAt: AppConst.statisticChart.endAt.default.toISOString(),
        }
      } else {
        filter = {
          ...lodash.pick(payload, ['city']),
          startAt: payload.startAt.toISOString(),
          endAt: payload.endAt.toISOString(),
        }
      }
      const response = yield call(fetchByDay, filter)
      if (!response.data.data) {
        return notification.error(response.data.message)
      }
      const chartData = formatStatisticDateForFilterDay(response.data.data.chart)
      yield put({
        type: 'updateState',
        payload: {
          chart: chartData,
          recuiterments: [],
          filter: {
            ...payload,
            total: 0,
            page: 0,
            limit: 20,
          },
        },
      })
    },

    *updateTypeFilter({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: {
          typeFilter: payload.typeFilter,
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
