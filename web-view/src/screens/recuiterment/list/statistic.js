import React from 'react'
import { Icon, Row, Col } from 'antd'

import './style.less'
import { format } from '../../../utils';

class StatisticInfoView extends React.PureComponent {
  render() {
    const { statistic } = this.props
    return (
      <Row>
        <Col>
          <div className="social social-box">
            <div className="social-slick-4 facebook-box">
              <i className="fa fa-facebook" style={{ background: '#f60' }}>
                <Icon type="project" />
              </i>
              <h3>{format.number(statistic.totalRecuiterment)}</h3>
              <span>Tổng số lượng tin tuyển dụng</span>
            </div>
          </div>
        </Col>
        <Col>
          <div className="social social-box">
            <div className="social-slick-4 facebook-box">
              <i className="fa fa-facebook" style={{ background: '#54acec' }}>
                <Icon type="file-protect" />
              </i>
              <h3>{format.number(statistic.totalRecuitermentActive)}</h3>
              <span>Số lượng tin đang đăng</span>
            </div>
          </div>
        </Col>

        <Col>
          <div className="social social-box">
            <div className="social-slick-4 facebook-box">
              <i className="fa fa-facebook" style={{ backgroundColor: 'rgb(255, 204, 117)' }}>
                <Icon type="loading" />
              </i>
              <h3>{format.number(statistic.totalRecuitermentPending)}</h3>
              <span>Số lượng tin đang chờ phê duyệt</span>
            </div>
          </div>
        </Col>

        <Col>
          <div className="social social-box">
            <div className="social-slick-4 facebook-box">
              <i className="fa fa-facebook" style={{ background: '#11b719' }}>
                <Icon type="check" style={{ color: 'white' }} />
              </i>
              <h3>{format.number(statistic.totalRecuitermentComplete)}</h3>
              <span>Số lượng tin hoàn thành</span>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default StatisticInfoView
