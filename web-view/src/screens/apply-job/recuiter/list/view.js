import React from 'react'
import lodash from 'lodash'
import { Layout, Row, Col } from 'antd'
import { connect } from 'dva'
import { RcSearch } from '../../../../components'
import { helper } from '../../../../utils'

import { TableView } from './table'

import './style.less'
import { UserModal } from './modal-user';

export class ListRecuitermentApprovedView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      typeUser: '',
    }
  }
  componentDidMount() {
    this.onFilterChange({})
  }

  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { recuciterApplyJob: { filter } } = this.props
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
      type: 'recuciterApplyJob/fetch',
      payload: {
        ...filter,
      },
    })
  }

  /**
   * Handle toggle modal
   */
  toggleModal = () => {
    const { visible } = this.state
    const newState = { visible: !visible }
    this.setState(newState)
  }

  showModal = (type, filter) => {
    this.setState({ typeUser: type })
    this.props.dispatch({
      type: 'recuciterApplyJob/fetchUserApplyJobs',
      payload: {
        ...filter,
      },
    })
    this.toggleModal()
  }

  render() {
    const { recuciterApplyJob: { recuiterments, filter, applyJobs }, loading, dispatch } = this.props
    return (
      <Layout className="wrapper-recuiterments">
        <Layout className="page-content">
          <Row gutter={8}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} span={4}>
              <Row gutter={8}>
                <Col xs={24} sm={24} md={24} lg={5} xl={5} span={5}>
                  <Row className="filter-box">
                    <RcSearch
                      title="Tìm kiếm"
                      placeholder="Theo tiêu đề"
                      value={filter.keyword}
                      onSearch={keyword => this.onFilterChange({ keyword })}
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
                    showModal={this.showModal}
                    dispatch={dispatch}
                    isLoading={loading.effects['recuciterApplyJob/fetch']}
                  />
                </Col>
                <UserModal
                  visible={this.state.visible}
                  dispatch={dispatch}
                  toggleModal={this.toggleModal}
                  typeUser={this.state.typeUser}
                  applyJobs={applyJobs}
                  isLoading={loading.effects['recuciterApplyJob/fetchUserApplyJobs']}
                />
              </Row>
            </Col>
          </Row>
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ app, recuciterApplyJob, loading }) => ({
  app,
  recuciterApplyJob,
  loading,
}))(ListRecuitermentApprovedView)

