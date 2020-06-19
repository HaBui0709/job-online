import React from 'react'
import { connect } from 'dva'
import { translate } from 'react-i18next'
import { Row, Col, Input, Select, Button } from 'antd'
import { AppConst } from '../../configs'
import { format } from '../../utils'

import './style.less'
import { RcSearchBoxJobs } from '../../components/search-box-job'
import { TableView } from './table'
import NoDataSearchView from './no-data';


const { Option } = Select


class ResultSearchJobView extends React.Component {
  render() {
    const { app: { careerGroups }, loading, searchJobs: { jobs, filter }, dispatch } = this.props
    const search = {
      showSearch: true,
      optionFilterProp: 'children',
      filterOption(input, option) {
        return format.nonAccentVietnamese(option.props.children)
          .indexOf(format.nonAccentVietnamese(input)) >= 0
      },
    }
    return (
      <div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div className="search-bg-tran header-search">
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
          <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: '0px 35px' }}>
            <div className="top-nav box box-title">
              <Row>
                <Col md={12} lg={12}>
                  <div>{`Kết quả tìm kiếm: (${jobs.length}) tin tuyển dụng được tìm thấy theo yêu cầu.`}</div>
                </Col>
                {/* <Col md={12} lg={12}>
                  <div>dfsdf</div>
                </Col> */}
              </Row>
            </div>
            <Row>
              <Col xs={24} sm={24} md={17} lg={17} xl={17}>
                {
                  !!jobs.length &&
                  <TableView
                    pageSize={filter.limit}
                    total={filter.total}
                    current={filter.page}
                    data={jobs}
                    onChange={this.onTablePageChange}
                    dispatch={dispatch}
                    isLoading={loading.effects['searchJobs/searchJob']}
                  />
                }
                {
                  !jobs.length &&
                  <NoDataSearchView />
                }
                <div className="hidden-xs" style={{ marginTop: '30px', border: 'solid 2px #71bf44' }}>
                  <div style={{ padding: '10px 10px 10px 10px' }} className="box-white-content">
                    <table style={{ width: '100%' }}>
                      <tbody>
                        <tr>
                          <td style={{ color: '#363636', width: '60%' }} className="center">
                            Đăng ký và nhận việc làm tương tự qua email
                          </td>
                          <td className="center">
                            <a
                              className="btn"
                              style={{ padding: '10px 25px', fontWeight: 500, backgroundColor: '#71bf44', color: '#fff', marginRight: '40px', marginTop: '5px', marginBottom: '5px', borderRadius: '2px' }}
                              href="/send-mail"
                            >
                              Nhận việc làm tương tự
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6} className="margin-left-Col-right">
                <RcSearchBoxJobs />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(({ loading, app, searchJobs }) => ({ loading, app, searchJobs }))(translate([])(ResultSearchJobView))
