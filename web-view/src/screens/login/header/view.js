import React from 'react'
import { Row, Col, Icon, Button } from 'antd'
import { Link } from 'dva/router'

import './style.less'

import { ImageConst } from '../../../configs'
import { key } from '../../../configs/locale'

class HeaderLoginView extends React.Component {
  render() {
    const { translate, hidden = '' } = this.props
    return (
      <Row gutter={16} className="header-login">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Icon type="arrow-left" className="arrow-back" />
          <Link to="/home">
            <img
              style={{ width: '180px', marginLeft: '40%' }}
              alt="logo-job"
              src={ImageConst.logoOnline}
              className={`hidden-break-small ${hidden}`}
            />
          </Link>
          <Link to="/login/chooses">
            <Button
              type="primary"
              className="btn-header"
            >
              <Icon type="lock" />
              {translate(key.login)}
            </Button>
          </Link>

          <Link to="/register/chooses">
            <Button
              className="btn-header"
              style={{ marginRight: '15px' }}
            >
              <Icon type="form" />
              {translate(key.register)}
            </Button>

          </Link>
        </Col>
      </Row>
    )
  }
}
export default HeaderLoginView
