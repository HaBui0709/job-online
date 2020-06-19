import Joi from 'joi'
import { validateClientData } from '../../utils'
import { localesKey } from '../../locales'
import configs from '../../configs';

const recuitermentKey = localesKey.recuiterment

const obj = {
  title: Joi.string().required().options({
    language: {
      key: '{{!title}}',
      any: {
        required: `!!${recuitermentKey.recuitermentTitleRequired}`,
        empty: `!!${recuitermentKey.recuitermentTitleRequired}`,
      },
    },
  }),
  desc: Joi.string().required().options({
    language: {
      key: '{{!desc}}',
      any: {
        required: `!!${recuitermentKey.recuitermentDescRequired}`,
        empty: `!!${recuitermentKey.recuitermentDescRequired}`,
      },
    },
  }),
  jobRequirements: Joi.string().required().options({
    language: {
      key: '{{!jobRequirements}}',
      any: {
        required: `!!${recuitermentKey.recuitermentJobRequirementRequired}`,
        empty: `!!${recuitermentKey.recuitermentJobRequirementRequired}`,
      },
    },
  }),
  benefit: Joi.string().required().options({
    language: {
      key: '{{!benefit}}',
      any: {
        required: `!!${recuitermentKey.recuitermentBenefitRequired}`,
        empty: `!!${recuitermentKey.recuitermentBenefitRequired}`,
      },
    },
  }),
  quantity: Joi.number().required().options({
    language: {
      key: '{{!quantity}}',
      number: {
        base: `!!${recuitermentKey.recuitermentQuantityInvalid}`,
      },
      any: {
        required: `!!${recuitermentKey.recuitermentQuantityRequired}`,
        empty: `!!${recuitermentKey.recuitermentQuantityRequired}`,
      },
    },
  }),
  gender: Joi.string().required().options({
    language: {
      key: '{{!gender}}',
      any: {
        required: `!!${recuitermentKey.recuitermentGenderRequired}`,
        empty: `!!${recuitermentKey.recuitermentGenderRequired}`,
      },
    },
  }),
  workMode: Joi.string().required().options({
    language: {
      key: '{{!workMode}}',
      any: {
        required: `!!${recuitermentKey.recuitermentWorkModeRequired}`,
        empty: `!!${recuitermentKey.recuitermentWorkModeRequired}`,
      },
    },
  }),
  jobPosition: Joi.string().required().options({
    language: {
      key: '{{!jobPosition}}',
      any: {
        required: `!!${recuitermentKey.recuitermentWorkLocaitonRequired}`,
        empty: `!!${recuitermentKey.recuitermentWorkLocaitonRequired}`,
      },
    },
  }),
  experience: Joi.string().required().options({
    language: {
      key: '{{!experience}}',
      any: {
        required: `!!${recuitermentKey.recuitermentExperienceRequired}`,
        empty: `!!${recuitermentKey.recuitermentExperienceRequired}`,
      },
    },
  }),
  careers: Joi.array().items(Joi.string().regex(configs.regex.objectId)).required().options({
    language: {
      key: '{{!careers}}',
      string: {
        regex: `!!${recuitermentKey.recuitermentCareerItemInvalid}`,
      },
      array: {
        base: `!!${recuitermentKey.recuitermentCareersMustBeArray}`,
      },
      any: {
        required: `!!${recuitermentKey.recuitermentCareersRequired}`,
        empty: `!!${recuitermentKey.recuitermentCareersRequired}`,
      },
    },
  }),

  degreeRequirement: Joi.string().required().options({
    language: {
      key: '{{!degreeRequirement}}',
      any: {
        required: `!!${recuitermentKey.recuitermentDegreeRequirementRequired}`,
        empty: `!!${recuitermentKey.recuitermentDegreeRequirementRequired}`,
      },
    },
  }),

  city: Joi.string().required().options({
    language: {
      key: '{{!city}}',
      any: {
        required: `!!${recuitermentKey.recuitermentPositionRequired}`,
        empty: `!!${recuitermentKey.recuitermentPositionRequired}`,
      },
    },
  }),

  deadline: Joi.date().iso().required().options({
    language: {
      key: '{{!deadline}}',
      date: {
        isoDate: `!!${recuitermentKey.recuitermentDeadlineInvalid}`,
      },
      any: {
        required: `!!${recuitermentKey.recuitermentDeadlineRequired}`,
        empty: `!!${recuitermentKey.recuitermentDeadlineRequired}`,
      },
    },
  }),
}

const create = (req, res, next) => {
  validateClientData(req, res, next, Joi.object().keys(obj))
}

export default {
  create,
}
