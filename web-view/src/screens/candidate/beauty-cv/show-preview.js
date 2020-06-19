import React from 'react'
import { Button } from 'antd';

import { ImageConst } from '../../../configs'

import './style.less'

class ShowPreview extends React.Component {
  render() {
    const { toggleModal, typeCV, dataCV } = this.props

    const nameType = dataCV.filter(item => item.type === typeCV)[0].name
    return (
      <div className="cv-expander cv-detail-content-1 line_2">
        <div className="container row cv-expander-content" style={{ paddingLeft: '30px' }}>
          <div className="img-preview floatLeft w600">
            <img src={ImageConst[typeCV]} alt="" className="img-responsive img-zoom" id="img_preview" />
          </div>
          <div className="description floatLeft w200"><br /><br />
            <h2 className="fontSize20">{nameType}</h2>
            <Button
              className="btn-use-cv"
              type="primary"
              onClick={() => toggleModal()}
            >
              Sử dụng ngay
            </Button>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    )
  }
}

export default ShowPreview
