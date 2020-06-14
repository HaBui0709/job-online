import Joi from 'joi'
import lodash from 'lodash'
import { validateClientData } from '../../utils'
import { localesKey } from '../../locales'

const cvKey = localesKey.cv

const obj = {
  overviewInfo: Joi.object().keys({
    desiredLocation: Joi.string().required().options({
      language: {
        key: '{{!desiredLocation}}',
        any: {
          required: `!!${cvKey.desiredLocationRequired}`,
          empty: `!!${cvKey.desiredLocationRequired}`,
        },
      },
    }),
    currentRank: Joi.string().required().options({
      language: {
        key: '{{!currentRank}}',
        any: {
          required: `!!${cvKey.currentRankRequired}`,
          empty: `!!${cvKey.currentRankRequired}`,
        },
      },
    }),
    desiredRank: Joi.string().required().options({
      language: {
        key: '{{!desiredRank}}',
        any: {
          required: `!!${cvKey.desiredRankRequired}`,
          empty: `!!${cvKey.desiredRankRequired}`,
        },
      },
    }),
    // desiredCareer: Joi.string().regex(configs.regex.objectId).required().options({
    //   language: {
    //     key: '{{!desiredCareer}}',
    //     string: {
    //       regex: `!!${cvKey.desiredCareerInvalid}`,
    //     },
    //     any: {
    //       required: `!!${cvKey.desiredCareerRequired}`,
    //       empty: `!!${cvKey.desiredCareerRequired}`,
    //     },
    //   },
    // }),
    desiredCity: Joi.string().required().options({
      language: {
        key: '{{!desiredCity}}',
        any: {
          required: `!!${cvKey.desiredCityRequired}`,
          empty: `!!${cvKey.desiredCityRequired}`,
        },
      },
    }),
    aducation: Joi.string().required().options({
      language: {
        key: '{{!aducation}}',
        any: {
          required: `!!${cvKey.aducationRequired}`,
          empty: `!!${cvKey.aducationRequired}`,
        },
      },
    }),
    totalYearExperience: Joi.string().required().options({
      language: {
        key: '{{!totalYearExperience}}',
        any: {
          required: `!!${cvKey.totalYearExperienceRequired}`,
          empty: `!!${cvKey.totalYearExperienceRequired}`,
        },
      },
    }),
    workMode: Joi.string().required().options({
      language: {
        key: '{{!workMode}}',
        any: {
          required: `!!${cvKey.workModeRequired}`,
          empty: `!!${cvKey.workModeRequired}`,
        },
      },
    }),
    minimumWage: Joi.number().required().options({
      language: {
        key: '{{!minimumWage}}',
        number: {
          base: `!!${cvKey.minimumWageInvalid}`,
        },
        any: {
          required: `!!${cvKey.minimumWageRequired}`,
          empty: `!!${cvKey.minimumWageRequired}`,
        },
      },
    }),
    careerGoal: Joi.string().required().options({
      language: {
        key: '{{!careerGoal}}',
        any: {
          required: `!!${cvKey.careerGoalRequired}`,
          empty: `!!${cvKey.careerGoalRequired}`,
        },
      },
    }),
  }).required().options({
    language: {
      key: '{{!overviewInfo}}',
      any: {
        required: `!!${cvKey.cvOverviewInfoRequired}`,
        empty: `!!${cvKey.cvOverviewInfoRequired}`,
      },
    },
  }),

  workExperiences: Joi.array().items(Joi.object().keys({
    company: Joi.string().required().options({
      language: {
        key: '{{!company}}',
        any: {
          required: `!!${cvKey.companyRequired}`,
          empty: `!!${cvKey.companyRequired}`,
        },
      },
    }),
    title: Joi.string().required().options({
      language: {
        key: '{{!title}}',
        any: {
          required: `!!${cvKey.titleRequired}`,
          empty: `!!${cvKey.titleRequired}`,
        },
      },
    }),
    workTimeStartAt: Joi.date().iso().required().options({
      language: {
        key: '{{!workTimeStartAt}}',
        date: {
          isoDate: `!!${cvKey.workTimeStartAtInvalid}`,
        },
        any: {
          required: `!!${cvKey.workTimeStartAtRequired}`,
          empty: `!!${cvKey.workTimeStartAtRequired}`,
        },
      },
    }),
    workTimeEndAt: Joi.date().iso().required().options({
      language: {
        key: '{{!workTimeEndAt}}',
        date: {
          isoDate: `!!${cvKey.workTimeEndAtInvalid}`,
        },
        any: {
          required: `!!${cvKey.workTimeEndAtRequired}`,
          empty: `!!${cvKey.workTimeEndAtRequired}`,
        },
      },
    }),
    wage: Joi.number().options({
      language: {
        key: '{{!wage}}',
        number: {
          base: `!!${cvKey.wageInvalid}`,
        },
      },
    }),
    jobDescription: Joi.string().required().options({
      language: {
        key: '{{!jobDescription}}',
        any: {
          required: `!!${cvKey.jobDescriptionRequired}`,
          empty: `!!${cvKey.jobDescriptionRequired}`,
        },
      },
    }),
  }).options({
    language: {
      key: '{{!workExperiences}}',
      object: {
        base: `!!${cvKey.workExperiencesInvalid}`,
      },
    },
  })).options({
    language: {
      key: '{{!workExperiences}}',
      array: {
        base: `!!${cvKey.workExperiencesMustBeAArray}`,
      },
    },
  }),

  qualifications: Joi.array().items(Joi.object().keys({
    certificate: Joi.string().required().options({
      language: {
        key: '{{!certificate}}',
        any: {
          required: `!!${cvKey.certificateRequired}`,
          empty: `!!${cvKey.certificateRequired}`,
        },
      },
    }),
    unit: Joi.string().required().options({
      language: {
        key: '{{!unit}}',
        any: {
          required: `!!${cvKey.unitRequired}`,
          empty: `!!${cvKey.unitRequired}`,
        },
      },
    }),
    from: Joi.date().iso().required().options({
      language: {
        key: '{{!from}}',
        date: {
          isoDate: `!!${cvKey.fromInvalid}`,
        },
        any: {
          required: `!!${cvKey.fromRequired}`,
          empty: `!!${cvKey.fromRequired}`,
        },
      },
    }),
    come: Joi.date().iso().required().options({
      language: {
        key: '{{!come}}',
        date: {
          isoDate: `!!${cvKey.comeInvalid}`,
        },
        any: {
          required: `!!${cvKey.comeRequired}`,
          empty: `!!${cvKey.comeRequired}`,
        },
      },
    }),
    specialized: Joi.string().required().options({
      language: {
        key: '{{!specialized}}',
        any: {
          required: `!!${cvKey.specializedRequired}`,
          empty: `!!${cvKey.specializedRequired}`,
        },
      },
    }),
    graduationType: Joi.string().required().options({
      language: {
        key: '{{!graduationType}}',
        any: {
          required: `!!${cvKey.graduationTypeRequired}`,
          empty: `!!${cvKey.graduationTypeRequired}`,
        },
      },
    }),
  }).options({
    language: {
      key: '{{!qualifications}}',
      object: {
        base: `!!${cvKey.qualificationsInvalid}`,
      },
    },
  })).options({
    language: {
      key: '{{!qualifications}}',
      array: {
        base: `!!${cvKey.qualificationsMustBeArray}`,
      },
    },
  }),

}

/**
 * Validation cv
 */
const createAndUpdate = (req, res, next) => {
  console.log('req', req.body)
  validateClientData(req, res, next, Joi.object().keys(lodash.pick(obj,
    ['overviewInfo', 'workExperiences', 'qualifications'])))
}
export default {
  createAndUpdate,
}
