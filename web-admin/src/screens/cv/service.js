import { request } from '../../utils'
import { ApiConst } from '../../configs'

/**
 * Fetch cvs
 */
const fetch = (data) => {
  const api = ApiConst.cv.all()
  return request.call(api.url, { method: api.method, body: data })
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

/**
 * Change status
 *
 * @param {Object} data
 * @param {String} id
 */
const changeStatus = (data, id) => {
  const api = ApiConst.cv.changeStatus(id)
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}
export {
  fetch,
  fetchDetailCV,
  changeStatus,
}
