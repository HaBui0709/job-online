import React from 'react'
import { connect } from 'dva'
// import get from 'lodash/get'
import { translate } from 'react-i18next'
import { Carousel, Row, Col, Avatar, Icon } from 'antd'

import './style.less'
import WelfareComponent from './welfare'
import ListJobView from './list-job/view'
// import { RcGoogleMaps } from '../../components'
import { format } from '../../utils';

class BusinessView extends React.Component {
  componentDidMount() {
    this.fetchDetailBusiness()
  }

  // Fetch detail business
  fetchDetailBusiness = () => {
    const { match, dispatch } = this.props
    dispatch({
      type: 'business/fetchDetail',
      payload: {
        businessId: match.params.id,
      },
    })
  }

  render() {
    const { loading, dispatch, business: { business, recuiterments }, match } = this.props
    if (!business.name) {
      return <Icon type="loading" />
    }
    return (
      <div className="wrapper-container">
        <Carousel effect="fade">
          <div className="header-img">
            <img
              style={{ width: '100%', height: '420px' }}
              src={business.logoHeader}
              className="cp_herro_banner_image"
              alt=""
            />
          </div>
        </Carousel>
        <div className="cp_basic_info">
          <div className="container">
            <Row gutter={16}>
              <Col xs={24} sm={4} md={4} lg={4}>
                <div>
                  <Avatar
                    className="avatar-company"
                    src={business.logo}
                    shape="square" size={150}
                  />
                </div>
              </Col>
              <Col xs={24} sm={20} md={20} lg={20}>
                <h2 className="cp_company_name">{business.name}</h2>
                <table>
                  <tbody style={{ lineHeight: 2 }}>
                    <tr className="marginBottom20">
                      <td>
                        <Icon type="environment" />
                      </td>
                      <td>
                        <b>Trụ sở:&nbsp;&nbsp;</b>
                        <span>{business.address}</span>
                      </td>
                    </tr>
                    <tr className="marginBottom20">
                      <td>
                        <Icon type="usergroup-add" />
                      </td>
                      <td>
                        <b>Quy mô công ty: &nbsp;&nbsp;</b>
                        <span>{business.scale}</span>
                      </td>
                    </tr>
                    <tr className="marginBottom20">
                      <td>
                        <Icon type="global" />
                      </td>
                      <td>
                        <b>Website: &nbsp; &nbsp;</b>
                        <span>{business.website}</span>
                      </td>
                    </tr>
                    <tr className="marginBottom20">
                      <td>
                        <Icon type="phone" />
                      </td>
                      <td>
                        <b>Hotline: &nbsp;&nbsp;</b>
                        <span>{format.phone(business.phone)}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </div>
        <div className="container">
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className="padding20">
              <ListJobView
                dispatch={dispatch}
                loading={loading}
                recuiterments={recuiterments}
                businessId={match.params.id}
              />
            </Col>
          </Row>
          <Row>
            <div className="col-sm-12 cp_header_section">
              <h2>Giới Thiệu
                <span className="cp_under_line" style={{ backgroundColor: '#002e5e' }} />
              </h2>
              <div className="background-white">
                <p style={{ fontSize: '17px' }}>
                  {business.desc}
                </p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="col-sm-12 cp_header_section">
              <h2>Phúc Lợi Công Ty
                <span className="cp_under_line" style={{ backgroundColor: '#002e5e' }} />
              </h2>
              <WelfareComponent business={business} />
            </div>
          </Row>
          {/* <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} span={24} className="padding20">
              <RcGoogleMaps
                showSearchBox={false}
                coordinates={get(business, 'location.coordinates', null)}
                containerElement={<div style={{ height: '400px' }} />}
              />
            </Col>
          </Row> */}
        </div>

      </div>
    )
  }
}
export default connect(({ loading, business }) => ({ loading, business }))(translate([])(BusinessView))
