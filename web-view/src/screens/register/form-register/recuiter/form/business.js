import React from 'react'
import { Form, Button, Col, Row, Input, Divider, Select, Upload, Icon } from 'antd'
import get from 'lodash/get'

import { ComponentConst, AppConst } from '../../../../../configs'
import Maps from './maps'

import './style.less'

const FormItem = Form.Item
const formItemLayout = ComponentConst.formSentForm.itemLayout
const { TextArea } = Input

class FormInfoBusinessForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  /**
   * On change radio group
   */
  onChangeRadioGroup = (e) => {
    const { value, name } = e.target
    const newState = {
      [name]: value,
    }
    this.setState(newState)
  }

  /**
   * Go to next step
   */
  next = () => {
    const { next, form: { validateFieldsAndScroll } } = this.props
    validateFieldsAndScroll((errors, value) => {
      if (!errors) {
        const data = {
          business: {
            ...value,
          },
        }
        next(data)
      }
    })
  }

  /**
   * Handle change select
   */
  handleChangeSelect= (name, value) => {
    const newState = {
      [name]: value,
    }
    this.setState(newState)
  }

  uploadCover = (file) => {
    console.log('File upload', file)
  }

  /**
   * Handle update data on store
   */
  updateData = (data) => {
    const { register: { business }, dispatch } = this.props
    dispatch({
      type: 'register/updateState',
      payload: {
        business: {
          ...business,
          ...data,
        },
      },
    })
  }

  /**
   * Go back previous step
   */
  prev = () => {
    this.props.prev()
  }
  render() {
    const { form: { getFieldDecorator }, register: { logoBusiness, business }, data } = this.props
    const fileList = !logoBusiness ? [] : [{
      uid: '1',
      name: '',
      status: 'done',
      url: logoBusiness,
    }]
    return (
      <Row type="flex" justify="center" className="margin-top-50">
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Form className="form-container">
            <Divider />
            <div><h4>THÔNG TIN CÔNG TY</h4></div>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Tên công ty</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('name', {
                  initialValue: data.business.name || '',
                  rules: [{
                    required: true, message: 'Tên công ty không được trống!',
                  }, {
                    min: 6, message: 'Tên công ty chứa ít nhất 6 ký tự!',
                  }],
                })(<Input name="name" className="input-style" placeholder="Tên công ty" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Điện thoại cố định</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('phone', {
                  initialValue: data.business.phone || '',
                  rules: [{
                    required: true, message: 'Số điện thoại không được trống!',
                  }, {
                    pattern: AppConst.regex.phone,
                    message: 'Số điện thoại không đúng định dạng',
                  }],
                })(<Input name="phone" className="input-style" placeholder="Điện thoại" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Địa chỉ công ty</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('address', {
                  initialValue: data.business.address || '',
                  rules: [{
                    required: true, message: 'Địa chỉ công ty không được trống!',
                  }, {
                    min: 6, message: 'Địa chỉ công ty chứa ít nhất 6 ký tự!',
                  }],
                })(<Input name="address" className="input-style" placeholder="Địa chỉ công ty" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Giới thiệu về công ty</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('desc', {
                  initialValue: data.business.desc || '',
                })(<TextArea name="desc" rows={4} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Thành phố</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('city', {
                  initialValue: data.business.city || '',
                  rules: [{
                    required: true, message: 'Thành phố không được trống!',
                  }],
                })((
                  <Select
                    showSearch
                    placeholder="Thành phố"
                  >
                    {
                      AppConst.cities.list.map(item => (
                        <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                      ))
                    }
                  </Select>
                ))
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Quy mô công ty</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('scale', {
                  initialValue: data.business.scale || '',
                  rules: [{
                    required: true, message: 'Quy mô công ty không được trống!',
                  }],
                })((
                  <Input name="scale" className="input-style" placeholder="Quy mô công ty" />
                ))
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Website</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('website', {
                  initialValue: data.business.website || '',
                })(<Input name="website" className="input-style" placeholder="Website" />)
              }
            </FormItem>
            <Divider />
            <div><h4>PHUC LỢI CÔNG TY</h4></div>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Về mặt chăm sóc sức khỏe</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('healthCare', {
                  initialValue: data.business.healthCare || '',
                })(<TextArea name="healthCare" rows={4} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Về mặt ngày phép</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('absentDay', {
                  initialValue: data.business.absentDay || '',
                })(<TextArea name="absentDay" rows={4} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Về mặt đào tạo</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('educate', {
                  initialValue: data.business.educate || '',
                })(<TextArea name="educate" rows={4} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Về mặt giải thưởng</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('reward', {
                  initialValue: data.business.reward || '',
                })(<TextArea name="reward" rows={4} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Về mặt các hoạt động gắn kết</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('activities', {
                  initialValue: data.business.activities || '',
                })(<TextArea name="activities" rows={4} />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Pantry</h4></span>}
              hasFeedback
            >
              {
                getFieldDecorator('pantry', {
                  initialValue: data.business.pantry || '',
                })(<TextArea name="pantry" rows={4} />)
              }
            </FormItem>
            <Divider />
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Vị trí</h4></span>}
            >
              <Maps
                updateData={this.updateData}
                coordinates={get(business, 'location.coordinates', null)}
                address={business.address}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span className="section-title"><h4>Logo</h4></span>}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={(file) => {
                  this.uploadCover(file)
                  return false
                }}
                showUploadList={{ showRemoveIcon: false }}
              >
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">Upload</div>
                </div>
              </Upload>
            </FormItem>
            <FormItem>
              <div className="step-action-button">
                <Button onClick={this.prev} style={{ marginRight: '5px' }}>BACK</Button>
                <Button
                  className="btn-next"
                  type="primary"
                  onClick={this.next}
                >
                  Tiếp theo
                </Button>
              </div>
            </FormItem>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default Form.create()(FormInfoBusinessForm)

