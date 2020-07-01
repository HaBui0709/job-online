import { request } from '../../../utils'
import { ApiConst } from '../../../configs'

/**
 * Fetch recuiterments
 */
const fetch = (data) => {
  const api = ApiConst.recuiterment.all()
  return request.call(api.url, { method: api.method, body: data })
}
const deleteRecruitment = (_id) => {
  const api = ApiConst.recuiterment.delete(_id)
  return request.call(api.url, {
    method: api.method,
  })
}

export {
  fetch,
  deleteRecruitment,

}
