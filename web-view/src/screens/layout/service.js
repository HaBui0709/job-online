import { request } from '../../utils'
import { ApiConst } from '../../configs'

const getUserInfo = () => {
  const api = ApiConst.me.userInfo()
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

const fetchJobSuggest = () => {
  const api = ApiConst.home.fetchJobSuggest()
  return request.call(api.url, {
    method: api.method,
  })
}

const fetchNewJobs = () => {
  const api = ApiConst.home.fetchNewJobs()
  return request.call(api.url, {
    method: api.method,
  })
}

export {
  getUserInfo,
  fetchCareerGroup,
  fetchJobSuggest,
  fetchNewJobs,
}
