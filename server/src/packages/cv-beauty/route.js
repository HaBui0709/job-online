/**
 * CV beauty routes
 * prefix: /cv-beauty
 */

import express from 'express'
import middleware from '../system/middleware'
import CVBeautyCtrl from './controller'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {get} /cv-beauty Get cvs beauty by user
 * @apiGroup CvBeauty
 * @apiName All Cv beautys by user
 *
 */
router.get('/', middleware.requiresCandidate, CVBeautyCtrl.all)

/**
 *
 * @api {post} /cv-beauty Create cv-beauty by user
 *
 * @apiGroup CVBeauty
 * @apiName Create cv beauty by user
 *
 */
router.post('/', middleware.requiresCandidate, CVBeautyCtrl.create)

// router.delete('/', middleware.requiresCandidate, NotificationsCtrl.destroy)

export default router
