import React from 'react'
import { Row, Col, Icon, Tag, Divider } from 'antd'

import './style.less'
import { helper, format } from '../../../../utils'

class OverviewView extends React.Component {
  render() {
    const { recuitermentPosting } = this.props
    return (
      <div className="overview-info background-white">
        <h2 className="detail-title display-title">Thông tin việc làm</h2>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} >
            <ul>
              <li>
                <Icon type="dollar" />
                <b> Mức lương: </b>
                <span>{recuitermentPosting.salary.name}</span>
              </li>

              <li>
                <Icon type="bar-chart" />
                <b>Kinh nghiệm: </b>
                <span>{helper.getTotalYearExperience(recuitermentPosting.experience)}</span>
              </li>

              <li>
                <Icon type="book" />
                <b>Yêu cầu bằng cấp:</b>
                <span>{helper.getAducation(recuitermentPosting.degreeRequirement)}</span>
              </li>

              <li>
                <Icon type="user" />
                <b>Số lượng cần tuyển:</b>
                <span>{format.number(recuitermentPosting.quantity)}</span>
              </li>
              <li>
                <Icon type="bars" />
                <b>Ngành nghề: </b>
                <span>
                  {
                    recuitermentPosting.careers.map((item) => {
                      return (
                        <Tag color="blue" key={item._id}>{item.name}</Tag>
                      )
                    })
                  }
                </span>
              </li>
            </ul>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} >
            <ul>
              <li>
                <Icon type="environment" />
                <b> Địa điểm làm việc: </b>
                <span>{helper.getCity(recuitermentPosting.city)}</span>
              </li>

              <li>
                <Icon type="medicine-box" />
                <b>Chức vụ: </b>
                <span>{helper.getRank(recuitermentPosting.jobPosition)}</span>
              </li>

              <li>
                <Icon type="laptop" />
                <b>Hình thức làm việc:  </b>
                <span>{helper.getWorkMode(recuitermentPosting.workMode)}</span>
              </li>

              <li>
                <Icon type="branches" />
                <b>Yêu cầu giới tính:  </b>
                <span>{helper.getGender(recuitermentPosting.gender)}</span>
              </li>
            </ul>
          </Col>
        </Row>
        <Divider />
        <h2 className="detail-title display-title">Mô tả công việc</h2>
        <Row>
          <div dangerouslySetInnerHTML={{ __html: recuitermentPosting.desc }} />
        </Row>

        <Divider />
        <h2 className="detail-title display-title">Yêu cầu công việc</h2>
        <Row>
          <div dangerouslySetInnerHTML={{ __html: recuitermentPosting.jobRequirements }} />
        </Row>

        <Divider />
        <h2 className="detail-title display-title">Quyền lợi</h2>
        <Row>
          <div dangerouslySetInnerHTML={{ __html: recuitermentPosting.benefit }} />
        </Row>

        <Divider />
        <h2 className="detail-title display-title">Thông tin liên hệ</h2>
        <Row>
          - Người liên hệ : {recuitermentPosting.user.fullName}<br />
          - Điện thoại: {format.phone(recuitermentPosting.user.phone)}<br />
          - Email: {recuitermentPosting.user.email}
        </Row>
      </div>
    )
  }
}

export default OverviewView
