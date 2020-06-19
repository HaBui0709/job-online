import React, { Fragment } from 'react'
import { Button, Collapse, Form, Input, Modal } from 'antd'
import { translate } from 'react-i18next'
import { key } from '../../../../configs/locale'

const { confirm } = Modal

class ActionView extends React.Component {
  onSubmit = () => {
    const { form: { validateFields }, confirmPhone } = this.props
    validateFields((error, values) => {
      if (!error) {
        confirmPhone(values)
      }
    })
  }

  showConfirm = () => {
    const { changeBan, user: { statuses: { banned } }, t } = this.props
    console.log('bannerd', banned)
    confirm({
      title: banned ? t(key.titleConfirmUnban) : t(key.titleConfirmBan),
      content: banned ? t(key.contentUnban) : t(key.contentBan),
      onOk() {
        console.log('OK')
        changeBan()
      },
      onCancel() {
        console.log('Cancel')
      },
    });
  }

  render() {
    const { form: { getFieldDecorator }, t, user: { statuses: { banned } } } = this.props
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }

    return (
      <Fragment>
        <Button
          className={!banned ? 'btn-ban btn-danger' : 'btn-ban btn-success'}
          onClick={this.showConfirm}
        >
          {banned ? t(key.titleUnban) : t(key.titleBan)}
        </Button>


        <Collapse className="collapse-confirm-phone">
          <Collapse.Panel showArrow={false} header={t(key.titleConfirmPhone)}>
            <Form>
              <Form.Item
                {...formItemLayout}
                label={t(key.titlePhone)}
              >
                {
                  getFieldDecorator('phone', {
                    rules: [{
                      required: true,
                      message: t(key.phoneIsRequired),
                    }],
                  })(<Input onPressEnter={this.onSubmit} />)
                }
              </Form.Item>
            </Form>
          </Collapse.Panel>
        </Collapse>
      </Fragment>
    )
  }
}

export default translate([])(Form.create()(ActionView))
