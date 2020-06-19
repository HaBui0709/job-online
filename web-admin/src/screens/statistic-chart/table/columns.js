import React from 'react'
import { Link } from 'react-router-dom'
import { Tag, Avatar } from 'antd'
import { key } from '../../../configs/locale'
import { format, helper } from '../../../utils'
import { ImageConst } from '../../../configs'

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
    dataIndex: 'cover',
    render: value => <Avatar shape="square" src={ImageConst.defaultPhoto} key={value} />,
  }, {
    title: translate(key.titleRecuiterment),
    dataIndex: 'title',
    render: (value, row) => {
      return (
        <Link to={`/recuiterments/${row._id}`}>{value}</Link>
      )
    },
  }, {
    title: translate(key.titleBusiness),
    dataIndex: 'business.name',
    render: (value, row) => {
      return (
        <Link to={`/businesses/${row.business._id}`}>{value}</Link>
      )
    },
  }, {
    title: translate(key.titleRecuiter),
    dataIndex: 'user.fullName',
    render: (value, row) => {
      return (
        <Link to={`/users/${row.user._id}`}>{value}</Link>
      )
    },
  }, {
    title: translate(key.countUserApply),
    align: 'center',
    dataIndex: 'userApply',
    render: value => format.number(value),
  }, {
    title: translate(key.deadline),
    align: 'center',
    dataIndex: 'deadline',
    render: value => format.date(value),
  }, {
    title: translate(key.createdAt),
    align: 'center',
    dataIndex: 'createdAt',
    className: 'hidden-break-small',
    render: value => format.date(value),
  }, {
    title: translate(key.titleStatus),
    dataIndex: 'status',
    render: (value) => {
      const { color = '', name = '' } = helper.getStatusNameAndColorById(value)
      return <Tag color={color}>{name}</Tag>
    },
  }]
}
