import React from 'react'
import { Row, Card, Col, Icon, Tag, Button } from 'antd'

import './style.less'
import { helper } from '../../utils'

class CardNotification extends React.Component {
  /**
   * Delete notification
   */
  deleteNotification = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'notificationJobs/delete',
    })
  }

  render() {
    const { notificationJob } = this.props
    const careersShow = () => {
      return (
        notificationJob.careers.map((item) => {
          return (
            <Tag key={item._id} color="green">{item.name}</Tag>
          )
        })
      )
    }
    return (
      <Row>
        <Col>
          <Card
            title={<div className="title-card"> Đăng ký nhận email thông báo việc làm </div>}
            bordered={false}
            actions={[<Icon type="edit" />, <Button onClick={this.deleteNotification}><Icon type="delete" /></Button>]}
          >
            <div className="col-xs-12 col-sm-6 padding0">
              <div className="marginTop5 fontSize14">
                <b>Tần suất thông báo: </b>&nbsp;&nbsp; {helper.getFrequency(notificationJob.frequency)}
              </div>
              <div className="marginTop5 fontSize14">
                <b>Ngành nghề:&nbsp;&nbsp; </b> {careersShow()}
              </div>
              <div className="marginTop5 fontSize14">
                <b>Địa điểm:&nbsp;&nbsp; </b> {helper.getCity(notificationJob.city)}
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 padding0">
              <div className="marginTop5 fontSize14">
                <b>Trình độ học vấn: </b>&nbsp;&nbsp; {helper.getAducation(notificationJob.academicLevel)}
              </div>
              <div className="marginTop5 fontSize14">
                <b>Kinh nghiệm: &nbsp;&nbsp; </b> {helper.getTotalYearExperience(notificationJob.experience)}
              </div>
              <div className="marginTop5 fontSize14">
                <b>Mức lương:&nbsp;&nbsp; </b> {helper.getSalary(notificationJob.salary)}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default CardNotification
