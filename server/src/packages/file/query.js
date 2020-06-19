import { ObjectId } from '../../utils/mongoose'
import { validation } from '../../utils'

/**
 * Generate query from condition
 *
 * @param {Object} condition query condition
 */
const findByCondition = ({ _id }) => {
  const condition = {}

  if (validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }
  return condition
}

export default {
  findByCondition,
}
