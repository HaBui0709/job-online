import { ApiConst, AppConst } from '../../configs'
import { request } from '../../utils'

/**
 * Update account
 */
const updateAccount = (data, _id) => {
  const api = ApiConst.account.update(_id)
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

/**
 * Upload avatar
 *
 * @param {String} userId id of user
 * @param {File} file file to upload
 *
 */
const uploadCover = (userId, file) => {
  const body = {
    clientData: {
      name: AppConst.nameType.account,
      _id: userId,
    },
  }
  const api = ApiConst.upload.photos()
  return request.call(api.url, {
    method: api.method,
    file,
    body,
  }, 'Upload')
}

/**
 * Change avatar by id user
 *
 * @apiParam {String} _id user id
 * @apiParam {Object} data data cover
 *
 */
const changeCover = (_id, data) => {
  const api = ApiConst.account.changeAvatar(_id)
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}


export {
  updateAccount,
  uploadCover,
  changeCover,
}
