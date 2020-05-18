import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { Form, Row, Col, Input, Button, DatePicker, Select } from 'antd'
import { ImageConst, ComponentConst, AppConst } from '../../../../configs'
import './style.less'

import { key } from '../../../../configs/locale'

const formItemLayout = ComponentConst.formMax.itemLayout
const FormItem = Form.Item
const cities = AppConst.cities.list
const gender = AppConst.gender.list

class CandidateRegisterView extends React.Component {
  onSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch, form: { resetFields } } = this.props
        // send data to server
        dispatch({
          type: 'register/registerCandidate',
          payload: values,
        })
        // Reset form field
        resetFields()
      }
    })
  }

  // Validation confirm password
  validateConfirmPassword = (rule, value, callback) => {
    const { form: { getFieldValue }, t } = this.props
    const ageTo = getFieldValue('password')
    if (value && value !== ageTo) {
      callback(t(key.invalidConfirmPassword));
    } else {
      callback();
    }
  }
  render() {
    const { t, loading, form: { getFieldDecorator } } = this.props
    return (
      <div className="background-white background-login register">
        <div className="page">
          <Row type="flex" justify="center">
            <Col md={8} xs={18} sm={18} className="container-login container-register" style={{ width: '50%', minWidth: '350px' }}>
              <div className="logo">
                <img style={{ width: '180px' }} alt="logo-job" src={ImageConst.logoOnline} className="hidden-break-small" />
                <h3 style={{ marginTop: '10px' }}>{t(key.candidateRegister)}</h3>
              </div>
              <Form className="form" onSubmit={this.onSubmit}>
                <FormItem
                  {...formItemLayout}
                  label="Username"
                  hasFeedback
                >
                  {
                    getFieldDecorator('username', {
                      rules: [{
                        required: true, message: 'Username không được trống!',
                      }],
                    })(<Input name="username" className="input-style" placeholder="Username" />)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Email"
                  hasFeedback
                >
                  {
                    getFieldDecorator('email', {
                      rules: [{
                        required: true, message: 'Email không được trống!',
                      }, {
                        pattern: AppConst.regex.email,
                        message: t(key.invalidEmail),
                      }],
                    })(<Input name="email" className="input-style" placeholder="Email" />)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={t(key.password)}
                  hasFeedback
                >
                  {
                    getFieldDecorator('password', {
                      rules: [{
                        required: true, message: t(key.passwordIsRequired),
                      }, {
                        min: 6, message: t(key.passwordMinLength),
                      },
                    ],
                    })(<Input name="password" type="password" className="input-style" placeholder={t(key.password)} />)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Xác nhận MK"
                  hasFeedback
                >
                  {
                    getFieldDecorator('confirmPassword', {
                      rules: [{
                        required: true, message: 'Xác nhận mật khẩu không được trống!',
                      },
                      { validator: this.validateConfirmPassword },
                    ],
                    })(<Input name="confirmPassword" type="password" className="input-style" placeholder="Xác nhận mật khẩu" />)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Tên đầy đủ"
                  hasFeedback
                >
                  {
                    getFieldDecorator('fullName', {
                      rules: [{
                        required: true, message: 'Tên đầy đủ không được trống!',
                      }],
                    })(<Input name="fullName" className="input-style" placeholder="Tên đầy đủ" />)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Điện thoại"
                  hasFeedback
                >
                  {
                    getFieldDecorator('phone', {
                      rules: [{
                        required: true, message: 'Số điện thoại không được trống!',
                      }, {
                        pattern: AppConst.regex.phone,
                        message: t(key.invalidPhone),
                      }],
                    })(<Input name="phone" className="input-style" placeholder="Phone" />)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Ngày sinh"
                  hasFeedback
                >
                  {
                    getFieldDecorator('birthday', {
                      rules: [{
                        required: true, message: 'Ngày sinh không được trống!',
                      }],
                    })(<DatePicker name="birthday" />)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Điạ chỉ"
                  hasFeedback
                >
                  {
                    getFieldDecorator('address', {
                      rules: [{
                        required: true, message: 'Địa chỉ không được trống!',
                      }],
                    })(<Input name="address" className="input-style" placeholder="Address" />)
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Thành phố"
                >
                  {
                    getFieldDecorator('city', {
                      rules: [],
                    })((
                      <Select
                        showSearch
                        placeholder="City"
                      >
                        {
                          cities.map(item => (
                            <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                          ))
                        }
                      </Select>
                    ))
                  }
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Giới tính"
                >
                  {
                    getFieldDecorator('gender', {
                      rules: [],
                    })((
                      <Select
                        showSearch
                        placeholder="Gender"
                      >
                        {
                          gender.map(item => (
                            <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                          ))
                        }
                      </Select>
                    ))
                  }
                </FormItem>
                <FormItem className="buttonCenter">
                  <Button
                    type="primary"
                    onClick={this.onSubmit}
                    disabled={loading.effects['register/registerCandidate']}
                  >
                    Đăng ký
                  </Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </div>
        <div className="footer footer-style">
          <p>Footer</p>
        </div>
      </div>
    )
  }
}

const WrappedLoginForm = Form.create()(CandidateRegisterView)

export default connect(({ loading, register }) => ({ loading, register }))(translate([])(WrappedLoginForm))
