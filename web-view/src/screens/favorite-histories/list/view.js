import React from 'react'
import lodash from 'lodash'
import { Layout, Row, Col } from 'antd'
import { connect } from 'dva'
import { RcBreadcrumb } from '../../../components'
import { helper } from '../../../utils'

import { TableView } from './table'

import './style.less'

export class ListFavoriteHistoryView extends React.Component {
  componentDidMount() {
    this.onFilterChange({})
  }

  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { favoriteHistories: { filter } } = this.props
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
      type: 'favoriteHistories/fetch',
      payload: {
        ...filter,
      },
    })
  }

  render() {
    const { favoriteHistories: { favoriteHistories, filter }, loading, dispatch } = this.props
    return (
      <Layout className="wrapper-recuiterments">
        <Row type="flex" justify="space-between">
          <RcBreadcrumb name={`Công việc đã lưu (${filter.total})`} />
        </Row>
        <Layout className="page-content">
          <Row gutter={8}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row gutter={8}>
                {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Row className="filter-box">
                    <RcSearch
                      title="Tìm kiếm"
                      value={filter.keyword}
                      onSearch={keyword => this.onFilterChange({ keyword })}
                    />
                  </Row>
                </Col> */}
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <TableView
                    pageSize={filter.limit}
                    total={filter.total}
                    current={filter.page}
                    data={favoriteHistories}
                    onChange={this.onTablePageChange}
                    dispatch={dispatch}
                    isLoading={loading.effects['favoriteHistories/fetch']}
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

export default connect(({ app, favoriteHistories, loading }) => ({
  app,
  favoriteHistories,
  loading,
}))(ListFavoriteHistoryView)

