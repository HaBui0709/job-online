import React from 'react'
import moment from 'moment'
import { Form, Button, Col, Row, Input, Divider, DatePicker, Select } from 'antd'

import { ComponentConst, AppConst } from '../../../../../configs'
import './style.less'

const FormItem = Form.Item
const formItemLayout = ComponentConst.formSentForm.itemLayout

class FormInfoUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  /**
   * On change radio group
   */
  onChangeRadioGroup = (e) => {
    const { value, name } = e.target
    const newState = {
      [name]: value,
    }
    this.setState(newState)
  }

  /**
   * Go to next step
   */
  next = () => {
    const { next, form: { validateFieldsAndScroll } } = this.props
    validateFieldsAndScroll((errors, value) => {
      if (!errors) {
        const data = {
          user: {
            ...value,
          },
        }
        next(data)
      }
    })
  }

  /**
   * Handle change select
   */
  handleChangeSelect= (name, value) => {
    const newState = {
      [name]: value,
    }
    this.setState(newState)
  }

  /**
   * Go back previous step
   */
  prev = () => {
    this.props.prev()
  }

  // Validation confirm password
  validateConfirmPassword = (rule, value, callback) => {
    const { form: { getFieldValue } } = this.props
    const ageTo = getFieldValue('password')
    if (value && value !== ageTo) {
      callback('Nhập lại mật khẩu không khớp')
    } else {
      callback();
    }
  }
  render() {
    const { form: { getFieldDecorator }, data: { user } } = this.props
    return (
      <Row type="flex" justify="center" className="margin-top-50">
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form className="form-container">
            <Divider />
            <div><h4>THÔNG TIN ĐĂNG NHẬP</h4></div>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Email</h4></span>}
              hasFeedback
            >
              {
                  getFieldDecorator('email', {
                    initialValue: user.email || '',
                    rules: [{
                      required: true, message: 'Email không được trống!',
                    }, {
                      pattern: AppConst.regex.email,
                      message: 'Email không đúng định dạng',
                    }],
                  })(<Input name="email" className="input-style" placeholder="Email" />)
                }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Mật khẩu</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('password', {
                  initialValue: user.password || '',
                  rules: [{
                    required: true, message: 'Mật khẩu không được trống!!',
                  }, {
                    min: 6, message: 'Mật khẩu chứa ít nhất 6 ký tự',
                  },
                ],
                })(<Input placeholder="Mật khẩu" name="password" type="password" className="input-style" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Nhập lại mật khẩu</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('confirmPassword', {
                  initialValue: user.confirmPassword || '',
                  rules: [{
                    required: true, message: 'Xác nhận mật khẩu không được trống!',
                  },
                  { validator: this.validateConfirmPassword },
                ],
                })(<Input name="confirmPassword" type="password" className="input-style" placeholder="Xác nhận mật khẩu" />)
              }
            </FormItem>
            <Divider />
            <div><h4>THÔNG TIN USER</h4></div>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>username</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('username', {
                  initialValue: user.username || '',
                })(<Input name="username" placeholder="Tên hiển thị" className="input-style" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Tên đầy đủ</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('fullName', {
                  initialValue: user.fullName || '',
                  rules: [{
                    required: true, message: 'Tên đầy đủ không được trống!',
                  }],
                })(<Input name="fullName" className="input-style" placeholder="Tên đầy đủ" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Ngày sinh</h4></span>}
              hasFeedback
            >
              {
                  getFieldDecorator('birthday', {
                    initialValue: moment(user.birthday) || null,
                  rules: [{
                    required: true, message: 'Ngày sinh không được trống!',
                  }],
                })(<DatePicker name="birthday" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Số điện thoại</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('phone', {
                  initialValue: user.phone || '',
                  rules: [{
                    required: true, message: 'Số điện thoại không được trống!',
                  }, {
                    pattern: AppConst.regex.phone,
                    message: 'Số điện thoại không đúng định dạng',
                  }],
                })(<Input name="phone" className="input-style" placeholder="Phone" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Địa chỉ</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('address', {
                  initialValue: user.address || '',
                  rules: [{
                    required: true, message: 'Địa chỉ không được trống!',
                  }],
                })(<Input name="address" className="input-style" placeholder="Address" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Thành phố</h4></span>}
            >
              {
                getFieldDecorator('city', {
                  initialValue: user.city || '',
                  rules: [],
                })((
                  <Select
                    showSearch
                    placeholder="City"
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
              label={<span className="section-title"><h4>Giới tính</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('gender', {
                  initialValue: user.gender || '',
                  rules: [],
                })((
                  <Select
                    showSearch
                    placeholder="Gender"
                  >
                    {
                      AppConst.gender.list.map(item => (
                        <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                      ))
                    }
                  </Select>
                ))
              }
            </FormItem>
            <FormItem>
              <div className="step-action-button">
                <Button
                  className="btn-next"
                  type="primary"
                  onClick={this.next}
                >
                  Tiếp theo
                </Button>
              </div>
            </FormItem>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default Form.create()(FormInfoUserForm)

