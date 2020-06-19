import React from 'react';
import { Link } from 'dva/router';

import { connect } from 'dva';
import { List, Rate, Avatar, Row, Col, Icon, Tag } from 'antd';
import { ImageConst } from '../../../configs';
import { helper, format } from '../../../utils';

class JobsSuggestView extends React.Component {
  componentDidMount() {
    this.fetchJobSuggest();
  }

  /**
   * Fetch job suggest
   */
  fetchJobSuggest = () => {
    this.props.dispatch({
      type: 'app/fetchJobSuggest',
    });
  };

  render() {
    const {
      app: { jobsSuggest = [] },
    } = this.props;
    if (!jobsSuggest.length) {
      console.log('job suggest ', jobsSuggest);
      return '';
    }
    /**
     * title
     */
    const title = (item) => {
      return (
        <Link to={`/recuiterments/${item._id}`}>
          <h3 className="title-job">{item.title}</h3>
        </Link>
      );
    };

    /**
     * Description
     *
     * @param {Object} item
     */
    const description = (item) => {
      return (
        <div className="description">
          <Link to="/businesss">
            <p className="text-gray">{item.business.name}</p>
          </Link>
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
              <span>{format.dateWithNoHour(item.deadline)}</span>
            </Col>
          </Row>
          <Row className="info-job">
            {item.careers.map((i) => {
              return (
                <Col xs={4} sm={4} md={4} lg={4} key={i._id}>
                  <Tag color="blue" type="career">
                    {i.name}
                  </Tag>
                </Col>
              );
            })}
          </Row>
        </div>
      );
    };
    return (
      <div>
        <div className="section-title">
          <h3 className="title-section">Có thể bạn sẽ thích</h3>
        </div>
        <div className="background-white wrapper-list-jobs-new">
          <List
            itemLayout="horizontal"
            dataSource={jobsSuggest}
            renderItem={item => (
              <List.Item actions={[<Rate key={item.rate} count={1} />]}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={item.cover || ImageConst.defaultPhoto}
                      shape="square"
                      size={64}
                    />
                  }
                  title={title(item)}
                  description={description(item)}
                />
                <br />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default connect(({ app, loading }) => ({ app, loading }))(JobsSuggestView);
