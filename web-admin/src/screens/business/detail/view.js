import React from 'react'
import { Layout, Row, Col, Switch, Icon } from 'antd'
import { translate } from 'react-i18next'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { RcBreadcrumb } from '../../../components'
import { key } from '../../../configs/locale'
import { TabsView } from './tab'
import Info from './info'
import './style.less'


export class DetailView extends React.Component {
  componentDidMount() {
    this.fecthDetail()
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props
    if (match.params.id !== prevProps.match.params.id) {
      this.fecthDetail(match.params.id)
    }
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'business/clear',
    })
  }

  /**
   * Fetch business data
   */
  fecthDetail = () => {
    const { match, dispatch } = this.props
    dispatch({
      type: 'business/fetch',
      payload: {
        businessId: match.params.id,
      },
    })
  }

  /**
   * Handle change checkbox in list user block
   */
  handleChangeCheckbox = (_id, checked) => {
    this.props.dispatch({
      type: 'business/change',
      payload: {
        _id,
        checked,
      },
    })
  }

  /**
   * Navigate to update page
   */
  goToUpdatePage = () => {
    const { dispatch, business: { business } } = this.props
    dispatch(routerRedux.push(`/businesses/${business._id}/edit`))
  }

  /**
   * Change business status
   */
  changeStatus = () => {
    this.props.dispatch({
      type: 'business/changeStatus',
    })
  }

  render() {
    const { t, business: { business }, dispatch } = this.props
    const businessId = this.props.match.params.id
    const breadcrumbParents = [{
      _id: 1,
      url: '/businesses',
      name: t(key.titleBusiness),
    }]
    if (!business) {
      return <Icon type="loading" />
    }
    console.log('business', business)
    return (
      <Layout className="container">
        <Row type="flex" justify="space-between">
          <RcBreadcrumb name={business.name} parents={breadcrumbParents} />
          <div className="step-action-button button-action">
            <div>
              <Switch
                className="switch-status"
                checkedChildren={<span><Icon type="check" style={{ marginRight: '4px' }} />{t(key.titleActive)}</span>}
                unCheckedChildren={<span><Icon type="close" style={{ marginRight: '4px' }} />{t(key.titleActive)}</span>}
                defaultChecked={business.active}
                onChange={this.changeStatus}
              />
            </div>
          </div>
        </Row>
        <Layout className="page-content">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={6}>
              <Info
                business={business}
                translate={t}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={18}>
              <div className="card-container">
                <TabsView
                  className="card-data"
                  translate={t}
                  dispatch={dispatch}
                  businessId={businessId}
                />
              </div>
            </Col>
          </Row>
        </Layout>
      </Layout>
    )
  }
}

export default connect(({ app, business, loading, event }) => {
  return { app, business, loading, event }
})(translate([key.translations, key.businesses])(DetailView))
