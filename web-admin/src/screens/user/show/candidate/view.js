import React from 'react'
import lodash from 'lodash'
import { connect } from 'dva'
import { translate } from 'react-i18next'
import { Col, Tabs, Row } from 'antd'
import { helper } from '../../../../utils'
import { key } from '../../../../configs/locale'
// Components
import CurriculumVitaesTable from './table/curriculum-vitaes'

const DEFAULT_KEY_TAG = 'curriculumVitaes'

class CandidateView extends React.Component {
  state = {
    defaultKeyTag: DEFAULT_KEY_TAG,
  }

  // componentDidMount() {
  //   const { dispatch, _id } = this.props
  //   dispatch({
  //     type: 'candidateInfo/resetState',
  //     payload: {
  //       _id,
  //     },
  //   })
  // }

  // shouldComponentUpdate(nextProps) {
  //   const { dispatch } = this.props
  //   if (nextProps._id !== this.props._id) {
  //     dispatch({
  //       type: 'candidateInfo/resetState',
  //       payload: {
  //         _id: nextProps._id,
  //       },
  //     })
  //     this.setState({
  //       defaultKeyTag: DEFAULT_KEY_TAG,
  //     })
  //     return true
  //   }
  //   return true
  // }

  // Change Filter
  onFilterChange = (type, newFilter = {}) => {
    const { candidateInfo } = this.props
    const filters = helper.mergeObjects(candidateInfo[type].filter, newFilter)
    const query = lodash.pick(filters, ['page', 'type', 'isUsed', 'status', 'merchant', 'transactionId'])
    this.fetch(type, query)
  }

  // change table page
  onTablePageChange = (type, pagination) => {
    const { current } = pagination
    this.onFilterChange(type, { page: current - 1 })
  }

  handleTabs = (type) => {
    this.setState({
      defaultKeyTag: type,
    })
    // this.onFilterChange(type)
  }

  fetch = (type, filter) => {
    const { dispatch, _id } = this.props
    dispatch({
      type: `candidateInfo/${type}`,
      payload: {
        _id,
        data: {
          ...filter,
        },
      },
    })
  }

  render() {
    const { t, candidateInfo: { curriculumVitaes }, loading } = this.props
    const { defaultKeyTag } = this.state
    const panes = [{
      key: 'curriculumVitaes',
      tabName: t(key.titleCurriculumVitaes),
      component: (<CurriculumVitaesTable
        translate={t}
        pageSize={curriculumVitaes.filter.limit}
        total={curriculumVitaes.filter.total}
        current={curriculumVitaes.filter.page}
        data={curriculumVitaes.data}
        onChange={pagination => (this.onTablePageChange('curriculumVitaes', pagination))}
        isLoading={loading.effects['candidateInfo/curriculumVitaes']}
        title={() => (
          <Row>
            <Col md={24} lg={6}>
              123
            </Col>
          </Row>
        )}
      />),
    }, {
      key: 'submissionHistories',
      tabName: t(key.titleSubmissionHistories),
      component: (<CurriculumVitaesTable
        translate={t}
        pageSize={curriculumVitaes.filter.limit}
        total={curriculumVitaes.filter.total}
        current={curriculumVitaes.filter.page}
        data={curriculumVitaes.data}
        onChange={pagination => (this.onTablePageChange('curriculumVitaes', pagination))}
        isLoading={loading.effects['candidateInfo/curriculumVitaes']}
        title={() => (
          <Row>
            <Col md={24} lg={6}>
              123
            </Col>
          </Row>
        )}
      />),
    }, {
      key: 'following',
      tabName: t(key.titleFollowing),
      component: (<CurriculumVitaesTable
        translate={t}
        pageSize={curriculumVitaes.filter.limit}
        total={curriculumVitaes.filter.total}
        current={curriculumVitaes.filter.page}
        data={curriculumVitaes.data}
        onChange={pagination => (this.onTablePageChange('curriculumVitaes', pagination))}
        isLoading={loading.effects['candidateInfo/curriculumVitaes']}
        title={() => (
          <Row>
            <Col md={24} lg={6}>
              123
            </Col>
          </Row>
        )}
      />),
    }, {
      key: 'following',
      tabName: t(key.titleFollowing),
      component: (<CurriculumVitaesTable
        translate={t}
        pageSize={curriculumVitaes.filter.limit}
        total={curriculumVitaes.filter.total}
        current={curriculumVitaes.filter.page}
        data={curriculumVitaes.data}
        onChange={pagination => (this.onTablePageChange('curriculumVitaes', pagination))}
        isLoading={loading.effects['candidateInfo/curriculumVitaes']}
        title={() => (
          <Row>
            <Col md={24} lg={6}>
              123
            </Col>
          </Row>
        )}
      />),
    }]
    return (
      <Col sm={24} md={24} lg={18}>
        <div className="card-container">
          <Tabs activeKey={defaultKeyTag} defaultActiveKey={DEFAULT_KEY_TAG} type="card" onChange={this.handleTabs}>
            {
              panes.map(item => <Tabs.TabPane tab={item.tabName} key={item.key}>{item.component}</Tabs.TabPane>)
            }
          </Tabs>
        </div>
      </Col>
    )
  }
}

export default connect(({ app, candidateInfo, loading }) => ({ app, candidateInfo, loading }))(translate()(CandidateView))
