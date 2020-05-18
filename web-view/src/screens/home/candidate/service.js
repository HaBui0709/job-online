import { ApiConst } from '../../../configs'
import { request } from '../../../utils'

/**
 * All CV
 */
const fetchJobInteresting = () => {
  const api = ApiConst.home.jobsInterestring()
  return request.call(api.url, {
    method: api.method,
  })
}

const fetchJobUrgent = () => {
  const api = ApiConst.home.fetchJobUrgent()
  return request.call(api.url, {
    method: api.method,
  })
}

const fetchCareerGroup = () => {
  const api = ApiConst.search.careerGroup()
  return request.call(api.url, {
    method: api.method,
  })
}

const fetchBusinesses = () => {
  const api = ApiConst.business.all()
  return request.call(api.url, {
    method: api.method,
  })
}

const saveFavorite = (data) => {
  const api = ApiConst.candidate.saveFavorite()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

export {
  fetchJobInteresting,
  fetchJobUrgent,
  fetchCareerGroup,
  fetchBusinesses,
  saveFavorite,
}
