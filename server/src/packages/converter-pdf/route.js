import express from 'express'
import PdfCtrl from './controller'
import { preQuery } from '../../utils'

const router = express.Router()

/**
 * @api {get} /:cvBeautyId/link-download/cv
 * @apiGroup CV
 * @apiName Pdf
 */
router.get('/:cvBeautyId/link-download/cv', PdfCtrl.handlepdfForCV)

// Pre-query for plan

router.param('cvBeautyId', preQuery.cvBeauty)

export default router
