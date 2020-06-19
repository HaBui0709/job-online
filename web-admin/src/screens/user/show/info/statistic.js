import React from 'react'
import { Row, Col } from 'antd'

export default ({ data }) => (
  <div className="card-footer">
    <Row>
      {
        data.map(item => (
          <Col span={8} key={item.title} className={item.className}>
            <div className="statistic">
              <p>{item.title}:</p>
              <span>{item.value}</span>
            </div>
          </Col>
        ))
      }
    </Row>
  </div>
)
