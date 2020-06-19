/**
 * apply jobs routes
 * prefix: /apply-jobs
 */

import express from 'express'
import middleware from '../system/middleware'
import ApplyJobCtrl from './controller'
import { preQuery } from '../../utils'

const router = express.Router()

/**
 * @api {post} /apply-jobs Apply job
 * @apiGroup ApplyJobs
 * @apiName Apply job
 *
 */
router.post('/', middleware.requiresCandidate, ApplyJobCtrl.apply)


/**
 * @api {get} /apply-jobs/for-candidate Get all Apply job of candidate by id
 * @apiGroup ApplyJobs
 * @apiName Apply job
 *
 */
router.get('/for-candidate', middleware.requiresCandidate, ApplyJobCtrl.listApplyJobForCandidate)

router.get('/manager-candidate', middleware.requiresRecuiter, ApplyJobCtrl.managerCandidate)

router.patch('/:applyJobId/approved', middleware.requiresRecuiter, ApplyJobCtrl.changeStatusAndNotificaiton)

// Pre-query
router.param('applyJobId', preQuery.applyJob)

export default router
