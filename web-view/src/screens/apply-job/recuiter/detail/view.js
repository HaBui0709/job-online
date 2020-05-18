import React from 'react'
import lodash from 'lodash'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Row, Col, Skeleton } from 'antd'
import ManagerCandidateListView from './manager-candidate';
import { helper, format } from '../../../../utils';
import { ImageConst } from '../../../../configs';

// import { format } from '../../../../utils'
class ApplyJobDetailView extends React.Component {
  componentDidMount() {
    this.onFilterChange()
  }

  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { applyJob: { filter }, match } = this.props
    const filters = helper.mergeObjects(filter, newFilter)
    filters.recuiterment = match.params.id
    const query = lodash.pick(filters, ['page', 'keyword', 'recuiterment'])
    this.fetch(query)
  }

  // change table page
  onTablePageChange = (pagination) => {
    const { current } = pagination
    this.onFilterChange({ page: current - 1 })
  }

  // fetch data
  fetch = (filter) => {
    this.props.dispatch({
      type: 'applyJob/fetch',
      payload: {
        ...filter,
      },
    })
  }

  render() {
    const { applyJob: { applyJobs, recuiterment }, applyJob, dispatch } = this.props
    if (!recuiterment) {
      return <Skeleton active />
    }

    // const recuitermentId = match.params.id
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
                    <Link to={`/recuiterments/${recuiterment._id}`}>
                      <img
                        src={recuiterment.cover || ImageConst.defaultPhoto}
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
                        <h1 className="job-title">{recuiterment.title}</h1>
                        <div className="row">
                          <div className="col-sm-12 company-name">
                            <a
                              href={`/company/${recuiterment.business._id}`}
                              className="track-event"
                            >
                              {recuiterment.business.name}
                            </a>
                            <span className="gray-light m-l-xs m-r-xs hidden-xs">-</span>
                            <span className="company-location">
                              <a
                                itemProp="address"
                                itemScope=""
                                href={`/company/${recuiterment.business._id}`}
                                title="{recuiterment.business.address}"
                              >
                                {recuiterment.business.address}
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <span className="salary">
                              <strong className="text-primary text-lg">
                                {recuiterment.salary.name}
                              </strong>
                            </span>
                            <span className="view gray-light">
                              Hạn nộp hồ sơ: {format.dateWithNoHour(recuiterment.deadline)}
                            </span>
                            <span className="gray-light m-l-xs m-r-xs">-</span>
                          </div>
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
                xs={24} sm={24} md={24} lg={24} xl={24}
              >
                <ManagerCandidateListView
                  applyJobs={applyJobs}
                  applyJob={applyJob}
                  dispatch={dispatch}
                  recuiterment={recuiterment}
                />
              </Col>
            </Row>
          </section>
        </div>
      </div>
    )
  }
}

export default connect(({ loading, applyJob }) => ({ loading, applyJob }))(translate([])(ApplyJobDetailView))
