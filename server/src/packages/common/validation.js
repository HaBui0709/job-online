import Joi from 'joi'
import lodash from 'lodash'
import { validateClientData, helper, response } from '../../utils'
import { localesKey } from '../../locales'
import configs from '../../configs'
import { UserModel } from '../../model'

const PASSWORD_MIN = configs.validation.user.minPasswordLength
const userKey = localesKey.user
const LIST_GENDER = configs.gender.array

const obj = {
  username: Joi.string().regex(configs.regex.name).required().options({
    language: {
      key: '{{!username}}',
      string: {
        base: `!!${userKey.userNameMustBeAString}`,
        regex: {
          base: `!!${userKey.userUsernameInvalid}`,
        },
      },
      any: {
        required: `!!${userKey.userNameIsRequire}`,
        empty: `!!${userKey.userNameIsRequire}`,
      },
    },
  }),

  password: Joi.string().min(PASSWORD_MIN).required().options({
    language: {
      key: '{{!pasword}}',
      string: {
        base: `!!${userKey.userPasswordMustBeString}`,
        min: `!!${userKey.userPaswordLengthMustGreatThan6Chars}`,
      },
      any: {
        required: `!!${userKey.userPasswordIsRequire}`,
        empty: `!!${userKey.userPasswordIsRequire}`,
      },
    },
  }),

  email: Joi.string().regex(configs.regex.email).required().options({
    language: {
      key: '{{!email}}',
      string: {
        base: `!!${userKey.userEmailMustBeString}`,
        regex: {
          base: `!!${userKey.userEmailIsInvalid}`,
        },
      },
      any: {
        required: `!!${userKey.userEmailIsRequire}`,
        empty: `!!${userKey.userEmailIsRequire}`,
      },
    },
  }),

  phone: Joi.string().regex(configs.regex.phone).required().options({
    language: {
      key: '{{!phone}}',
      string: {
        base: `!!${userKey.userPhoneMustBeString}`,
        regex: {
          base: `!!${userKey.userPhoneIsInvalid}`,
        },
      },
      any: {
        required: `!!${userKey.userPhoneRequired}`,
        empty: `!!${userKey.userPhoneRequired}`,
      },
    },
  }),

  confirmPassword: Joi.string().required().options({
    language: {
      key: '{{!confirmPassword}}',
      any: {
        required: `!!${userKey.userCofirmPasswordIsRequire}`,
        empty: `!!${userKey.userConfirmPasswordIsRequire}`,
      },
    },
  }),

  fullName: Joi.string().required().options({
    language: {
      key: '{{!fullName}}',
      any: {
        required: `!!${userKey.userFullNamedIsRequire}`,
        empty: `!!${userKey.userFullNamedIsRequire}`,
      },
    },
  }),

  birthday: Joi.date().iso().required().options({
    language: {
      key: '{{!birthday}}',
      date: {
        isoDate: `!!${userKey.userBirthdayInvalid}`,
      },
      any: {
        required: `!!${userKey.userBirthdayIsRequired}`,
        empty: `!!${userKey.userBirthdayIsRequired}`,
      },
    },
  }),

  gender: Joi.string().valid(LIST_GENDER).required().options({
    language: {
      key: '{{!gender}}',
      any: {
        required: `!!${userKey.userGenderIsRequired}`,
        empty: `!!${userKey.userGenderIsRequired}`,
        allowOnly: `!!${userKey.userGenderInvalid}`,
      },
    },
  }),

  city: Joi.string().required().options({
    language: {
      key: '{{!city}}',
      any: {
        required: `!!${userKey.userCityIsRequired}`,
        empty: `!!${userKey.userCityIsRequired}`,
      },
    },
  }),

  address: Joi.string().required().options({
    language: {
      key: '{{!address}}',
      any: {
        required: `!!${userKey.userAddressIsRequired}`,
        empty: `!!${userKey.userAddressIsRequired}`,
      },
    },
  }),
  // plasticCard: Joi.string().options({
  // }),
}

const login = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj, ['username', 'password'])))
}

const loginCandidate = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj, ['email', 'password'])))
}

const loginRecuiter = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj, ['email', 'password'])))
}

const registerCandidate = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(obj))
}

const registerRecuiter = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(obj))
}

/**
 * Check unique field ['username', 'email', 'phone']
 */
const checkUniqueField = async (req, res, next) => {
  const locale = helper.getLocale(req)
  const { body: { username, email, phone, plasticCard } } = req
  // Check username, email, phone
  const isUsernameExisted = await checkExistedInDb(req, res, { username })
  if (isUsernameExisted) {
    return response.r400(res, locale, localesKey.user.usernameIsExisted)
  }
  const isEmailExisted = await checkExistedInDb(req, res, { email })
  if (isEmailExisted) {
    return response.r400(res, locale, localesKey.user.emailIsExisted)
  }
  const isPhoneExisted = await checkExistedInDb(req, res, { phone })
  if (isPhoneExisted) {
    return response.r400(res, locale, localesKey.user.phoneIsExisted)
  }
  if (plasticCard) {
    const isPlasticCard = await checkExistedInDb(req, res, { plasticCard })
    if (isPlasticCard) {
      return response.r400(res, locale, localesKey.user.plasticCardIsExisted)
    }
  }
  next()
}

/**
 * Check existed in db by field
 *
 * @param {Object} field [Allow 1 properties]
 *
 */
const checkExistedInDb = async (req, res, field) => {
  // Check field
  const isExisted = await UserModel.countByCondition({ [`${Object.keys(field)[0]}IsExist`]: Object.values(field)[0] })
  return isExisted
}
export default {
  login,
  loginCandidate,
  loginRecuiter,
  registerCandidate,
  registerRecuiter,
  checkUniqueField,
}
