import Joi from 'joi'
import lodash from 'lodash'
import { validateClientData } from '../../utils'
import { localesKey } from '../../locales'
import configs from '../../configs'

const businessKey = localesKey.business

const obj = {
  name: Joi.string().required().options({
    language: {
      key: '{{!name}}',
      any: {
        required: `!!${businessKey.businessNameRequired}`,
        empty: `!!${businessKey.businessNameRequired}`,
      },
    },
  }),
  desc: Joi.object().keys({
    en: Joi.string().required().options({
      language: {
        key: '{{!en}}',
        any: {
          required: `!!${businessKey.businessDescENRequired}`,
          empty: `!!${businessKey.businessDescENRequired}`,
        },
      },
    }),
    vi: Joi.string().required().options({
      language: {
        key: '{{!vi}}',
        any: {
          required: `!!${businessKey.businessDescVIRequired}`,
          empty: `!!${businessKey.businessDescVIRequired}`,
        },
      },
    }),
  }),
  phone: Joi.string().allow('').regex(configs.regex.phone).options({
    language: {
      key: '{{!phone}}',
      string: {
        regex: {
          base: `!!${businessKey.businessPhoneInvalid}`,
        },
      },
    },
  }),
  email: Joi.string().allow('').regex(configs.regex.email).options({
    language: {
      key: '{{!email}}',
      string: {
        regex: {
          base: `!!${businessKey.businessEmailInvalid}`,
        },
      },
    },
  }),
  city: Joi.string().required().options({
    language: {
      key: '{{!city}}',
      any: {
        required: `!!${businessKey.businessCityRequired}`,
        empty: `!!${businessKey.businessCityRequired}`,
      },
    },
  }),
  location: Joi.object().required().keys({
    coordinates: Joi.array().items(Joi.number().options({
      language: {
        key: '{{!coordinates}}',
        number: {
          base: `!!${businessKey.businessLocationInvalid}`,
        },
      },
    }))
      .options({
        language: {
          key: '{{!coordinates}}',
          array: {
            base: `!!${businessKey.businessLocationInvalid}`,
          },
        },
      }),
  }).options({
    language: {
      key: '{{!location}}',
      any: {
        required: `!!${businessKey.businessLocationRequired}`,
        empty: `!!${businessKey.businessLocationRequired}`,
      },
    },
  }),
  categories: Joi.array().items(Joi.string().regex(configs.regex.objectId).options({
    language: {
      key: '{{!categories}}',
      string: {
        regex: {
          base: `!!${localesKey.common.invalidObjectId}`,
        },
      },
    },
  })),
  workingHours: Joi.array().items(Joi.object().options({
    language: {
      key: '{{!workingHours}}',
      object: {
        base: `!!${businessKey.businessWorkingHoursInvalid}`,
      },
    },
  })).options({
    language: {
      key: '{{!workingHours}}',
      array: {
        base: `!!${businessKey.businessWorkingHoursInvalid}`,
      },
    },
  }),
}

const create = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj, [])))
}
export default {
  create,
}
