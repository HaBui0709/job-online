import { validation, format } from '../../utils'
import { ObjectId } from '../../utils/mongoose'
import configs from '../../configs'

const DEFAULT_QUERY = configs.defaultValues.query.all

const generateSearchCondition = (keyword) => {
  return {
    $or: [{
      email: keyword.toLowerCase(),
    }, {
      phone: format.phone(keyword),
    }, {
      username: {
        $regex: format.searchString(keyword),
      },
    }, {
      fullName: {
        $regex: format.searchString(keyword),
      },
    }],
  }
}

/**
 * Find condition from object
 *
 * @param {Object} condition allow _id, username properties
 */
const findByCondition = ({ _id, username, keyword, city, roleAdmin,
  phone, roles, email, usernameIsExist, emailIsExist, phoneIsExist, plasticCardIsExist, userNotSame }) => {
  const condition = {}
  // keyword
  if (keyword) {
    Object.assign(condition, generateSearchCondition(keyword))
  }
  // city
  if (city && city !== DEFAULT_QUERY) {
    condition.city = city
  }
  // phone
  if (phone) {
    condition.phone = format.phone(phone)
  }
  // roles
  if (roles) {
    condition.roles = { $in: roles }
  }
  // email
  if (email) {
    condition.email = email
  }
  // _id
  if (_id && validation.isObjectId(_id)) {
    condition._id = new ObjectId(_id)
  }
  if (username) {
    condition.username = username
  }

  if (usernameIsExist) {
    condition.username = usernameIsExist
  }
  if (emailIsExist) {
    condition.email = emailIsExist
  }
  if (phoneIsExist) {
    condition.phone = format.phone(phoneIsExist)
  }

  if (plasticCardIsExist) {
    condition.plasticCard = plasticCardIsExist
  }

  if (userNotSame) {
    condition._id = {
      $ne: new ObjectId(userNotSame),
    }
  }

  if (roleAdmin) {
    condition['admin.role'] = roleAdmin
  }

  return condition
}

export default {
  findByCondition,
}
