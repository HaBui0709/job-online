import React from 'react'
import { connect } from 'dva'
import lodash from 'lodash'
import { Row, Col, PageHeader, Card, Avatar, Form, Input, Select, Button, Upload, Icon, Skeleton, Badge, Tooltip } from 'antd'
import { translate } from 'react-i18next'
// import { routerRedux } from 'dva/router'
// import get from 'lodash/get'


// import { Link } from 'dva/router'
import './style.less'
import { ComponentConst, AppConst } from '../../../configs'

// import Maps from '../../register/form-register/recuiter/form/maps'

const formItemLayout = ComponentConst.formMax.itemLayout
const FormItem = Form.Item
const { TextArea } = Input

class BusinessFormView extends React.Component {
  componentDidMount() {
    // const { app: { user }, dispaStch } = this.props
    // if (!user.business) {
    //   dispatch(routerRedux.push('/home'))
    // }
    this.fetchBusinessDetail()
  }

  fetchBusinessDetail = () => {
    const userId = localStorage.getItem(AppConst.localStorage.userIdKey)
    const businessId = localStorage.getItem(AppConst.localStorage.businessKey)
    const { dispatch } = this.props
    dispatch({
      type: 'businessUpdate/fetchBusinessDetail',
      payload: {
        data: {
          user: userId,
        },
        business: businessId,
      },
    })
  }
  /**
   * Submit update business info
   */
  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch, businessUpdate: { business } } = this.props
        // send data to server
        // Convert business

        const convertBusiness = {
          ...lodash.pick(values, ['name', 'address', 'city', 'website', 'phone', 'desc', 'scale']),
          wefare: {
            ...lodash.pick(values, ['absentDay', 'activities', 'educate', 'pantry', 'healthCare', 'reward']),
          },
          logoHeader: business.logoHeader,
        }

        dispatch({
          type: 'businessUpdate/updateBusiness',
          payload: {
            data: convertBusiness,
            business: business._id,
          },
        })
      }
    })
  }


  /**
   * Handle update data on store
   */
  updateData = (data) => {
    const { businessUpdate: { business }, dispatch } = this.props
    dispatch({
      type: 'businessUpdate/updateState',
      payload: {
        business: {
          ...business,
          ...data,
        },
      },
    })
  }

  uploadCover = (file, business) => {
    this.props.dispatch({
      type: 'businessUpdate/uploadCover',
      payload: {
        file,
        businessId: business._id,
      },
    })
  }

  uploadCoverHeader = (file, business) => {
    this.props.dispatch({
      type: 'businessUpdate/uploadCoverHeader',
      payload: {
        file,
        businessId: business._id,
      },
    })
  }
  render() {
    const { form: { getFieldDecorator }, app: { user }, businessUpdate: { business } } = this.props
    if (lodash.isEmpty(business)) {
      return <Skeleton active />
    }
    const fileList = !business.logoHeader ? [] : [{
      uid: '1',
      name: '',
      status: 'done',
      url: business.logoHeader,
    }]
    return (
      <Row className="account-form">
        <Col xs={24} md={24} lg={24} xl={24}>
          <PageHeader onBack={() => null} title={<h3 className="text-themecolor">Thông tin công ty</h3>} />
        </Col>
        <Col xs={24} md={24} lg={24} xl={24} className="margin-top-30">
          <Card title={<h4 className="card-header-h4">{`Welcome ${user.username}!`}</h4>}>
            <Row>
              <Col md={6} lg={12}>
                <div className="form-ggroup">
                  <div className="contact-img">
                    <Badge count={<Upload
                      className="style-cover"
                      name="file"
                      beforeUpload={(file) => {
                          this.uploadCover(file, business)
                          return false
                        }}
                      howUploadList={false}
                      showUploadList={false}
                    >
                      <Tooltip title="Upload avatar">
                        <Button shape="circle" icon="upload" size="small" />
                      </Tooltip>
                    </Upload>}
                    >
                      <Avatar size={100} src={business.logo} />
                    </Badge>
                  </div><br /><br />
                  <Form className="form">
                    <FormItem
                      {...formItemLayout}
                      label={<span className="section-title"><h4>Tên công ty</h4></span>}
                      hasFeedback
                    >
                      {
                getFieldDecorator('name', {
                  initialValue: business.name || '',
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
                      label={<span className="section-title"><h4>Điện thoại</h4></span>}
                      hasFeedback
                    >
                      {
                getFieldDecorator('phone', {
                  initialValue: business.phone || '',
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
                      label={<span className="section-title"><h4>Địa chỉ</h4></span>}
                      hasFeedback
                    >
                      {
                getFieldDecorator('address', {
                  initialValue: business.address || '',
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
                      label={<span className="section-title"><h4>Giới thiệu</h4></span>}
                      hasFeedback
                    >
                      {
                getFieldDecorator('desc', {
                  initialValue: business.desc || '',
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
                  initialValue: business.city || '',
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
                      label={<span className="section-title"><h4>Quy mô</h4></span>}
                      hasFeedback
                    >
                      {
                        getFieldDecorator('scale', {
                          initialValue: business.scale || '',
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
                          initialValue: business.website || '',
                        })(<Input name="website" className="input-style" placeholder="Website" />)
                      }
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={<span className="section-title"><h4>Vị trí</h4></span>}
                    >
                      {/* <Maps
                        updateData={this.updateData}
                        coordinates={get(business, 'location.coordinates', null)}
                        address={business.address}
                      /> */}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label={<span className="section-title"><h4>Ảnh Bìa</h4></span>}
                    >
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        beforeUpload={(file) => {
                          this.uploadCoverHeader(file, business)
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
                  </Form>
                </div>
              </Col>
              <Col md={6} lg={11} className="box-right-form">
                <Form className="form">
                  <div><h4>PHÚC LỢI CÔNG TY</h4></div>
                  <FormItem
                    {...formItemLayout}
                    label={<span className="section-title"><h4>C/S sức khỏe</h4></span>}
                    hasFeedback
                  >
                    {
                getFieldDecorator('healthCare', {
                  initialValue: business.wefare.healthCare || '',
                })(<TextArea name="healthCare" rows={4} />)
              }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<span className="section-title"><h4>Ngày phép</h4></span>}
                    hasFeedback
                  >
                    {
                getFieldDecorator('absentDay', {
                  initialValue: business.wefare.absentDay || '',
                })(<TextArea name="absentDay" rows={4} />)
              }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<span className="section-title"><h4>Đào tạo</h4></span>}
                    hasFeedback
                  >
                    {
                getFieldDecorator('educate', {
                  initialValue: business.wefare.educate || '',
                })(<TextArea name="educate" rows={4} />)
              }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<span className="section-title"><h4>Giải thưởng</h4></span>}
                    hasFeedback
                  >
                    {
                getFieldDecorator('reward', {
                  initialValue: business.wefare.reward || '',
                })(<TextArea name="reward" rows={4} />)
              }
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label={<span className="section-title"><h4>Hoạt động</h4></span>}
                    hasFeedback
                  >
                    {
                getFieldDecorator('activities', {
                  initialValue: business.wefare.activities || '',
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
                  initialValue: business.wefare.pantry || '',
                })(<TextArea name="pantry" rows={4} />)
              }
                  </FormItem>
                </Form>
              </Col>
              <Col className="align-center">
                <Button
                  type="primary"
                  onClick={this.submit}
                >
                  Cập nhật thông tin
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

const WrappedBusinessFormView = Form.create()(BusinessFormView)

export default connect(({ app, loading, businessUpdate }) => ({ app, loading, businessUpdate }))(translate([])(WrappedBusinessFormView))
