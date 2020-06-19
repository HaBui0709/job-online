import { ApiConst } from '../../configs'
import { request } from '../../utils'


const searchJob = (data) => {
  const api = ApiConst.search.jobs()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

export {
  searchJob,
}
