import React from 'react'
import { Link } from 'react-router-dom'
import { Rate } from 'antd'


export default () => {
  return [{
    dataIndex: '',
    textAlign: 'center',
    render: value => <Rate key={value} count={1} />,
  }, {
    title: <span className="title-col">Vị trí tuyển dụng</span>,
    dataIndex: 'name',
    render: (value, row) => <Link to={`/${row._id}`}><div>{value}</div></Link>,
  }, {
    title: <span className="title-col">Mức lương</span>,
    dataIndex: 'salary',
  }, {
    title: <span className="title-col">Khu vực</span>,
    dataIndex: 'position',
  }, {
    title: <span className="title-col">Hạn nộp</span>,
    dataIndex: 'hannop',
  }]
}
