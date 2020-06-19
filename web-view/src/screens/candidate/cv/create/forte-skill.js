import React, { createRef } from 'react'
import { Form, Row, Col, Checkbox } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import { ComponentConst, AppConst, EditorConst } from '../../../../configs'
import './style.less'
import './style-editor.less'

const editorControls = EditorConst.controls
const FormItem = Form.Item
const formItemLayout = ComponentConst.formMax.itemLayout

class ForteSkillForm extends React.Component {
  constructor(props) {
    super(props)
    this.editorInstance = createRef()
    this.state = this.initState
  }

  render() {
    const { getFieldDecorator, otherSkill, onChangeEditor } = this.props
    return (
      <Row type="flex" justify="space-around">
        <h2 className="detail-title">Kỹ năng sở trường (Không bắt buộc)</h2>
        <Col xs={23} sm={23} md={23} lg={23} xl={23}>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label="Kỹ năng chính"
          >
            {
              getFieldDecorator('mainSkills', {
              })(<Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  {
                    AppConst.mainSkills.list.map((item) => {
                      return (
                        <Col span={8}><Checkbox value={item._id}>{item.name}</Checkbox></Col>
                      )
                    })
                  }
                </Row>
              </Checkbox.Group>)
            }
          </FormItem>
          <Form.Item
            className="last-form-item"
            {...formItemLayout}
            hasFeedback
            label="Kỹ năng khác"
          >
            <BraftEditor
              value={otherSkill}
              ref={this.editorInstance}
              onChange={value => onChangeEditor(value, 'otherSkill')}
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

export default ForteSkillForm
