/**
 * Notifications routes
 * prefix: /notifications
 */

import express from 'express'
import middleware from '../system/middleware'
import NotificationsCtrl from './controller'
import validation from './validation'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {get} /notifications/show-by-user Get notification by user
 * @apiGroup Notifications
 * @apiName Show notification by user
 *
 */
router.get('/show-by-user', middleware.requiresCandidate, NotificationsCtrl.getNotificationByUser)

/**
 *
 * @api {post} /notifications Create notification by user
 *
 * @apiGroup Notifications
 * @apiName Create notification by user
 *
 */
router.post('/', middleware.requiresCandidate, validation.createAndUpdate, NotificationsCtrl.create)

router.delete('/', middleware.requiresCandidate, NotificationsCtrl.destroy)

export default router
