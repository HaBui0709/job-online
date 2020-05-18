import React from 'react'
import { connect } from 'dva'
import { Col, Row, Button, Form, Input, Icon } from 'antd'
import './style.less'

const FormItem = Form.Item
class LoginView extends React.Component {
  submitLogin = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props
        // send data to server
        dispatch({
          type: 'login/login',
          payload: values,
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.props
    return (
      <div className="page">
        <Row type="flex" justify="center">
          <Col md={8} xs={18} sm={18} className="container-login">
            <div className="logo">
              <h2>Login</h2>
            </div>
            <Form className="form" onSubmit={this.submitLogin}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Required is username' },
                  ],
                  })(<Input
                    className="input"
                    prefix={<Icon type="user" />}
                    type="text"
                    placeholder="Username"
                    name="username"
                  />)}

              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Required is password' },
                  ],
                  })(<Input
                    prefix={<Icon type="lock" />}
                    type="password"
                    placeholder="Password"
                    name="password"
                  />)}

              </FormItem>
              <FormItem className="buttonCenter">
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={loading.effects['login/login']}
                >
                  Login
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
const WrappedLoginForm = Form.create()(LoginView)

export default connect(({ loading }) => ({ loading }))(WrappedLoginForm)
