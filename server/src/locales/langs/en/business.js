import key from '../../key'
import { targetRequired, targetInvalid, targetNotFound } from '../helper'
import configs from '../../../configs'

const businessKey = key.business
const LOCALE_EN = configs.locales.en

export default {
  [businessKey.nameRequired]: targetRequired('Name', LOCALE_EN),

  [businessKey.businessDescENRequired]: targetRequired('English desciption', LOCALE_EN),
  [key.business.businessDescVIRequired]: targetRequired('Vietnamese description', LOCALE_EN),
  [key.business.businessPhoneInvalid]: targetInvalid('Email', LOCALE_EN),
  [key.business.businessEmailInvalid]: targetInvalid('Email', LOCALE_EN),
  [key.business.businessCityRequired]: targetRequired('City', LOCALE_EN),
  [key.business.businessLocationInvalid]: targetInvalid('Location', LOCALE_EN),
  [key.business.businessLocationRequired]: targetRequired('Location', LOCALE_EN),
  [key.business.businessWorkingHoursInvalid]: targetInvalid('Working hours', LOCALE_EN),
  [businessKey.businessNotFound]: targetNotFound('Business', LOCALE_EN),

  [key.business.businessManagerInvalid]: targetInvalid('Manager', LOCALE_EN),
  [key.business.businessManagerRequired]: targetRequired('Manager', LOCALE_EN),
}
