import React from 'react'
import { Row, Col } from 'antd'
import { Link } from 'dva/router'

import './style.less'

class ListTopBusinessView extends React.Component {
  render() {
    const { businesses } = this.props
    return (
      <div className="wrapper-top-business container" style={{ marginBottom: '50px', marginTop: '-50px' }}>
        <h1 className="text-center">Các Nhà Tuyển Dụng Hàng Đầu</h1><br />
        <Row gutter={16}>
          {
            businesses.map((item) => {
              return (
                <Col xs={24} sm={4} md={4} lg={4} xl={4} key={item._id}>
                  <Link to={`/company/${item._id}`} className="boxed flex-center-xy" title={item.name}>
                    <img
                      className="img-responsived"
                      src={item.logo}
                      alt={item.name}
                    />
                  </Link>
                </Col>
              )
            })
          }
          <div className="text-right">
            <a href="/nha-tuyen-dung-hang-dau" className="btn-view-all">
              Xem tất cả nhà tuyển dụng →
            </a>
          </div>
        </Row>
      </div>
    )
  }
}

export default ListTopBusinessView
