import { request } from '../../../utils'
import { ApiConst } from '../../../configs'

/**
 * Fetch recuiterments
 */
const fetch = (data) => {
  const api = ApiConst.candidate.allFavoriteHistories()
  return request.call(api.url, { method: api.method, body: data })
}

/**
 * Delete favorite job
 */
const deleteFavoriteJob = (id) => {
  const api = ApiConst.candidate.deleteFavoriteHistory(id)
  return request.call(api.url, { method: api.method })
}
export {
  fetch,
  deleteFavoriteJob,
}
