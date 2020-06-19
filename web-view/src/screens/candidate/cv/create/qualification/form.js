import React from 'react'
import lodash from 'lodash'
import moment from 'moment'
import { Form, DatePicker, Input, Modal, Button, Select } from 'antd'

import '../style.less'
import '../style-editor.less'

import { ComponentConst, AppConst } from '../../../../../configs'


const FormItem = Form.Item
const formItemLayout = ComponentConst.formMax.itemLayout
const { Option } = Select
const { RangePicker } = DatePicker

class QualificaitonForm extends React.Component {
  constructor(props) {
    super(props)
    const { qualification: { from, come } } = this.props
    this.initState = {
      from: moment(from) || null,
      come: moment(come) || null,
    }
    this.state = this.initState
  }

  /**
   * Handle close modal
   */
  onCloseModal = () => {
    const { qualification } = this.props
    if (!lodash.isEmpty(qualification)) {
      this.props.toggleModal('edit')
    } else {
      this.props.toggleModal()
    }
  }

  /**
   * Handle change date
   */
  onChangeDate = (dates) => {
    this.setState({
      from: dates[0],
      come: dates[1],
    })
  }

  /**
   * Handle submit form
   */
  onSubmit = () => {
    const { dispatch, form: { validateFieldsAndScroll, resetFields }, toggleModal, qualification } = this.props
    validateFieldsAndScroll((err, data) => {
      if (!err) {
        const { come, from } = this.state
        const payload = {
          ...data,
          from: from.toISOString(),
          come: come.toISOString(),
        }

        if (!lodash.isEmpty(qualification)) {
          // Update
          dispatch({
            type: 'candidateCV/updateQualification',
            itemId: qualification._id,
            payload,
          })
        } else {
          dispatch({
            type: 'candidateCV/addQualification',
            payload,
          })
        }
        this.setState({
          from: null,
          come: null,
        })
        resetFields()
        if (!lodash.isEmpty(qualification)) {
          toggleModal('edit')
        } else {
          toggleModal()
        }
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, qualification, visible } = this.props
    let isEdit = false
    if (!lodash.isEmpty(qualification)) {
      isEdit = true
    }
    return (
      <Modal
        className="app-modal top-modal witdh-size-modal"
        width="80%"
        title="Thêm trình độ và bằng cấp"
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
            label="Tên bằng cấp/Chứng chỉ"
          >
            {
              getFieldDecorator('certificate', {
                rules: [{
                  required: true, message: 'Tên bằng cấp/Chứng chỉ không được trống!',
                }, {
                  min: 5, message: 'Tên bằng cấp/Chứng chỉ yêu cầu phải lớn hơn hoặc bằng 5 ký tự',
                }],
                initialValue: isEdit ? qualification.certificate : '',
              })(<Input name="certificate" className="input-style" />)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Trường/Đơn vị cấp"
          >
            {
              getFieldDecorator('unit', {
                rules: [{
                  required: true, message: 'Trường/Đơn vị cấp không được trống!',
                }, {
                  min: 5, message: 'Trường/Đơn vị cấp yêu cầu phải lớn hơn hoặc bằng 5 ký tự',
                }],
                initialValue: isEdit ? qualification.unit : '',
              })(<Input name="unit" className="input-style" />)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Thời gian"
          >
            <RangePicker
              format="MM-YYYY"
              placeholder={['Bắt đầu', 'Kết thúc']}
              defaultValue={[isEdit ? moment(qualification.from) : null, isEdit ? moment(qualification.come) : null]}
              onChange={this.onChangeDate}
              showTime
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Chuyên ngành"
          >
            {
                getFieldDecorator('specialized', {
                  rules: [{
                    required: true, message: 'Chuyên ngành không được trống!',
                  }, {
                    min: 5, message: 'Chuyên ngành yêu cầu phải lớn hơn hoặc bằng 5 ký tự',
                  }],
                  initialValue: isEdit ? qualification.specialty : '',
                })(<Input name="specialized" className="input-style" />)
              }
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Loại tốt nghiệp"
          >
            {
              getFieldDecorator('graduationType', {
                initialValue: isEdit ? qualification.graduationType : 'great',
              })(<Select
                optionFilterProp="children"
                name="graduationType"
              >
                {
                AppConst.graduationType.list.map((ele) => {
                  return (
                    <Option key={ele._id} value={ele._id}>{ele.name}</Option>
                  )
                })}
              </Select>)
              }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(QualificaitonForm)
