import React from 'react'
import lodash from 'lodash'
import { Layout, Row, Col } from 'antd'
import { connect } from 'dva'
import { translate } from 'react-i18next'
import { key } from '../../configs/locale'
import { RcBreadcrumb, RcSearch, RcSelectBox } from '../../components'
import { helper } from '../../utils'

import { TableView } from './table'

export class ListView extends React.Component {
  componentDidMount() {
    this.onFilterChange({})
  }

  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { recuiterments: { filter } } = this.props
    const filters = helper.mergeObjects(filter, newFilter)
    const query = lodash.pick(filters, ['page', 'keyword', 'status'])
    this.fetch(query)
  }

  // change table page
  onTablePageChange = (pagination) => {
    const { current } = pagination
    this.onFilterChange({ page: current - 1 })
  }

  // fetch data recuiterments
  fetch = (filter) => {
    this.props.dispatch({
      type: 'recuiterments/fetch',
      payload: {
        ...filter,
      },
    })
  }
  render() {
    const { app: { appFilters }, recuiterments: { recuiterments, filter }, loading, t, dispatch } = this.props
    return (
      <Layout className="container">
        <Row type="flex" justify="space-between">
          <RcBreadcrumb name={`${t(key.menuRecuiterment)} (${filter.total})`} />
        </Row>
        <Layout className="page-content">
          <Row gutter={8}>
            <Col xs={24} sm={24} md={24} lg={4} xl={4} span={4}>
              <Row className="filter-box">
                <RcSearch
                  title={t(key.search)}
                  // placeholder={t(key.placeholderSearch)}
                  value={filter.keyword}
                  onSearch={keyword => this.onFilterChange({ keyword })}
                />
                <RcSelectBox
                  translate={t}
                  title={key.status}
                  values={appFilters.status.list}
                  onChange={status => this.onFilterChange({ status })}
                  initValue={appFilters.status.default}
                />
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={20} xl={20} span={20}>
              <TableView
                translate={t}
                pageSize={filter.limit}
                total={filter.total}
                current={filter.page}
                data={recuiterments}
                onChange={this.onTablePageChange}
                dispatch={dispatch}
                isLoading={loading.effects['recuiterments/fetch']}
              />
            </Col>
          </Row>
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ app, recuiterments, loading }) => ({
  app,
  recuiterments,
  loading,
}))(translate()(ListView))
