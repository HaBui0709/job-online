import React from 'react'
import moment from 'moment'
import { connect } from 'dva'
import { Row, Col, PageHeader, Card, Avatar, Form, Input, DatePicker, Select, Button, Tooltip, Badge, Upload } from 'antd'
import { translate } from 'react-i18next'
// import { Link } from 'dva/router'
import './style.less'
import { ComponentConst, AppConst } from '../../configs'
import { key } from '../../configs/locale'

const formItemLayout = ComponentConst.formMax.itemLayout
const FormItem = Form.Item
const cities = AppConst.cities.list
const gender = AppConst.gender.list

class AccountFormView extends React.Component {
  /**
   * Submit update user account
   */
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch, app: { user } } = this.props
        // send data to server
        dispatch({
          type: 'account/updateAccount',
          payload: {
            data: values,
            user: user._id,
          },
        })
      }
    })
  }

  uploadCover = (file, user) => {
    this.props.dispatch({
      type: 'account/uploadCover',
      payload: {
        file,
        userId: user._id,
      },
    })
  }

  render() {
    const { t, form: { getFieldDecorator }, app: { user } } = this.props
    return (
      <Row className="account-form">
        <Col xs={24} md={24} lg={24} xl={24}>
          <PageHeader onBack={() => null} title={<h3 className="text-themecolor">My Profile</h3>} />
        </Col>
        <Col xs={24} md={24} lg={24} xl={24} className="margin-top-30">
          <Card title={<h4 className="card-header-h4">{`Welcome ${user.username}!`}</h4>}>
            <Row>
              <Col md={6} lg={12}>
                <div className="form-ggroup">
                  <div className="contact-img">
                    <Badge count={<Upload
                      className="style-cover"
                      name="file"
                      beforeUpload={(file) => {
                        this.uploadCover(file, user)
                        return false
                      }}
                      howUploadList={false}
                      showUploadList={false}
                    >
                      <Tooltip title="Upload avatar">
                        <Button shape="circle" icon="upload" size="small" />
                      </Tooltip>
                    </Upload>}
                    >
                      <Avatar size={100} src={user.avatar} />
                    </Badge>
                  </div><br /><br />
                  <Form className="form">
                    <FormItem
                      {...formItemLayout}
                      label="Username"
                      hasFeedback
                    >
                      {
                    getFieldDecorator('username', {
                      initialValue: user.username || '',
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
                      initialValue: user.email || '',
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
                      label={t(key.facebook)}
                      hasFeedback
                    >
                      {
                    getFieldDecorator('facebook', {
                      initialValue: user.facebook || '',
                    })(<Input name="facebook" type="text" className="input-style" placeholder={t(key.facebook)} />)
                  }
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Tên đầy đủ"
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
                      label="Điện thoại"
                      hasFeedback
                    >
                      {
                    getFieldDecorator('phone', {
                      initialValue: user.phone || '',
                      rules: [{
                        required: true, message: 'Số điện thoại không được trống!',
                      }, {
                        pattern: AppConst.regex.phone,
                        message: t(key.invalidPhone),
                      }],
                    })(<Input name="phone" className="input-style" placeholder="Phone" />)
                  }
                    </FormItem>
                  </Form>
                </div>
              </Col>
              <Col md={6} lg={11} className="box-right-form">
                <Form className="form">
                  <FormItem
                    {...formItemLayout}
                    label="Ngày sinh"
                    hasFeedback
                    format="DD/MM/YYYY"
                  >
                    {
                    getFieldDecorator('birthday', {
                      initialValue: moment(user.birthday) || '',
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
                      initialValue: user.address || '',
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
                      initialValue: user.city,
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
                      initialValue: user.gender,
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
                </Form>
              </Col>
              <Col className="align-center">
                <Button
                  type="primary"
                  onClick={this.submit}
                >
                  Cập nhật thông tin
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

const WrappedAccountFormView = Form.create()(AccountFormView)

export default connect(({ app, loading, account }) => ({ app, loading, account }))(translate([])(WrappedAccountFormView))
