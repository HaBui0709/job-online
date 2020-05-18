import { request } from '../../../../utils'
import { ApiConst } from '../../../../configs'

/**
 * Fetch apply job
 */
const fetch = (data) => {
  const api = ApiConst.applies.allApplyJobsByCandidate()
  return request.call(api.url, { method: api.method, body: data })
}

export {
  fetch,
}
