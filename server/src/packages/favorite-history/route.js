/**
 * Favorite histories routes
 * prefix: /favorite-histories
 */

import express from 'express'
import middleware from '../system/middleware'
import FavoriteHistoriesCtrl from './controller'
import { preQuery } from '../../utils';
// import { preQuery } from '../../utils'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {post} /favorite-histories
 *
 * @apiGroup Favorite histories
 * @apiName Create
 *
 */
router.post('/', middleware.requiresCandidate, FavoriteHistoriesCtrl.create)


/**
 * @api {get} /
 *
 * @apiGroup Favorite histories
 * @apiName ALL
 *
 */
router.get('/', middleware.requiresCandidate, FavoriteHistoriesCtrl.all)

/**
 * @api {delete} /favorite-histories/:favoriteJobId
 *
 * @apiGroup Favorite histories
 * @apiName ALL
 *
 */
router.delete('/:favoriteJobId', middleware.requiresCandidate, FavoriteHistoriesCtrl.destroy)

// PreQuery
router.param('favoriteJobId', preQuery.favoriteJob)

export default router
