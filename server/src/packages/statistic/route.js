/**
 * Statistic routes
 * prefix: /analytic
 */

import express from 'express'
import middleware from '../system/middleware'
import StatisticCtrl from './controller'
// import { preQuery } from '../../utils'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {get} /analytic/statistic-chart-by-week   statistic chart by week
 * @apiGroup Statistic
 * @apiName Statistic chart By Week
 *
 * @apiParam {Date} [startAt] start at
 * @apiParam {Date} [endAt]  end at
 * @@apiParam  {String} city city id
 */
router.get('/statistic-chart-by-week', middleware.requiresAdmin, StatisticCtrl.chartByWeek)

/**
 * @api {get} /analytic/statistic-chart-by-day   Statistic chart by day
 * @apiGroup Statistic
 * @apiName Statistic chart by day
 *
 * @apiParam {Date} [startAt] start at
 * @apiParam {Date} [endAt]  end at
 * @@apiParam  {String} city city id
 */
router.get('/statistic-chart-by-day', middleware.requiresAdmin, StatisticCtrl.chartByDay)

/**
 * @api {get} /analytic/recuiterments All recuiterments
 * @apiGroup Statistic
 * @apiName All Statistic
 *
 * @apiParam {Number} page
 * @apiParam {String} city
 *
 * // For filter all bills [range time]
 * @apiParam {String} keyword
 * @apiParam {Date} startAt start at
 * @apiParam {Date} endAt end at
 *
 * // For filter by date
 * @apiParam {Date} date date
 *
 */
router.get('/recuiterments', middleware.requiresAdmin, StatisticCtrl.allHistories)

// Pre-query
// router.param('businessId', preQuery.business)

export default router
