import { request } from '../../utils'
import { ApiConst } from '../../configs'

/**
 * Call api register candidate
 *
 * @param {Object} data
 *
 */
const registerCandidate = (data) => {
  const api = ApiConst.common.registerCandidate()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

/**
 * Call api register recuiter
 *
 * @param {Object} data
 *
 */
const registerRecuiter = (data) => {
  const api = ApiConst.common.registerRecuiter()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

export {
  registerCandidate,
  registerRecuiter,
}
