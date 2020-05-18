import { ApiConst } from '../../../configs'
import { request } from '../../../utils'

/**
 * Fetch business
 *
 * @param {String} businessId id of business
 */
const fetch = async (businessId) => {
  const api = ApiConst.businesses.show(businessId)
  return request.call(api.url, {
    method: api.method,
  })
}

/**
 * Fetch recuiterments
 *
 * @param {String} businessId
 * @param {Object} data data query
 *
 */
const fetchRecuiterments = async (businessId, data) => {
  const api = ApiConst.businesses.fetchRecuiterments(businessId)
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

export {
  fetch,
  fetchRecuiterments,
}
