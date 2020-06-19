/**
 * API middleware
 */
import configs from '../../configs'
import { localesKey } from '../../locales'
import { response, to, validation } from '../../utils'
import { ObjectId } from '../../utils/mongoose'
import { UserModel } from '../../model'


/**
 * ****************************************
 * COUNT IN DATABASE
 * ****************************************
 */

/**
 * Count in database
 */
const modelCountInDb = async (model, _id, role, type = 'admin') => {
  if (!validation.isObjectId(_id)) {
    return false
  }

  // Setup count condition
  const condition = {
    _id: new ObjectId(_id),
  }

  if (role && type === 'admin') {
    condition['admin.role'] = role
  }

  if (role && type === 'guest') {
    condition.role = role
  }

  const { data } = await to(model.countDocuments(condition))
  return data
}

/**
 * ****************************************
 * CHECK ROLE
 * ****************************************
 */

/**
 * Check valid token
 */
const isAuthenticated = async (req) => {
  const isExists = await modelCountInDb(UserModel, req.user._id)
  // Check ban
  const isBanned = (await UserModel.findOneByCondition({ _id: req.user._id })).statuses.banned
  return isExists && !isBanned
}

/**
 * Check role admin
 */
const isAdmin = async (req) => {
  const isRoleAdmin = await modelCountInDb(UserModel, req.user._id, configs.roles.admin)
  return isRoleAdmin
}

/**
 * Check role recuiter
 */
const isRecuiter = async (req) => {
  const isRoleRecuiter = await modelCountInDb(UserModel, req.user._id, configs.roles.recuiter, 'guest')
  return isRoleRecuiter
}

/**
 * Check role candidate
 */
const isCandidate = async (req) => {
  const isRoleCandidate = await modelCountInDb(UserModel, req.user._id, configs.roles.candidate, 'guest')
  return isRoleCandidate
}


/**
 * ****************************************
 * REQUIRE
 * ****************************************
 */

/**
 * Require user logged in to do next action
 *
 */
const requiresLogin = async (req, res, next) => {
  const { locale } = req.user
  const isAuthorized = await isAuthenticated(req)
  if (!isAuthorized) {
    return response.r401(res, locale, localesKey.common.requireAuth)
  }
  next()
}

/**
 * Require admin role to do next action
 */
const requiresAdmin = async (req, res, next) => {
  const { locale } = req.user
  const [isLoggedIn, isRoleAdmin] = await Promise.all([
    await isAuthenticated(req),
    await isAdmin(req),
  ])
  if (!isLoggedIn || !isRoleAdmin) {
    return response.r401(res, locale, localesKey.common.requireAdmin)
  }
  next()
}

/**
 * Require recuiter role to do next action
 */
const requiresRecuiter = async (req, res, next) => {
  const { locale } = req.user
  const [isLoggedIn, isRoleAdmin, isRoleRecuiter] = await Promise.all([
    await isAuthenticated(req),
    await isAdmin(req),
    await isRecuiter(req),
  ])
  if (!isLoggedIn || (!isRoleAdmin && !isRoleRecuiter)) {
    return response.r401(res, locale, localesKey.common.requiresRecuiter)
  }
  next()
}

/**
 * Require candidate role to do next action
 */
const requiresCandidate = async (req, res, next) => {
  const { locale } = req.user
  const [isLoggedIn, isRoleAdmin, isRoleCandidate] = await Promise.all([
    await isAuthenticated(req),
    await isAdmin(req),
    await isCandidate(req),
  ])
  if (!isLoggedIn || (!isRoleAdmin && !isRoleCandidate)) {
    return response.r401(res, locale, localesKey.common.requiresCandidate)
  }
  next()
}

// Export
export default {
  requiresLogin,
  requiresAdmin,
  requiresRecuiter,
  requiresCandidate,
}
