import React from 'react'
import { Row, Pagination, Drawer, Empty } from 'antd'
import lodash from 'lodash'

import CardProfileView from './card-profile'
import CVInfoView from './cv-info/view'
import { AppConst } from '../../../../configs';
import { RcSelectBoxHorizontal } from '../../../../components'
import { helper } from '../../../../utils';

class ManagerCandidateListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      applyJobId: '',
    }
  }
  onClose = () => {
    this.props.dispatch({
      type: 'applyJob/resetState',
      payload: {
        cv: null,
      },
    })
    this.setState({
      visible: false,
    })
  }

  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { applyJob: { filter } } = this.props
    const filters = helper.mergeObjects(filter, newFilter)
    const query = lodash.pick(filters, ['keyword', 'status'])
    this.fetchApplyJobs(query)
  }

  showDrawer = (cvId, applyJobId) => {
    const { dispatch } = this.props
    dispatch({
      type: 'applyJob/fetchCVById',
      payload: {
        cvId,
      },
    })
    this.setState({
      visible: true,
      applyJobId,
    })
  }

  fetchApplyJobs = (filter) => {
    const recuiterment = this.props.recuiterment._id
    this.props.dispatch({
      type: 'applyJob/fetchUserApplyJobs',
      payload: {
        ...filter,
        recuiterment,
      },
    })
  }
  render() {
    const { visible, applyJobId } = this.state
    const { applyJobs, dispatch, applyJob } = this.props
    return (
      <div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="search-filter">
              <div className="col-md-4 col-sm-5">
                <div className="filter-form">
                  <div className="input-group">
                    <RcSelectBoxHorizontal
                      title="TRẠNG THÁI"
                      values={AppConst.cv.status.list}
                      onChange={status => this.onFilterChange({ status })}
                      initValue={AppConst.cv.status.default}
                    />
                  </div>
                </div>
              </div>

              {/* <div className="col-md-8 col-sm-7">
                <div className="short-by pull-right">
                    Short By
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <Row gutter={16}>
          {
            applyJobs.map((item) => {
              return (
                <CardProfileView
                  data={item}
                  key={item._id}
                  visible={visible}
                  showDrawer={this.showDrawer}
                  onClose={this.onClose}
                  dispatch={dispatch}
                />
              )
            })
          }
        </Row>
        <Drawer
          title="Thông tin hồ sơ xin việc"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={840}
        >
          <Row>
            <CVInfoView
              dispatch={dispatch}
              applyJob={applyJob}
              applyJobId={applyJobId}
            />
          </Row>
        </Drawer>

        {
          !!applyJobs.length &&
          <Row gutter={16} className="pagination-bottom">
            <Pagination defaultCurrent={applyJob.filter.page} total={applyJob.filter.total} />
          </Row>
        }
        {
          !applyJobs.length &&
          <Row gutter={16} className="background-white">
            <Empty />
          </Row>
        }
      </div>
    )
  }
}

export default ManagerCandidateListView
