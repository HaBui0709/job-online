import React from 'react'
import { Row, Col, Card, Form, Input, Radio, Select, Button } from 'antd'

import './style.less'
import { ComponentConst, AppConst } from '../../configs';

const formItemLayout = ComponentConst.notify.itemLayout
const FormItem = Form.Item
const { Option } = Select

class FormNotifyView extends React.Component {
  componentDidMount() {
    this.fetchCareerGroup()
  }

  /**
   * Fetch careers
   */
  fetchCareerGroup = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'app/fetchCareerGroup',
    })
  }

  /**
   * Submit
   */
  submit = () => {
    const { form: { validateFieldsAndScroll, resetFields }, dispatch } = this.props
    validateFieldsAndScroll((err, value) => {
      if (!err) {
        dispatch({
          type: 'notificationJobs/create',
          payload: value,
        })
        resetFields()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, type, email = '', careerGroups = [] } = this.props
    return (
      <div className="form-notify">
        <h2>Đăng ký giới thiệu việc làm</h2>
        <Row>
          <Col>
            <Card
              bordered={false}
            >
              <Form className="form">
                <FormItem
                  {...formItemLayout}
                  label="Email nhận thông báo"
                  hasFeedback
                >
                  {
                    getFieldDecorator('email', {
                      initialValue: type === 'create' ? email : '',
                      rules: [{
                        required: true, message: 'Email không được trống!',
                      }, {
                        pattern: AppConst.regex.email,
                        message: 'Email không đúng định dạng!',
                      }],
                    })(<Input name="email" className="input-style" placeholder="Email" />)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Tần suất"
                  required
                >
                  {getFieldDecorator('frequency', {
                    initialValue: type === 'create' ? 'every_day' : 'three_day',
                  })(<Radio.Group>
                    <Radio value="every_day">Mỗi ngày</Radio>
                    <Radio value="three_day">3 ngày/lần</Radio>
                    <Radio value="once_a_week"> Tuần/lần</Radio>
                  </Radio.Group>)}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Ngành nghề mong muốn"
                  hasFeedback
                  required
                >
                  {
                    getFieldDecorator('careers', {
                      rules: [{
                        required: true, message: 'Ngành nghề mong muốn không được trống!',
                      }],
                    })(<Select
                      optionFilterProp="children"
                      name="careers"
                      placeholder="Ngành nghề mong muốn"
                      mode="multiple"
                      style={{ width: '100%' }}
                    >
                      {
                      careerGroups.map((item) => {
                        return (
                          <Option key={item._id} value={item._id}>{item.name}</Option>
                        )
                      })}
                    </Select>)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Thành phố"
                >
                  {
                  getFieldDecorator('city', {
                    // initialValue: user.city,
                    rules: [],
                  })((
                    <Select
                      showSearch
                      placeholder="Khu vực làm việc"
                      hasFeedback
                      required
                    >
                      {
                        AppConst.cities.list.map(item => (
                          <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                        ))
                      }
                    </Select>
                  ))
                }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Kinh nghiệm"
                  hasFeedback
                >
                  {
                      getFieldDecorator('experience', {
                      })(<Select
                        optionFilterProp="children"
                        name="totalYearExperience"
                        placeholder="Tổng số năm kinh nghiệm"
                      >
                        {
                        AppConst.experience.list.map((item) => {
                          return (
                            <Option key={item._id} value={item._id}>{item.name}</Option>
                          )
                        })}
                      </Select>)
                    }
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="Trình độ học vấn"
                  hasFeedback
                >
                  {
                      getFieldDecorator('academicLevel', {
                      })(<Select
                        optionFilterProp="children"
                        name="academicLevel"
                        placeholder="Trình độ học vấn"
                      >
                        {
                        AppConst.aducationLevel.list.map((item) => {
                          return (
                            <Option key={item.name} value={item.name}>{item.title}</Option>
                          )
                        })}
                      </Select>)
                    }
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="Mức lương"
                  hasFeedback
                >
                  {
                      getFieldDecorator('salary', {
                      })(<Select
                        optionFilterProp="children"
                        name="salary"
                        placeholder="Mức lương"
                      >
                        {
                        AppConst.salary.list.map((item) => {
                          return (
                            <Option key={item.key} value={item.key}>{item.name}</Option>
                          )
                        })}
                      </Select>)
                    }
                </FormItem>
              </Form>
              <Row className="row-submit">
                <Button onClick={this.submit} type="primary" className="btn-submit-notify">
                  Đăng ký
                </Button>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(FormNotifyView)

