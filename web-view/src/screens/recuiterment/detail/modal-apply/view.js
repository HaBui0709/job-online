import React, { Component } from 'react'
import { Link } from 'dva/router';

import { Modal, Form, Avatar, Button, Radio, Divider } from 'antd'

import { helper, format, notification } from '../../../../utils'

import './style.less'

const RadioGroup = Radio.Group

class ApplyModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cvApply: '',
    }
  }
  /**
   * Handle close modal
   */
  onCloseModal = () => {
    this.props.toggleModal()
  }

  /**
   * Handle submit
   */
  onSubmit = () => {
    const { cvApply } = this.state
    const { recuitermentId, dispatch } = this.props
    if (!cvApply) {
      return notification.error('Vui lòng chọn một hồ sơ xin việc để  ứng tuyển')
    }
    dispatch({
      type: 'recuitermentShow/applyCV',
      payload: {
        recuiterment: recuitermentId,
        cv: cvApply,
      },
    })
    this.props.toggleModal()
  }

  onChangeRadio = (e) => {
    this.setState({
      cvApply: e.target.value,
    })
  }


  render() {
    const { visible, cvIsApproved } = this.props
    return (
      <Modal
        className="app-modal"
        title="Danh sách hồ sơ tìm việc của bạn"
        visible={visible}
        onCancel={this.onCloseModal}
        footer={[
          <Button key="back" icon="close-circle-o" className="float-left" onClick={this.onCloseModal}>Hủy</Button>,
          <Button disabled={!cvIsApproved.length} key="submit" icon="check-circle-o" type="primary" onClick={this.onSubmit}>Nộp hồ sơ</Button>,
        ]}
      >
        <div style={{ height: '300px', overflowY: 'auto' }}>
          {
            !!cvIsApproved.length &&
            <RadioGroup style={{ width: '100%' }} onChange={this.onChangeRadio}>
              {
                cvIsApproved.map((item) => {
                  return (
                    <div key={item._id}>
                      <Radio value={item._id} />
                      <Avatar shape="square" src={item.cover} />
                      <div className="list-voucher">
                        <Link to={`/candidate/cv/${item._id}`}>
                          <p className="name-voucher">{item.overviewInfo.desiredLocation}</p>
                        </Link>
                        <span><b>Vị trí: </b>{helper.getRank(item.overviewInfo.desiredRank)}</span>&nbsp;&nbsp;
                        <span><b>Mức lương tối thiểu:</b> {format.number(item.overviewInfo.minimumWage)}</span>
                      </div>
                      <span className="clear-both" />
                      <Divider />
                    </div>
                  )
                })
              }
            </RadioGroup>
          }
          {
            !cvIsApproved.length &&
            <div className="center">
              <p>Bạn chưa tạo hồ sơ xin việc hoặc hồ sơ xin việc chưa được duyệt. Vui lòng tạo hồ sơ xin việc để
                thực hiện hành động này!
              </p><br />
              <Link
                to="/candidate/create-cv"
                className="btn-big btn-danger m-r-20 w160"
              ><i className="icon-sprite-small icon-head-add_2017" />Tạo hồ sơ</Link>
            </div>
          }
        </div>
      </Modal>
    )
  }
}

export default Form.create()(ApplyModal)
