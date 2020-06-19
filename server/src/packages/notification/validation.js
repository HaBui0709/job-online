import Joi from 'joi'
import lodash from 'lodash'
import { validateClientData } from '../../utils'
import { localesKey } from '../../locales'
import configs from '../../configs'

const notificationKey = localesKey.notification

const obj = {
  email: Joi.string().regex(configs.regex.email).required().options({
    language: {
      key: '{{!email}}',
      string: {
        regex: `!!${notificationKey.emailInvalid}`,
      },
      any: {
        required: `!!${notificationKey.emailRequired}`,
        empty: `!!${notificationKey.emailRequired}`,
      },
    },
  }),
  careers: Joi.array().items(Joi.string().regex(configs.regex.objectId)).required().options({
    language: {
      key: '{{!careers}}',
      array: {
        base: `!!${notificationKey.careersMustBeArray}`,
      },
      string: {
        regex: `!!${notificationKey.careersItemMustBeObjectId}`,
      },
      any: {
        required: `!!${notificationKey.careersRequired}`,
        empty: `!!${notificationKey.careersRequired}`,
      },
    },
  }),
}

/**
 * Validation cv
 */
const createAndUpdate = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj,
    ['email', 'careers'])))
}
export default {
  createAndUpdate,
}
