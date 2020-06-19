import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'dva/router'
import { connect } from 'dva'
import { Layout } from 'antd'
import { translate } from 'react-i18next';

import styles from './style.less'
import { HeaderView } from './header'
import { HeaderLoginView } from '../login/header';
import HeaderSingle from './header-single/view'
import { FooterView } from './footer';

class LayoutView extends React.Component {
  // On logout
  logout = () => {
    // Logout
    this.props.dispatch({
      type: 'app/logout',
    })
  }

  render() {
    const { children, app, unauthenticatedComponents, t } = this.props
    // const isLoggedIn = app.user && app.user._id
    const { isLoggedIn, user } = app
    return (
      <Layout className={styles.appLayout}>
        <Layout style={{ minHeight: '100vh' }} className="layout-view">
          {
            isLoggedIn &&
              <HeaderView
                user={app.user}
                logout={this.logout}
              />
          }
          {
            !isLoggedIn &&
            <div className="background-white">
              <HeaderLoginView translate={t} />
            </div>
          }
          {
            isLoggedIn &&
            <HeaderSingle isLoggedIn={isLoggedIn} user={user} />
          }
          {
            !isLoggedIn ?
              <Layout>{unauthenticatedComponents}</Layout>
            :
              // appFilters && Object.keys(appFilters).length ?
              <Layout className="layout-chilren">{children}</Layout>
              // : <div className="app-loading-indicator"><Icon type="loading" /></div>
          }
          <FooterView />
        </Layout>
      </Layout>
    )
  }
}

LayoutView.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(translate([])(LayoutView)))
