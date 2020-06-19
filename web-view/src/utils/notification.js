import { message } from 'antd'
import { AppConst } from '../configs'

message.config({
  duration: 5,
})

export default {
  success: (text) => {
    return message[AppConst.notification.success](text)
  },
  error: (text) => {
    return message[AppConst.notification.error](text, 7)
  },
  info: (text) => {
    return message[AppConst.notification.info](text)
  },
  warning: (text) => {
    return message[AppConst.notification.warning](text)
  },
}
