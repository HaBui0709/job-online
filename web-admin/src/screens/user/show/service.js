import { request } from '../../../utils'
import { ApiConst } from '../../../configs'

/**
 * Fetch data user detail
 *
 * @param {String} _id
 *
 */
const fetch = (_id) => {
  const api = ApiConst.users.show(_id)
  return request.call(api.url, { method: api.method })
}

/**
 * Change ban
 *
 * @param {String} _id
 */
const changeBan = (_id) => {
  const api = ApiConst.users.changeBan(_id)
  return request.call(api.url, {
    method: api.method,
  })
}

/**
 * Confirm phone
 *
 * @param {String} _id
 * @param {Object} data
 */
const confirmPhone = (_id, data) => {
  console.log('_id', _id, data)
  // const api = ApiConst.getIn(['user', 'confirmPhone'])(_id)
  // return request.call(api.url, { method: api.method, body: data })
}

/**
 * Unblock to user
 *
 * @param {String} _id
 */
const unblockUser = (_id) => {
  console.log('_id', _id)
  // const api = ApiConst.getIn(['businessBlockedUsers', 'unblock'])(_id)
  // return request.call(api.url, { method: api.method })
}

/**
 * Block user
 *
 * @param {String} _id
 * @param {Object} data
 */
const blockUser = (_id, data) => {
  console.log('block user', _id, data)
  // const api = ApiConst.getIn(['businessBlockedUsers', 'block'])(_id)
  // return request.call(api.url, { method: api.method, body: data })
}

export {
  fetch,
  changeBan,
  confirmPhone,
  unblockUser,
  blockUser,
}
