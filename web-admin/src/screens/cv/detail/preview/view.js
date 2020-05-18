import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { Row, Col, Collapse, BackTop, Icon, Skeleton, Layout } from 'antd';

import './style.less'

import ExperienceDetailPreView from './experience'
import QualificationDetailPreView from './qualification'
import LanguageDetailPreView from './language'
import OfficeInfoDetailPreView from './office-infomation'
import SkillDetailPreView from './skill'
import { format, helper } from '../../../../utils'
import { RcBreadcrumb } from '../../../../components';
import { key } from '../../../../configs/locale';
import BoxRightView from './box-right';

const { Panel } = Collapse

class PreviewCVView extends React.Component {
  componentDidMount() {
    this.fetchDetailCV()
  }

  componentWillUnmount() {
    this.resetState()
  }

  fetchDetailCV = () => {
    const { match } = this.props
    this.props.dispatch({
      type: 'cvs/fetchDetailCV',
      cvId: match.params.id,
    })
  }

  resetState = () => {
    this.props.dispatch({
      type: 'cvs/resetState',
    })
  }

  render() {
    const { cvs: { cv }, t, dispatch } = this.props
    if (!cv) {
      return <Skeleton active />
    }

    const breadcrumbParents = [{
      _id: 1,
      url: '/cvs',
      name: t(key.menuCV),
    }]

    const {
      _id,
      rejectedAt,
      approvedAt,
      createdAt,
      status,
      forteSkill,
      user,
      overviewInfo,
      workExperiences,
      qualifications,
      foreignLanguages,
      computerLiteracy,
    } = cv
    return (
      <Layout className="container">
        <Row type="flex" justify="space-between">
          <RcBreadcrumb name={cv.overviewInfo.desiredLocation} parents={breadcrumbParents} />
        </Row>
        <Layout className="page-content">
          <Row>
            <Col xs={24} md={12}>
              <div className="box-content">
                <div className="top-breakcrum">
                  <div className="clearfix" /><br />
                  <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6', '7', '8']}>
                    <Panel
                      showArrow
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
                        <Col xs={24} md={8} className="avatar offset20">
                          <img src="https://cdn.timviecnhanh.com/asset/home/img/default.gif" alt="" />
                        </Col>
                        <Col xs={24} md={14} className="push-left-20">
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
                        </Col>
                      </div><br />
                    </Panel>
                    <Panel
                      showArrow
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
                      showArrow
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
                      <div>{overviewInfo.careerGoal}</div>
                    </Panel>
                    <Panel
                      showArrow
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
                      showArrow
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
                      showArrow
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
                      showArrow
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
                      showArrow
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
            <Col xs={24} md={12}>
              <BoxRightView
                status={status}
                createdAt={createdAt}
                dispatch={dispatch}
                cvId={_id}
                rejectedAt={rejectedAt}
                approvedAt={approvedAt}
              />
            </Col>
          </Row>
        </Layout>
        <div>
          <BackTop>
            <Icon type="up-circle" theme="filled" className="back-top" />
          </BackTop>
        </div>
      </Layout>
    )
  }
}

export default connect(({ loading, cvs }) => ({ loading, cvs }))(translate([])(PreviewCVView))
