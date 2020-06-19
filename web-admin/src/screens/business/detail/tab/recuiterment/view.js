import React, { PureComponent } from 'react'
import pick from 'lodash/pick'
import { connect } from 'dva'
import { Row, Col } from 'antd';


import { RcTable, RcSelectBox } from '../../../../../components'
import { helper } from '../../../../../utils'
import columns from './columns'
import { key } from '../../../../../configs/locale'

export class RecuitermentsView extends PureComponent {
  componentDidMount() {
    this.onFilterChange({})
  }

  /**
   * Handle filter change
   */
  onFilterChange = (newFilter = {}) => {
    let { business: { filters } } = this.props
    if (!newFilter.page) {
      newFilter.page = 0
    }
    filters = helper.mergeObjects(filters, newFilter)
    const query = pick(filters, ['page', 'status'])
    this.fetchRecuiterments(query)
  }

  /**
   * Handle table page change
   */
  onTableChange = (pagination) => {
    const { current } = pagination
    this.onFilterChange({ page: current - 1 })
  }

  /**
   * Fetch recuiterments
   */
  fetchRecuiterments = (filters) => {
    const { dispatch, business: { business } } = this.props
    dispatch({
      type: 'business/fetchRecuiterments',
      payload: filters,
      businessId: business._id,
    })
  }

  render() {
    const { app: { appFilters }, business: { recuiterments, filters }, loading, translate } = this.props
    return (
      <Row>
        <Row>
          <Col xl={6} md={6} lg={6} xs={6}>
            <RcSelectBox
              translate={translate}
              title={key.status}
              values={appFilters.status.list}
              onChange={status => this.onFilterChange({ status })}
              initValue={appFilters.status.default}
            />
          </Col>
        </Row>
        <RcTable
          layoutClassNames="app-table-no-padding"
          classNames="app-table-small"
          data={recuiterments}
          pagination={{ pageSize: filters.limit, total: filters.total, current: filters.page + 1 }}
          onChange={this.onTableChange}
          isLoading={loading['business/fetchRecuiterments']}
          columns={columns(this)}
        />
      </Row>
    )
  }
}

export default connect(({ app, loading, business }) => ({
  app,
  loading,
  business,
}))(RecuitermentsView)
