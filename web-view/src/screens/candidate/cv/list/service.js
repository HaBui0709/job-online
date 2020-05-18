import { ApiConst } from '../../../../configs'
import { request } from '../../../../utils'

/**
 * All CV
 */
const fetchAllCV = () => {
  const api = ApiConst.cv.all()
  return request.call(api.url, {
    method: api.method,
  })
}

/**
 * Detail CV
 */
const fetchDetailCV = (_id) => {
  const api = ApiConst.cv.show(_id)
  return request.call(api.url, {
    method: api.method,
  })
}
export {
  fetchDetailCV,
  fetchAllCV,
}
