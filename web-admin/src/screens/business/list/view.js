import React from 'react'
import lodash from 'lodash'
import { Layout, Row, Col } from 'antd'
import { connect } from 'dva'
import { translate } from 'react-i18next'
import { key } from '../../../configs/locale'

import { RcBreadcrumb, RcSearch, RcSelectBox } from '../../../components'
import { helper } from '../../../utils'
import { TableView } from './table'
import './style.less'

export class ListView extends React.Component {
  componentDidMount() {
    this.onFilterChange()
  }

  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { businesses: { filter } } = this.props
    if (!newFilter.page) {
      newFilter.page = 0
    }
    const filters = helper.mergeObjects(filter, newFilter)
    const query = lodash.pick(filters, ['page', 'keyword', 'city', 'active'])
    this.loadBusiness(query)
  }

  // change table page
  onTablePageChange = (pagination) => {
    const { current } = pagination
    this.onFilterChange({ page: current - 1 })
  }

  // Load Business
  loadBusiness = (filter) => {
    const { dispatch } = this.props
    dispatch({
      type: 'businesses/fetch',
      payload: { ...filter },
    })
  }

  render() {
    const { app: { appFilters }, businesses: { businesses, filter }, loading, t } = this.props
    return (
      <Layout className="container">
        <Row type="flex" justify="space-between">
          <RcBreadcrumb name={`${t(key.menuBusinesses)} (${filter.total})`} />
        </Row>
        <Layout className="page-content">
          <Row gutter={8}>
            <Col xs={24} sm={24} md={24} lg={4} xl={4} span={4}>
              <Row className="filter-box">
                <RcSearch
                  title={t(key.search)}
                  className="search-business"
                  placeholder={t(key.placeholderSearch)}
                  value={filter.keyword}
                  onSearch={keyword => this.onFilterChange({ keyword })}
                />
                <RcSelectBox
                  translate={t}
                  className="city-select-box"
                  title={appFilters.cities.title}
                  values={appFilters.cities.list}
                  onChange={city => this.onFilterChange({ city })}
                  initValue={appFilters.cities.default}
                  isSearch
                />
                <RcSelectBox
                  translate={t}
                  className="active-select-box"
                  title={appFilters.businesses.active.title}
                  values={appFilters.businesses.active.list}
                  onChange={active => this.onFilterChange({ active })}
                  initValue={appFilters.businesses.active.default}
                />
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={20} xl={20} span={20}>
              <TableView
                translate={t}
                isLoading={loading.effects['businesses/fetch']}
                data={businesses}
                onChange={this.onTablePageChange}
                pageSize={filter.limit}
                total={filter.total}
                current={filter.page}
              />
            </Col>
          </Row>


        </Layout>
      </Layout>
    )
  }
}

export default connect(({
  app,
  businesses,
  loading }) => (
  {
    app,
    businesses,
    loading,
  }))(translate([key.translations, key.businesses])(ListView))
