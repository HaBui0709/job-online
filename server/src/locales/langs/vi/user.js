import key from '../../key'
import { targetRequired, targetNotFound, targetInvalid } from '../helper'
import configs from '../../../configs'

const userKey = key.user
const LOCALE_VI = configs.locales.vi

export default {
  [userKey.userNameLenghtMustBeLessThan128Chars]: 'Tên tối đa 128 ký tự',
  [userKey.userNotFound]: targetNotFound('Thành viên', LOCALE_VI),
  [userKey.userNameIsRequire]: targetRequired('Tên đăng nhập', LOCALE_VI),
  [userKey.userPasswordIsRequire]: targetRequired('Mật khẩu', LOCALE_VI),
  [userKey.userPaswordLengthMustGreatThan6Chars]: 'Mật khẩu phải chứa ít nhất 6 ký tự',
  [userKey.userNameMustBeAString]: targetInvalid('Tên đăng nhập', LOCALE_VI),
  [userKey.userPasswordMustBeString]: targetInvalid('Mật khẩu', LOCALE_VI),
  [userKey.userGemMustBeANumber]: 'Gem phải là số',
  [userKey.userGemRequired]: targetRequired('Gem', LOCALE_VI),
  [userKey.userIdRequired]: targetRequired('User id', LOCALE_VI),
  [userKey.userNotEnoughGem]: 'Người chơi không đủ gem để gửi',
  [userKey.userPasswordDoesNotMatch]: 'Xác nhận mật khẩu không đúng',
  [userKey.userPhoneRequired]: targetRequired('Sđt', LOCALE_VI),
  [userKey.userGemMustGreaterThan0]: 'Gem phải lớn hơn hoặc bằng 0',
  [userKey.userExchangeRateMax1]: 'Tỷ lệ chuyển tiền phải nhỏ hơn hoặc bằng 1',
  [userKey.userExchangeRateMin0]: 'Tỷ lệ chuyển tiền phải lớn hơn hoặc bằng 0',
  [userKey.userPasswordConfirmRequire]: targetRequired('Xác nhận mật khẩu', LOCALE_VI),
  [userKey.userAlreadyAgency]: 'Người dùng đã là đại lý',
  [userKey.userExchangeRateBuyMustBeANumber]: 'Tỷ lệ mua phải là số',
  [userKey.userExchangeRateSellMustBeANumber]: 'Tỷ lệ bán phải là số',
  [userKey.userExchangeRateBuyRequire]: targetRequired('Tỷ lệ mua', LOCALE_VI),
  [userKey.userExchangeRateSellRequire]: targetRequired('Tỷ lệ bán', LOCALE_VI),
  [userKey.userNameInvalid]: targetInvalid('Username', LOCALE_VI),

  [userKey.userEmailMustBeString]: 'Email phải là kiểu String',
  [userKey.userEmailIsRequire]: targetRequired('Email', LOCALE_VI),
  [userKey.userUsernameInvalid]: targetInvalid('Username', LOCALE_VI),
  [userKey.userCofirmPasswordIsRequire]: targetRequired('Xác nhận mật khẩu', LOCALE_VI),
  [userKey.userFullNamedIsRequire]: targetRequired('Tên đầy đủ', LOCALE_VI),

  [userKey.userBirthdayInvalid]: targetInvalid('Ngày sinh', LOCALE_VI),
  [userKey.userBirthdayIsRequired]: targetRequired('Ngày sinh', LOCALE_VI),
  [userKey.userGenderIsRequired]: targetRequired('Giới tính', LOCALE_VI),
  [userKey.userCityIsRequired]: targetRequired('Thành phố', LOCALE_VI),
  [userKey.userAddressIsRequired]: targetRequired('Địa chỉ', LOCALE_VI),
  [userKey.confirmPasswordIncorrect]: 'Xác nhận mật khẩu không khớp!',

  // Unique
  [userKey.usernameIsExisted]: 'Username đã tồn tại!',
  [userKey.emailIsExisted]: 'Email đã tồn tại',
  [userKey.phoneIsExisted]: 'Số điện thoại đã tồn tại',
  [userKey.plasticCardIsExisted]: 'Số chứng minh nhân dân đã tồn tại',
}
