import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { Row, Col, Form, Button, Input } from 'antd'

import './style.less'
import { key } from '../../../configs/locale'
import { ImageConst, AppConst } from '../../../configs'

const FormItem = Form.Item

class FormLoginView extends React.Component {
  submitLogin = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch, type } = this.props
        // send data to server
        dispatch({
          type: `login/login${type}`,
          payload: values,
        })
      }
    })
  }
  render() {
    const { t, loading, form: { getFieldDecorator }, type } = this.props
    return (
      <div className="background-white background-login">
        <div className="page">
          <Row type="flex" justify="center">
            <Col md={8} xs={18} sm={18} className="container-login">
              <div className="logo">
                <img style={{ width: '180px' }} alt="logo-job" src={ImageConst.logoOnline} className="hidden-break-small" />
              </div>
              <Form className="form" onSubmit={this.submitLogin}>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Required is email' },
                      {
                        pattern: AppConst.regex.email,
                        message: t(key.invalidEmail),
                      },
                    ],
                    })(<Input
                      className="input-style"
                      type="text"
                      placeholder="Email"
                      name="email"
                    />)}

                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Required is password' },
                    ],
                    })(<Input
                      className="input-style"
                      type="password"
                      placeholder="Password"
                      name="password"
                    />)}

                </FormItem>
                <FormItem className="buttonCenter">
                  <Button
                    type="primary"
                    className="btn-login"
                    htmlType="submit"
                    disabled={loading.effects['login/loginCandidate']}
                  >
                    {t(key.login)}
                  </Button>
                </FormItem>
              </Form>
              <div className="text-register">
                <p>{t(key.textIsAccount)}
                  <a href={`/register/${type}`} className="a-login">{t(key.register)}</a>
                  <span className="marginLeft5 marginRight5">|</span>
                  <a href="https://viectotnhat.com/dang-nhap/nha-tuyen-dung" className="a-login">{t(key.recuiterLogin)}</a>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const WrappedLoginForm = Form.create()(FormLoginView)

export default connect(({ loading }) => ({ loading }))(translate([])(WrappedLoginForm))
