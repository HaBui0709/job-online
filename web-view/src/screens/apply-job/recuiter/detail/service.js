import { ApiConst } from '../../../../configs'
import { request } from '../../../../utils'

/**
 * Detail recuiterment
 */
const fetchDetailRecuitermentApproved = (_id) => {
  const api = ApiConst.recuiterment.fetchDetailRecuitermentApproved(_id)
  return request.call(api.url, {
    method: api.method,
  })
}

const fetch = (data) => {
  const api = ApiConst.applies.fetchDetail()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

const fetchCVById = (cvId) => {
  const api = ApiConst.cv.show(cvId)
  return request.call(api.url, {
    method: api.method,
  })
}

const changeStatusAndNotification = (data, id) => {
  const api = ApiConst.applies.changeStatusAndNotification(id)
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

const fetchUserApplyJobs = (data) => {
  const api = ApiConst.applies.fetchDetail()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

export {
  fetchDetailRecuitermentApproved,
  fetch,
  fetchCVById,
  changeStatusAndNotification,
  fetchUserApplyJobs,
}
