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

  componentWillUnmount() {
    this.resetState()
  }
  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { cvs: { filter } } = this.props
    const filters = helper.mergeObjects(filter, newFilter)
    const query = lodash.pick(filters, ['page', 'keyword', 'active', 'status'])
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
      type: 'cvs/fetch',
      payload: {
        ...filter,
      },
    })
  }

  resetState = () => {
    this.props.dispatch({
      type: 'cvs/resetState',
    })
  }
  render() {
    const { app: { appFilters }, cvs: { cvs, filter }, loading, t, dispatch } = this.props
    return (
      <Layout className="container">
        <Row type="flex" justify="space-between">
          <RcBreadcrumb name={`${t(key.menuCV)} (${filter.total})`} />
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
                  values={appFilters.cv.status.list}
                  onChange={status => this.onFilterChange({ status })}
                  initValue={appFilters.cv.status.default}
                />
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={20} xl={20} span={20}>
              <TableView
                translate={t}
                pageSize={filter.limit}
                total={filter.total}
                current={filter.page}
                data={cvs}
                onChange={this.onTablePageChange}
                dispatch={dispatch}
                isLoading={loading.effects['cvs/fetch']}
              />
            </Col>
          </Row>
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ app, cvs, loading }) => ({
  app,
  cvs,
  loading,
}))(translate()(ListView))
