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
    // Login choose
    [key.candidateList1]: 'Hàng trăm ngàn việc làm đang tuyển dụng',
    [key.candidateList2]: 'Tạo hồ sơ trực tuyến nhanh',
    [key.candidateList3]: 'Hàng ngàn nhà tuyển dụng tìm thấy bạn',
    [key.candidateLogin]: 'NGƯỜI TÌM VIỆC ĐĂNG NHẬP',
    [key.recuiterList1]: 'Đăng tin tuyển dụng miễn phí',
    [key.recuiterList2]: 'Lọc tìm hàng trăm ngàn hồ sơ ứng viên',
    [key.recuiterList3]: 'Hệ thống quản lý tuyển dụng thông minh',
    [key.recuiterLogin]: 'NHÀ TUYỂN DỤNG ĐĂNG NHẬP',
    [key.register]: 'Đăng ký',
    [key.login]: 'Đăng nhập',
    [key.textIsAccount]: 'Bạn chưa có tài khoản?',
    [key.candidateRegister]: 'NGƯỜI TÌM VIỆC ĐĂNG KÝ',
    [key.recuiterRegister]: 'NHÀ TUYỂN DỤNG ĐĂNG KÝ',

    [key.areYouAccount]: 'Bạn đã có tài khoản?',
    [key.invalidEmail]: 'Email không đúng định dạng',
    [key.password]: 'Mật khẩu',
    [key.invalidConfirmPassword]: 'Không khớp với mật khẩu!',
    [key.invalidPhone]: 'Số điện thoại không đúng!',
    [key.facebook]: 'Facebook',
  },

  // menu namespace
  [key.menu]: {
    [key.menuGames]: 'Games',
    [key.menuConfiguration]: 'Thiết lập',
    [key.menuUser]: 'Người dùng',
    [key.menuAgencies]: 'Đại lý',
  },
}

