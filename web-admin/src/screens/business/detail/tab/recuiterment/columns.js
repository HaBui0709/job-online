import React from 'react'
import { Link } from 'dva/router'
import { Tag, Avatar } from 'antd'

import { key } from '../../../../../configs/locale'
import { format, helper } from '../../../../../utils'

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
    title: '',
    dataIndex: 'logo',
    render: (value, row) => {
      return (
        <span className="avatar">
          <Link to={`/recuiterments/${row._id}`} >
            <Avatar
              shape="square"
              size="large"
              src={value}
            />
          </Link>
        </span>
      )
    },
  }, {
    title: translate(key.titleRecuiterment),
    dataIndex: 'title',
    render: (value) => {
      return (
        <Link to={`/recuiterments/${value._id}`}>
          {value}
        </Link>
      )
    },
  }, {
    title: translate(key.position),
    dataIndex: 'jobPosition',
    render: value => helper.getRank(value),
  }, {
    title: translate(key.countUserApply),
    align: 'center',
    dataIndex: 'userApply',
    render: value => format.number(value),
  }, {
    title: translate(key.titleRecuiter),
    dataIndex: 'user.fullName',
    render: (value, row) => {
      return (
        <Link to={`/users/${row.user._id}`}>{value}</Link>
      )
    },
  }, {
    title: translate(key.createdAt),
    dataIndex: 'createdAt',
    render: (value) => {
      return format.date(value)
    },
  }, {
    title: translate(key.deadline),
    align: 'center',
    dataIndex: 'deadline',
    render: value => format.dateWithNoHour(value),
  }, {
    title: translate(key.titleStatus),
    dataIndex: 'status',
    render: (value) => {
      const { color = '', name = '' } = helper.getStatusNameAndColorById(value)
      return <Tag color={color}>{name}</Tag>
    },
  }]
}
