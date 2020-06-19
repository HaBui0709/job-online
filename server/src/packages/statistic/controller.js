import { helper, response } from '../../utils'
import {
  RecuitermentModel,
} from '../../model'
import configs from '../../configs';

/**
 * Get data for bill chart by week
 */
const chartByWeek = async (req, res) => {
  const locale = helper.getLocale(req)
  const data = await RecuitermentModel.getQuantityRecuitermentsByRangeTimes({ ...req.query })
  return response.r200(res, locale, { chart: data })
}

/**
 * Bill chart by day
 */
const chartByDay = async (req, res) => {
  const locale = helper.getLocale(req)
  const data = await RecuitermentModel.getDataForChart({ ...req.query })
  return response.r200(res, locale, { chart: data })
}

/**
 * All bill histories
 */
const allHistories = async (req, res) => {
  const locale = helper.getLocale(req)
  const { page = 0 } = req.query
  const limit = configs.limit.recuiterment.all

  const data = await Promise.all([{
    recuiterments: await RecuitermentModel.findByCondition(req.query, { page, limit }),
    total: await RecuitermentModel.countByCondition(req.query),
    limitPerPage: limit,
  }])
  const result = data[0]
  result.recuiterments = await Promise.all(result.recuiterments.map(async (item) => {
    const recuiterment = await RecuitermentModel.briefInfo(item, locale)
    return recuiterment
  }))

  return response.r200(res, locale, result)
}

export default {
  chartByWeek,
  chartByDay,
  allHistories,
}
