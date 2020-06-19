import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { Row, Col, Collapse, BackTop, Icon, Layout, Tag, Skeleton } from 'antd'

import './style.less'

import { RcBreadcrumb } from '../../../../components'
import { key } from '../../../../configs/locale'
import BoxRightView from './box-right'
// import { ImageConst } from '../../../../configs'
import { helper, format } from '../../../../utils';

const { Panel } = Collapse

class PreviewCVView extends React.Component {
  componentDidMount() {
    this.fetchDetail()
  }

  componentWillUnmount() {
    this.resetState()
  }

  fetchDetail = () => {
    const { match } = this.props
    this.props.dispatch({
      type: 'recuiterments/fetchDetail',
      recuitermentId: match.params.id,
    })
  }

  resetState = () => {
    this.props.dispatch({
      type: 'recuiterments/resetState',
    })
  }

  render() {
    const { recuiterments: { recuiterment }, t, dispatch } = this.props
    if (!recuiterment) {
      return <Skeleton active />
    }

    const breadcrumbParents = [{
      _id: 1,
      url: '/recuiterments',
      name: t(key.menuRecuiterment),
    }]

    return (
      <Layout className="container">
        <Row type="flex" justify="space-between">
          <RcBreadcrumb name={recuiterment.title} parents={breadcrumbParents} />
        </Row>
        <Layout className="page-content">
          <Row>
            <Col xs={24} md={12}>
              <div className="box-content">
                <div className="top-breakcrum">
                  <div className="clearfix" /><br />
                  <Collapse defaultActiveKey={['1', '2', '3', '4']}>
                    <Panel
                      showArrow
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Thông tin việc làm</span>
                            <span className="line" />
                          </h3>
                        </header>
                    } key="1"
                    >
                      <div className="content-box group-collapse"><br />
                        {/* <Col xs={24} md={8} className="avatar offset20">
                          <img className="img-recuiterment" src={recuiterment.cover || ImageConst.defaultPhoto} alt="" />
                        </Col> */}
                        <Col xs={24} md={14} className="push-left-20">
                          <div className="info-user1">
                            <p className="f-s-18">
                              Tiêu đề tuyển dụng:
                              <b className="value text-primary">{recuiterment.title}</b>
                            </p>
                            <p className="f-s-18">
                              Mức lương:
                              <b className="value text-primary">
                                {recuiterment.salary.name}
                              </b>
                            </p>
                            <p className="f-s-18">
                              Kinh nghiệm:&nbsp;&nbsp;&nbsp;&nbsp;
                              <b className="value text-primary">
                                {helper.getTotalYearExperience(recuiterment.experience)}
                              </b>
                            </p>
                            <p className="f-s-18">
                              Yêu cầu bằng cấp:
                              <b className="value text-primary">
                                {helper.getAducation(recuiterment.degreeRequirement)}
                              </b>
                            </p>
                            <p className="f-s-18">
                              Số lượng cần tuyển:&nbsp;&nbsp;&nbsp;&nbsp;
                              <b className="value text-primary">
                                {format.number(recuiterment.quantity)}
                              </b>
                            </p>
                            <p className="f-s-18">
                              Ngành nghề: &nbsp;&nbsp;&nbsp;&nbsp;
                              {
                                recuiterment.careers.map((item) => {
                                  return (
                                    <Tag color="blue" key={item._id}>{item.name}</Tag>
                                  )
                                })
                              }
                            </p>
                          </div>
                        </Col>
                      </div><br />
                    </Panel>
                    <Panel
                      showArrow
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Mô tả công việc</span>
                            <span className="line" />
                          </h3>
                        </header>
                      }
                      key="2"
                    >
                      <div dangerouslySetInnerHTML={{ __html: recuiterment.desc }} />
                    </Panel>
                    <Panel
                      showArrow
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Yêu cầu công việc</span>
                            <span className="line" />
                          </h3>
                        </header>
                      }
                      key="3"
                    >
                      <div dangerouslySetInnerHTML={{ __html: recuiterment.jobRequirements }} />
                    </Panel>
                    <Panel
                      showArrow
                      header={
                        <header className="block-title">
                          <h3 className="title font-roboto text-primary">
                            <span className="text">Quyền lợi</span>
                            <span className="line" />
                          </h3>
                        </header>
                      }
                      key="4"
                    >
                      <div dangerouslySetInnerHTML={{ __html: recuiterment.benefit }} />
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <BoxRightView
                recuiterment={recuiterment}
                dispatch={dispatch}
              />
            </Col>
          </Row>
        </Layout>
        <div>
          <BackTop>
            <Icon type="up-circle" theme="filled" className="back-top" />
          </BackTop>
        </div>
      </Layout>
    )
  }
}

export default connect(({ loading, recuiterments }) => ({ loading, recuiterments }))(translate([])(PreviewCVView))
