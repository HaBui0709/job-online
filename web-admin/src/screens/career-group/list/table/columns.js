import React from 'react'
import { Link } from 'react-router-dom'
import { Tag, Checkbox, Tooltip, Icon, Button } from 'antd'
import { key } from '../../../../configs/locale'
import { format } from '../../../../utils'

export default (context) => {
  const { translate, toggleModal, dispatch } = context.props

  const changeActiveStatus = (_id) => {
    dispatch({
      type: 'careerGroups/changeStatus',
      _id,
    })
  }

  const onUpdate = (careerGroup) => {
    toggleModal('edit', careerGroup)
  }

  return [{
    title: '#',
    className: 'hidden-break-small',
    dataIndex: '',
    render: (value, row, index) => {
      return index + 1
    },
  }, {
    title: translate(key.nameCareerGroup),
    dataIndex: 'name',
    render: (value, row) => {
      return (
        <Link to={`/career-groups/${row._id}`}>{value}</Link>
      )
    },
  }, {
    title: translate(key.children),
    align: 'center',
    dataIndex: 'children',
    render: value => format.number(value),
  }, {
    title: translate(key.createdAt),
    align: 'center',
    dataIndex: 'createdAt',
    className: 'hidden-break-small',
    render: value => format.date(value),
  }, {
    title: translate(key.titleStatus),
    dataIndex: 'active',
    render: (value) => {
      const text = value ? translate(key.availability) : translate(key.unavailability)
      const color = value ? 'green' : 'red'
      return <Tag color={color}>{text}</Tag>
    },
  }, {
    align: 'center',
    render: (value, row) => (
      <Tooltip title={translate(key.changeStatus)}>
        <Checkbox defaultChecked={row.active} onChange={() => changeActiveStatus(row._id)} />
      </Tooltip>
    ),
  }, {
    align: 'center',
    render: (value, row) => (
      <Tooltip title={translate(key.update)}>
        <Button size="small" onClick={() => onUpdate(row)}>
          <Icon type="edit" />
        </Button>
      </Tooltip>
    ),
  }]
}
