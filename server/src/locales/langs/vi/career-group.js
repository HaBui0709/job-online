import key from '../../key'
import { targetRequired, targetNotFound } from '../helper'
import configs from '../../../configs'

const LOCALE_VI = configs.locales.vi

export default {
  [key.careerGroup.careerGroupNameRequired]: targetRequired('Tên nhóm ngành nghề', LOCALE_VI),
  [key.careerGroup.careerGroupNotFound]: targetNotFound('Nhóm ngành nghề', LOCALE_VI),
}
