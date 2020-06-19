import React from 'react'
import { Link } from 'react-router-dom'
import { Tag, Avatar, Button, Icon, Tooltip, Badge } from 'antd'
import { format } from '../../../../../utils'
import { ImageConst } from '../../../../../configs'

export default (context) => {
  const { showModal } = context.props
  return [{
    title: '#',
    className: 'hidden-break-small',
    dataIndex: '',
    render: (value, row, index) => {
      return index + 1
    },
  }, {
    dataIndex: 'cover',
    render: (value, row) => {
      if (row.totalCVPending) {
        return (
          <Badge count={row.totalCVPending} title={`Có ${row.totalCVPending} hồ sơ đang chờ duyệt`}>
            <Avatar shape="square" src={value || ImageConst.defaultPhoto} key={value} />
          </Badge>
        )
      } else {
        return (
          <Avatar shape="square" src={value || ImageConst.defaultPhoto} key={value} />
        )
      }
    },
  }, {
    title: 'Tiêu đề tuyển dụng',
    dataIndex: 'title',
    render: (value, row) => {
      return (
        <Link to={`/recuiterments/${row._id}`}>{value}</Link>
      )
    },
  }, {
    title: 'SL ứng viên đã nộp',
    align: 'center',
    dataIndex: 'totalCvApplies',
    render: (value, row) => <Button onClick={() => showModal('đã nộp', { recuiterment: row._id, status: 'all' })}>{format.number(value)}</Button>,
  }, {
    title: 'SL ứng viên đã duyệt',
    align: 'center',
    dataIndex: 'totalCVApproved',
    render: (value, row) => <Button onClick={() => showModal('đã duyệt', { recuiterment: row._id, status: 'approved' })}>{format.number(value)}</Button>,
  }, {
    title: 'SL ứng viên đã từ chối',
    align: 'center',
    dataIndex: 'totalCVRejected',
    render: (value, row) => <Button onClick={() => showModal('đã từ chối', { recuiterment: row._id, status: 'rejected' })}>{format.number(value)}</Button>,
  }, {
    title: 'Hạn nộp hồ sơ',
    align: 'center',
    dataIndex: 'deadline',
    render: value => format.dateWithNoHour(value),
  }, {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (value) => {
      return <Tag color="green">{value}</Tag>
    },
  }, {
    render: (value, row) => {
      return (
        <div>
          <Tooltip title="Xem chi tiết">
            <Link to={`/recuiter/apply-jobs/${row._id}`}>
              <Button>
                <Icon type="eye" />
              </Button>
            </Link>
          </Tooltip>
        </div>
      )
    },
  }]
}
