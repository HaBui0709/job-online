/**
 * Users routes
 * prefix: /users
 */

import express from 'express'
import middleware from '../system/middleware'
import UserCtrl from './controller'
import { preQuery } from '../../utils'
import validation from './validation'

// import validation from './validation'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */


/**
 * @api {get} /users All users
 * @apiGroup User
 * @apiName All Users
 *
 * @apiParam {Number} page
 * @apiParam {String} type
 * @apiParam {String} city city
 * @apiParam {String} keyword keyword ['name', 'email', 'phone']
 */
router.get('/', middleware.requiresAdmin, UserCtrl.all)

/**
 * @api {get} /users/:userId Show detail user
 * @apiGroup User
 * @apiName Show user
 *
 * @param {String} userId user id
 *
 */
router.get('/:userId', middleware.requiresAdmin, UserCtrl.show)

/**
 * @api {put} /users/:userId Update info user
 * @apiGroup User
 * @apiName Update info user
 *
 */
router.put('/:userId', middleware.requiresLogin, validation.checkUniqueField, UserCtrl.updateInfo)

/**
 * @api {patch} /users/:userId/avatar Change avatar user
 * @apiGroup Users
 * @apiName Change avatar user
 * @apiParam {String} avatar photo  id
 */
router.patch('/:userId/avatar', middleware.requiresLogin, UserCtrl.changeAvatar)

/**
 * @api {patch} /users/:userId/change-ban Ban/Unban
 * @apiGroup Users
 * @apiName Ban/Unban
 */
router.patch('/:userId/change-ban', middleware.requiresAdmin, UserCtrl.changeBan)

// Middleware
router.param('userId', preQuery.user)

export default router
