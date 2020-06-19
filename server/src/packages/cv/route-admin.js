/**
 * cvs routes
 * prefix: /cvs
 */

import express from 'express'
import middleware from '../system/middleware'
import CVCtrl from './controller'
import { preQuery } from '../../utils'

const router = express.Router()

/**
 * @api {get} /cvs All cv
 * @apiGroup CVs
 *
 * @apiName All CV
 *
 */
router.get('/', middleware.requiresAdmin, CVCtrl.allByAdmin)


/**
 * @api {patch} /cvs/:cvId Admin change status cv
 * @apiGroup CVs
 *
 * @apiName Admin change status CV
 *
 */
router.patch('/:cvId', middleware.requiresAdmin, CVCtrl.adminChangeStatus)

// Pre-query
router.param('cvId', preQuery.cv)

export default router
