import lodash from 'lodash'
import { helper, getError, response } from '../../utils'
import { CareerGroupModel } from '../../model'
import configs from '../../configs';

/**
 * Create career group
 */
const create = async (req, res) => {
  const locale = helper.getLocale(req)
  const doc = lodash.pick(req.body, ['name'])
  const { error, data } = await CareerGroupModel.saveDoc(doc)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  return response.r200(res, locale, { careerGroup: data.toJSON() })
}

/**
 * All
 */
const all = async (req, res) => {
  const { page = 0 } = req.query
  const locale = helper.getLocale(req)
  const query = {
    ...lodash.pick(req.query, ['keyword', 'active']),
  }
  const limit = configs.limit.careerGroup.all
  const data = await Promise.all([{
    careerGroups: await CareerGroupModel.findByCondition(query, { page, limit }),
    total: await CareerGroupModel.countByCondition(query),
    limitPerPage: limit,
  }])
  const result = data[0]
  return response.r200(res, locale, result)
}

/**
 * Update
 */
const update = async (req, res) => {
  const locale = helper.getLocale(req)
  const { body: { name }, careerGroupData } = req
  const payload = {
    $set: {
      name,
      updatedAt: Date.now(),
    },
  }
  const { error } = await CareerGroupModel.updateDoc({ _id: careerGroupData._id }, payload)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }
  return response.r200(res, locale, {})
}

/**
 * Change status
 */
const changeStatus = async (req, res) => {
  const locale = helper.getLocale(req)
  const { _id, active } = req.careerGroupData
  const { error } = await CareerGroupModel.updateDocById(_id, { active: !active })
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }
  return response.r200(res, locale, { active: !active })
}

export default {
  create,
  all,
  update,
  changeStatus,
}
