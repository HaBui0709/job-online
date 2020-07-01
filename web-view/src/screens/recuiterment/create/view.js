import React, { createRef } from 'react'
import { connect } from 'dva'
import { translate } from 'react-i18next'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import lodash from 'lodash'
import { Layout, Row, Form, Col, Input, Select, Button, DatePicker } from 'antd'

import { AppConst, EditorConst } from '../../../configs'

import './style.less'

const editorControls = EditorConst.controls

const {
  Content,
} = Layout
const FormItem = Form.Item
const { Option } = Select
const dateFormat = 'DD/MM/YYYY'

class CVFormCreateView extends React.Component {
  constructor(props) {
    super(props)
    this.initState = {
      desc: BraftEditor.createEditorState(null),
      benefit: BraftEditor.createEditorState(null),
      jobRequirements: BraftEditor.createEditorState(null),
    }
    this.editorInstance = createRef()
    this.state = this.initState
  }

  componentDidMount() {
    this.fetchCareerGroup()
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

  // Submit
  submit = () => {
    const { form: { validateFieldsAndScroll, resetFields } } = this.props
    validateFieldsAndScroll((errors, value) => {
      if (!errors) {
        const { benefit, desc, jobRequirements } = this.state
        const salary = lodash.find(AppConst.salary.list, ['key', value.salary])
        value.salary = salary
        value.deadline = value.deadline.toISOString()
        const payload = {
          ...value,
          benefit: benefit.toHTML(),
          desc: desc.toHTML(),
          jobRequirements: jobRequirements.toHTML(),
        }
        this.props.dispatch({
          type: 'recuitermentCreate/create',
          payload,
        })
        resetFields()
      }
    })
  }

  fetchCareerGroup = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'recuitermentCreate/fetchCareerGroup',
    })
  }

  uploadCoverHeader = (file) => {
    this.props.dispatch({
      type: 'recuitermentCreate/uploadCover',
      payload: {
        file,
      },
    })
  }

  render() {
    const { form: { getFieldDecorator }, recuitermentCreate: { careerGroups } } = this.props
    const { desc, benefit, jobRequirements } = this.state
    // const fileList = !cover ? [] : [{
    //   uid: '1',
    //   name: '',
    //   status: 'done',
    //   url: cover,
    // }]
    return (
      <Layout>
        <Content>
          <div className="header-title">
            <h1>Tạo mới hồ sơ tuyển dụng</h1>
          </div>
          <div className="clearfix" />
          <div className="section detail-desc">
            <div className="container white-shadow">
              <Row className="bottom-mrg">
                <Form className="form" onSubmit={this.onSubmit}>
                  <Row type="flex" justify="space-around">
                    <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                      <FormItem
                        hasFeedback
                      >
                        {
                          getFieldDecorator('title', {
                            rules: [{
                              required: true, message: 'Tiêu đề tuyển dụng không được trống!',
                            }, {
                              min: 6, message: 'Tiêu đề tuyển dụng phải lớn hơn hoặc bằng 6 ký tự',
                            }],
                          })(<Input name="title" className="input-style" placeholder="Tiêu đề tuyển dụng" />)
                        }
                      </FormItem>
                    </Col>
                    <Col xs={23} sm={23} md={23} lg={23} xl={11}>
                      <FormItem
                        hasFeedback
                      >
                        {
                          getFieldDecorator('jobPosition', {
                            rules: [{
                              required: true, message: 'Chức vụ không được trống!',
                            }],
                          })(<Select
                            optionFilterProp="children"
                            name="jobPosition"
                            placeholder="Chức vụ"
                          >
                            {
                            AppConst.positions.list.map((item) => {
                              return (
                                <Option key={item._id} value={item._id}>{item.name}</Option>
                              )
                            })}
                          </Select>)
                        }
                      </FormItem>
                      <FormItem
                        hasFeedback
                      >
                        {
                          getFieldDecorator('degreeRequirement', {
                            rules: [{
                              required: true, message: 'Yêu cầu bằng cấp không được trống!',
                            }],
                          })(<Select
                            optionFilterProp="children"
                            name="degreeRequirement"
                            placeholder="Yêu cầu bằng cấp"
                          >
                            {
                            AppConst.aducationLevel.list.map((item) => {
                              return (
                                <Option key={item.value} value={item.value}>{item.title}</Option>
                              )
                            })}
                          </Select>)
                        }
                      </FormItem>
                      <FormItem
                        hasFeedback
                      >
                        {
                          getFieldDecorator('quantity', {
                            rules: [{
                              required: true, message: 'Số lượng tuyển không được trống!',
                            }, {
                              pattern: AppConst.regex.positiveInteger,
                              message: 'Số lượng tuyển yêu cầu là số nguyên lớn hơn 0',
                            }],
                          })(<Input name="quantity" className="input-style" placeholder="Số lượng tuyển" />)
                        }
                      </FormItem>
                      <FormItem
                        hasFeedback
                      >
                        {
                            getFieldDecorator('gender', {
                              rules: [{
                                required: true, message: 'Yêu cầu giới tính không được trống!',
                              }],
                            })(<Select
                              optionFilterProp="children"
                              name="gender"
                              placeholder="Yêu cầu giới tính"
                            >
                              {
                              AppConst.gender.list.map((item) => {
                                return (
                                  <Option key={item._id} value={item._id}>{item.name}</Option>
                                )
                              })}
                            </Select>)
                          }
                      </FormItem>
                      <FormItem
                        hasFeedback
                      >
                        {
                            getFieldDecorator('deadline', {
                              rules: [{
                                required: true, message: 'Hạn nộp hồ sơ không được trống!',
                              }],
                            })(<DatePicker format={dateFormat} />)
                          }
                      </FormItem>
                    </Col>
                    <Col xs={23} sm={23} md={23} lg={11} xl={11}>
                      <FormItem
                        hasFeedback
                      >
                        {
                          getFieldDecorator('salary', {
                            rules: [{
                              required: true, message: 'Mức lương không được trống!',
                            }],
                          })(<Select
                            optionFilterProp="children"
                            name="salary"
                            placeholder="Mức lương"
                          >
                            {
                            AppConst.salary.list.map((item) => {
                              return (
                                <Option key={item.key} value={item.key}>{item.name}</Option>
                              )
                            })}
                          </Select>)
                        }
                      </FormItem>
                      <FormItem
                        hasFeedback
                      >
                        {
                            getFieldDecorator('experience', {
                              rules: [{
                                required: true, message: 'Kinh nghiệm không được trống!',
                              }],
                            })(<Select
                              optionFilterProp="children"
                              name="experience"
                              placeholder="Kinh nghiệm"
                            >
                              {
                              AppConst.experience.list.map((item) => {
                                return (
                                  <Option key={item._id} value={item._id}>{item.name}</Option>
                                )
                              })}
                            </Select>)
                          }
                      </FormItem>
                      <FormItem
                        hasFeedback
                      >
                        {
                            getFieldDecorator('workMode', {
                              rules: [{
                                required: true, message: 'Hình thức làm việc không được trống!',
                              }],
                            })(<Select
                              optionFilterProp="children"
                              name="workMode"
                              placeholder="Hình thức làm việc"
                            >
                              {
                              AppConst.workModes.list.map((item) => {
                                return (
                                  <Option key={item._id} value={item._id}>{item.name}</Option>
                                )
                              })}
                            </Select>)
                          }
                      </FormItem>
                      <FormItem
                        hasFeedback
                      >
                        {
                            getFieldDecorator('city', {
                              rules: [{
                                required: true, message: 'Địa điểm không được trống!',
                              }],
                            })(<Select
                              optionFilterProp="children"
                              name="city"
                              placeholder="Địa điểm"
                            >
                              {
                              AppConst.cities.list.map((item) => {
                                return (
                                  <Option key={item._id} value={item._id}>{item.name}</Option>
                                )
                              })}
                            </Select>)
                          }
                      </FormItem>
                      <FormItem
                        hasFeedback
                      >
                        {
                            getFieldDecorator('careers', {
                              rules: [{
                                required: true, message: 'Ngành nghề không được trống!',
                              }],
                            })(<Select
                              optionFilterProp="children"
                              id="select-careerGroup"
                              mode="multiple"
                              maxTagCount={5}
                              name="careers"
                              placeholder="Ngành nghề "
                              showSearch
                            >
                              {
                              careerGroups.map((item) => {
                                return (
                                  <Option key={item._id} value={item._id}>{item.name}</Option>
                                )
                              })}
                            </Select>)
                          }
                      </FormItem>
                    </Col>
                  </Row>
                  <Row type="flex" justify="space-around">
                    <Col xs={23} sm={23} md={23} lg={23} xl={23} style={{ marginBottom: '15px' }}>
                      <Form.Item
                        className="last-form-item"
                        hasFeedback
                      >
                        <BraftEditor
                          value={desc}
                          ref={this.editorInstance}
                          onChange={value => this.onChangeEditor(value, 'desc')}
                          controls={editorControls}
                          placeholder="Mô tả Công việc"
                          language="en"
                          stripPastedStyles
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                      <Form.Item
                        className="last-form-item"
                        hasFeedback
                      >
                        <BraftEditor
                          value={jobRequirements}
                          ref={this.editorInstance}
                          onChange={value => this.onChangeEditor(value, 'jobRequirements')}
                          controls={editorControls}
                          placeholder="Yêu cầu công việc"
                          language="en"
                          stripPastedStyles
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={23} sm={23} md={23} lg={23} xl={23} style={{ marginBottom: '15px' }}>
                      <Form.Item
                        className="last-form-item"
                        hasFeedback
                      >
                        <BraftEditor
                          value={benefit}
                          ref={this.editorInstance}
                          onChange={value => this.onChangeEditor(value, 'benefit')}
                          controls={editorControls}
                          placeholder="Quyền lợi"
                          language="en"
                          stripPastedStyles
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                      <FormItem>
                        {/* <Upload
                          listType="picture-card"
                          fileList={fileList}
                          beforeUpload={(file) => {
                          this.uploadCoverHeader(file)
                          return false
                        }}
                          showUploadList={{ showRemoveIcon: false }}
                        >
                          <div>
                            <Icon type="plus" />
                            <div className="ant-upload-text">Upload</div>
                          </div>
                        </Upload> */}
                      </FormItem>
                    </Col>
                  </Row>
                </Form>
              </Row>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Button style={{ marginRight: '10px' }}>Trở về</Button>
                <Button
                  type="primary"
                  onClick={this.submit}
                >
                  Tạo hồ sơ
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    )
  }
}

const WrappedRecuitermentCreateForm = Form.create()(CVFormCreateView)

export default connect(({ loading, recuitermentCreate }) => ({ loading, recuitermentCreate }))(translate([])(WrappedRecuitermentCreateForm))
