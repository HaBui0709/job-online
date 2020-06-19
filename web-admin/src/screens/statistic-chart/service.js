import { request } from '../../utils'
import { ApiConst } from '../../configs'

/**
 *  Service: fetch data statistic chart by week
 */
const fetchByWeek = (data) => {
  const api = ApiConst.analytic.statisticChartByWeek()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

/**
 * Get recuiterments
 *
 * @param {Object} params
 */
const getRecuiterments = (params) => {
  const api = ApiConst.analytic.recuiterment()
  return request.call(api.url, {
    method: api.method,
    body: params,
  })
}

/**
 *
 * Fetch data statistic chart by day
 *
 * @param {Object} data
 */
const fetchByDay = (data) => {
  const api = ApiConst.analytic.statisticChartByDay()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}
export {
  fetchByWeek,
  getRecuiterments,
  fetchByDay,
}
