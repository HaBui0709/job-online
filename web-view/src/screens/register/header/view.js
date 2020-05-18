import React from 'react'
import { Row, Col, Icon, Button } from 'antd'
import { Link, routerRedux } from 'dva/router'

import './style.less'
import { LanguageSelector } from '../../language-selector'
import { ImageConst } from '../../../configs'
import { key } from '../../../configs/locale'

class HeaderLoginView extends React.Component {
  /**
   * Navigate to login chooses page
   */
  goToLoginPage = () => {
    this.props.dispatch(routerRedux.push('/login/chooses'))
  }

  render() {
    const { translate, hidden = '' } = this.props
    return (
      <Row gutter={16} className="header-login">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Link to="/home">
            <Icon type="arrow-left" className="arrow-back" />
          </Link>
          <img
            style={{ width: '180px', marginLeft: '40%' }}
            alt="logo-job"
            src={ImageConst.logoOnline}
            className={`hidden-break-small ${hidden}`}
          />
          <Button
            type="primary"
            className="btn-header"
            onClick={this.goToLoginPage}
          >
            <Icon type="user" />
            {translate(key.login)}
          </Button>
          <LanguageSelector />
        </Col>
      </Row>
    )
  }
}
export default HeaderLoginView
