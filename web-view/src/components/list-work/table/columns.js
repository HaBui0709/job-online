
import React from 'react'
import { Link } from 'react-router-dom'
import { Rate } from 'antd';
import './style.less'
import { helper, format } from '../../../utils'

export default (context) => {
  const { onChangeRateJob } = context.props

  return [{
    textAlign: 'center',
    render: (value, row) => <Rate value={row._id} key={value} count={1} onChange={() => onChangeRateJob(row._id)} />,
  }, {
    title: <span className="title-col">Vị trí tuyển dụng</span>,
    dataIndex: 'title',
    render: (value, row) => <Link to={`/recuiterments/${row._id}`} title={value}><div>{value}</div></Link>,
  }, {
    title: <span className="title-col">Mức lương</span>,
    dataIndex: 'salary.name',
  }, {
    title: <span className="title-col">Khu vực</span>,
    dataIndex: 'city',
    render: value => helper.getCity(value),
  }, {
    title: <span className="title-col">Hạn nộp</span>,
    dataIndex: 'deadline',
    render: value => format.dateWithNoHour(value),
  }]
}
