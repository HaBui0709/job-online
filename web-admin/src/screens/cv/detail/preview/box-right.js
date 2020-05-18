import React from 'react'
import { Collapse, Tag, Button, Popconfirm } from 'antd'
import { helper, format } from '../../../../utils';

const { Panel } = Collapse

class BoxRightView extends React.Component {
  /**
   * Change status
   */
  changeStatus = (status) => {
    const { dispatch, cvId } = this.props
    dispatch({
      type: 'cvs/changeStatus',
      payload: {
        status,
        cvId,
      },
    })
  }
  render() {
    const { status, createdAt, rejectedAt, approvedAt } = this.props
    const { color, name } = helper.getStatusNameAndColorByIdOfCVs(status)
    return (
      <div style={{ marginTop: '25px', marginLeft: '30px' }}>
        <Collapse defaultActiveKey={['1']} accordion>
          <Panel
            key="1"
            header={
              <header className="block-title">
                <h3 className="title font-roboto text-primary">
                  <span className="text">Duyệt hồ sơ xin việc</span>
                  <span className="line" />
                </h3>
              </header>
            }
          >
            <div className="info-user1">
              <p className="f-s-18">
                Ngày tạo:
                <b>{format.date(createdAt)}</b>
              </p>
              <p className="f-s-18">
                Trạng thái hồ sơ:&nbsp;&nbsp;&nbsp;&nbsp;
                <Tag color={color}>{name}</Tag>
              </p>
              {
                !!approvedAt &&
                  <p className="f-s-18">
                    Thời gian duyệt:
                    <b>{format.date(approvedAt)}</b>
                  </p>
              }
              {
                !!rejectedAt &&
                  <p className="f-s-18">
                    Thời gian từ chối:
                    <b>{format.date(rejectedAt)}</b>
                  </p>
              }
              {
                status === 'pending' &&
                <div style={{ float: 'right', marginBottom: '20px' }}>
                  <Popconfirm
                    title="Bạn có chắc muốn từ chối cv này không?"
                    onConfirm={() => this.changeStatus('rejected')}
                  >
                    <Button>Từ chối</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                  </Popconfirm>
                  <Popconfirm
                    title="Bạn có chắc muốn duyệt cv này không?"
                    onConfirm={() => this.changeStatus('approved')}
                  >
                    <Button type="primary">Duyệt</Button>
                  </Popconfirm>
                </div>
              }
            </div>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

export default BoxRightView
