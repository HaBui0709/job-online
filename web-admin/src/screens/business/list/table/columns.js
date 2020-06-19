import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Tag } from 'antd'
import { RcIconStatus } from '../../../../components'
import { key } from '../../../../configs/locale'
import { format, helper } from '../../../../utils'

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
          <Link to={`/businesses/${row._id}`} >
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
    title: translate(key.titleBusinessName),
    dataIndex: 'name',
    render: (value, row) => {
      return (
        <Link to={`/businesses/${row._id}`}>
          <RcIconStatus translate={translate} active={row.active} />{value}
        </Link>
      )
    },
  }, {
    title: 'Hotline',
    dataIndex: 'phone',
    render: (value) => {
      return format.phone(value)
    },
  }, {
    title: 'Địa chỉ',
    className: 'hidden-break-small',
    dataIndex: 'address',
  }, {
    title: translate(key.titleCity),
    dataIndex: 'city',
    render: (value) => {
      return <Tag color="geekblue">{helper.getCity(value)}</Tag>
    },
  }]
}
