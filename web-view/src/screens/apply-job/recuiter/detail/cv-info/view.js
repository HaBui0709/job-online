import React from 'react'
import { Row, Col, Collapse, Button, Skeleton, Avatar } from 'antd'

import './style.less'

import ExperienceDetailPreView from './experience'
import QualificationDetailPreView from './qualification'
import LanguageDetailPreView from './language'
import OfficeInfoDetailPreView from './office-infomation'
import SkillDetailPreView from './skill'
import helper from '../../../../../utils/helper'
import { format } from '../../../../../utils'
import { ApprovedModal } from '../modal-approved';

const { Panel } = Collapse

class CVInfoView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      typeStatus: '',
    }
  }
  /**
   * Handle toggle modal
   */
  toggleModal = () => {
    const { visible } = this.state
    const newState = { visible: !visible }
    this.setState(newState)
  }

  showModal = (type) => {
    this.setState({ typeStatus: type })
    this.toggleModal()
  }
  render() {
    const { applyJob: { cv, applyJobs }, dispatch, applyJobId } = this.props
    const status = applyJobs.filter(item => item._id === applyJobId).map(ele => ele.status)[0]
    const { visible } = this.state
    if (!cv) {
      return <Skeleton active />
    }

    const { forteSkill, user, overviewInfo, workExperiences, qualifications, foreignLanguages, computerLiteracy } = cv
    return (
      <div>
        <div className="container" style={{ width: '750px', marginTop: '-20px' }}>
          <Row>
            <Col xs={24} md={24}>
              <div className="box-content">
                <div>
                  <div className="clearfix" /><br />
                  <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7', '8']}>
                    <Panel
                      showArrow={false}
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Thông tin tài khoản</span>
                            <span className="line" />
                          </h3>
                        </header>
                    } key="1"
                    >
                      <div className="content-box group-collapse"><br />
                        <div className="avatar col-xs-2 offset20">
                          <Avatar size={140} src={user.avatar} alt="" />
                        </div>
                        <div className="col-xs-6 offset20 push-left-20">
                          <div className="info-user1">
                            <p className="f-s-18">
                              Họ tên:
                              <b className="value text-primary">{user.fullName}</b>
                            </p>
                            <p className="f-s-18">
                              Giới tính:&nbsp;&nbsp;&nbsp;&nbsp;
                              <b className="value text-primary">
                                {helper.getGender(user.gender)}
                              </b>
                            </p>
                            <p className="f-s-18">
                              Ngày sinh:&nbsp;&nbsp;&nbsp;&nbsp;
                              <b className="value text-primary">
                                {format.dateWithNoHour(user.birthday)}
                              </b>
                            </p>
                            <p className="f-s-18">
                              Chỗ ở hiện tại:&nbsp;&nbsp;&nbsp;&nbsp;
                              <b className="value text-primary">
                                {user.address}
                              </b>
                            </p>
                            <p className="f-s-18">
                              Số điện thoại:&nbsp;&nbsp;&nbsp;&nbsp;
                              <b className="value text-primary">
                                {format.phone(user.phone)}
                              </b>
                            </p>
                            <p className="f-s-18">
                              Email:&nbsp;&nbsp;&nbsp;&nbsp;
                              <b className="value text-primary">
                                {user.email}
                              </b>
                            </p>
                          </div>
                        </div>
                      </div><br />
                    </Panel>
                    <Panel
                      showArrow={false}
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Thông tin chung</span>
                            <span className="line" />
                          </h3>
                        </header>
                      }
                      key="2"
                    >
                      <div>
                        <Row className="box-list-info">
                          <Col xs={24} md={24}>
                            <div>
                              <span> Tiêu đề hồ sơ: </span>
                              <b className="value text-primary upperCase">
                                {overviewInfo.desiredLocation}
                              </b>
                            </div>
                          </Col>
                        </Row>
                        <Row className="box-list-info">
                          <Col xs={24} md={12} lg={12}>
                            <ul>
                              <li>
                                <span> Cấp bậc hiện tại: </span>
                                <b className="value text-primary">
                                  {helper.getRank(overviewInfo.currentRank)}
                                </b>
                              </li>
                              <li>
                                <span>Cấp bậc mong muốn: </span>
                                <b className="value text-primary">
                                  {helper.getRank(overviewInfo.desiredRank)}
                                </b>
                              </li>
                              <li>
                                <span>Trình độ cao nhất: </span>
                                <b className="value text-primary">
                                  {helper.getAducation(overviewInfo.aducation)}
                                </b>
                              </li>
                              <li>
                                <span>Kinh nghiệm: </span>
                                <b className="value text-primary">
                                  {helper.getTotalYearExperience(overviewInfo.totalYearExperience)}
                                </b>
                              </li>
                              <li>
                                <span>Ngoại ngữ: </span>
                                <b className="value text-primary">Tiếng Anh</b>
                              </li>
                            </ul>
                          </Col>
                          <Col xs={24} md={12} lg={12}>
                            <ul>
                              <li>
                                <span> Ngành nghề: </span>
                                <b className="value text-primary">{overviewInfo.desiredCareer.name}</b>
                              </li>
                              <li>
                                <span>Địa điểm làm việc: </span>
                                <b className="value text-primary">
                                  {helper.getCity(overviewInfo.desiredCity)}
                                </b>
                              </li>
                              <li>
                                <span>Mong muốn mức lương tối thiểu: </span>
                                <b className="value text-primary">{format.number(overviewInfo.minimumWage)} VNĐ</b>
                              </li>
                              <li>
                                <span>Hình thức làm việc: </span>
                                <b className="value text-primary">
                                  {helper.getWorkMode(overviewInfo.workMode)}
                                </b>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>
                    </Panel>
                    <Panel
                      showArrow={false}
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Mục tiêu nghề nghiệp</span>
                            <span className="line" />
                          </h3>
                        </header>
                      }
                      key="3"
                    >
                      <div dangerouslySetInnerHTML={{ __html: overviewInfo.careerGoal }} />
                    </Panel>
                    <Panel
                      showArrow={false}
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Kinh nghiệm làm việc</span>
                            <span className="line" />
                          </h3>
                        </header>
                      }
                      key="4"
                    >
                      <ExperienceDetailPreView workExperiences={workExperiences} />
                    </Panel>
                    <Panel
                      showArrow={false}
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Trình độ & Bằng cấp</span>
                            <span className="line" />
                          </h3>
                        </header>
                      }
                      key="5"
                    >
                      <QualificationDetailPreView qualifications={qualifications} />
                    </Panel>
                    <Panel
                      showArrow={false}
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Ngoại ngữ:</span>
                            <span className="line" />
                          </h3>
                        </header>
                      }
                      key="6"
                    >
                      <LanguageDetailPreView foreignLanguages={foreignLanguages} />
                    </Panel>
                    <Panel
                      showArrow={false}
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Tin học văn phòng</span>
                            <span className="line" />
                          </h3>
                        </header>
                      }
                      key="7"
                    >
                      <OfficeInfoDetailPreView computerLiteracy={computerLiteracy} />
                    </Panel>
                    <Panel
                      showArrow={false}
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Kỹ năng & Sở trường</span>
                            <span className="line" />
                          </h3>
                        </header>
                      }
                      key="8"
                    >
                      <SkillDetailPreView forteSkill={forteSkill} />
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: '50px', marginTop: '30px' }}>
            <div style={{ float: 'right' }}>
              <Button
                onClick={() => this.showModal('rejected')}
              >
                Từ chối
              </Button>&nbsp;&nbsp;&nbsp;&nbsp;
              {
                status !== 'approved' &&
                <Button
                  type="primary"
                  onClick={() => this.showModal('approved')}
                >
                  Duyệt hồ sơ
                </Button>
              }
              <ApprovedModal
                visible={visible}
                dispatch={dispatch}
                toggleModal={this.toggleModal}
                typeStatus={this.state.typeStatus}
                applyJobId={applyJobId}
              />
            </div>
          </Row>
        </div>
      </div>
    )
  }
}

export default (CVInfoView)
