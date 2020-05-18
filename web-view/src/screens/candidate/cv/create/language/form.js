import React from 'react'
import lodash from 'lodash'
import { Form, Modal, Button, Select, Radio } from 'antd'

import '../style.less'
import '../style-editor.less'

import { ComponentConst, AppConst } from '../../../../../configs'


const FormItem = Form.Item
const formItemLayout = ComponentConst.formMax.itemLayout
const { Option } = Select

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class LanguageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initState
  }

  /**
   * Handle close modal
   */
  onCloseModal = () => {
    const { language } = this.props
    if (!lodash.isEmpty(language)) {
      this.props.toggleModal('edit')
    } else {
      this.props.toggleModal()
    }
  }

  /**
   * Handle submit form
   */
  onSubmit = () => {
    const { dispatch, form: { validateFieldsAndScroll, resetFields }, toggleModal, language } = this.props
    validateFieldsAndScroll((err, data) => {
      if (!err) {
        const payload = {
          ...data,
        }

        if (!lodash.isEmpty(language)) {
          // Update
          dispatch({
            type: 'candidateCV/updateLanguage',
            itemId: language._id,
            payload,
          })
        } else {
          dispatch({
            type: 'candidateCV/addLanguage',
            payload,
          })
        }
        resetFields()
        if (!lodash.isEmpty(language)) {
          toggleModal('edit')
        } else {
          toggleModal()
        }
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, language, visible } = this.props
    let isEdit = false
    if (!lodash.isEmpty(language)) {
      isEdit = true
    }
    return (
      <Modal
        className="app-modal top-modal witdh-size-modal"
        width="80%"
        title="Thêm Ngoại ngữ"
        visible={visible}
        onCancel={this.onCloseModal}
        footer={[
          <Button key="back" icon="close-circle-o" className="float-left" onClick={this.onCloseModal}>Hủy</Button>,
          <Button
            key="submit"
            icon="check-circle-o"
            type="primary"
            onClick={this.onSubmit}
          >
            {isEdit ? 'Cập nhật' : 'Tạo mới'}
          </Button>,
      ]}
      >
        <Form className="app-modal-form">
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Ngoại ngữ"
          >
            {
              getFieldDecorator('typeLanguage', {
                rules: [{
                  required: true, message: 'Loại ngoại ngữ không được trống!',
                }],
                initialValue: isEdit ? language.typeLanguage : '',
              })(<Select
                optionFilterProp="children"
                name="typeLanguage"
              >
                {
                AppConst.typeLanguage.map((ele) => {
                  return (
                    <Option key={ele._id} value={ele._id}>{ele.name}</Option>
                  )
                })}
              </Select>)
              }
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Nghe"
          >
            {
              getFieldDecorator('listen', {
                rules: [{
                  required: true, message: 'Nghe không được trống!',
                }],
                initialValue: isEdit ? language.listen : '',
              })(<RadioGroup>
                {
                AppConst.computerLiteracy.list.map((item) => {
                  return (
                    <RadioButton key={item._id} value={item._id} name={item.name}>{item.name}</RadioButton>
                  )
                })
              }
              </RadioGroup>)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Đọc"
          >
            {
              getFieldDecorator('read', {
                rules: [{
                  required: true, message: 'Đọc không được trống!',
                }],
                initialValue: isEdit ? language.read : '',
              })(<RadioGroup>
                {
                AppConst.computerLiteracy.list.map((item) => {
                  return (
                    <RadioButton key={item._id} value={item._id} name={item.name}>{item.name}</RadioButton>
                  )
                })
              }
              </RadioGroup>)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Nói"
          >
            {
              getFieldDecorator('speak', {
                rules: [{
                  required: true, message: 'Nói không được trống!',
                }],
                initialValue: isEdit ? language.speak : '',
              })(<RadioGroup>
                {
                AppConst.computerLiteracy.list.map((item) => {
                  return (
                    <RadioButton key={item._id} value={item._id} name={item.name}>{item.name}</RadioButton>
                  )
                })
              }
              </RadioGroup>)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Viết"
          >
            {
              getFieldDecorator('write', {
                rules: [{
                  required: true, message: 'Viết không được trống!',
                }],
                initialValue: isEdit ? language.write : '',
              })(<RadioGroup>
                {
                AppConst.computerLiteracy.list.map((item) => {
                  return (
                    <RadioButton key={item._id} value={item._id} name={item.name}>{item.name}</RadioButton>
                  )
                })
              }
              </RadioGroup>)
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(LanguageForm)
