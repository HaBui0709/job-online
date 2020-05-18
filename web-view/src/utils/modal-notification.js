import React from 'react'
import { notification } from 'antd'

notification.config({
  duration: 3,
})

export default {
  success: (data) => {
    return notification.success({
      message: 'Thành công!',
      description: <img src={data.data.cover} alt="" style={{ width: '100px', height: '100px' }} />,
    })
  },
}
