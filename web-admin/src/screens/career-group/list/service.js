import { request } from '../../../utils'
import { ApiConst } from '../../../configs'

/**
 * Fetch career groups
 */
const fetch = (data) => {
  const api = ApiConst.careerGroups.all()
  return request.call(api.url, { method: api.method, body: data })
}

/**
 * Create career group
 *
 * @param {Object} data
 */
const create = (data) => {
  const api = ApiConst.careerGroups.create()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

/**
 * Update career group
 *
 * @param {String} _id career group id
 * @param {Object} data
 */
const update = (_id, data) => {
  const api = ApiConst.careerGroups.update(_id)
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

/**
 * Change active status
 *
 * @param {String} _id career group id
 */
const changeStatus = (_id) => {
  const api = ApiConst.careerGroups.changeStatus(_id)
  return request.call(api.url, {
    method: api.method,
  })
}

export {
  fetch,
  create,
  update,
  changeStatus,
}
