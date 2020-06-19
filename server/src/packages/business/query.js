import { validation, format } from '../../utils'
import { ObjectId } from '../../utils/mongoose'

/**
 * Find condition from object
 *
 * @param {Object} condition allow _id properties
 */
const findByCondition = ({ _id, active, keyword }) => {
  const condition = {}
  // _id
  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }
  if (validation.isBoolean(active)) {
    condition.active = active
  }
  if (keyword) {
    condition.searchString = format.nonAccentVietnamese(keyword)
  }
  return condition
}

export default {
  findByCondition,
}
