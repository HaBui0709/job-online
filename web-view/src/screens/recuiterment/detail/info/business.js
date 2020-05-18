import React from 'react'
import { Row, Button } from 'antd'
import { Link } from 'dva/router'
import { ImageConst } from '../../../../configs';

class ComponentBusinessView extends React.Component {
  render() {
    const { recuitermentPosting: { business } } = this.props
    return (
      <Row className="background-white">
        <div className="row margin0 bgWhite padding0px60px job-ads">
          <div className="img-ads img-ads-new">
            <img
              className=""
              src={business.logo || ImageConst.defaultPhoto}
              width="100%"
              alt=""
            />
          </div>

        </div>
        <h3 className="font600 fontSize18 fontSize20-xs  marginBottom10 lineh12 name-business">
          {business.name}
        </h3>
        <div style={{ marginLeft: '40px' }}>
          <div className="marginTop15 fontSize14 fontSize16-xs">
            <span className="font600">Trụ sở: </span>{business.address}
          </div>
          <div className="fontSize14 fontSize16-xs">
            <span className="font600">Quy mô công ty: </span>{business.scale}
          </div>
        </div>
        <div className="floatRight marginTop5">
          <Link to={`/company/${business._id}`} title={business.name}>
            <Button type="primary">Thông tin chi tiết</Button>
          </Link>
        </div>
        <div className="clear" />
        <p>Chung toi dang tuyen dung</p>
      </Row>

    )
  }
}

export default ComponentBusinessView
