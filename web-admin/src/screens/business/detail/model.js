// import lodash from 'lodash'
// import React from 'react'
// import findIndex from 'lodash/findIndex'
// import remove from 'lodash/remove'
// import ant, { Avatar } from 'antd'
// import { format, notification } from '../../../utils'
// import { MessageConst, AppConst } from '../../../configs'
import { format } from '../../../utils'

import {
  fetch,
  getStatistic,
  fetchRecuiterments,
} from './service'

// const BILL_FIELD = ComponentConst.getIn(['chart', 'fields', 'bills'])
// const REWARD_FIELD = ComponentConst.getIn(['chart', 'fields', 'rewards'])

const formatStatisticDate = (data) => {
  const result = data.map(item => ({
    // ...item,
    date: format.dateWithDayMonthOnly(item.date),
    originalDate: item.date,
    // [BILL_FIELD]: item.bills,
    // [REWARD_FIELD]: item.rewards,
  }))
  return result
}

const DEFAULT_FILTER = {
  range: [
    // AppConst.getIn(['businesses', 'startAt', 'default']),
    // AppConst.getIn(['businesses', 'endAt', 'default']),
  ],
  limit: 20,
  page: 0,
  total: 0,
  status: 'all',
  date: new Date().toISOString(),
}

const DEFAULT_STATE = {
  business: null,
  displayTableType: '',
  filters: DEFAULT_FILTER,
  keyId: 0,
  recuiterments: [],
}

export default {
  namespace: 'business',
  state: DEFAULT_STATE,

  subscriptions: {
  },
  effects: {
    *fetch({ payload: { businessId } }, { call, put }) {
      const businessData = yield call(fetch, businessId)
      const { business } = businessData.data.data
      yield put({
        type: 'updateState',
        payload: {
          business,
        },
      })
    },

    /**
     * Clear state
     */
    *clear({ }, { put }) {
      yield put({
        type: 'updateState',
        payload: DEFAULT_STATE,
      })
    },

    *getStatistic({ businessId }, { call, put, select }) {
      const { filters: { range } } = yield select(_ => _.business)
      const rangeDate = {
        startAt: range[0].toISOString(),
        endAt: range[1].toISOString(),
      }
      const response = yield call(getStatistic, businessId, rangeDate)
      const statistic = formatStatisticDate(response.data.data.statistic)

      yield put({
        type: 'updateState',
        payload: {
          statistic,
        },
      })
    },

    *changeChartFilters({ payload }, { select, put }) {
      const { business, filters } = yield select(_ => _.business)
      yield put({
        type: 'updateState',
        payload: {
          filters: {
            ...filters,
            ...payload,
          },
        },
      })
      yield put({
        type: 'getStatistic',
        businessId: business._id,
      })
    },

    *fetchRecuiterments({ payload, businessId }, { call, put }) {
      const response = yield call(fetchRecuiterments, businessId, payload)
      const { recuiterments, total, limitPerPage } = response.data.data
      yield put({
        type: 'updateState',
        payload: {
          recuiterments,
          filters: {
            total,
            limit: limitPerPage,
            ...payload,
          },
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
    resetFilters(state) {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...DEFAULT_FILTER,
        },
      }
    },
  },
}
