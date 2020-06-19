import React from 'react'
import { Link } from 'react-router-dom'
import { Tag, Avatar, Button, Icon, Tooltip } from 'antd'
import { format } from '../../../../utils'
import { ImageConst } from '../../../../configs'

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
    render: value => <Avatar shape="square" src={value || ImageConst.defaultPhoto} key={value} />,
  }, {
    title: 'Tiêu đề tuyển dụng',
    dataIndex: 'title',
    render: (value, row) => {
      return (
        <Link to={`/recuiterments/${row._id}`}>{value}</Link>
      )
    },
  }, {
    title: 'Hạn nộp hồ sơ',
    align: 'center',
    dataIndex: 'deadline',
    render: value => format.date(value),
  }, {
    title: 'Ngày tạo',
    align: 'center',
    dataIndex: 'createdAt',
    className: 'hidden-break-small',
    render: value => format.date(value),
  }, {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (value) => {
      return <Tag color="green">{value}</Tag>
    },
  }, {
    title: 'Hành động',
    render: () => {
      return (
        <div>
          <Tooltip title="Chỉnh sửa">
            <Button
              style={{ background: '#f4f5f7' }}
            >
              <Icon type="edit" />
            </Button>
          </Tooltip>&nbsp;&nbsp;&nbsp;
          <Tooltip title="Xóa tin">
            <Button
              style={{ background: 'red' }}
            >
              <Icon type="delete" />
            </Button>
          </Tooltip>
        </div>
      )
    },
  }]
}
