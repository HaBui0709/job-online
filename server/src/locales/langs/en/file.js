import key from '../../key'
import { targetNotFound, targetRequired } from '../helper'
import configs from '../../../configs'

const LOCALE_EN = configs.locales.en
const fileKey = key.file

// 1300 -> 1399
export default {
  [fileKey.fileNotFound]: targetNotFound('File', LOCALE_EN),
  [fileKey.fileIdRequire]: targetRequired('File id', LOCALE_EN),
}
