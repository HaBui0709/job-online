import { ApiConst } from '../../../configs'
import { request } from '../../../utils'

/**
 * Detail recuiterment
 */
const fetchDetailRecuitermentPosting = (_id) => {
  const api = ApiConst.recuiterment.showJobPosting(_id)
  return request.call(api.url, {
    method: api.method,
  })
}

/**
 * Check is exists CV
 */
const checkIsExistCV = () => {
  const api = ApiConst.common.checkIsExistCV()
  return request.call(api.url, {
    method: api.method,
  })
}

/**
 * Apply Job
 */
const applyJob = (data) => {
  const api = ApiConst.applies.applyJob()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

const getCVApproved = (data) => {
  const api = ApiConst.cv.getCVApproved()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

/**
 *  recuiterment similar
 */
const fechSimilarJobs = (_id) => {
  const api = ApiConst.recuiterment.similar(_id)
  return request.call(api.url, {
    method: api.method,
  })
}

export {
  fetchDetailRecuitermentPosting,
  checkIsExistCV,
  applyJob,
  getCVApproved,
  fechSimilarJobs,
}
