import { request } from '../../../../utils'
import { ApiConst } from '../../../../configs'

/**
 * Fetch recuiterments
 */
const fetch = (data) => {
  const api = ApiConst.recuiterment.allApproved()
  return request.call(api.url, { method: api.method, body: data })
}

export {
  fetch,
}
