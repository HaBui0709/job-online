import React from 'react';
import { Icon, Tag, Col } from 'antd';

import './style.less';
import { helper, format } from '../../../../utils';

class ComponentJobView extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="side-job paddingTop0 border_box_vlhd">
        <div className="box_vlhd">
          <h2 className="job-name-not-visited job-name fontSize14 margin0 font700">
            <a
              title={data.title}
              className=" title_job_vlhd"
              href={`/recuiterments/${data._id}`}
            >
              {data.title}
            </a>
          </h2>
          <div className="row">
            {data.careers.map((item) => {
              console.log('c', item)
              return (
                <Col>
                  <Tag color="blue" key={item._id}>{item.name}</Tag>
                </Col>
              );
            })}
          </div>
          <div className="row">
            <div className="col-md-6" title="Mức lương">
              <div className="fontSize14">
                <Icon className="margin-icon" type="dollar" /> &nbsp;
                {data.salary.name}
              </div>
            </div>
            <div className="col-md-6" title="Hồ Chí Minh, Bình Dương">
              <div className="fontSize14 three_dots_title">
                <Icon className="margin-icon" type="environment" /> &nbsp;
                {helper.getCity(data.city)}
              </div>
            </div>
            <div className="col-md-6" title="Kinh nghiệm">
              <div className="fontSize14 three_dots_title">
                <Icon className="margin-icon" type="bar-chart" />
                &nbsp;
                {helper.getTotalYearExperience(data.experience)}
              </div>
            </div>
            <div className="col-md-6" title="Hạn nộp hồ sơ">
              <div className="fontSize14">
                <Icon className="margin-icon" type="clock-circle" /> &nbsp;
                {format.dateWithNoHour(data.deadline)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentJobView;
