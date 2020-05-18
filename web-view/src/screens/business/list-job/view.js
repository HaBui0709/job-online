import React, { Fragment } from 'react'
import { List, Button, Icon, Tag } from 'antd'
import { Link } from 'react-router-dom';
import { routerRedux } from 'dva/router';

import './style.less'
import { helper, format } from '../../../utils';

class ListJobView extends React.Component {
  componentDidMount() {
    this.fecthAllJobs()
  }

  fecthAllJobs = () => {
    const { dispatch, businessId } = this.props
    dispatch({
      type: 'business/fecthAllJobs',
      payload: {
        businessId,
      },
    })
  }

  navigateDetailJob = (_id) => {
    this.props.dispatch(routerRedux.push(`/recuiterments/${_id}`))
  }
  render() {
    const { recuiterments } = this.props
    return (
      <div style={{ background: 'white', padding: '50px' }}>
        <List
          header={<h3 className="header-jobs">CƠ HỘI VIỆC LÀM CHO BẠN:</h3>}
          itemLayout="horizontal"
          dataSource={recuiterments}
          renderItem={item => (
            <List.Item actions={[<Button type="primary" onClick={() => this.navigateDetailJob(item._id)}>Chi tiết</Button>]}>
              <List.Item.Meta
                title={<Link
                  to={`/recuiterments/${item._id}`}
                  title="title"
                  className="title-job"
                >
                  {item.title}
                </Link>}
                description={
                  <Fragment>
                    <Icon type="calendar" />&nbsp;{helper.getRank(item.jobPosition)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon type="environment" />{helper.getCity(item.city)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon type="calendar" />&nbsp;{format.dateWithNoHour(item.deadline)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Tag color="green">{helper.getWorkMode(item.workMode)}</Tag>
                  </Fragment>
                }
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default ListJobView
