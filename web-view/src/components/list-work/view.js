import React from 'react'
import { Row, Col } from 'antd'

import './style.less'
import TableView from './table/view'

class ListWorkView extends React.Component {
  render() {
    const { title = '', loading, listData, onChangeRateJob } = this.props
    console.log('lisssssss', listData)
    return (
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div className="section-title">
            <h3 className="title-section">{title}</h3>
          </div>
          <TableView
            isLoading={loading.effects['recuitermentShow/fechSimilarJobs']}
            data={listData}
            onChangeRateJob={onChangeRateJob}
          />
        </Col>
      </Row>
    )
  }
}

export default ListWorkView
