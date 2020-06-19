import { request } from '../../utils'
import { ApiConst } from '../../configs'

/**
 * Fetch recuciterments
 */
const fetch = (data) => {
  const api = ApiConst.recuiterments.all()
  return request.call(api.url, { method: api.method, body: data })
}

/**
 * Detail recuiterment
 */
const fetchDetail = (_id) => {
  const api = ApiConst.recuiterments.show(_id)
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
  const api = ApiConst.recuiterments.changeStatus(id)
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

export {
  fetch,
  fetchDetail,
  changeStatus,
}
