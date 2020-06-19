import key from '../../key'
import { targetNotFound } from '../helper';
import configs from '../../../configs'

const LOCALE_VI = configs.locales.vi

export default {
  [key.common.success]: 'Thành công!',
  [key.common.tokenVerifyFailed]: 'Phiên dùng đã hết hạn, vui lòng đăng nhập lại!',
  [key.common.serverError]: 'Đã có lỗi xảy ra, vui lòng thử lại!',
  [key.common.invalidParams]: 'Dữ liệu không đúng định dạng',
  [key.common.apiNotFound]: 'API không tìm thấy',
  [key.common.dataAlreadyExisted]: 'Dữ liệu này đã tồn tại trong hệ thống',
  [key.common.requireAuth]: 'Bạn phải đăng nhập để thực hiện hành động này',
  [key.common.requireAdmin]: 'Bạn không có quyền thực hiện hành động này',
  [key.common.invalidObjectId]: 'ObjectId không hợp lệ',
  [key.common.notRegisterAccount]: 'Tài khoản chưa được đăng ký',
  [key.common.requireRole]: 'Bạn không có quyền thực hiện hành động này',
  [key.common.authorizationExpired]: 'Mã ủy quyền này đã hết hạn.',
  [key.common.invalidFacebookAuthCode]: 'Mã xác thực không hợp lệ',
  [key.common.codeMustBeAString]: 'Mã xác thực phải là 1 chuỗi ký tự',
  [key.common.requireCode]: 'Mã xác thực không được rỗng',
  [key.common.dataNotFound]: 'Dữ liệu không tìm thấy',
  [key.common.noPermission]: 'Bạn không có quyền thực hiện hành động này',
  [key.common.comomUsernamOrPasswordInCorrect]: 'Tên đăng nhập hoặc mật khẩu không đúng',
  [key.common.comomEmailOrPasswordInCorrect]: 'Email hoặc mật khẩu không đúng!',
  [key.common.noCVActive]: 'Hiện tại không có hồ sơ xin việc nào đã duyệt! Vui lòng tạo hồ sơ tuyển dụng!',
  [key.common.requireCandidate]: 'Hành động này yêu cầu tài khoản đăng nhập là tài khoản nhà tuyển dụng',
  [key.common.applyJobNotFound]: 'Dự liệu nộp hồ sơ không tìm thấy!',
  [key.common.recuitermentIsExisted]: 'Tin tuyển dụng đã lưu',
  [key.common.favoriteHistoriesNotFound]: targetNotFound('Tin đã lưu'),
  [key.common.cvBeautyIsExisted]: 'Trang trí cv đã tồn tại',
  [key.common.cvBeautyNotFound]: targetNotFound('Cv beauty', LOCALE_VI),
  [key.common.notSameCareer]: 'Có vẻ như hồ sơ của bạn nộp có ngành nghề không phù hợp với tin tuyển dụng này!',
  [key.common.userIsBaned]: 'Tài khoản của bạn đã bị khóa không thể đăng nhập được',
}
