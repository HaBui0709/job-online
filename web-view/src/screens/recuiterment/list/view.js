import React from 'react'
import lodash from 'lodash'
import { Layout, Row, Col, Button } from 'antd'
import { connect } from 'dva'
import { RcSearch, RcSelectBoxHorizontal } from '../../../components'
import { helper } from '../../../utils'

import { TableView } from './table'
import { AppConst } from '../../../configs'

import './style.less'
import { RcSearchBoxJobs } from '../../../components/search-box-job';
import StatisticInfoView from './statistic';

export class ListRecuitermentView extends React.Component {
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

  // fetch data
  fetch = (filter) => {
    this.props.dispatch({
      type: 'recuiterments/fetch',
      payload: {
        ...filter,
      },
    })
  }

  render() {
    const { recuiterments: { recuiterments, filter, statistic }, loading, dispatch } = this.props
    return (
      <Layout className="wrapper-recuiterments">
        <Layout className="page-content">
          <Row gutter={8}>
            <Col xs={24} sm={24} md={24} lg={19} xl={19} span={4}>
              <Row gutter={8}>
                <Col xs={24} sm={24} md={24} lg={5} xl={5} span={5}>
                  <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <div className="btn-create">
                        <Button>Tạo Hồ sơ TD</Button>
                      </div>
                    </Col>
                  </Row>
                  <Row className="filter-box">
                    <RcSearch
                      title="Tìm kiếm"
                      placeholder="Theo tiêu đề"
                      value={filter.keyword}
                      onSearch={keyword => this.onFilterChange({ keyword })}
                    />
                    <RcSelectBoxHorizontal
                      title="Trạng thái"
                      values={AppConst.status.list}
                      onChange={status => this.onFilterChange({ status })}
                      initValue={AppConst.status.default}
                    />
                  </Row>
                </Col>
                <Col xs={24} sm={24} md={24} lg={19} xl={19} span={19}>
                  <TableView
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
            </Col>
            <Col xs={24} sm={24} md={24} lg={5} xl={5} span={4}>
              <StatisticInfoView statistic={statistic} />
              <div style={{ marginTop: '-25px' }}>
                <RcSearchBoxJobs />
              </div>
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
}))(ListRecuitermentView)

