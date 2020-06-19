import key from '../../key'
import { targetRequired, targetNotFound } from '../helper'
import configs from '../../../configs'

const LOCALE_EN = configs.locales.en

export default {
  [key.careerGroup.careerGroupNameRequired]: targetRequired('Name', LOCALE_EN),
  [key.careerGroup.careerGroupNotFound]: targetNotFound('Career group', LOCALE_EN),
}
