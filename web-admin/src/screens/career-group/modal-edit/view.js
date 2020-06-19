import React, { Component } from 'react'
import { Modal, Button, Form, Input } from 'antd'
import { key } from '../../../configs/locale'
import { ComponentConst } from '../../../configs'
import './style.less'

const FormItem = Form.Item

class EditModal extends Component {
  /**
   * Handle close modal
   */
  onCloseModal = () => {
    this.props.toggleModal('edit')
  }

  /**
   * Handle submit
   */
  onSubmit = () => {
    const { toggleModal, dispatch, form: { validateFieldsAndScroll, resetFields }, careerGroup } = this.props
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'careerGroups/update',
          _id: careerGroup._id,
          payload: values,
        })
        resetFields()
        toggleModal('edit')
      }
    })
  }

  render() {
    const { visible, translate, form: { getFieldDecorator }, careerGroup } = this.props
    if (!careerGroup) {
      return null
    }
    const formItemLayout = ComponentConst.form.itemLayout
    return (
      <Modal
        className="app-modal"
        title={translate(key.updateCareerGroup)}
        visible={visible}
        onCancel={this.onCloseModal}
        footer={[
          <Button key="back" icon="close-circle-o" className="float-left" onClick={this.onCloseModal}>{translate(key.cancel)}</Button>,
          <Button key="submit" icon="check-circle-o" type="primary" onClick={this.onSubmit}>{translate(key.update)}</Button>,
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
                initialValue: careerGroup.name,
              })(<Input />)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(EditModal)
