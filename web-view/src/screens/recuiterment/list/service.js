import { request } from '../../../utils'
import { ApiConst } from '../../../configs'

/**
 * Fetch recuiterments
 */
const fetch = (data) => {
  const api = ApiConst.recuiterment.all()
  return request.call(api.url, { method: api.method, body: data })
}

export {
  fetch,
}
