import { ApiConst, AppConst } from '../../../configs'
import { request } from '../../../utils'

const fetchCareerGroup = () => {
  const api = ApiConst.search.careerGroup()
  return request.call(api.url, {
    method: api.method,
  })
}

const createRecuiterment = (data) => {
  const api = ApiConst.recuiterment.create()
  return request.call(api.url, {
    method: api.method,
    body: data,
  })
}

/**
 * Upload cover
 *
 * @param {File} file file to upload
 *
 */
const uploadCover = (file) => {
  const body = {
    clientData: {
      name: AppConst.nameType.recucitermentCover,
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
  createRecuiterment,
  fetchCareerGroup,
  uploadCover,
}
