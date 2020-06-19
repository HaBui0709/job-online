import React from 'react'
import lodash from 'lodash'
import { Layout, Row, Col } from 'antd'
import { connect } from 'dva'
import { RcSearch } from '../../../../components'
import { helper } from '../../../../utils'

import { TableView } from './table'

import './style.less'

export class ListApplyJobsView extends React.Component {
  componentDidMount() {
    this.onFilterChange({})
  }

  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { candidateApplyJob: { filter } } = this.props
    const filters = helper.mergeObjects(filter, newFilter)
    const query = lodash.pick(filters, ['page', 'keyword'])
    this.fetch(query)
  }

  // change table page
  onTablePageChange = (pagination) => {
    const { current } = pagination
    this.onFilterChange({ page: current - 1 })
  }

  // fetch data
  fetch = (filter) => {
    this.props.dispatch({
      type: 'candidateApplyJob/fetch',
      payload: {
        ...filter,
      },
    })
  }

  render() {
    const { candidateApplyJob: { applyJobs, filter }, loading, dispatch } = this.props
    return (
      <Layout className="wrapper-recuiterments">
        <Layout className="page-content">
          <Row gutter={8}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} span={4}>
              <Row gutter={8}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={5}>
                  <Row className="filter-box">
                    <RcSearch
                      title="Tìm kiếm"
                      placeholder="Theo tiêu đề"
                      value={filter.keyword}
                      onSearch={keyword => this.onFilterChange({ keyword })}
                    />
                  </Row>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} span={19}>
                  <TableView
                    pageSize={filter.limit}
                    total={filter.total}
                    current={filter.page}
                    data={applyJobs}
                    onChange={this.onTablePageChange}
                    dispatch={dispatch}
                    isLoading={loading.effects['candidateApplyJob/fetch']}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ app, candidateApplyJob, loading }) => ({
  app,
  candidateApplyJob,
  loading,
}))(ListApplyJobsView)

