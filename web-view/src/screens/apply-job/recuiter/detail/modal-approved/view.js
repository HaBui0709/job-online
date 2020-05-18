import React, { Component, createRef } from 'react'
import { Modal, Button, Form, Input } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { EditorConst } from '../../../../../configs'
import './style.less'

const FormItem = Form.Item


const editorControls = EditorConst.controls

class ApprovedModal extends Component {
  constructor(props) {
    super(props)
    this.initState = {
      notifications: BraftEditor.createEditorState(null),
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
   * Handle change editor
   */
  onChangeEditor = (editorState, type) => {
    const newState = {
      [type]: editorState,
    }
    this.setState(newState)
  }

  /**
   * Handle close modal
   */
  onCloseModal = () => {
    this.props.toggleModal()
  }

  /**
   * Handle submit
   */
  onSubmit = () => {
    const { applyJobId, typeStatus, dispatch, form: { validateFieldsAndScroll } } = this.props
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const payload = {
          applyJobId,
          data: {
            status: typeStatus,
            notification: {
              title: values.title,
              message: this.state.notifications.toHTML(),
            },
          },
        }
        dispatch({
          type: 'applyJob/changeStatusAndNotification',
          payload,
        })
        // resetFields()
        // toggleModal('approved')
      }
    })
  }

  render() {
    const { visible, form: { getFieldDecorator }, typeStatus } = this.props
    const { notifications } = this.state
    return (
      <Modal
        className="app-modal"
        title={typeStatus === 'approved' ? 'Duyệt hồ sơ xin việc' : 'Từ chối hồ sơ xin việc'}
        visible={visible}
        onCancel={this.onCloseModal}
        footer={[
          <Button key="back" icon="close-circle-o" className="float-left" onClick={() => this.onCloseModal()}>Hủy</Button>,
          <Button key="submit" icon="check-circle-o" type="primary" onClick={this.onSubmit}>
            {
              typeStatus === 'approved' ? 'Duyệt và gửi thông báo' : 'Từ chối'
            }
          </Button>,
        ]}
      >
        <Form className="app-modal-form">
          <FormItem
            className="last-form-item"
            hasFeedback
          >
            {
              getFieldDecorator('title', {
                rules: [{
                }],
              })(<Input name="title" placeholder="Tiêu đề thông báo" />)
            }
          </FormItem>
          <Form.Item
            className="last-form-item"
            hasFeedback
          >
            <BraftEditor
              value={notifications}
              ref={this.editorInstance}
              onChange={value => this.onChangeEditor(value, 'notifications')}
              controls={editorControls}
              placeholder="Thông báo"
              language="en"
              stripPastedStyles
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(ApprovedModal)
