import key from '../../key'
import { targetRequired, targetNotFound, targetInvalid } from '../helper'
import configs from '../../../configs'

const userKey = key.user
const LOCALE_EN = configs.locales.en

export default {
  [userKey.userNameLenghtMustBeLessThan128Chars]: 'Name length must be less than 128 characters',
  [userKey.userNotFound]: targetNotFound('User', LOCALE_EN),
  [userKey.userNameIsRequire]: targetRequired('Username', LOCALE_EN),
  [userKey.userPasswordIsRequire]: targetRequired('Password', LOCALE_EN),
  [userKey.userPaswordLengthMustGreatThan6Chars]: 'Password must contain at least 6 characters',
  [userKey.userNameMustBeAString]: targetInvalid('Username', LOCALE_EN),
  [userKey.userPasswordMustBeString]: targetInvalid('Password', LOCALE_EN),
  [userKey.userGemMustBeANumber]: 'Gem must be a number',
  [userKey.userGemRequired]: targetRequired('Gem', LOCALE_EN),
  [userKey.userIdRequired]: targetRequired('User id', LOCALE_EN),
  [userKey.userNotEnoughGem]: 'User not enough gem for sending',
  [userKey.userPasswordDoesNotMatch]: 'Password confirm does not match',
  [userKey.userPhoneRequired]: targetRequired('Phone', LOCALE_EN),
  [userKey.userGemMustGreaterThan0]: 'Gem must be greater than or equal 0',
  [userKey.userExchangeRateMax1]: 'Exchange rate must less than or equal 1',
  [userKey.userExchangeRateMin0]: 'Exchange rate must greater than or equal 0',
  [userKey.userPasswordConfirmRequire]: targetRequired('Password confirm', LOCALE_EN),
  [userKey.userAlreadyAgency]: 'User already agency',
  [userKey.userExchangeRateBuyMustBeANumber]: 'Exchange rate buy must be a number',
  [userKey.userExchangeRateSellMustBeANumber]: 'Exchange rate sell must be a number',
  [userKey.userExchangeRateBuyRequire]: targetRequired('Exchange rate buy', LOCALE_EN),
  [userKey.userExchangeRateSellRequire]: targetRequired('Excahgne rate sell', LOCALE_EN),
  [userKey.userNameInvalid]: targetInvalid('Username', LOCALE_EN),
  [userKey.userEmailMustBeString]: 'Email must be a string',
  [userKey.userEmailIsRequire]: targetRequired('Email', LOCALE_EN),
  [userKey.userUsernameInvalid]: targetInvalid('Username', LOCALE_EN),
  [userKey.userCofirmPasswordIsRequire]: targetRequired('ConfirmPassword', LOCALE_EN),
  [userKey.userFullNamedIsRequire]: targetRequired('Full name', LOCALE_EN),
  [userKey.userBirthdayInvalid]: targetInvalid('Birthday', LOCALE_EN),
  [userKey.userBirthdayIsRequired]: targetRequired('Birthday', LOCALE_EN),
  [userKey.userGenderIsRequired]: targetRequired('Gender', LOCALE_EN),
  [userKey.userCityIsRequired]: targetRequired('City', LOCALE_EN),
  [userKey.userAddressIsRequired]: targetRequired('Address', LOCALE_EN),
  [userKey.confirmPasswordIncorrect]: 'Confirm password incorrect!',

  // Unique
  [userKey.usernameIsExisted]: 'Username is existed!',
  [userKey.emailIsExisted]: 'Email is existed!',
  [userKey.phoneIsExisted]: 'Phone is existed!',
  [userKey.plasticCardIsExisted]: 'Plastic card is existed!',
}
