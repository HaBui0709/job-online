import React, { createRef } from 'react'
import lodash from 'lodash'
import moment from 'moment'
import { Form, DatePicker, Input, InputNumber, Modal, Button } from 'antd'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import '../style.less'
import '../style-editor.less'

import { ComponentConst, EditorConst } from '../../../../../configs'


const FormItem = Form.Item
const formItemLayout = ComponentConst.formMax.itemLayout
// const { TextArea } = Input
const editorControls = EditorConst.controls
const { RangePicker } = DatePicker

class ExpForm extends React.Component {
  constructor(props) {
    super(props)
    const { experience: { jobDescription, achievements, workTimeStartAt, workTimeEndAt } } = this.props
    this.initState = {
      jobDescription: jobDescription || BraftEditor.createEditorState(null),
      achievements: achievements || BraftEditor.createEditorState(null),
      workTimeStartAt: moment(workTimeStartAt) || null,
      workTimeEndAt: moment(workTimeEndAt) || null,
    }
    this.editorInstance = createRef()
    this.state = this.initState
  }

  componentDidUpdate() {
    // Get editor instance
    if (this.editorInstance.current && !this.braftFinder) {
      this.braftFinder = this.editorInstance.current.getFinderInstance()
    }
  }

  /**
   * Handle close modal
   */
  onCloseModal = () => {
    const { experience } = this.props
    if (!lodash.isEmpty(experience)) {
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
      workTimeStartAt: dates[0],
      workTimeEndAt: dates[1],
    })
  }

  /**
   * Handle change editor
   */
  onChangeEditor = (editorState, type) => {
    const newState = {
      [type]: editorState,
    }
    this.setState(newState)
  }
  /**
   * Handle submit form
   */
  onSubmit = () => {
    const { dispatch, form: { validateFieldsAndScroll, resetFields }, toggleModal, experience } = this.props
    validateFieldsAndScroll((err, data) => {
      if (!err) {
        const { jobDescription, achievements, workTimeEndAt, workTimeStartAt } = this.state
        const payload = {
          ...data,
          jobDescription,
          achievements,
          workTimeEndAt: workTimeEndAt.toISOString(),
          workTimeStartAt: workTimeStartAt.toISOString(),
        }

        if (!lodash.isEmpty(experience)) {
          // Update
          dispatch({
            type: 'candidateCV/updateExperience',
            itemId: experience._id,
            payload,
          })
        } else {
          dispatch({
            type: 'candidateCV/addExperience',
            payload,
          })
        }
        this.setState({
          jobDescription: BraftEditor.createEditorState(null),
          achievements: BraftEditor.createEditorState(null),
          workTimeStartAt: null,
          workTimeEndAt: null,
        })
        resetFields()
        if (!lodash.isEmpty(experience)) {
          toggleModal('edit')
        } else {
          toggleModal()
        }
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, experience, visible } = this.props
    let isEdit = false
    if (!lodash.isEmpty(experience)) {
      isEdit = true
    }
    return (
      <Modal
        className="app-modal top-modal witdh-size-modal"
        width="80%"
        title="Thêm kinh nghiệm"
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
            label="Tên Công ty/Tổ chức"
          >
            {
              getFieldDecorator('company', {
                rules: [{
                  required: true, message: 'Tên Công ty/Tổ chức* không được trống!',
                }, {
                  min: 5, message: 'Tên Công ty/Tổ chức ít nhất 5 ký tự',
                }],
                initialValue: isEdit ? experience.business : '',
              })(<Input
                name="company"
                className="input-style"
              />)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Chức danh"
          >
            {
              getFieldDecorator('title', {
                rules: [{
                  required: true, message: 'Chức danh không được trống!',
                }, {
                  min: 5, message: 'Chức danh yêu cầu lớn hơn hoặc bằng 5 ký tự.',
                }],
                initialValue: isEdit ? experience.title : '',
              })(<Input
                name="title"
                className="input-style"
              />)
            }
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Thời gian"
          >
            <RangePicker
              format="MM-YYYY"
              placeholder={['Bắt đầu', 'Kết thúc']}
              defaultValue={[isEdit ? moment(experience.workTimeStartAt) : null, isEdit ? moment(experience.workTimeEndAt) : null]}
              onChange={this.onChangeDate}
              showTime
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Mức lương"
          >
            {
              getFieldDecorator('wage', {
                initialValue: isEdit ? experience.wage : 0,
              })(<InputNumber
                style={{ width: '100%' }}
                name="wage"
                className="input-style"
              />)
            }
          </FormItem>
          <Form.Item
            className="last-form-item"
            {...formItemLayout}
            hasFeedback
            label="Mô tả công việc"
          >
            <BraftEditor
              defaultValue={experience.jobDescription}
              ref={this.editorInstance}
              onChange={value => this.onChangeEditor(value, 'jobDescription')}
              controls={editorControls}
              language="en"
              stripPastedStyles
            />
          </Form.Item><br /> <br />
          <Form.Item
            className="last-form-item"
            {...formItemLayout}
            hasFeedback
            label="Thành tích đạt được"
          >
            <BraftEditor
              defaultValue={experience.achievements}
              ref={this.editorInstance}
              onChange={value => this.onChangeEditor(value, 'achievements')}
              controls={editorControls}
              language="en"
              stripPastedStyles
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(ExpForm)
