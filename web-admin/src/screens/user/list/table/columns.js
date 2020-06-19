import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Tag, Icon } from 'antd'
import { key } from '../../../../configs/locale'
import { format, helper } from '../../../../utils'

export default (context) => {
  const { translate } = context.props

  const getRole = (user) => {
    let nameRole = ''
    if (user.admin.role) {
      nameRole = user.admin.role
      return <Tag color="green">{nameRole}</Tag>
    }
    if (user.role) {
      nameRole = helper.getRole(user.role)
    }
    return <Tag color="green">{nameRole}</Tag>
  }
  return [{
    title: '#',
    className: 'hidden-break-small',
    dataIndex: '',
    render: (value, row, index) => {
      return index + 1
    },
  }, {
    title: '',
    dataIndex: 'avatar',
    className: 'hidden-break-small',
    render: (value) => {
      return (<Avatar src={value} shape="square" />)
    },
  }, {
    title: translate(key.username),
    dataIndex: 'username',
    render: (value, row) => {
      return (
        <Link to={`/users/${row._id}`}>
          {value}
        </Link>
      )
    },
  }, {
    title: translate(key.fullName),
    dataIndex: 'fullName',
  }, {
    title: translate(key.titleRole),
    render: (value, row) => {
      return (
        getRole(row)
      )
    },
  }, {
    title: 'Email',
    dataIndex: 'email',
    className: 'hidden-break-small',
    width: '20%',
    render: (value) => {
      return (
        <Fragment>
          {
          value &&
          <p className="email-phone"><Icon type="mail" theme="twoTone" twoToneColor="#f60" /> {value}</p>
        }
        </Fragment>
      )
    },
  }, {
    title: 'Phone',
    dataIndex: 'phone',
    width: '14%',
    render: (value) => {
      return (
        <Fragment>
          {
            value &&
            <p className="email-phone">
              <Icon type="phone" theme="twoTone" twoToneColor="#f60" /> {format.phone(value)}
            </p>
          }
        </Fragment>
      )
    },
  }, {
    title: translate(key.titleCity),
    dataIndex: 'city',
    render: (value) => {
      return <Tag color="geekblue">{format.city(value)}</Tag>
    },
  }, {
    title: translate(key.titleBan),
    dataIndex: 'statuses.banned',
    render: (value) => {
      // eslint-disable-next-line no-undef
      return <Tag color={value ? 'red' : 'blue'}>{value ? 'Đã khóa' : 'Khả dụng'}</Tag>
    },
  }]
}
