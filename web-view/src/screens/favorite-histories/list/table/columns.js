import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, Icon, Tooltip, Tag } from 'antd'
import { format, helper } from '../../../../utils'
import { ImageConst } from '../../../../configs'

export default (context) => {
  const { dispatch } = context.props
  const deleteFavoriteJob = (id) => {
    dispatch({
      type: 'favoriteHistories/deletefavoriteHistory',
      payload: id,
    })
  }
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
    title: 'Tiêu đề tuyển dụng',
    dataIndex: 'recuiterment',
    render: (value) => {
      return (
        <Link to={`/recuiterments/${value._id}`}>{value.title}</Link>
      )
    },
  }, {
    title: 'Ngành nghề',
    dataIndex: 'recuiterment.careers',
    render: (value) => {
      return (
        <span>
          {
          value.map((item) => {
            return (
              <Tag color="green" key={item._id}>{item.name}</Tag>
            )
          })
        }
        </span>
      )
    },
  }, {
    title: 'Mức lương',
    dataIndex: 'recuiterment.salary.name',
  }, {
    title: 'Hạn nộp hồ sơ',
    align: 'center',
    dataIndex: 'recuiterment.deadline',
    render: value => format.date(value),
  }, {
    title: 'Thành phố',
    align: 'center',
    dataIndex: 'recuiterment.city',
    render: value => helper.getCity(value),
  }, {
    title: 'Ngày lưu tin',
    align: 'center',
    dataIndex: 'createdAt',
    className: 'hidden-break-small',
    render: value => format.date(value),
  }, {
    title: 'Hành động',
    render: (value, row) => {
      return (
        <div>
          <Tooltip title="Xóa lưu tin">
            <Button onClick={() => deleteFavoriteJob(row._id)}>
              <Icon type="delete" />
            </Button>
          </Tooltip>
        </div>
      )
    },
  }]
}
