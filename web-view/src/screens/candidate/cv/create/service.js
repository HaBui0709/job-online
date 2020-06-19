import { ApiConst } from '../../../../configs'
import { request } from '../../../../utils'

const fetchCareerGroup = () => {
  const api = ApiConst.search.careerGroup()
  return request.call(api.url, {
    method: api.method,
  })
}

const createCV = (data) => {
  const api = ApiConst.cv.create()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}
export {
  createCV,
  fetchCareerGroup,
}
