import React from 'react'
import { Icon, Menu } from 'antd'
import { Link, routerRedux } from 'dva/router'
import { connect } from 'dva'

import './style.less'
import { AppConst } from '../../../configs'

class MenuRecuiterView extends React.Component {
  render() {
    const { app: { user }, dispatch } = this.props
    if (!user.business) {
      dispatch(routerRedux.push('/home'))
    }
    const userId = localStorage.getItem(AppConst.localStorage.userIdKey)
    return (
      <div className="menu-candidate">
        <Menu
          theme="dark"
          mode="horizontal"
        >
          <Menu.Item key="create">
            <Link to="/recuiter/recuiterment/create"><Icon type="mail" />Tạo tin tuyển dụng</Link>
          </Menu.Item>
          <Menu.Item key="account">
            <Link to={`/accounts/${userId}`}>
              <Icon type="appstore" />Quản lý tài khoản
            </Link>
          </Menu.Item>
          <Menu.Item key="management">
            <Link to="/recuiter/recuiterments"><Icon type="mail" />Quản lý tin tuyển dụng</Link>
          </Menu.Item>
          <Menu.Item key="job-applied">
            <Link to="/recuiter/apply-jobs">
              <Icon type="appstore" />Quản lý hồ sơ ứng tuyển
            </Link>
          </Menu.Item>
          <Menu.Item key="beauty">
            <Link to={`/business/update/${user.business}`}>
              <Icon type="mail" />Quản lý thông tin công ty
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default connect(({ app, loading }) => ({ app, loading }))(MenuRecuiterView)

