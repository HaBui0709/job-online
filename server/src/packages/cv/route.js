/**
 * cv routes
 * prefix: /candidate/cv
 */

import express from 'express'
import middleware from '../system/middleware'
import CVCtrl from './controller'
import { preQuery } from '../../utils'
import validation from './validation'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {get} /candidate/cv All cv
 * @apiGroup CandidateCV
 * @apiName All CV
 *
 */
router.get('/', middleware.requiresCandidate, CVCtrl.all)

/**
 * @api {get} /candidate/cv/approved All cv approved
 * @apiGroup CandidateCV
 * @apiName All CV approved
 *
 */
router.get('/approved', middleware.requiresCandidate, CVCtrl.allCVApproved)

/**
 * @api {post} /candidate/cv Create cv
 * @apiGroup CandidateCV
 * @apiName Create CV
 *
 */
router.post('/', middleware.requiresCandidate, validation.createAndUpdate, CVCtrl.create)

/**
 * @api {delete} /candidate/cv/:cvId Delete cv
 *
 * @apiGroup CandidateCV
 * @apiName Delete CV
 *
 */
router.delete('/:cvId', middleware.requiresCandidate, CVCtrl.remove)

/**
 * @api {put} /candidate/cv Update cv
 * @apiGroup CandidateCV
 * @apiName Update CV
 *
 */
router.put('/:cvId', middleware.requiresCandidate, validation.createAndUpdate, CVCtrl.update)

/**
 * @api {get} /candidate/cv/:cvId Show cv
 * @apiGroup CandidateCV
 * @apiName Show CV
 *
 */
router.get('/:cvId', middleware.requiresLogin, CVCtrl.show)

// Pre-query
router.param('cvId', preQuery.cv)

export default router
