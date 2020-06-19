/**
 * App router bootstrap
 */

import { Router } from 'express'

export default () => {
  const api = Router()

  // Authenticate with token
  api.use('*', require('./packages/system/authentication').default)

  // Mount components
  api.use('/', require('./packages/common/route').default)
  api.use('/me', require('./packages/me/route').default)
  api.use('/users', require('./packages/user/route').default)
  // api.use('/businesses', require('./packages/business/route').default)
  api.use('/career-groups', require('./packages/career-group/route').default)
  api.use('/candidate/cv', require('./packages/cv/route').default)
  api.use('/search', require('./packages/search/route').default)
  api.use('/recuiterments', require('./packages/recuiterment/route').default)
  api.use('/cvs', require('./packages/cv/route-admin').default)
  api.use('/business', require('./packages/business/route').default)
  api.use('/home', require('./packages/home/route').default)
  api.use('/apply-jobs', require('./packages/apply-job/route').default)
  api.use('/notifications', require('./packages/notification/route').default)
  api.use('/favorite-histories', require('./packages/favorite-history/route').default)
  api.use('/pdf', require('./packages/converter-pdf/route').default)
  api.use('/cv-beauty', require('./packages/cv-beauty/route').default)
  api.use('/analytic', require('./packages/statistic/route').default)
  // Return
  return api
}
