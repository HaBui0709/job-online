import { validation, format } from '../../utils'
import { ObjectId } from '../../utils/mongoose'

/**
 * Find condition from object
 *
 * @param {Object} condition allow _id properties
 */
const findByCondition = ({ _id, active, user, status, keyword, isUse }) => {
  const condition = {}
  // _id
  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }
  if (validation.isBoolean(active)) {
    condition.active = active
  }

  if (user && validation.isObjectId(user)) {
    condition.user = new ObjectId(user)
  }

  if (status && status !== 'all') {
    condition.status = status
  }

  if (keyword) {
    condition.searchString = format.searchString(keyword)
  }

  if (validation.isBoolean(isUse)) {
    condition.isUse = isUse
  }
  return condition
}

export default {
  findByCondition,
}
