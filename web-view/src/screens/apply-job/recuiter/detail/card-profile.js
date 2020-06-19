/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
// import { Link } from 'dva/router'
import { Col, Avatar, Icon, Tag } from 'antd'

import { helper, format } from '../../../../utils'

import './style.less'

class CardProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      styleLink: '',
    }
  }
  setStyleLink = (styleLink) => {
    this.setState({
      styleLink,
    })
  }

  render() {
    const { styleLink } = this.state
    const { showDrawer, data } = this.props
    return (
      <Col md={6} sm={6} span={6}>
        <div
          className="manage-cndt"
          onMouseEnter={() => this.setStyleLink('greenBackground')}
          onMouseLeave={() => this.setStyleLink('')}
        >
          <div className={`cndt-status ${data.status}`}>{data.status}</div>
          <div className="cndt-caption">
            <div className="cndt-pic">
              <Avatar src={data.cv.user.avatar} size={90} style={{ marginTop: '29px' }} />
            </div>
            <h4>{data.cv.user.fullName}</h4>
            <span>{data.cv.overviewInfo.desiredLocation}</span>
            <p>
              <Icon type="eye" />&nbsp;{helper.getCity(data.cv.overviewInfo.desiredCity)}&nbsp;&nbsp;&nbsp;
              <Icon type="alert" />&nbsp;{helper.getTotalYearExperience(data.cv.overviewInfo.totalYearExperience)}
            </p>
            <p>
              <Icon type="dollar" />&nbsp;&nbsp;Mức lương: &nbsp;{format.number(data.cv.overviewInfo.minimumWage)} VND
            </p>
            <p>
              <b>Hình thức:&nbsp; </b>
              <Tag color="blue">{helper.getWorkMode(data.cv.overviewInfo.workMode)}</Tag>
            </p>
            {/* <p>
              <Tag color="green">{data.cv.overviewInfo.desiredCareer.name}</Tag>
            </p> */}
          </div>
          <a
            className={`cndt-profile-btn ${styleLink}`}
            onClick={() => showDrawer(data.cv._id, data._id)}
          >
            View Profile
          </a>
        </div>
      </Col>
    )
  }
}

export default CardProfileView
