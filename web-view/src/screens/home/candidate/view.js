import React from 'react'
import { connect } from 'dva'
import { Carousel, Input, Select, Button, Row, Col } from 'antd'
import { routerRedux } from 'dva/router'

import { translate } from 'react-i18next'

import './style.less'
import { ImageConst, AppConst } from '../../../configs'

import ActivityView from './activity'
import { ListWorkView } from '../../../components/list-work'
import { AttractiveJobsView } from './attractive-jobs'
import { SearchWorkByCareer } from '../../../components/search-work-by-career'
import { RcSearchBoxJobs } from '../../../components/search-box-job'
import { ListJobsNewView } from '../../../components/list-new-job'
import { format, notification } from '../../../utils'
import { ListTopBusinessView } from './top-business'
import { ListJobsSuggest } from '../../layout/job-suggest'

const { Option } = Select

class HomeCandidateView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      career: '',
      city: '',
    }
  }
  componentDidMount() {
    this.fetchCareerGroup()
    this.fetchJobsInteresting()
    this.fetchJobUrgent()
    this.fecthBusinesses()
  }

  onChangeInput = (e) => {
    const { name, value } = e.target
    const newState = {
      [name]: value,
    }
    this.setState(newState)
  }

  onChangeSelect = (newState) => {
    this.setState(newState)
  }

  onSubmit = () => {
    const { keyword, city, career } = this.state
    const { dispatch } = this.props
    dispatch({
      type: 'searchJobs/searchJob',
      payload: {
        keyword,
        city,
        career,
      },
    })
    dispatch(routerRedux.push('/viec-lam/tim-kiem'))
  }

  onChangeRateJob = (e) => {
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
    const { dispatch } = this.props
    dispatch({
      type: 'home/saveFavorite',
      payload: {
        data: {
          recuiterment: e,
        },
      },
    })
  }

  fetchJobsInteresting = () => {
    this.props.dispatch({
      type: 'home/fetchJobInteresting',
    })
  }

  fetchJobUrgent = () => {
    this.props.dispatch({
      type: 'home/fetchJobUrgent',
    })
  }

  fetchCareerGroup = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/fetchCareerGroup',
    })
  }

  fecthBusinesses = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'home/fetchBusinesses',
    })
  }

  render() {
    const { dispatch, loading, home: { jobsInteresting, jobUrgent, careerGroups, businesses }, app } = this.props
    const search = {
      showSearch: true,
      optionFilterProp: 'children',
      filterOption(input, option) {
        return format.nonAccentVietnamese(option.props.children)
          .indexOf(format.nonAccentVietnamese(input)) >= 0
      },
    }
    return (
      <div className="wrapper">
        <div>
          <Carousel autoplay>
            <div><img style={{ width: '100%' }} alt="img" src={ImageConst.banner4} /></div>
            <div><img style={{ width: '100%' }} alt="img" src={ImageConst.banner3} /></div>
            <div><img style={{ width: '100%' }} alt="img" src={ImageConst.banner1} /></div>
            <div><img style={{ width: '100%' }} alt="img" src={ImageConst.banner2} /></div>
          </Carousel>
        </div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="search-bg-tran">
              <h1>Việc làm hấp dẫn đang tuyển dụng hôm nay</h1>
              <Row gutter={16} className="form-search">
                <Col xs={24} sm={24} md={8} lg={12} xl={12}>
                  <div className="div-input">
                    <Input
                      onChange={this.onChangeInput}
                      className="input-css"
                      name="keyword"
                      placeholder="Nhập tên công việc, vị trí, kỹ năng..."
                    />
                  </div>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <div className="auto_complete">
                    <Select
                      className="search-job"
                      showSearch
                      {...search}
                      style={{ width: 200 }}
                      placeholder="Chọn ngành nghề"
                      onChange={value => this.onChangeSelect({ career: value })}
                    >
                      {
                        careerGroups.map((item) => {
                          return (
                            <Option key={item._id} value={item._id}>{item.name}</Option>
                          )
                        })
                      }
                    </Select>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div className="auto_complete">
                    <Select
                      {...search}
                      className="search-job"
                      style={{ width: 200, marginLeft: '-67px' }}
                      placeholder="Chọn nơi làm việc"
                      onChange={value => this.onChangeSelect({ city: value })}
                    >
                      {
                        AppConst.cities.list.map(item => (
                          <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                        ))
                      }
                    </Select>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={4} lg={2} xl={2}>
                  <div className="div-btn">
                    <Button onClick={this.onSubmit} icon="search" className="search-btn" />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <ActivityView />
        <ListTopBusinessView businesses={businesses} />
        <div style={{ clear: 'both' }} />
        <div className="main-content">
          <Row>
            <Col xs={24} sm={24} md={15} lg={15} xl={15}>
              <ListWorkView
                listData={jobUrgent}
                loading={loading}
                title="Tuyển Gấp"
                onChangeRateJob={this.onChangeRateJob}
              />
              <div className="btn-center">
                <Button type="primary" icon="plus">XEM THÊM VIỆC LÀM TUYỂN GẤP</Button>
              </div>
              {/** Viec lam theo nganh nghe */}
              <SearchWorkByCareer careerGroups={careerGroups} /><br /><br />
              <ListJobsNewView dispatch={dispatch} app={app} /><br /><br />
              <ListJobsSuggest />
            </Col>
            <Col xs={24} sm={24} md={7} lg={7} xl={7} className="margin-left-Col-right">
              <AttractiveJobsView jobsInteresting={jobsInteresting} />
              <RcSearchBoxJobs />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(({ app, loading, home, searchJobs }) => ({ app, loading, home, searchJobs }))(translate([])(HomeCandidateView))
