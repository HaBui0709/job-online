import key from './key'
import ComponentConst from '../component'

export default {
  // translations namespace, can add more namespace below this namespace
  [key.translations]: {
    [key.confirm]: 'Xác nhận',
    [key.cancel]: 'Hủy',
    [key.search]: 'Tìm kiếm',
    [key.error404]: '404',
    [key.titleError404]: 'Xin lỗi, trang không tìm thấy !',
    [key.goHome]: 'Trở về trang chủ',
    [key.ok]: 'Đồng ý',
    [key.nameIsRequired]: 'Tên không được để trống',
    [key.passwordIsRequired]: 'Mật khẩu không được để trống',
    [key.passwordMinLength]: `Mật khẩu phải có ít nhất ${ComponentConst.common.validation.passwordMinLength} ký tự`,
    [key.next]: 'Tiếp',
    [key.prev]: 'Quay lại',
    [key.delete]: 'Xóa',
    [key.update]: 'Cập nhật',
    [key.create]: 'Tạo',
    [key.allFieldsRequired]: 'Vui lòng điền đầy đủ thông tin',
    [key.detail]: 'Chi tiết',
    [key.createdAt]: 'Ngày tạo',
    [key.updatedAt]: 'Ngày cập nhật',
    [key.deleteConfirm]: 'Bạn chắc chắn muốn xóa hũ?',
    [key.action]: 'Hành động',
    [key.agencyType]: 'Đại lý',
    [key.positiveInteger]: 'Vui lòng nhập số nguyên dương',
    [key.titleEmail]: 'Email',
    [key.titlePhone]: 'SĐT',
    [key.titleAvatar]: 'Ảnh đại diện',
    [key.titleCity]: 'Thành phố',
    [key.verified]: 'Xác nhận',
    [key.changeStatus]: 'Thay đổi trạng thái',
    [key.status]: 'Trạng thái',
    [key.titleRole]: 'Loại người dùng',
  },

  // menu namespace
  [key.menu]: {
    [key.menuUser]: 'Người dùng',
    [key.menuCareerGroup]: 'Nhóm ngành nghề',
    [key.menuRecuiterment]: 'Hồ sơ tin tuyển dụng',
    [key.menuCV]: 'Hồ sơ xin việc',
    // [key.menyStatistic]: 'Thống kê',
    [key.menuBusinesses]: 'Công ty',
  },

  // Users
  [key.users]: {
    [key.placeholderSearchUser]: 'Name | Email | SĐT',
    [key.username]: 'Username',
    [key.fullName]: 'Full name',
    [key.typeOfUser]: 'Loại',
    [key.signUp]: 'Đăng ký',
    [key.birthday]: 'Ngày sinh',
    [key.gender]: 'Giới tính',
    [key.facebook]: 'Facebook',
    [key.titleUnban]: 'Hủy khóa',
    [key.titleBan]: 'Khóa',
    [key.titleConfirmPhone]: 'Xác nhận số điện thoại',
    [key.phoneIsRequired]: 'SĐT không được trống',
    [key.titleCurriculumVitaes]: 'Danh sách hồ sơ',
    [key.titleSubmissionHistories]: 'Lịch sử nộp hồ sơ',
    [key.titleFollowing]: 'Đang theo dõi',
    [key.titleConfirmBan]: 'Bạn chắc chắn muốn khóa tài khoản này?',
    [key.titleConfirmUnban]: 'Bạn chắc chắn muốn mở khóa tài khoản này?',
    [key.contentBan]: 'Sau khi xác nhận khóa thành công, tài khoản này sẽ bị khóa lại không thể đăng nhập vào hệ thống được.',
    [key.contentUnban]: 'Sau khi xác nhận mở khóa thành công, tài khoản này sẽ hủy khóa và có thể đăng nhập vào hệ thống được.',
  },


  // CAREER GROUP
  [key.careerGroups]: {
    [key.createCareerGroup]: 'Tạo mới nhóm ngành nghề',
    [key.titleName]: 'Tên NNN',
    [key.nameCareerGroup]: 'Tên nhóm ngành nghề',
    [key.children]: 'Children',
    [key.unavailability]: 'Không khả dụng',
    [key.availability]: 'Khả dụng',
    [key.titleStatus]: 'Trạng thái',
    [key.updateCareerGroup]: 'Cập nhật nhóm ngành nghề',
  },


  // Recuiterments
  [key.recuiterment]: {
    [key.titleRecuiterment]: 'Tiêu đề tuyển dụng',
    [key.titleBusiness]: 'Công ty',
    [key.countUserApply]: 'SL ứng viên nộp',
    [key.deadline]: 'Hạn nộp hồ sơ',
    [key.titleRecuiter]: 'Người tạo tin',
  },

  // CV
  [key.cv]: {
    [key.titleNameUser]: 'Tên ứng viên',
    [key.desiredLocation]: 'Công việc mong muốn',
    [key.desiredCareer]: 'Ngành nghề',
    [key.minimumWage]: 'Mức lương mong muốn tối thiểu',
  },


  // Businesses
  [key.business]: {
    [key.titleBusinessName]: 'Tên',
    [key.listRecuiterments]: 'Danh sách hồ sơ tuyển dụng',
    [key.position]: 'Vị trí',
  },
}

