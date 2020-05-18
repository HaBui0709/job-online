import key from '../../key'
import { targetRequired, targetInvalid, targetNotFound } from '../helper'
import configs from '../../../configs'

const businessKey = key.business
const LOCALE_VI = configs.locales.vi

export default {
  [businessKey.nameRequired]: targetRequired('Tên công ty', LOCALE_VI),
  [businessKey.businessDescENRequired]: targetRequired('English desciption', LOCALE_VI),
  [key.business.businessDescVIRequired]: targetRequired('Vietnamese description', LOCALE_VI),
  [key.business.businessPhoneInvalid]: targetInvalid('Email', LOCALE_VI),
  [key.business.businessEmailInvalid]: targetInvalid('Email', LOCALE_VI),
  [key.business.businessCityRequired]: targetRequired('City', LOCALE_VI),
  [key.business.businessLocationInvalid]: targetInvalid('Location', LOCALE_VI),
  [key.business.businessLocationRequired]: targetRequired('Location', LOCALE_VI),
  [key.business.businessWorkingHoursInvalid]: targetInvalid('Working hours', LOCALE_VI),
  [businessKey.businessNotFound]: targetNotFound('Business', LOCALE_VI),

  [key.business.businessManagerInvalid]: targetInvalid('Manager', LOCALE_VI),
  [key.business.businessManagerRequired]: targetRequired('Manager', LOCALE_VI),
}
