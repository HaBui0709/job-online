import React from 'react'
import lodash from 'lodash'
import { Layout, Row, Col, Button } from 'antd'
import { connect } from 'dva'
import { translate } from 'react-i18next'
import { key } from '../../../configs/locale'
import { RcBreadcrumb, RcSearch, RcSelectBox } from '../../../components'
import { helper } from '../../../utils'

import { TableView } from './table'
import { AppConst } from '../../../configs'
import { AddModal } from '../modal-add'
import { EditModal } from '../modal-edit'

export class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      careerGroup: null,
      editModalVisible: false,
      addModalVisible: false,
    }
  }
  componentDidMount() {
    this.onFilterChange({})
  }

  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { careerGroups: { filter } } = this.props
    const filters = helper.mergeObjects(filter, newFilter)
    const query = lodash.pick(filters, ['page', 'keyword', 'active'])
    this.fetch(query)
  }

  // change table page
  onTablePageChange = (pagination) => {
    const { current } = pagination
    this.onFilterChange({ page: current - 1 })
  }

  // fetch data career group
  fetch = (filter) => {
    this.props.dispatch({
      type: 'careerGroups/fetch',
      payload: {
        ...filter,
      },
    })
  }

  /**
   * Handle toggle modal
   */
  toggleModal = (type, careerGroupNew) => {
    const { editModalVisible, addModalVisible, careerGroup } = this.state
    const newState = type === 'edit' ?
      { editModalVisible: !editModalVisible } : { addModalVisible: !addModalVisible }
    if (type === 'edit') {
      newState.careerGroup = careerGroup ? null : careerGroupNew
    }
    this.setState(newState)
  }
  render() {
    const { app: { appFilters }, careerGroups: { careerGroups, filter }, loading, t, dispatch } = this.props
    const { addModalVisible, editModalVisible, careerGroup } = this.state
    return (
      <Layout className="container">
        <Row type="flex" justify="space-between">
          <RcBreadcrumb name={`${t(key.menuCareerGroup)} (${filter.total})`} />
          <div className="button-action">
            <Button onClick={() => this.toggleModal('add')} type="primary">{t(key.create)}</Button>
          </div>
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
                  title={key.active}
                  values={appFilters.careerGroups.active.list}
                  onChange={active => this.onFilterChange({ active })}
                  initValue={AppConst.careerGroups.active.default}
                />
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={20} xl={20} span={20}>
              <TableView
                translate={t}
                pageSize={filter.limit}
                total={filter.total}
                current={filter.page}
                data={careerGroups}
                onChange={this.onTablePageChange}
                toggleModal={this.toggleModal}
                dispatch={dispatch}
                isLoading={loading.effects['careerGroups/fetch']}
              />
            </Col>
          </Row>
          <AddModal
            visible={addModalVisible}
            dispatch={dispatch}
            toggleModal={this.toggleModal}
            translate={t}
          />
          <EditModal
            visible={editModalVisible}
            dispatch={dispatch}
            toggleModal={this.toggleModal}
            translate={t}
            careerGroup={careerGroup}
          />
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ app, careerGroups, loading }) => ({
  app,
  careerGroups,
  loading,
}))(translate()(ListView))
