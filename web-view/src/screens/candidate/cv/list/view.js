import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { translate } from 'react-i18next'
import { Link } from 'dva/router'

import './style.less'
import RcCVItemView from './component-cv'
import NoteWarningView from './note-wanring'

class ListCVView extends React.Component {
  componentDidMount() {
    this.fetchCVs()
  }

  // Load cv list
  fetchCVs = () => {
    this.props.dispatch({
      type: 'cvModel/fetchAllCV',
    })
  }

  render() {
    const { cvModel: { cvs }, dispatch } = this.props
    return (
      <div style={{ background: 'ghostwhite' }}>
        <div className="container">
          <Row>
            <Col xs={24} md={24}>
              <div className="box-content">
                <header className="block-title">
                  <h3 className="title font-roboto text-primary">
                    <span className="text">Hồ sơ của bạn</span>
                    <span className="line" />
                  </h3>
                </header>
                {/* <div className="offset20">
                  <p className="lh25">Bạn được tạo tối đa
                    <span className="red bold"> 02 hồ sơ</span>
                    <br /> Trong đó chỉ có <span className="red bold"> 01 hồ sơ</span> được
                    <span className="red bold "> Cho phép tìm kiếm</span> bởi nhà tuyển dụng
                    <br /> Tất cả các hồ sơ ở trạng thái Đã duyệt đều có thể sử dụng để  Nộp hồ sơ trực tuyến
                  </p>
                </div><br /> */}

                {
                  cvs.map(((item) => {
                    return (
                      <span>
                        <RcCVItemView key={item._id} cv={item} dispatch={dispatch} /><br /><br />
                      </span>
                    )
                  }))
                }
                <div className="clearfix" /><br />
                <div className="center">
                  <Link
                    to="/candidate/create-cv"
                    className="btn-big btn-danger m-r-20 w160"
                  ><i className="icon-sprite-small icon-head-add_2017" />Tạo hồ sơ</Link>
                </div>
                <NoteWarningView />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(({ loading, cvModel }) => ({ loading, cvModel }))(translate([])(ListCVView))
