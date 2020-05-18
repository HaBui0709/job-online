import lodash from 'lodash'
import { to, validation } from '../../utils'
import { FileModel } from '../../model'
import dbQuery from './query'
import configs from '../../configs'

/**
 * ****************************************
 * QUERY SECTION
 * ****************************************
 */

/**
 * Find one doc from condition
 *
 * @param {Object} condition condition
 */
const findOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(FileModel.findOne(query))
  return data
}

/**
 * Count document by condition
 *
 * @param {Object} condition query condition
 */
const countByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const { data } = await to(FileModel.countDocuments(query))
  return data
}

/**
 * Create new doc
 *
 * @param {Object} payload doc data
 */
const newDoc = async (payload) => {
  const doc = new FileModel(payload)
  const result = await to(doc.save())
  return result
}

/**
 * Get brief info by id of attachment
 *
 * @param {String} attachmentId id of attachment
 */
const getBriefInfoById = async (attachmentId) => {
  if (!validation.isObjectId(attachmentId)) {
    return null
  }

  const data = await findOneByCondition({ _id: attachmentId })
  if (!data) {
    return null
  }
  data.url = configs.getIn(['host', 'files']) + data.name
  return lodash.pick(data, ['_id', 'name', 'ext', 'originalName', 'url'])
}

/**
 * Get brief info by ids
 *
 * @param {Array} attachmentIds array ids of attachments
 *
 */
const briefInfoByIds = async (attachmentIds = []) => {
  const result = await Promise.all(attachmentIds.map(async (_id) => {
    const attachment = await getBriefInfoById(_id)
    return attachment
  }))
  return result
}

/**
 * Delete one doc by condition
 *
 * @param {Object} condition
 */
const deleteOneByCondition = async (condition) => {
  const query = dbQuery.findByCondition(condition)
  const result = await to(FileModel.deleteOne(query))
  return result
}

export default {
  newDoc,
  findOneByCondition,
  countByCondition,
  briefInfoByIds,
  deleteOneByCondition,
}
