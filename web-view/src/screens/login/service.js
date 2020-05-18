import { request } from '../../utils'
import { ApiConst } from '../../configs'

const loginCandidate = (data) => {
  const api = ApiConst.common.loginCandidate()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

const loginRecuiter = (data) => {
  const api = ApiConst.common.loginRecuiter()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

export {
  loginCandidate,
  loginRecuiter,
}
