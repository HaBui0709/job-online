import React from 'react'
import { Row, Button, Col, Tabs } from 'antd'
// import { ComponentConst } from '../../../../../configs'

import { format, helper } from '../../../../../utils'

import './style.less'
import { InfoOverview, WelFare, AddressView } from './tab-info-business-pre';

// const FormItem = Form.Item
// const formItemLayout = ComponentConst.previewForm.itemLayout
// const formItemLayoutName = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 6 },
//     md: { span: 6 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 18 },
//     md: { span: 18 },
//   },
// }
const { TabPane } = Tabs

class Preview extends React.Component {
  /**
   * Go back previous step
   */
  prev = () => {
    this.props.prev()
  }
  render() {
    const { data: { user, business } } = this.props
    return (
      <div style={{ padding: '20px' }}>
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 8 }}
            xl={{ span: 8 }}
          >
            <div className="campaign-estimate">
              <h4 className="title">TỔNG QUAN THÔNG TIN USER</h4>
              <div className="item">
                <i>Email: &nbsp;&nbsp;&nbsp;&nbsp;<b>{user.email}</b></i>
                <p>Username: &nbsp;&nbsp;&nbsp;&nbsp;<b>{user.username}</b></p>
              </div>
              <div className="item">
                <i>Ngày sinh:  &nbsp;&nbsp;&nbsp;&nbsp;<b>{format.dateWithNoHour(user.birthday)}</b></i>
                <p>Tên đầy đủ: &nbsp;&nbsp;&nbsp;&nbsp;<b>{user.fullName}</b></p>
              </div>
              <div className="item">
                <i>Số điện thoại: &nbsp;&nbsp;&nbsp;&nbsp;<b>{format.phone(user.phone)}</b></i>
                <p>Địa chỉ: &nbsp;&nbsp;&nbsp;&nbsp;<b>{user.address}</b></p>
              </div>
              <div className="item">
                <i>Thành phố: &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                    {helper.getCity(user.city)}
                  </b></i>
                <p>Giới tính: &nbsp;&nbsp;&nbsp;&nbsp;
                  <b>
                    {helper.getGender(user.gender)}
                  </b></p>
              </div>
            </div>
            <Row>
              <div className="customer-buttom-submit">
                <Button onClick={this.prev} style={{ marginRight: '5px' }}>BACK</Button>
                <Button onClick={this.props.onSubmit} type="primary">ĐĂNG KÝ</Button>
              </div>
            </Row>
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 15 }}
            xl={{ span: 15 }}
            className="col-right-pre"
          >
            <div className="company" style={{ border: '1px solid #404a53' }}>
              <div className="campaign-estimate" style={{ height: '38px' }}>
                <h4 className="title">TỔNG QUAN THÔNG TIN COMPANY</h4>
              </div>
              <Tabs type="card" defaultActiveKey="1" size="small">
                <TabPane tab="Thông tin chung" key="1">
                  <InfoOverview business={business} />
                </TabPane>
                <TabPane tab="Phúc lợi công ty" key="2">
                  <WelFare business={business} />
                </TabPane>
                <TabPane tab="Địa chỉ công ty" key="3">
                  <AddressView business={business} />
                </TabPane>
                <TabPane tab="Hình ảnh công ty" key="4">Content of tab 3</TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Preview
