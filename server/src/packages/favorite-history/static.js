import lodash from 'lodash'
import { to } from '../../utils';
import { FavoriteHistoriesModel, RecuitermentModel } from '../../model';
import dbQuery from './query'

/**
 * Count by condition
 *
 * @param {Object} condition find condition
 */
const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(FavoriteHistoriesModel.countDocuments(query))
  return data
}

/**
 * Find one document by condition
 *
 * @param {Object} condition query condition
 */
const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const group = await FavoriteHistoriesModel.findOne(query)
  return group || {}
}

/**
 * Find docs by condition
 *
 * @param {Object} condition query condition
 * @param {Object} pagination pagination data
 * @param {String} sort sort
 */
const findByCondition = async (condition, { page = 0, limit }, sort = '-createdAt') => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(FavoriteHistoriesModel.find(query).sort(sort).skip(page * limit).limit(limit))
  return data || []
}

const findDocsByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(FavoriteHistoriesModel.find(query))
  return data || []
}
/**
 * ****************************************
 * FUNCTION SECTION
 * ****************************************
 */

/**
 *
 * Brief info
 *
 * @param {Object} favoriteHistory
 *
 */
const briefInfo = async (favoriteHistory) => {
  const jsonData = favoriteHistory.toJSON()
  const result = await Promise.all([{
    recuiterment: await RecuitermentModel.getBriefInfoById(jsonData.recuiterment),
  }])

  return Object.assign(lodash.pick(jsonData, [
    '_id', 'user', 'createdAt', 'avtive',
  ]), result[0])
}

export default {
  findByCondition,
  countByCondition,
  findDocsByCondition,
  findOneByCondition,
  briefInfo,
}
