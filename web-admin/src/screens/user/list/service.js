import { request } from '../../../utils'
import { ApiConst } from '../../../configs'

export function fetch(data) {
  const api = ApiConst.users.all()
  return request.call(api.url, { method: api.method, body: data })
}

