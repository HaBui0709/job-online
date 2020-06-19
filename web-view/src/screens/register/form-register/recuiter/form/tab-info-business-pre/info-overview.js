import React from 'react'
import { Form, Col, Card, Row } from 'antd'
import { ComponentConst } from '../../../../../../configs'
import { format } from '../../../../../../utils'

import './style.less'

const formItemLayout2 = ComponentConst.info2.itemLayout

class InfoOverview extends React.Component {
  render() {
    const { business } = this.props
    return (
      <div>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form className="customer-form">
              <Form.Item
                {...formItemLayout2}
                label={<span className="section-title"><h4>Tên công ty</h4></span>}
              >
                <span className="campaign-value">
                  {business.name}
                </span>
              </Form.Item>
            </Form>
            <Form className="customer-form">
              <Form.Item
                {...formItemLayout2}
                label={<span className="section-title"><h4>Điện thoại cố định</h4></span>}
              >
                <span className="campaign-value">
                  {format.phone(business.phone)}
                </span>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form className="customer-form">
              <Form.Item
                {...formItemLayout2}
                label={<span className="section-title"><h4>Quy mô công ty</h4></span>}
              >
                <span className="campaign-value">
                  {business.scale}
                </span>
              </Form.Item>
            </Form>
            <Form className="customer-form">
              <Form.Item
                {...formItemLayout2}
                label={<span className="section-title"><h4>Website</h4></span>}
              >
                <span className="campaign-value">
                  {business.website}
                </span>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card
              className="customer-card"
              title={<div className="customer-title"><p>Giới thiệu về công ty</p></div>}
              bordered
            >
              <div className="campaign-message">
                <div>{business.desc}</div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default InfoOverview
