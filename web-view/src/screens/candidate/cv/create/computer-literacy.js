import React, { createRef } from 'react'
import { Row, Col, Radio, Form } from 'antd'

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import { ComponentConst, AppConst, EditorConst } from '../../../../configs'
import './style.less'
import './style-editor.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const editorControls = EditorConst.controls
const FormItem = Form.Item
const formItemLayout = ComponentConst.formMax.itemLayout

class ComputerLiteracyForm extends React.Component {
  constructor(props) {
    super(props)
    this.editorInstance = createRef()
    this.state = this.initState
  }
  render() {
    const { getFieldDecorator, otherSoftware, onChangeEditor } = this.props
    return (
      <Row type="flex" justify="space-around">
        <h2 className="detail-title">Trình độ tin học (Không bắt buộc)</h2>
        <Col xs={23} sm={23} md={23} lg={23} xl={23}>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="MS Word"
          >
            {
              getFieldDecorator('word', {
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
            label="MS Excel"
          >
            {
              getFieldDecorator('excel', {
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
            label="MS Power Point"
          >
            {
              getFieldDecorator('powerPoint', {
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
            label="MS Outlook"
          >
            {
              getFieldDecorator('Outlook', {
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
          <Form.Item
            className="last-form-item"
            {...formItemLayout}
            hasFeedback
            label="Phần mềm khác"
          >
            <BraftEditor
              value={otherSoftware}
              onChange={value => onChangeEditor(value, 'otherSoftware')}
              controls={editorControls}
              language="en"
              stripPastedStyles
            />
          </Form.Item>
        </Col>
      </Row>
    )
  }
}

export default ComputerLiteracyForm
