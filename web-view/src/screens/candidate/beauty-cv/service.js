import { ApiConst } from '../../../configs'
import { request } from '../../../utils'

/**
 * Fetcj list CV detail
 */
const fetchListCVDetail = () => {
  const api = ApiConst.cvBeauty.all()
  return request.call(api.url, {
    method: api.method,
  })
}


/**
 * All CV
 */
const fetchAllCV = () => {
  const api = ApiConst.cv.all()
  return request.call(api.url, {
    method: api.method,
  })
}

/**
 * Save beauty cv
 */
const saveBeautyCV = (data) => {
  const api = ApiConst.cvBeauty.saveCVBeauty()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

/**
 *
 * Preview cv beauty
 *
 * @param {String} id cv beauty id
 *
 */
const previewCVBeauty = (id) => {
  const api = ApiConst.cvBeauty.previewCVBeauty(id)
  return request.call(api.url, {
    method: api.method,
  })
}

/**
 *
 * Preview cv beauty
 *
 * @param {String} id cv beauty id
 *
 */
const deleteCVBeauty = (id) => {
  const api = ApiConst.cvBeauty.deleteCVBeauty(id)
  return request.call(api.url, {
    method: api.method,
  })
}

export {
  fetchListCVDetail,
  fetchAllCV,
  saveBeautyCV,
  previewCVBeauty,
  deleteCVBeauty,
}
