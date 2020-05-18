import React from 'react'
// import { Link } from 'react-router-dom'
import { Tag, Avatar } from 'antd'
import { ImageConst } from '../../../../../configs'

export default () => {
  return [{
    title: '#',
    className: 'hidden-break-small',
    dataIndex: '',
    render: (value, row, index) => {
      return index + 1
    },
  }, {
    dataIndex: 'cover',
    render: (value) => {
      return (
        <Avatar shape="square" src={ImageConst.defaultPhoto} key={value} />
      )
    },
  }, {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (value) => {
      return <Tag color="green">{value}</Tag>
    },
  }]
}
