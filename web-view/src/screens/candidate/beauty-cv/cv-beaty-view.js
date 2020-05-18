import React from 'react'
import { Button } from 'antd'
import { Link } from 'dva/router'

import './style.less'
import { format } from '../../../utils'
import { ImageConst } from '../../../configs'

class CvBeautyView extends React.Component {
  render() {
    const { cvBeauty, previewCVBeauty, deleteCVBeauty } = this.props
    return (
      <div className="box-content">
        <table className="width_100 table_boder_thin background-white">
          <tbody>
            <tr>
              <td className="">
                <div className="center demo-list">
                  <br />
                  <img
                    style={{ height: '150px', width: '150px' }}
                    src={ImageConst[cvBeauty.typeCV]} alt=""
                  />
                </div>
              </td>
              <td className="p-l-20">
                <h3>
                  <Link to="/candidate" className="font14 bold blue">{cvBeauty.cv.overviewInfo.desiredLocation}</Link>
                </h3>
                <div className="font12">
                  <span className="bold">Ngày tạo:</span>{format.dateWithNoHour(cvBeauty.createdAt)}&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div className="m-t-5">
                  <Button
                    icon="eye"
                    className="m-r-15"
                    onClick={() => previewCVBeauty(cvBeauty._id)}
                  >
                    Xem
                  </Button>
                  <Button
                    icon="download"
                    className="m-r-15"
                  >
                    Tải xuống
                  </Button>
                  <Button onClick={() => deleteCVBeauty(cvBeauty._id)} icon="delete">Xóa</Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default CvBeautyView
