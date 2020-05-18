import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { Col, Row, Button } from 'antd'
import { routerRedux } from 'dva/router'

import './style.less'

// const { Search } = Input
class SearchWorkByCareer extends React.Component {
  searchJobByCareer = (career) => {
    const { dispatch } = this.props
    dispatch({
      type: 'searchJobs/searchJob',
      payload: {
        career,
      },
    })
    dispatch(routerRedux.push('/viec-lam/tim-kiem'))
  }
  render() {
    const { careerGroups } = this.props
    return (
      <div>
        <h2>Việc làm theo ngành nghề</h2>
        <div className="list-career">
          <Row gutter={16}>
            <Col sm={24} md={24}>
              {/* <Search
                placeholder="Tìm kiếm theo ngành nghề"
                onSearch={value => console.log(value)}
                enterButton
              /> */}
              <ul className="list-tinh-thanh">
                {
                  careerGroups.map((item) => {
                    return (
                      <li key={item} className="pc-bold mb-bold style-btn">
                        <Button onClick={() => this.searchJobByCareer(item._id)}>{item.name}</Button>
                      </li>
                    )
                  })
                }
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(({ loading, searchWorkByCareer }) => ({ loading, searchWorkByCareer }))(translate([])(SearchWorkByCareer))
