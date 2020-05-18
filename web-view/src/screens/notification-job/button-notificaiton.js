import React from 'react'
import { Row, Col, Card, Button } from 'antd';

import './style.less'

class ButtonRegisterNotification extends React.Component {
  render() {
    const { showformRegisterNotify, showForm } = this.props
    return (
      <Row>
        {
          !showForm &&
          <Col>
            <Card
              title={<div className="title-card"> Đăng ký nhận email thông báo việc làm </div>}
              bordered={false}
            >
              <div
                className="text-register-notify"
              >
                Thiết lập, đăng ký email giới thiệu việc làm để nhận được nhiều việc làm phù hợp với bạn hơn.
              </div>
              <Button
                className="btn btn-orange-56 w360 marginTop20 w100p-mb"
                onClick={() => showformRegisterNotify()}
              >
                ĐĂNG KÝ NHẬN THÔNG BÁO VIỆC LÀM
              </Button>
            </Card>
          </Col>
        }
      </Row>
    )
  }
}

export default ButtonRegisterNotification
