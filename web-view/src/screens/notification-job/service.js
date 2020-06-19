import { ApiConst } from '../../configs'
import { request } from '../../utils'

/**
 * Fetch notification job by user
 */
const fetchNotification = () => {
  const api = ApiConst.notifications.show()
  return request.call(api.url, {
    method: api.method,
  })
}

/**
 * Create
 */
const create = (data) => {
  const api = ApiConst.notifications.create()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

/**
 * Delete notification
 */
const deleteNotification = () => {
  const api = ApiConst.notifications.delete()
  return request.call(api.url, {
    method: api.method,
  })
}
export {
  fetchNotification,
  create,
  deleteNotification,
}
