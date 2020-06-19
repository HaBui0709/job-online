import React from 'react'
import { Row, Col } from 'antd'
import { ImageConst } from '../../../configs';

class ActivityView extends React.Component {
  render() {
    return (
      <Row className="position-wrapper">
        <div>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="main-heading">
                <p>Working process</p>
                <h2>How It <span>Works</span></h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className="working-process">
                <span className="process-img">
                  <img src={ImageConst.step1} className="img-responsive" alt="" />
                  <span className="process-num">01</span>
                </span>
                <h4>Tạo một tài khoản</h4>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className="working-process">
                <span className="process-img">
                  <img src={ImageConst.step2} className="img-responsive" alt="" />
                  <span className="process-num">02</span>
                </span>
                <h4>Tìm kiếm công việc phù hợp</h4>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div className="working-process">
                <span className="process-img">
                  <img src={ImageConst.step3} className="img-responsive" alt="" />
                  <span className="process-num">03</span>
                </span>
                <h4>Lưu và nộp hồ sơ</h4>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
    )
  }
}

export default ActivityView
