import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Button, Row, Col, Divider, Skeleton } from 'antd'

import OverviewView from './info/overview'

import './style.less'
import ComponentBusinessView from './info/business'
import { ListWorkView } from '../../../components/list-work'
import { RcSearchBoxJobs } from '../../../components/search-box-job'
import { format, notification } from '../../../utils'
import { AppConst, ImageConst } from '../../../configs'
import { ApplyModal } from './modal-apply'
import { ListJobsSuggest } from '../../layout/job-suggest'

class RecuitermentDetailView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      statusModalVisible: false,
    }
  }
  componentDidMount() {
    this.fetchRecuitermentDetailPosting()
    this.fechSimilarJobs()
  }

  fetchRecuitermentDetailPosting = () => {
    const { dispatch, match } = this.props
    dispatch({
      type: 'recuitermentShow/fetchDetailRecuitermentPosting',
      payload: {
        recuitermentId: match.params.id,
      },
    })
  }

  /**
   * Fetch similar jobs
   */
  fechSimilarJobs = () => {
    const { dispatch, match } = this.props
    dispatch({
      type: 'recuitermentShow/fechSimilarJobs',
      payload: {
        recuitermentId: match.params.id,
      },
    })
  }

  /**
   * Apply Job
   */
  applyJob = () => {
    // Check login
    const isLogin = localStorage.getItem(AppConst.localStorage.authKey)
    if (!isLogin) {
      return notification.warning('Vui lòng đăng nhập tài khoản người tìm việc để thực hiện hành động này!')
    }
    // Check role
    const role = localStorage.getItem(AppConst.localStorage.roleKey)
    if (role !== 'candidate') {
      return notification.warning('Vui lòng đăng nhập tài khoản người tìm việc để thực hiện hành động này!')
    }

    this.toggleModal()
  }

  /**
   * Handle toggle modal
   *
   * @param {Array} cvs
   *
   */
  toggleModal = () => {
    const { statusModalVisible } = this.state
    const userId = localStorage.getItem(AppConst.localStorage.userIdKey)
    this.setState({
      statusModalVisible: !statusModalVisible,
    })
    if (!statusModalVisible) {
      this.props.dispatch({
        type: 'recuitermentShow/getCVApproved',
        payload: {
          user: userId,
        },
      })
    }
  }

  saveJob = (id) => {
    this.props.dispatch({
      type: 'recuitermentShow/saveJob',
      payload: {
        recuiterment: id,
      },
    })
  }

  render() {
    const { loading, recuitermentShow: { recuitermentPosting, cvIsApproved, recuitermentSimilar }, dispatch, match } = this.props
    if (!recuitermentPosting) {
      return <Skeleton active />
    }

    const recuitermentId = match.params.id
    return (
      <div className="main-wrapper">
        <div className="page-job-detail page-job-detail_no-background">
          <div className="page-background">
            <div className="background-overlay" />
          </div>
        </div>
        <div className="page-foreground container" style={{ width: '100%' }}>
          <section className="page-job-detail__header">
            <div className="box box-md">
              <div className="absolute-right premium-popover-trigger" />
              <div className="row">
                {/** Employer logo */}
                <div className="col-md-2 col-logo">
                  <span className="center-block text-center logo-wrapper">
                    <Link to="/business/id">
                      <img
                        src={recuitermentPosting.cover || recuitermentPosting.business.logo || ImageConst.defaultPhoto}
                        alt=""
                        className="logo img-responsive"
                      />
                    </Link>
                  </span>
                </div>
                {/** Job header info */}
                <div className="col-md-10 col-content-wrapper">
                  <div className="row">
                    <div className="col-lg-10 col-md-9 col-content">
                      <div className="job-header-info">
                        <h1 className="job-title">{recuitermentPosting.title}</h1>
                        <div className="row">
                          <div className="col-sm-12 company-name">
                            <a
                              href={`/business/${recuitermentPosting.business._id}`}
                              className="track-event"
                            >
                              {recuitermentPosting.business.name}
                            </a>
                            <span className="gray-light m-l-xs m-r-xs hidden-xs">-</span>
                            <span className="company-location">
                              <a
                                itemProp="address"
                                itemScope=""
                                href={`/business/${recuitermentPosting.business._id}`}
                                title={recuitermentPosting.business.address}
                              >
                                {recuitermentPosting.business.address}
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <span className="salary">
                              <strong className="text-primary text-lg">
                                {recuitermentPosting.salary.name}
                              </strong>
                            </span>
                            <span className="view gray-light">
                              Hạn nộp hồ sơ: {format.dateWithNoHour(recuitermentPosting.deadline)}
                            </span>
                            <span className="gray-light m-l-xs m-r-xs">-</span>
                            <span className="expiry gray-light">Expires in 5 days</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2 col-md-3 col-btn">
                      <div className="row">
                        <div className="col-xs-6 col-xs-push-6 col-md-12 col-md-push-0">
                          <Button className="btn-apply" type="primary">APPLY NOW</Button>
                        </div>
                        <div className="col-xs-6 col-xs-pull-6 col-md-12 col-md-pull-0 save-job-wrapper">
                          <Button
                            className="btn-apply"
                            style={{ background: 'white', border: '0.6px solid #f60', color: '#f60' }}
                            onClick={() => this.saveJob(recuitermentPosting._id)}
                          >
                            SAVE JOB
                          </Button>
                        </div>
                        <div className="job-saved text-center col-xs-12">
                          <i className="fa fa-heart text-gray" /> Saved
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="page-job-detail__detail">
            <Row gutter={16}>
              <Col
                xs={24} sm={24} md={24} lg={15} xl={15} span={20}
                className="col-left pd-0"
              >
                <OverviewView recuitermentPosting={recuitermentPosting} />
                <Divider />
                <Row className="background-white">
                  <h2 className="detail-title display-title">Hình thức nộp hồ sơ</h2>
                  <p>Bấm vào nút  <b>NỘP HỒ SƠ</b>  để ứng tuyển</p>
                  <div className="job-apply">
                    <Divider className="background-white" />
                    <Button
                      type="primary"
                      className="btn-job-apply"
                      onClick={this.applyJob}
                    >
                      NỘP HỒ SƠ
                    </Button>
                    <Divider className="background-white" />
                  </div>
                </Row>
                <div className="similar-jobs">
                  <ListWorkView
                    listData={recuitermentSimilar}
                    loading={loading}
                    title="Việc làm tương tự"
                  />
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8} span={4}>
                <ComponentBusinessView recuitermentPosting={recuitermentPosting} />
                <RcSearchBoxJobs /><br />
                <ListJobsSuggest />
              </Col>
            </Row>
          </section>
        </div><br /><br />
        <ApplyModal
          visible={this.state.statusModalVisible}
          dispatch={dispatch}
          toggleModal={this.toggleModal}
          cvIsApproved={cvIsApproved}
          recuitermentId={recuitermentId}
        />
      </div>
    )
  }
}

export default connect(({ loading, recuitermentShow }) => ({ loading, recuitermentShow }))(translate([])(RecuitermentDetailView))
