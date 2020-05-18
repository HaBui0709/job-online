import key from '../../key'
import { targetNotFound } from '../helper'
import configs from '../../../configs'

const LOCALE_EN = configs.locales.en

export default {
  [key.common.success]: 'Success!',
  [key.common.serverError]: 'Server Error',
  [key.common.apiNotFound]: 'Api not found',
  [key.common.invalidParams]: 'The data is not formatted correctly',
  [key.common.tokenVerifyFailed]: 'Session expired, please login again!',
  [key.common.dataAlreadyExisted]: 'This data already exists in the system',
  [key.common.requireAdmin]: 'This action require admin role',
  [key.common.requireAuth]: 'You must be logged in to perform this action',
  [key.common.invalidObjectId]: 'Invalid ObjectId',
  [key.common.notRegisterAccount]: 'Your account have not register yet',
  [key.common.requireRole]: 'You do not have permission to perform this action',
  [key.common.authorizationExpired]: 'This authorization code has expired.',
  [key.common.invalidFacebookAuthCode]: 'Invalid authentication code',
  [key.common.codeMustBeAString]: 'Authentication code must be a string',
  [key.common.requireCode]: 'Authentication code is required',
  [key.common.dataNotFound]: 'Data not found',
  [key.common.noPermission]: 'You have no permission for this action',
  [key.common.comomUsernamOrPasswordInCorrect]: 'Username or password incorrect',
  [key.common.comomEmailOrPasswordInCorrect]: 'Email or password incorrect!',
  [key.common.noCVActive]: 'Hiện tại không có hồ sơ xin việc nào đã duyệt! Vui lòng tạo hồ sơ tuyển dụng!',
  [key.common.requireCandidate]: 'Hành động này yêu cầu tài khoản đăng nhập là tài khoản nhà tuyển dụng',
  [key.common.applyJobNotFound]: 'Dự liệu nộp hồ sơ không tìm thấy!',
  [key.common.recuitermentIsExisted]: 'Tin tuyển dụng đã lưu',
  [key.common.favoriteHistoriesNotFound]: targetNotFound('Tin đã lưu'),
  [key.common.cvBeautyIsExisted]: 'Trang trí cv đã tồn tại',
  [key.common.cvBeautyNotFound]: targetNotFound('Cv beauty', LOCALE_EN),
  [key.common.notSameCareer]: 'Có vẻ như hồ sơ của bạn nộp có ngành nghề không phù hợp với tin tuyển dụng này!',
  [key.common.userIsBaned]: 'Tài khoản của bạn đã bị khóa không thể đăng nhập được',
}
