import key from '../../key'
import { targetNotFound, targetRequired } from '../helper'
import configs from '../../../configs'

const LOCALE_VI = configs.locales.vi
const fileKey = key.file

// 600 -> 699
export default {
  [fileKey.fileNotFound]: targetNotFound('File', LOCALE_VI),
  [fileKey.fileIdRequire]: targetRequired('File id', LOCALE_VI),
}
