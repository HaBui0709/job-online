/**
 * Common routes
 * prefix: /
 */

import express from 'express'
import CommonCtrl from './controller'
import validation from './validation'

const router = express.Router()

/**
 * @apiDefine Header
 * @apiHeader {string} Authorization Access token
 */

/**
 * @api {post} /login Login web admin
 * @apiGroup Common
 * @apiName Login
 *
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 */
router.post('/login', validation.login, CommonCtrl.login)

/**
 * @api {post} /login/candidate Login web candidate
 * @apiGroup Common
 * @apiName Login Candidate
 *
 * @apiParam {String} email email
 * @apiParam {String} password Password
 */
router.post('/login/candidate', validation.loginCandidate, CommonCtrl.loginCandidate)

/**
 * @api {post} /login/recuiter Login web recuiter
 * @apiGroup Common
 * @apiName Login Recuiter
 *
 * @apiParam {String} email email
 * @apiParam {String} password Password
 */
router.post('/login/recuiter', validation.loginRecuiter, CommonCtrl.loginRecuiter)

/**
 * @api {post} /register/recuiter Register web recuiter
 * @apiGroup Common
 * @apiName Register Recuiter
 *
 * @apiParam {String} email email
 * @apiParam {String} password Password
 * @apiParam {String} confirmPassword Confirm password
 * @apiParam {String} phone Phone
 * @apiParam {String} username  Username
 * @apiParam {String} fullName   full name
 * @apiParam {Date} birthday birthday
 * @apiParam {String} gender gender
 * @apiParam {String} address address
 * @apiParam {String} city city
 * @apiParam {String} plasticCard plasticCard
 *
 */
router.post('/register/recuiter', validation.registerRecuiter, validation.checkUniqueField, CommonCtrl.registerRecuiter)

/**
 * @api {post} /register/cadidate Register account candidate
 * @apiGroup Common
 * @apiName Register Candidate
 *
 * @apiParam {String} email email
 * @apiParam {String} password Password
 * @apiParam {String} confirmPassword Confirm password
 * @apiParam {String} phone Phone
 * @apiParam {String} username  Username
 * @apiParam {String} fullName   full name
 * @apiParam {Date} birthday birthday
 * @apiParam {String} gender gender
 * @apiParam {String} address address
 * @apiParam {String} city city
 * @apiParam {String} plasticCard plasticCard
 *
 */
router.post('/register/candidate', validation.registerCandidate, validation.checkUniqueField, CommonCtrl.registerCandidate)

router.get('/ping', CommonCtrl.ping)


router.get('/check/cv', CommonCtrl.checkCV)

export default router
