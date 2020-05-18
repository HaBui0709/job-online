import { helper, response, getError, photo } from '../../utils'
import { UserModel, FileModel } from '../../model'
import configs from '../../configs'
import { localesKey } from '../../locales'

const all = async (req, res) => {
  const locale = helper.getLocale(req)
  const { page = 0, sort } = req.query
  const limit = configs.limit.user.all

  const data = await Promise.all([{
    users: await UserModel.findByCondition(req.query, { page, limit }, sort),
    total: await UserModel.countByCondition(req.query),
    limitPerPage: limit,
  }])

  const result = data[0]

  result.users = await Promise.all(result.users.map(async (item) => {
    const obj = await UserModel.info(item)
    return obj
  }))

  return response.r200(res, locale, result)
}


/**
 * Show detail user
 *
 */
const show = async (req, res) => {
  const locale = helper.getLocale(req)
  const userData = await UserModel.briefInfo(req.userData)
  return response.r200(res, locale, { userData })
}


/**
 * Update info user
 */
const updateInfo = async (req, res) => {
  const locale = helper.getLocale(req)
  const { userData } = req
  const { body } = req
  const doc = {
    $set: {
      ...body,
      updatedAt: Date.now(),
    },
  }
  const { error } = await UserModel.updateById(userData._id, doc)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }
  return response.r200(res, locale, {})
}

/**
 * Change avatar
 */
const changeAvatar = async (req, res) => {
  const locale = helper.getLocale(req)
  const { avatar } = req.body
  const { userData } = req
  // Check exsits of cover
  const coverData = await FileModel.findOneByCondition({ _id: avatar })
  if (!coverData) {
    return response.r400(res, locale, localesKey.file.fileNotFound)
  }

  // Update cover db voucher
  const { error } = await UserModel.changeAvatar(userData._id, coverData)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  return response.r200(res, locale, { cover: photo.cover(coverData.name) })
}

/**
 * Change ban
 */
const changeBan = async (req, res) => {
  const locale = helper.getLocale(req)
  const doc = req.userData
  const statuses = {
    ...doc.statuses,
    banned: !doc.statuses.banned,
  }

  const { error } = await UserModel.updateDoc(doc, { statuses })
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  response.r200(res, locale, {})
}

export default {
  all,
  show,
  updateInfo,
  changeAvatar,
  changeBan,
}
