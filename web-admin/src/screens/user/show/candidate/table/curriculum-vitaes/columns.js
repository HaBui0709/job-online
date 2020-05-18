import React from 'react'
import { Link } from 'react-router-dom'
import { key } from '../../../../../../configs/locale'
import { format } from '../../../../../../utils'

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
    title: translate(key.titleAddress),
    dataIndex: 'business',
    render: (value, row) => {
      if (value) {
        return <Link to={`/businesses/${row._id}`}>{value.name}</Link>
      }
      return null
    },
  }, {
    title: translate(key.titleAvatar),
    dataIndex: 'type',
  }, {
    title: translate(key.titlePhone),
    dataIndex: 'phone',
    render: value => (format.phone(value)),
  }, {
    title: translate(key.titleCreatedAt),
    dataIndex: 'createdAt',
    render: value => (format.date(value)),
  }]
}
