import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Tag } from 'antd'
import { key } from '../../../configs/locale'
import { format, helper } from '../../../utils'

export default (context) => {
  const { translate } = context.props
  return [{
    title: '#',
    className: 'hidden-break-small',
    dataIndex: '',
    render: (value, row, index) => {
      return index + 1
    },
  }, {
    dataIndex: 'user.avatar',
    render: value => <Avatar shape="square" src={value} />,
  }, {
    title: translate(key.titleNameUser),
    dataIndex: 'user.fullName',
    render: (value, row) => {
      return (
        <Link to={`/users/${row.user._id}`}>{value}</Link>
      )
    },
  }, {
    title: translate(key.desiredLocation),
    dataIndex: 'overviewInfo.desiredLocation',
    render: (value, row) => {
      return (
        <Link to={`/cvs/${row._id}`}>{value}</Link>
      )
    },
  }, {
    title: translate(key.minimumWage),
    dataIndex: 'overviewInfo.minimumWage',
    render: value => <span>{format.number(value)} VNĐ</span>,
  }, {
    title: translate(key.createdAt),
    align: 'center',
    dataIndex: 'createdAt',
    className: 'hidden-break-small',
    render: value => format.date(value),
  }, {
    title: translate(key.status),
    dataIndex: 'status',
    render: (value) => {
      const { color, name } = helper.getStatusNameAndColorByIdOfCVs(value)
      return <Tag color={color}>{name}</Tag>
    },
  }]
}
