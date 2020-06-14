/**
 * Recuiterme routes
 * prefix: /recuiterments
 */

import express from 'express'
import HomeCtrl from './controller'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * Viec lam hap dan cho home, theo salary
 */
router.get('/jobs-iteresting', HomeCtrl.jobIteresting)

/**
 * Viec lam tuyen gap cho home, theo deadline
 */
router.get('/jobs-urgent', HomeCtrl.jobUrgent)


/**
 * Việc làm có thể bạn sẽ thích
 */
router.get('/job-suggests', HomeCtrl.getJobSuggest)

/**
 * Theo created time
 */
router.get('/jobs-new', HomeCtrl.getJobsNew)

export default router
