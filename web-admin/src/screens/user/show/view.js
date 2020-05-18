import React from 'react'
import { Layout, Row } from 'antd'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { key } from '../../../configs/locale'
import { RcBreadcrumb } from '../../../components'
import './style.less'

// Components
import InfoView from './info'
import CandidateView from './candidate/view'

class UserShowView extends React.Component {
  componentDidMount() {
    const { match, dispatch } = this.props
    dispatch({
      type: 'userShow/fetch',
      payload: {
        _id: match.params.id,
      },
    })
  }

  shouldComponentUpdate(nextProps) {
    const { dispatch } = this.props
    if (nextProps.match.params.id !== this.props.match.params.id) {
      dispatch({
        type: 'userShow/fetch',
        payload: {
          _id: nextProps.match.params.id,
        },
      })
      return true
    }
    return true
  }

  // Change ban
  changeBan = () => {
    const { dispatch, match } = this.props
    dispatch({
      type: 'userShow/changeBan',
      payload: {
        _id: match.params.id,
      },
    })
  }

  // Confirm phone
  confirmPhone = (data) => {
    const { dispatch, match } = this.props
    dispatch({
      type: 'userShow/confirmPhone',
      payload: {
        _id: match.params.id,
        data,
      },
    })
  }

  // Unblock user
  handleUnblockUser = (_id) => {
    const { dispatch } = this.props
    dispatch({
      type: 'userShow/unblockUser',
      payload: {
        _id,
      },
    })
  }

  render() {
    const { userShow: { user, filter }, t, match } = this.props
    const breadcrumbParents = [{
      _id: 1,
      url: '/users',
      name: t(key.menuUser),
    }]
    return (
      <Layout className="container">
        <RcBreadcrumb name={user.username} parents={breadcrumbParents} />
        <Layout className="page-content">
          <Row className="page-user-detail" gutter={16}>
            <InfoView
              filter={filter}
              user={user}
              changeBan={this.changeBan}
              confirmPhone={this.confirmPhone}
              handleUnblockUser={this.handleUnblockUser}
              onSelectBusinessBlockUser={this.onSelectBusinessBlockUser}
            />
            <CandidateView _id={match.params.id} />
          </Row>
        </Layout>
      </Layout>
    )
  }
}

export default translate([])(connect(({ userShow }) => ({ userShow }))(UserShowView))
