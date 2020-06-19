import { validation } from '../../utils'
import { ObjectId } from '../../utils/mongoose'

/**
 * Find condition from object
 *
 * @param {Object} condition allow _id properties
 */
const findByCondition = ({ _id, cvs = [], status, recuiterment, recuiterments = [] }) => {
  const condition = {}
  // _id
  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }

  if (status && status !== 'all') {
    condition.status = status
  }

  if (cvs.length) {
    condition.cv = {
      $in: cvs,
    }
  }

  if (validation.isObjectId(recuiterment)) {
    condition.recuiterment = recuiterment
  }

  if (recuiterments.length) {
    condition.recuiterment = {
      $in: recuiterments,
    }
  }

  console.log('conditon', condition)
  return condition
}

export default {
  findByCondition,
}
