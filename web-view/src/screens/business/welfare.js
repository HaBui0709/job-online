import React from 'react'
import { Row, Col, Card, Icon } from 'antd'

import './style.less'

class WelfareComponent extends React.Component {
  render() {
    const { business: { wefare } } = this.props
    const dataFake = [
      {
        iconType: 'smile',
        title: 'CHĂM SÓC SỨC KHỎE',
        desc: wefare.healthCare,
      },
      {
        iconType: 'save',
        title: 'NGÀY PHÉP',
        desc: wefare.absentDay,
      },
      {
        iconType: 'read',
        title: 'ĐÀO TẠO',
        desc: wefare.educate,
      },
      {
        iconType: 'trophy',
        title: 'GIẢI THƯỞNG',
        desc: wefare.reward,
      },
      {
        iconType: 'filter',
        title: 'CÁC HOẠT ĐỘNG GẮN KẾT',
        desc: wefare.activities,
      },
      {
        iconType: 'gift',
        title: 'PANTRY',
        desc: wefare.pantry,
      },
    ]
    const title = (item) => {
      return (
        <div>
          <Icon type={item.iconType} theme="filled" />
          <div className="cp_benefit_name">
            <h3>{item.title}</h3>
            <span className="under-line" style={{ backgroundColor: '#002e5e' }} />
          </div>
        </div>
      )
    }
    return (
      <Row gutter={16} className="welfare-box">
        {
          dataFake.map((item) => {
            return (
              <Col key={item.title} span={8} style={{ marginBottom: '20px' }}>
                <Card
                  title={title(item)}
                  bordered
                >
                  <div className="cp_benefit_description">
                    {item.desc}
                  </div>
                </Card>
              </Col>
            )
          })
        }
      </Row>

    )
  }
}

export default WelfareComponent
