import React from 'react'
import { Link } from 'react-router-dom'
import { Tag, Avatar, Tooltip, Button, Icon, Modal } from 'antd'
import { format, helper } from '../../../../../utils'
import { ImageConst } from '../../../../../configs'

export default () => {
  const infoShow = (value) => {
    Modal.info({
      title: `${value.notification.title}`,
      content: (
        <div>
          <div dangerouslySetInnerHTML={{ __html: value.notification.message }} />
        </div>
      ),
      onOk() {},
    });
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
    render: (value) => {
      return (
        <Avatar shape="square" src={ImageConst.defaultPhoto} key={value} />
      )
    },
  }, {
    title: 'Tin tuyển dụng',
    dataIndex: 'recuiterment',
    render: (value) => {
      return (
        <Link to={`/recuiterments/${value._id}`}>{value.title}</Link>
      )
    },
  }, {
    title: 'Ngành nghề',
    align: 'center',
    dataIndex: 'recuiterment.careers',
    render: (value) => {
      return (
        value.map((item) => {
          return (
            <Tag color="blue" key={item._id}>{item.name}</Tag>
          )
        })
      )
    },
  }, {
    title: 'Mức lương',
    align: 'center',
    dataIndex: 'recuiterment.salary.name',
  }, {
    title: 'Vị trí',
    dataIndex: 'recuiterment.jobPosition',
    render: value => helper.getRank(value),
  }, {
    title: 'Hạn nộp hồ sơ',
    align: 'center',
    dataIndex: 'recuiterment.deadline',
    render: value => format.dateWithNoHour(value),
  }, {
    title: 'Thành phố',
    dataIndex: 'recuiterment.city',
    render: value => helper.getCity(value),
  }, {
    title: 'Trạng thái nộp hồ sơ',
    width: '15%',
    dataIndex: 'status',
    render: (value) => {
      const data = helper.getStatusApplyJob(value)
      return <Tag color={data.color}>{data.text}</Tag>
    },
  }, {
    title: 'Thông báo',
    render: (value, row) => {
      if (row.status !== 'approved' && row.status !== 'rejected') {
        return ''
      } else {
        return (
          <Tooltip title="Xem thông báo">
            <Button onClick={() => infoShow(value)}>
              <Icon type="eye" />
            </Button>
          </Tooltip>
        )
      }
    },
  }]
}
