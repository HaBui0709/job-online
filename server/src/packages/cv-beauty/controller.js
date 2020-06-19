import { helper, response, to, getError } from '../../utils'
import { CVBeautyModel, CVModel } from '../../model'
import { localesKey } from '../../locales'

/**
 * Create cv beauty
 */
const create = async (req, res) => {
  const locale = helper.getLocale(req)
  const { user, body: { typeCV, cv } } = req

  // Check is exist cv beauty
  const count = await CVBeautyModel.countByCondition({
    user: user._id,
    typeCV,
    cv,
  })

  if (count) {
    return response.r400(res, locale, localesKey.common.cvBeautyIsExisted)
  }

  const doc = {
    user: user._id,
    typeCV,
  }

  // Save doc
  const dataNew = new CVBeautyModel(doc)
  const { error, data } = await to(dataNew.save())

  if (error) {
    return response(400, locale, getError.message(error))
  }
  return response.r200(res, locale, { data })
}

/**
 * All
 */
const all = async (req, res) => {
  const locale = helper.getLocale(req)
  const { user: { _id } } = req

  const result = {
    isCVExisted: false,
    cvBeautys: [],
  }

  // Check cv is existed
  const countCv = await CVModel.countByCondition({
    user: _id,
  })

  if (!countCv) {
    return response.r200(res, locale, { result })
  }

  // Get cv beauty
  const cvBeautys = await CVBeautyModel.getBriefInfoByCondition({
    user: _id,
  })

  result.cvBeautys = cvBeautys
  result.isCVExisted = true

  return response.r200(res, locale, { result })
}

export default {
  create,
  all,
}
