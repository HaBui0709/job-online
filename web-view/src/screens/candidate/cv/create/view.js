import React, { createRef } from 'react'
import lodash from 'lodash'
import { connect } from 'dva'
import { translate } from 'react-i18next'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Layout, Row, Form, Col, Input, Select, Radio, Button } from 'antd'
import './style.less'

// import { RcAvatarUpload } from '../../../../components'
import { AppConst, ComponentConst, EditorConst } from '../../../../configs'

// Component
import ExperienceView from './experience'
import QualificationForm from './qualifications'
import ForteSkillForm from './forte-skill'
import ComputerLiteracyForm from './computer-literacy'
import LanguageForm from './language'
import { notification } from '../../../../utils';

const editorControls = EditorConst.controls

const {
  Content,
} = Layout
const FormItem = Form.Item
const { Option } = Select
const RadioGroup = Radio.Group
const formItemLayout = ComponentConst.formMax.itemLayout

class CVFormCreateView extends React.Component {
  constructor(props) {
    super(props)
    this.initState = {
      careerGoal: BraftEditor.createEditorState(null),
      otherSkill: BraftEditor.createEditorState(null),
      otherSoftware: BraftEditor.createEditorState(null),

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

  // Submit CV
  submitCV = () => {
    const { form: { validateFieldsAndScroll } } = this.props
    validateFieldsAndScroll((errors, value) => {
      if (!errors) {
        const { careerGoal, otherSkill, otherSoftware } = this.state
        const overviewInfo = {
          ...lodash.pick(
            value,
            ['desiredLocation', 'currentRank', 'desiredRank',
              'desiredCareer', 'desiredCity', 'aducation', 'totalYearExperience',
              'workMode', 'minimumWage',
            ],
          ),
          careerGoal: careerGoal.toHTML(),
        }

        // forte-skill
        const forteSkill = {
          ...lodash.pick(value, ['mainSkills']),
          otherSkill: otherSkill.toHTML(),
        }

        // Computer literacy
        const computerLiteracy = {
          ...lodash.pick(value, ['word', 'excel', 'powerPoint', 'Outlook']),
          other: otherSoftware.toHTML(),
        }

        const { candidateCV: { experiences, qualifications, foreignLanguages } } = this.props
        if (!qualifications.length) {
          return notification.error('Trình độ và bằng cấp không đươc trống')
        }

        // Convert exp
        const experiencesData = experiences.map((item) => {
          item.jobDescription = item.jobDescription.toHTML()
          item.achievements = item.achievements.toHTML()
          delete item._id
          return item
        })

        console.log('epsss', experiencesData);

        const qualificationsData = qualifications.map((item) => {
          const obj = lodash.pick(item, ['certificate', 'unit', 'from', 'come', 'specialized', 'graduationType', 'acttachment'])
          return obj
        })

        const foreignLanguagesData = foreignLanguages.map((item) => {
          const obj = lodash.pick(item, ['typeLanguage', 'listen', 'read', 'speak', 'write'])
          return obj
        })
        const payload = {
          overviewInfo,
          forteSkill,
          computerLiteracy,
          workExperiences: experiencesData,
          qualifications: qualificationsData,
          foreignLanguages: foreignLanguagesData,
        }
        this.props.dispatch({
          type: 'candidateCV/create',
          payload,
        })
      }
    })
  }

  fetchCareerGroup = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'candidateCV/fetchCareerGroup',
    })
  }

  render() {
    const { form: { getFieldDecorator }, candidateCV, dispatch } = this.props
    const { careerGoal, otherSkill, otherSoftware } = this.state
    return (
      <Layout>
        <Content>
          <div className="header-title">
            <h1>Tạo CV</h1>
          </div>
          <div className="clearfix" />
          <div className="section detail-desc">
            <div className="container white-shadow">
              {/* <Row>
                <div className="detail-pic js">
                  <div className="box">
                    <RcAvatarUpload />
                  </div>
                </div>
              </Row> */}
              <Row className="bottom-mrg">
                <Form className="form" onSubmit={this.onSubmit}>
                  <h2 className="detail-title">Thông tin tổng quan (Bắt buộc)</h2>
                  <Row type="flex" justify="space-around">
                    <Col xs={23} sm={23} md={23} lg={23} xl={11}>
                      <FormItem
                        hasFeedback
                      >
                        {
                          getFieldDecorator('desiredLocation', {
                            rules: [{
                              required: true, message: 'Vị trí mong muốn không được trống!',
                            }, {
                              min: 4, message: 'Vị trí mong muốn phải lớn hơn hoặc bằng 5 ký tự',
                            }],
                          })(<Input name="desiredLocation" className="input-style" placeholder="Vị trí mong muốn" />)
                        }
                      </FormItem>
                      <FormItem
                        hasFeedback
                      >
                        {
                          getFieldDecorator('currentRank', {
                            rules: [{
                              required: true, message: 'Cấp bậc hiên tại không được trống!',
                            }],
                          })(<Select
                            optionFilterProp="children"
                            name="currentRank"
                            placeholder="Cấp bậc hiên tại"
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
                          getFieldDecorator('desiredRank', {
                            rules: [{
                              required: true, message: 'Cấp bậc mong muốn không được trống!',
                            }],
                          })(<Select
                            optionFilterProp="children"
                            name="desiredRank"
                            placeholder="Cấp bậc mong muốn"
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
                          getFieldDecorator('desiredCareer', {
                            rules: [{
                              required: true, message: 'Ngành nghề mong muốn không được trống!',
                            }],
                          })(<Select
                            optionFilterProp="children"
                            name="desiredCareer"
                            placeholder="Ngành nghề mong muốn"
                          >
                            {
                            candidateCV.careerGroups.map((item) => {
                              return (
                                <Option key={item._id} value={item._id}>{item.name}</Option>
                              )
                            })}
                          </Select>)
                        }
                      </FormItem>
                    </Col>
                    <Col xs={23} sm={23} md={23} lg={11} xl={11}>
                      <FormItem
                        hasFeedback
                      >
                        {
                          getFieldDecorator('minimumWage', {
                            rules: [{
                              required: true, message: 'Mức lương mong muốn không được trống!',
                            }, {
                              pattern: AppConst.regex.positiveInteger,
                              message: 'Mong muốn mức lương tối thiểu phải là số nguyên',
                            }],
                          })(<Input
                            type="number"
                            name="minimumWage"
                            className="input-style"
                            placeholder="Mong muốn mức lương tối thiểu (VND/tháng)"
                          />)
                        }
                      </FormItem>
                      <FormItem
                        hasFeedback
                      >
                        {
                            getFieldDecorator('totalYearExperience', {
                              rules: [{
                                required: true, message: 'Tổng số năm kinh nghiệm không được trống!',
                              }],
                            })(<Select
                              optionFilterProp="children"
                              name="totalYearExperience"
                              placeholder="Tổng số năm kinh nghiệm"
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
                            getFieldDecorator('desiredCity', {
                              rules: [{
                                required: true, message: 'Địa điểm mong muốn không được trống!',
                              }],
                            })(<Select
                              optionFilterProp="children"
                              name="desiredCity"
                              placeholder="Địa điểm mong muốn"
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
                    </Col>
                  </Row>
                  <Row type="flex" justify="space-around">
                    <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                      <Form.Item
                        className="last-form-item"
                        hasFeedback
                      >
                        <BraftEditor
                          value={careerGoal}
                          ref={this.editorInstance}
                          onChange={value => this.onChangeEditor(value, 'careerGoal')}
                          controls={editorControls}
                          placeholder="Mục tiêu nghề nghiệp"
                          language="en"
                          stripPastedStyles
                        />
                        <span className="note-target">Hãy mô tả ngắn gọn về công việc mong muốn của bạn,
                          lý do bạn muốn làm công việc này, những mục tiêu và kế hoạch liên quan tới công việc trong thời gian tới.</span>
                      </Form.Item>
                    </Col>
                    <Col xs={23} sm={23} md={23} lg={23} xl={23}>
                      <FormItem
                        {...formItemLayout}
                        label="Trình độ học vấn"
                        hasFeedback
                      >
                        {
                          getFieldDecorator('aducation', {
                            rules: [{
                              required: true, message: 'Trình độ học vấn cao nhất không được trống!',
                            }],
                          })(<RadioGroup>
                            {
                            AppConst.aducationLevel.list.map((item) => {
                              return (
                                <Radio key={item.value} value={item.value} name={item.name}>{item.title}</Radio>
                              )
                            })
                          }
                          </RadioGroup>)
                        }
                      </FormItem>
                      <FormItem />
                    </Col>
                  </Row>
                  <h2 className="detail-title">Kinh nghiệm làm việc (Không bắt buộc)</h2>
                  <ExperienceView
                    candidateCV={candidateCV}
                    dispatch={dispatch}
                  /><br />
                  <h2 className="detail-title">Trình độ & bằng cấp (Bắt buộc)</h2>
                  <QualificationForm
                    candidateCV={candidateCV}
                    dispatch={dispatch}
                  /><br />
                  <h2 className="detail-title">Ngoại Ngữ (Không Bắt buộc)</h2>
                  <LanguageForm
                    candidateCV={candidateCV}
                    dispatch={dispatch}
                  /><br />
                  <ForteSkillForm
                    dispatch={dispatch}
                    getFieldDecorator={getFieldDecorator}
                    onChangeEditor={this.onChangeEditor}
                    otherSkill={otherSkill}
                  />
                  <ComputerLiteracyForm
                    dispatch={dispatch}
                    getFieldDecorator={getFieldDecorator}
                    onChangeEditor={this.onChangeEditor}
                    otherSoftware={otherSoftware}
                  />
                </Form>
              </Row>
              <div style={{ textAlign: 'center' }}>
                <Button style={{ marginRight: '10px' }}>Trở về</Button>
                <Button
                  type="primary"
                  onClick={this.submitCV}
                >
                  Tạo hồ sơ
                </Button>
              </div><br /><br />
            </div>
          </div>
        </Content>
      </Layout>
    )
  }
}

const WrappedCVCreateForm = Form.create()(CVFormCreateView)

export default connect(({ loading, candidateCV }) => ({ loading, candidateCV }))(translate([])(WrappedCVCreateForm))
