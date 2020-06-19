import { helper, response, token, getError } from '../../utils'
import { UserModel } from '../../model'
import { localesKey } from '../../locales'
import configs from '../../configs'

import BusinessCrl from '../business/controller'
import utils from './utils'
import { ObjectId } from '../../utils/mongoose';

const commonKey = localesKey.common

/**
 * Ping
 */
const ping = async (req, res) => {
  const locale = helper.getLocale(req)
  return response.r200(res, locale, { mess: 'Ping thanh cong' })
}

/**
 * Login admin
 */
const login = async (req, res) => {
  const locale = helper.getLocale(req)
  const { username, password } = req.body
  const user = await UserModel.findOneByCondition({ username })
  if (!user) {
    return response.r400(res, locale, commonKey.comomUsernamOrPasswordInCorrect)
  }

  // Check ban
  if (user.statuses.banned) {
    return response.r400(res, locale, commonKey.userIsBaned)
  }

  // Check password
  const isAuthenticated = user.authenticate(password)
  if (!isAuthenticated) {
    return response.r400(res, locale, commonKey.comomUsernamOrPasswordInCorrect)
  }

  const userInfo = await UserModel.briefInfo(user)
  return response.r200(res, locale, {
    token: token(userInfo.toJSON()),
    user: userInfo,
  })
}

/**
 * Login candidate
 */
const loginCandidate = async (req, res) => {
  const locale = helper.getLocale(req)
  const { email, password } = req.body

  const user = await UserModel.findOneByCondition({ email })
  if (!user) {
    return response.r400(res, locale, commonKey.comomEmailOrPasswordInCorrect)
  }
  // Check password
  const isAuthenticated = user.authenticate(password)
  if (!isAuthenticated) {
    return response.r400(res, locale, commonKey.comomEmailOrPasswordInCorrect)
  }

  // Check ban
  if (user.statuses.banned) {
    return response.r400(res, locale, commonKey.userIsBaned)
  }

  // Check role

  if (user.role !== 'candidate') {
    return response.r401(res, locale, commonKey.noPermission)
  }

  const userInfo = await UserModel.briefInfo(user)
  return response.r200(res, locale, {
    token: token(userInfo.toJSON()),
    user: userInfo,
  })
}

/**
 * Login recuiter
 */
const loginRecuiter = async (req, res) => {
  const locale = helper.getLocale(req)
  const { email, password } = req.body
  const user = await UserModel.findOneByCondition({ email })
  if (!user) {
    return response.r400(res, locale, commonKey.comomEmailOrPasswordInCorrect)
  }

  // Check ban
  if (user.statuses.banned) {
    return response.r400(res, locale, commonKey.userIsBaned)
  }
  // Check password
  const isAuthenticated = user.authenticate(password)
  if (!isAuthenticated) {
    return response.r400(res, locale, commonKey.comomEmailOrPasswordInCorrect)
  }

  // Check role
  if (user.role !== 'recuiter') {
    return response.r401(res, locale, commonKey.noPermission)
  }

  const userInfo = await UserModel.briefInfo(user)
  console.log('uerInfno', userInfo)
  return response.r200(res, locale, {
    token: token(userInfo.toJSON()),
    user: userInfo.toJSON(),
  })
}

/**
 * Register recuiter
 */
const registerRecuiter = async (req, res) => {
  const locale = helper.getLocale(req)
  const { body: { confirmPassword, password, business }, body } = req
  // Check confirm password
  if (confirmPassword !== password) {
    return response.r400(res, locale, localesKey.user.confirmPasswordIncorrect)
  }

  // Add role candidate
  body.role = configs.roles.recuiter
  // Is NewUser
  body.isNewUser = true

  // Save doc
  const { error, data } = await UserModel.saveDoc(body)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  // Create business
  const businessData = await BusinessCrl.create(business, data._id)

  // Update business into user
  await UserModel.updateOne(
    { _id: new ObjectId(data._id) },
    {
      $set: { business: businessData._id },
    },
  )

  return response.r200(res, locale, { user: data })
}

/**
 * Register candidate
 */
const registerCandidate = async (req, res) => {
  const locale = helper.getLocale(req)
  const { body: { confirmPassword, password }, body } = req
  console.log('body', body)
  // Check confirm password
  if (confirmPassword !== password) {
    return response.r400(res, locale, localesKey.user.confirmPasswordIncorrect)
  }

  // Add role candidate
  body.role = configs.roles.candidate
  // Is NewUser
  body.isNewUser = true

  // Save doc
  const { error, data } = await UserModel.saveDoc(body)
  if (error) {
    return response.r400(res, locale, getError.message(error))
  }

  // Create token to login view web
  const dataLogin = await utils.getDataToLogin(data)

  return response.r200(res, locale, { ...dataLogin })
}

/**
 * Check CV
 */
const checkCV = async (req, res) => {
  const locale = helper.getLocale(req)
  // Check role
  const IsCandidate = await UserModel.countByCondition({ _id: req.user._id, role: 'candidate' })
  if (!IsCandidate) {
    return response.r400(res, locale, localesKey.common.requireCandidate)
  }
  // const cvs = await CVModel.getCvActive({ user: req.user._id, status: 'approved' })
  // if (!cvs.length) {
  //   return response.r400(res, locale, localesKey.common.noCVActive)
  // }
  return response.r200(res, locale, {})
}

// Export
export default {
  login,
  ping,
  loginRecuiter,
  loginCandidate,
  registerRecuiter,
  registerCandidate,
  checkCV,
}
