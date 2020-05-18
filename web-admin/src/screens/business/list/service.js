import { request } from '../../../utils'
import { ApiConst } from '../../../configs'

/**
 *  Service: fetch data businesses
 */
const fetch = (data) => {
  const api = ApiConst.businesses.all()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

export {
  fetch,
}
