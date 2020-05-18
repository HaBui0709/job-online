import React from 'react'
import { Card, Col, Icon } from 'antd'

const { Meta } = Card

class CardPreviewCVBeauty extends React.Component {
  render() {
    const { cvTemp, onnChangeIsShowState } = this.props
    return (
      <Col md={8} sm={8} span={1} id={cvTemp.type} className="card-beauty-cv">
        <Card
          onClick={() => onnChangeIsShowState(cvTemp.type)}
          className="overlay"
          hoverable
          style={{ width: 350 }}
          cover={<img alt="example" src={cvTemp.cover} />}
        >
          <Meta title={<span className="title-cv">{cvTemp.name} &nbsp;<i className="icon-is-new" /></span>} />
          <Icon type="eye" style={{ opacity: 0 }} className="eye" />
        </Card>
      </Col>
    )
  }
}

export default CardPreviewCVBeauty
