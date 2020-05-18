import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import { Row, Col, BackTop, Icon } from 'antd'


import './style.less'
import { CardView } from './card-view'
import { ImageConst } from '../../configs'
import { key } from '../../configs/locale'

// Candidate
const dataLoginForCandidate = {
  listTitle: [
    key.candidateList1,
    key.candidateList2,
    key.candidateList3,
  ],
  image: ImageConst.tkNTV,
  btnTitle: key.candidateLogin,
}

// Recuiter
const dataLoginRecuiter = {
  listTitle: [
    key.recuiterList1,
    key.recuiterList2,
    key.recuiterList3,
  ],
  image: ImageConst.tkNTD,
  btnTitle: key.recuiterLogin,
}
class LoginView extends React.Component {
  /**
   * Navigate to login page candidate
   */
  goToLoginPageCandidate = () => {
    this.props.dispatch(routerRedux.push('/login/candidate'))
  }

  /**
   * Navigate to login page recuiter
   */
  goToLoginPageRecuiter = () => {
    this.props.dispatch(routerRedux.push('/login/recuiter'))
  }
  render() {
    const { t } = this.props
    return (
      <div className="background-white">
        <Row gutter={16} className="wrapper-card">
          <Col xs={24} sm={1} md={2} lg={2} xl={5} span={8} />
          <Col xs={24} sm={11} md={10} lg={10} xl={7} span={8} className="space-bottom-small">
            {/* Card view candidate */}
            <CardView
              translate={t}
              type="candidate"
              data={dataLoginForCandidate}
              handleOnClick={this.goToLoginPageCandidate}
            />
          </Col>
          <Col xs={24} sm={11} md={10} lg={10} xl={7} span={8} className="space-bottom-small">
            {/* Card view recuiter */}
            <CardView
              translate={t}
              type="recuiter"
              data={dataLoginRecuiter}
              handleOnClick={this.goToLoginPageRecuiter}
            />
          </Col>
          <Col xs={24} sm={1} md={2} lg={2} xl={5} span={8} />
        </Row>
        <BackTop><Icon style={{ color: 'green' }} className="up-back-top" type="up-circle" theme="filled" /></BackTop>
      </div>
    )
  }
}

export default connect(({ loading }) => ({ loading }))(translate([])(LoginView))
