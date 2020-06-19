import React from 'react'
import { connect } from 'dva'
import { Row, Col, Icon } from 'antd'
import lodash from 'lodash'

import { translate } from 'react-i18next'
import CardNotification from './card-setup-notification'

import './style.less'
import ButtonRegisterNotification from './button-notificaiton'
import FormNotifyView from './form-notify'

class NotificationView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
    }
  }
  componentDidMount() {
    this.fetchDetailNotificationByUser()
  }

  /**
   * Show form register notify
   */
  showformRegisterNotify = () => {
    this.setState({
      showForm: true,
    })
  }

  /**
   * Fetch detail notification by user
   */
  fetchDetailNotificationByUser = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'notificationJobs/fetchNotification',
    })
  }

  render() {
    const { notificationJobs: { notificationJob }, app: { user, careerGroups }, dispatch } = this.props
    const { showForm } = this.state
    if (!notificationJob) {
      return <Icon type="loading" />
    }
    return (
      <div className="notificaiton-wrapper container">
        <Row className="account-form">
          <Col xs={24} md={24} lg={24} xl={24} className="margin-top-30">
            {
              lodash.isEmpty(notificationJob) &&
              <ButtonRegisterNotification
                showformRegisterNotify={this.showformRegisterNotify}
                showForm={showForm}
              />
            }
            {
              !lodash.isEmpty(notificationJob) && <CardNotification notificationJob={notificationJob} dispatch={dispatch} />
            }
          </Col>
          {
            showForm && lodash.isEmpty(notificationJob) &&
            <Col xs={24} md={24} lg={24} xl={24} className="margin-top-30">
              <FormNotifyView
                email={user.email}
                type="create"
                dispatch={dispatch}
                careerGroups={careerGroups}
              />
            </Col>
          }
        </Row>
      </div>
    )
  }
}

export default connect(({ loading, notificationJobs, app }) => ({ loading, notificationJobs, app }))(translate([])(NotificationView))
