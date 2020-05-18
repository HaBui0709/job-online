/**
 * Recuiterme routes
 * prefix: /recuiterments
 */

import express from 'express'
import middleware from '../system/middleware'
import RecuiterCtrl from './controller'
import validation from './validation'
import { preQuery } from '../../utils';
// import { preQuery } from '../../utils'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {post} /recuiterments Create recuiterments
 * @apiGroup Recuciterment
 * @apiName Create
 *
 */
router.post('/', middleware.requiresRecuiter, validation.create, RecuiterCtrl.create)

/**
 * @api {get} /recuiterments  recuiterments
 * @apiGroup Recuciterment
 * @apiName Get all recuiterment by userId with role reuciter
 *
 */
router.get('/', middleware.requiresRecuiter, RecuiterCtrl.all)

/**
 * @api {get} /recuiterments/approved  recuiterments approved
 * @apiGroup Recuciterment
 * @apiName Get all recuiterment  approved by userId with role reuciter
 *
 */
router.get('/approved', middleware.requiresRecuiter, RecuiterCtrl.allApproved)

/**
 * @api {get} /recuiterments/:recuitermentId/posting Show recuiterment is posting
 * @apiGroup Recuiterments
 * @apiName Show recuiterment  is posting
 *
 */
router.get('/:recuitermentId/posting', RecuiterCtrl.showIsPosting)

/**
 * @api {get} /recuiterments/:recuitermentId Show recuiterment
 * @apiGroup Recuiterments
 * @apiName Show recuiterment
 *
 */
router.get('/:recuitermentId', middleware.requiresRecuiter, RecuiterCtrl.show)

/**
 * @api {get} /recuiterments/:recuitermentId/similar-jobs Get similar job recuiterment
 * @apiGroup Recuiterments
 * @apiName Get similar jobs recuiterment
 *
 */
router.get('/:recuitermentId/similar-jobs', RecuiterCtrl.similarJobs)

/**
 * @api {patch} /recuiterments/:recuitermentId Admin change status
 * @apiGroup Recuiterments
 *
 * @apiName Admin change status
 *
 */
router.patch('/:recuitermentId', middleware.requiresAdmin, RecuiterCtrl.adminChangeStatus)

// Pre-query
router.param('recuitermentId', preQuery.recuiterment)

export default router
