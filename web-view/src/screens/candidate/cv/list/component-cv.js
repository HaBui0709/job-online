import React from 'react'
import { Button, Tag } from 'antd'
import { Link, routerRedux } from 'dva/router'

import './style.less'
import { format, helper } from '../../../../utils';

class RcCVItemView extends React.Component {
  /**
   * Navigate to preview cv page
   *
   * */
  navigateToPreview = (id) => {
    const { dispatch } = this.props
    dispatch(routerRedux.push(`/candidate/cv/preivew/${id}`))
  }

  deleteCV = (id) => {
    const { dispatch } = this.props
    dispatch({
      type: 'cvModel/deleteCV',
      payload: id,
    })
  }
  render() {
    const { cv: { overviewInfo, updatedAt, _id, status } } = this.props
    const { color, name } = helper.getStatusNameAndColorByIdOfCVs(status)
    return (
      <table className="width_100 table_boder_thin background-white">
        <tbody>
          <tr>
            <td className="">
              <div className="center demo-list">
                <br />
                {/* <Radio defaultChecked={isSearch}>Cho phép tìm kiếm</Radio> */}
              </div>
            </td>
            <td className="p-l-20">
              <div>
                <Link to="/candidate" className="font14 bold blue">{overviewInfo.desiredLocation}</Link>
              </div>
              <div className="font12">
                <span className="bold">Hồ sơ:</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="">Trực tuyến</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="bold">Ngày cập nhật:</span> {format.dateWithNoHour(updatedAt)}&nbsp;&nbsp;&nbsp;&nbsp;
                {/* <span className="bold">Lượt xem: </span>2 &nbsp;&nbsp;&nbsp;&nbsp; */}
                <Tag color={color}>{name}</Tag>
              </div>
              <div className="m-t-5">
                <Button
                  icon="eye"
                  className="m-r-15"
                  onClick={() => this.navigateToPreview(_id)}
                >
                  Xem Hồ sơ
                </Button>
                <Button icon="edit" className="m-r-15">Chỉnh sửa</Button>
                <Button icon="delete" onClick={() => this.deleteCV(_id)}>Xóa</Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default RcCVItemView
