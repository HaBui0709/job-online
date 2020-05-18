import Joi from 'joi'
import lodash from 'lodash'
import { validateClientData } from '../../utils'
import { localesKey } from '../../locales'

const businessKey = localesKey.business

const obj = {
  name: Joi.string().required().options({
    language: {
      key: '{{!name}}',
      any: {
        required: `!!${businessKey.careerGroupNameRequired}`,
        empty: `!!${businessKey.careerGroupNameRequired}`,
      },
    },
  }),
}

const create = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj, ['name'])))
}
export default {
  create,
}
