/**
 * Search routes
 * prefix: /search
 */

import express from 'express'
import SearchCtrl from './controller'


const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */
/**
 * @api {get} /search/career-groups Get all career groups
 * @apiGroup CareerGroup
 * @apiName All
 *
 */
router.get('/career-groups', SearchCtrl.allCareerGroup)

/**
 * @api {get} /search/jobs
 * @apiGroup SearchJob
 * @apiName SreachJob
 *
 */
router.get('/search-jobs', SearchCtrl.searchJob)

export default router
