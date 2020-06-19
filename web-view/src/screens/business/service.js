import { ApiConst } from '../../configs'
import { request } from '../../utils'

/**
 * Fetch business detail by id
 *
 * @param {String} businessId
 *
 */
const fetchBusiness = (businessId) => {
  const api = ApiConst.business.showViewWeb(businessId)
  return request.call(api.url, {
    method: api.method,
  })
}

const fecthAllJobs = (businessId) => {
  const api = ApiConst.business.fecthAllJobs(businessId)
  return request.call(api.url, {
    method: api.method,
  })
}

export {
  fetchBusiness,
  fecthAllJobs,
}
