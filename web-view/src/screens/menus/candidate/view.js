import React from 'react'
import { Icon, Menu } from 'antd'
import { Link } from 'dva/router'

import './style.less'
import { AppConst } from '../../../configs';

class MenuCandidateView extends React.Component {
  render() {
    const userId = localStorage.getItem(AppConst.localStorage.userIdKey)
    return (
      <div className="menu-candidate">
        <Menu
          theme="dark"
          // onClick={this.handleClick}
          // selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="create">
            <Link to="/candidate/create-cv"><Icon type="mail" />Tạo hồ sơ</Link>
          </Menu.Item>
          <Menu.Item key="account">
            <Link to={`/accounts/${userId}`}>
              <Icon type="appstore" />Quản lý tài khoản
            </Link>
          </Menu.Item>
          <Menu.Item key="management">
            <Link to="/candidate/cv"><Icon type="mail" />Quản lý hồ sơ</Link>
          </Menu.Item>
          <Menu.Item key="job-applied">
            <Link to="/candidate/apply-jobs"><Icon type="appstore" />Việc làm đã ứng tuyển</Link>
          </Menu.Item>
          <Menu.Item key="favorite">
            <Link to="/cong-viec-yeu-thich">
              <Icon type="mail" />Công việc đã lưu
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default MenuCandidateView
