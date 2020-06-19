import React from 'react'
import { List, Row, Col, Icon, Rate, Avatar } from 'antd'
import { Link } from 'dva/router'


import './style.less'
import { helper, format } from '../../utils';
import { ImageConst } from '../../configs';

class ListJobsNewView extends React.Component {
  componentDidMount() {
    this.fetchNewJobs()
  }

  fetchNewJobs = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'app/fetchNewJobs',
    })
  }
  render() {
    const { app: { newJobs } } = this.props
    const title = (item) => {
      return (
        <Link to={`/recuiterments/${item._id}`}>
          <h3 className="title-job">
            {item.title}
          </h3>
        </Link>
      )
    }
    const description = (item) => {
      return (
        <div className="description">
          <Row className="info-job">
            <Col xs={4} sm={4} md={4} lg={4}>
              <Icon type="dollar" />
              <span>{item.salary.name}</span>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <Icon type="environment" />
              <span>{helper.getCity(item.city)}</span>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <Icon type="book" />
              <span>{helper.getAducation(item.degreeRequirement)}</span>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <Icon type="branches" />
              <span>{helper.getGender(item.gender)}</span>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <Icon type="clock-circle" />
              <span>{format.dateWithNoHour(item.createdAt)}</span>
            </Col>
          </Row>
        </div>
      )
    }
    return (
      <div className="background-white wrapper-list-jobs-new">
        <List
          itemLayout="horizontal"
          dataSource={newJobs}
          renderItem={item => (
            <List.Item actions={[<Rate key={item.rate} count={1} />]}>
              <List.Item.Meta
                avatar={<Avatar
                  src={item.cover || item.business.logo || ImageConst.defaultPhoto}
                  shape="square" size={64}
                />}
                title={title(item)}
                description={description(item)}
              /><br />
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default ListJobsNewView
