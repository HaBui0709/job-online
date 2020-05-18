import { ApiConst, AppConst } from '../../../configs'
import { request } from '../../../utils'

/**
 * Fetch business
 */
const fetchBusiness = (data, _id) => {
  const api = ApiConst.business.show(_id)
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

const updateBusiness = (data, _id) => {
  const api = ApiConst.business.update(_id)
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

/**
 * Upload logo
 *
 * @param {String} businessId id of business
 * @param {File} file file to upload
 *
 */
const uploadCover = (businessId, file) => {
  const body = {
    clientData: {
      name: AppConst.nameType.business,
      _id: businessId,
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
 * Change logo by id business
 *
 * @apiParam {String} _id business id
 * @apiParam {Object} data data cover
 *
 */
const changeLogo = (_id, data) => {
  const api = ApiConst.business.changeLogo(_id)
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

const uploadCoverHeader = (businessId, file) => {
  const body = {
    clientData: {
      name: AppConst.nameType.businessHeader,
      _id: businessId,
    },
  }
  const api = ApiConst.upload.photos()
  return request.call(api.url, {
    method: api.method,
    file,
    body,
  }, 'Upload')
}

export {
  fetchBusiness,
  updateBusiness,
  uploadCover,
  changeLogo,
  uploadCoverHeader,
}
