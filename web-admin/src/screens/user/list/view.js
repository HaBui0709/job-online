import React from 'react'
import lodash from 'lodash'
import { Layout, Row, Col } from 'antd'
import { connect } from 'dva'
import { translate } from 'react-i18next'
import { key } from '../../../configs/locale'
import { RcBreadcrumb, RcSearch, RcSelectBox } from '../../../components'
import { helper } from '../../../utils'

import { TableView } from './table'
import { AppConst } from '../../../configs';
// import { AppConst } from '../../../configs'

export class ListView extends React.Component {
  componentDidMount() {
    this.onFilterChange({})
  }

  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { users: { filter } } = this.props
    const filters = helper.mergeObjects(filter, newFilter)
    const query = lodash.pick(filters, ['page', 'keyword', 'type', 'verified', 'city', 'sort'])
    this.fetch(query)
  }

  // change table page
  onTablePageChange = (pagination) => {
    const { current } = pagination
    this.onFilterChange({ page: current - 1 })
  }

  // fetch data user
  fetch = (filter) => {
    this.props.dispatch({
      type: 'users/fetch',
      payload: {
        ...filter,
      },
    })
  }

  render() {
    const { app: { appFilters }, users: { users, filter }, loading, t } = this.props
    return (
      <Layout className="container">
        <RcBreadcrumb name={`${t(key.menuUser)} (${filter.total})`} />
        <Layout className="page-content">
          <Row gutter={8}>
            <Col xs={24} sm={24} md={24} lg={4} xl={4} span={4}>
              <Row className="filter-box">
                <RcSearch
                  title={t(key.search)}
                  className="search-user"
                  placeholder={t(key.placeholderSearchUser)}
                  value={filter.keyword}
                  onSearch={keyword => this.onFilterChange({ keyword })}
                />
                <RcSelectBox
                  translate={t}
                  title={key.verified}
                  values={AppConst.users.verified.list}
                  onChange={verified => this.onFilterChange({ verified })}
                  initValue={AppConst.users.verified.default}
                />
                <RcSelectBox
                  translate={t}
                  title={key.typeOfUser}
                  values={AppConst.users.type.list}
                  onChange={type => this.onFilterChange({ type })}
                  initValue={AppConst.users.type.default}
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
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={20} xl={20} span={20}>
              <TableView
                translate={t}
                pageSize={filter.limit}
                total={filter.total}
                current={filter.page}
                data={users}
                onChange={this.onTablePageChange}
                isLoading={loading.effects['users/fetch']}
              />
            </Col>
          </Row>
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ app, users, loading }) => ({
  app,
  users,
  loading,
}))(translate()(ListView))
