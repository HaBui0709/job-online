import { validation } from '../../utils'
import { ObjectId } from '../../utils/mongoose'

/**
 * Find condition from object
 *
 * @param {Object} condition allow _id properties
 */
const findByCondition = ({ _id, active, user, recuiterment }) => {
  const condition = {}
  // _id
  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }
  if (validation.isBoolean(active)) {
    condition.active = active
  }

  if (validation.isObjectId(user)) {
    condition.user = new ObjectId(user)
  }

  if (validation.isObjectId(recuiterment)) {
    condition.recuiterment = new ObjectId(recuiterment)
  }

  return condition
}

export default {
  findByCondition,
}
