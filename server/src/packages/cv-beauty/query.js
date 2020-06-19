import { validation } from '../../utils'
import { ObjectId } from '../../utils/mongoose'

/**
 * Find condition from object
 *
 * @param {Object} condition allow _id properties
 */
const findByCondition = ({ _id, user, typeCV }) => {
  const condition = {}
  // _id
  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }

  if (validation.isObjectId(user)) {
    condition.user = new ObjectId(user)
  }

  if (typeCV) {
    condition.typeCV = typeCV
  }

  return condition
}

export default {
  findByCondition,
}
