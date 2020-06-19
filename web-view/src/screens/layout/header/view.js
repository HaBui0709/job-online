import React from 'react'
import { Link } from 'dva/router';

import PropTypes from 'prop-types'
import { Layout } from 'antd'

import { ProfileMenuView } from './profile-menu'

import './style.less'
import { ImageConst } from '../../../configs';

const { Header } = Layout

class HeaderView extends React.Component {
  // On select profile menu
  selectProfileItem = (key) => {
    if (key === 'logout') {
      this.props.logout()
    }
  }

  render() {
    const { user } = this.props
    return (
      <Header className="app-header">
        <Link to="/home">
          <img
            style={{ width: '180px', marginLeft: '40%' }}
            alt="logo-job"
            src={ImageConst.logoOnline}
          />
        </Link>
        <ProfileMenuView
          onSelectMenuItem={this.selectProfileItem}
          user={user}
        />
      </Header>
    )
  }
}

HeaderView.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

export default HeaderView
