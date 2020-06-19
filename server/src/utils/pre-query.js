import response from './response'
import format from './format'
import validation from './validation'
import { localesKey } from '../locales'
import helper from './helper'
import {
  UserModel,
  CareerGroupModel,
  CVModel,
  RecuitermentModel,
  BusinessModel,
  ApplyJobModel,
  FavoriteHistoriesModel,
  CVBeautyModel,
} from '../model'

function query(req, res, next, _id, Model, errorKey, condition = {}) {
  const locale = helper.getLocale(req)
  if (!validation.isObjectId(_id)) {
    return response.r404(res, locale, errorKey)
  }

  condition = { ...condition, _id }
  // Find
  Model.findOne(condition, (error, doc) => {
    if (error || !doc) {
      return response.r404(res, locale, errorKey)
    } else {
      req[`${format.lowerCaseFirstLetter(Model.modelName)}Data`] = doc
      next()
    }
  })
}

// User
const user = (req, res, next, _id) => {
  query(req, res, next, _id, UserModel, localesKey.user.userNotFound)
}

// careerGroup

const careerGroup = (req, res, next, _id) => {
  query(req, res, next, _id, CareerGroupModel, localesKey.careerGroup.careerGroupNotFound)
}


const cv = (req, res, next, _id) => {
  query(req, res, next, _id, CVModel, localesKey.cv.cvNotFound)
}

const recuiterment = (req, res, next, _id) => {
  query(req, res, next, _id, RecuitermentModel, localesKey.recuiterment.recuitermentNotFound)
}

const business = (req, res, next, _id) => {
  query(req, res, next, _id, BusinessModel, localesKey.business.businessNotFound)
}

const applyJob = (req, res, next, _id) => {
  query(req, res, next, _id, ApplyJobModel, localesKey.common.applyJobNotFound)
}

const favoriteJob = (req, res, next, _id) => {
  query(req, res, next, _id, FavoriteHistoriesModel, localesKey.common.favoriteHistoriesNotFound)
}

const cvBeauty = (req, res, next, _id) => {
  query(req, res, next, _id, CVBeautyModel, localesKey.common.cvBeautyNotFound)
}

// Export
export default {
  user,
  careerGroup,
  cv,
  recuiterment,
  business,
  applyJob,
  favoriteJob,
  cvBeauty,
}
