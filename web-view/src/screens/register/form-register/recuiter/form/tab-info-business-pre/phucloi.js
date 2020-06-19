import React from 'react'
import { Row, Col, Card } from 'antd'

class WelFare extends React.Component {
  render() {
    const { business } = this.props
    return (
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            className="customer-card"
            title={<div className="customer-title"><p>Về mặt chăm sóc sức khỏe</p></div>}
            bordered
          >
            <div className="campaign-message">
              <div>{business.healthCare}</div>
            </div>
          </Card>
          <Card
            className="customer-card"
            title={<div className="customer-title"><p>Về mặt ngày phép</p></div>}
            bordered
          >
            <div className="campaign-message">
              <div>{business.absentDay}</div>
            </div>
          </Card>
          <Card
            className="customer-card"
            title={<div className="customer-title"><p>Về mặt đào tạo</p></div>}
            bordered
          >
            <div className="campaign-message">
              <div>{business.educate}</div>
            </div>
          </Card>
          <Card
            className="customer-card"
            title={<div className="customer-title"><p>Về mặt giải thưởng</p></div>}
            bordered
          >
            <div className="campaign-message">
              <div>{business.reward}</div>
            </div>
          </Card>
          <Card
            className="customer-card"
            title={<div className="customer-title"><p>Về mặt các hoạt động gắn kết</p></div>}
            bordered
          >
            <div className="campaign-message">
              <div>{business.activities}</div>
            </div>
          </Card>
          <Card
            className="customer-card"
            title={<div className="customer-title"><p>Pantry</p></div>}
            bordered
          >
            <div className="campaign-message">
              <div>{business.pantry}</div>
            </div>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default WelFare
