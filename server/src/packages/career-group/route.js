/**
 * Career groups routes
 * prefix: /career-groups
 */

import express from 'express'
import middleware from '../system/middleware'
import CareerGroupCtrl from './controller'
import validation from './validation'
import { preQuery } from '../../utils'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {post} /career-groups Create career groups
 * @apiGroup CareerGroup
 * @apiName Create
 *
 * @apiParam {String} name name career group
 *
 */
router.post('/', middleware.requiresAdmin, validation.create, CareerGroupCtrl.create)


/**
 * @api {get} /career-groups Get all career groups
 * @apiGroup CareerGroup
 * @apiName All
 *
 * @apiParam {String} keyword name career group
 * @apiParam {Boolean} active
 * @apiParm {Number} page
 *
 */
router.get('/', middleware.requiresAdmin, CareerGroupCtrl.all)

/**
 * @api {put} /career-groups/:careerGroupId Update career group
 *
 * @apiGroup CareerGroup
 * @apiName Update Career Group
 *
 * @apiParam {String} [name] name
 */
router.put('/:careerGroupId', middleware.requiresAdmin, validation.create, CareerGroupCtrl.update)

/**
 * @api {patch} /career-groups/:careerGroupId/status Change status of career group
 *
 * @apiGroup CareerGroup
 * @apiName ChangeStatus
 */
router.patch('/:careerGroupId/status', middleware.requiresAdmin, CareerGroupCtrl.changeStatus)

// PreQuery
router.param('careerGroupId', preQuery.careerGroup)

export default router
