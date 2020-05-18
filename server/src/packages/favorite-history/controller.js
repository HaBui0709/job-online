import lodash from 'lodash'
import { helper, response, to, getError } from '../../utils'
import { localesKey } from '../../locales'
import { FavoriteHistoriesModel } from '../../model'
import configs from '../../configs';

/**
 * All
 */
const all = async (req, res) => {
  const { page = 0 } = req.query
  const locale = helper.getLocale(req)
  const query = {
    ...lodash.pick(req.query, ['keyword']),
    user: req.user._id,
  }
  const limit = configs.limit.careerGroup.all
  const data = await Promise.all([{
    favoriteHistories: await FavoriteHistoriesModel.findByCondition(query, { page, limit }),
    total: await FavoriteHistoriesModel.countByCondition(query),
    limitPerPage: limit,
  }])
  const result = data[0]

  // Process data
  result.favoriteHistories = await Promise.all(result.favoriteHistories.map(async (item) => {
    const obj = await FavoriteHistoriesModel.briefInfo(item)
    return obj
  }))

  return response.r200(res, locale, result)
}

/**
 * Create favorite histories
 */
const create = async (req, res) => {
  const locale = helper.getLocale(req)
  const { user } = req

  // Check candidate
  if (user.role !== 'candidate') {
    return response.r400(res, locale, localesKey.common.noPermission)
  }

  // Kiêm tra candidate đã lưu lịch sư tin tuyen dung nay chưa

  const countHistories = await FavoriteHistoriesModel.countByCondition({
    user: user._id,
    recuiterment: req.body.recuiterment,
  })

  if (countHistories) {
    return response.r400(res, locale, localesKey.common.recuitermentIsExisted)
  }
  const doc = {
    ...lodash.pick(req.body, ['recuiterment']),
    user: user._id,
  }

  const newDoc = new FavoriteHistoriesModel(doc)
  const { error, data } = await to(newDoc.save())
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  return response.r200(res, locale, { data })
}

/**
 * Delete
 */
const destroy = async (req, res) => {
  const locale = helper.getLocale(req)
  const { favoriteHistoryData } = req
  const { error, data } = await FavoriteHistoriesModel.deleteOne({ _id: favoriteHistoryData._id })
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  return response.r200(res, locale, { data })
}
export default {
  create,
  all,
  destroy,
}
