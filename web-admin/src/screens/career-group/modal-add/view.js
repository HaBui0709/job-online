import React, { Component } from 'react'
import { Modal, Button, Form, Input } from 'antd'
import { key } from '../../../configs/locale'
import { ComponentConst } from '../../../configs'
import './style.less'

const FormItem = Form.Item

class AddModal extends Component {
  /**
   * Handle close modal
   */
  onCloseModal = () => {
    this.props.toggleModal('add')
  }

  /**
   * Handle submit
   */
  onSubmit = () => {
    const { toggleModal, dispatch, form: { validateFieldsAndScroll, resetFields } } = this.props
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'careerGroups/create',
          payload: values,
        })
        resetFields()
        toggleModal('add')
      }
    })
  }

  render() {
    const { visible, translate, form: { getFieldDecorator } } = this.props
    const formItemLayout = ComponentConst.form.itemLayout
    return (
      <Modal
        className="app-modal"
        title={translate(key.createCareerGroup)}
        visible={visible}
        onCancel={this.onCloseModal}
        footer={[
          <Button key="back" icon="close-circle-o" className="float-left" onClick={this.onCloseModal}>{translate(key.cancel)}</Button>,
          <Button key="submit" icon="check-circle-o" type="primary" onClick={this.onSubmit}>{translate(key.create)}</Button>,
        ]}
      >
        <Form className="app-modal-form">
          <FormItem
            {...formItemLayout}
            label={(translate(key.titleName))}
          >
            {
              getFieldDecorator('name', {
                rules: [{
                  required: true, message: translate(key.nameIsRequired),
                }],
              })(<Input name="name" />)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AddModal)
