/**
 * Business routes
 * prefix: /businesses
 */

import express from 'express'
import middleware from '../system/middleware'
import BusinessesCtrl from './controller'
import { preQuery } from '../../utils'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */


/**
 * @api {get} /business All business viw
 * @apiGroup Business
 * @apiName All
 */
router.get('/', BusinessesCtrl.all)


/**
 * @api {get} /businesses/admin All business for admin
 * @apiGroup Business
 * @apiName All
 */
router.get('/admin', BusinessesCtrl.allForAdmin)

/**
 * @api {get} /business/:businessId show business
 * @apiGroup Business
 * @apiName Show
 */
router.get('/:businessId', middleware.requiresRecuiter, BusinessesCtrl.show)

/**
 * @api {get} /business/:businessId/view-web show business view web
 * @apiGroup Business
 * @apiName Show view web
 */
router.get('/:businessId/view-web', BusinessesCtrl.showViewWeb)

/**
 * @api {patch} /business/:businessId/logo Change logo business
 * @apiGroup Busiess
 * @apiName Change logo business
 * @apiParam {String} logo photo  id
 */
router.patch('/:businessId/logo', middleware.requiresRecuiter, BusinessesCtrl.changeLogo)


/**
 * @api {put} /business/:businessId Update business
 * @apiGroup Business
 * @apiName Update Business
 */
router.put('/:businessId', middleware.requiresRecuiter, BusinessesCtrl.update)


/**
 * @api {get} /business/:businessId/jobs All jobs of business
 * @apiGroup Business
 * @apiName All Jobs Of business
 */
router.get('/:businessId/jobs', BusinessesCtrl.allJobsOfBusiness)


/**
 * @api {get} /business/:businessId show business Admin
 * @apiGroup Business
 * @apiName Show
 */
router.get('/:businessId/admin', middleware.requiresAdmin, BusinessesCtrl.showForAdmin)


/**
 * @api {get} /business/:businessId/recuiterments/admin
 * @apiGroup Business
 * @apiName Get recuiterments
 */
router.get('/:businessId/recuiterments/admin', middleware.requiresAdmin, BusinessesCtrl.fetchrecuiterment)

// Pre-query
router.param('businessId', preQuery.business)

export default router
