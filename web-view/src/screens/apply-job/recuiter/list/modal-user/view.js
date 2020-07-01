import React, { Component } from 'react'
import { Modal, Row, Table, Avatar, Tag, Divider } from 'antd'
import { Link } from 'dva/router';

import './style.less'
import { ImageConst } from '../../../../../configs'
import { format, helper } from '../../../../../utils'

const columns = [{
  title: '#',
  className: 'hidden-break-small',
  dataIndex: '',
  render: (value, row, index) => {
    return index + 1
  },
}, {
  dataIndex: 'cv.user.avatar',
  render: (value) => {
    return (
      <Avatar shape="square" src={value || ImageConst.defaultPhoto} key={value} />
    )
  },
}, {
  title: 'Tên',
  dataIndex: 'cv.user.fullName',
  render: (value, row) => {
    return (
      <Link to={`/candidate/cv/preivew/${row.cv._id}`}>{value}</Link>
    )
  },
}, {
  title: 'SĐT',
  dataIndex: 'cv.user.phone',
  render: value => format.phone(value),
}, {
  title: 'Email',
  dataIndex: 'cv.user.email',
}, {
  title: 'Facebook',
  dataIndex: 'cv.user.facebook',
  render: value => value || '__',
}, {
  title: 'Thành phố',
  dataIndex: 'cv.user.city',
  render: value => <Tag color="blue">{helper.getCity(value)}</Tag>,
},
{
  title: 'Giới tính',
  dataIndex: 'cv.user.gender',
  // render: value => helper.getGender(value),
},
{
  title: 'Trạng thái duyệt cv',
  dataIndex: 'status',
  render: (value) => {
    const { text, color } = helper.getStatusApplyJob(value)
    return <Tag color={color}>{text}</Tag>
  },
}]

class UserModal extends Component {
  /**
   * Handle close modal
   */
  onCloseModal = () => {
    this.props.toggleModal()
  }

  render() {
    const { visible, typeUser = '', applyJobs, isLoading } = this.props

    const detailApprovedCV = (record) => {
      const { text, color } = helper.getStatusApplyJob(record.status)
      if (record === 'pending') {
        return (
          <p>Trạng thái đang chờ phê duyệt</p>
        )
      } else {
        return (
          <div>
            <Divider>Nội dung thông báo</Divider>
            <h4>Trạng thái hồ sơ: <Tag color={color}>{text}</Tag></h4>
            {
              !!record.approvedAt && record.status === 'approved' &&
              <h4>Ngày duyệt: &nbsp; {format.date(record.approvedAt)}</h4>
            }
            {
            !!record.rejectedAt &&
            <h4>Ngày từ chối:&nbsp; {format.date(record.rejectedAt)}</h4>
          }
            <div>
              <br />
              <h4>Tiêu đề:</h4>
              <p>{(!!record.notification && !!record.notification.title) ? record.notification.title : 'Không có tiêu đề'}</p>
              <br />
              <h4>Nội dung:</h4>
              <div dangerouslySetInnerHTML={{ __html: (!!record.notification && !!record.notification.title) ? record.notification.message : 'Không có tin nhắn' }} />
            </div>
            <Divider />
          </div>
        )
      }
    }

    console.log('app', applyJobs)
    return (
      <Modal
        className="app-modal"
        title={`Danh sách ứng viên ${typeUser}`}
        visible={visible}
        onCancel={this.onCloseModal}
        footer={false}
        width={1250}
      >
        <Row>
          <Table
            columns={columns}
            expandedRowRender={record => detailApprovedCV(record)}
            dataSource={applyJobs}
            loading={isLoading}
            rowKey="_id"
          />
        </Row>
      </Modal>
    )
  }
}

export default UserModal
