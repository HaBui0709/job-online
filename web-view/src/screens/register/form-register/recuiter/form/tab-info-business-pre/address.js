import React from 'react'
import { Row, Col, Form } from 'antd'
import get from 'lodash/get'

import './style.less'
import { ComponentConst } from '../../../../../../configs'
import { RcGoogleMaps } from '../../../../../../components';
import { helper } from '../../../../../../utils';

const formItemLayout2 = ComponentConst.info2.itemLayout

class AddressView extends React.Component {
  render() {
    const { business } = this.props
    return (
      <div>
        <Row>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form className="customer-form">
              <Form.Item
                {...formItemLayout2}
                label={<span className="section-title"><h4>Địa chỉ công ty</h4></span>}
              >
                <span className="campaign-value">
                  {business.name}
                </span>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form className="customer-form">
              <Form.Item
                {...formItemLayout2}
                label={<span className="section-title"><h4>Thành phố</h4></span>}
              >
                <span className="campaign-value">
                  {helper.getCity(business.city)}
                </span>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className="padding20">
            <RcGoogleMaps
              showSearchBox={false}
              coordinates={get(business, 'location.coordinates', null)}
              containerElement={<div style={{ height: '400px' }} />}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddressView
