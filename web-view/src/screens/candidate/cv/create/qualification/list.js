import React from 'react'
import { List, Avatar, Button } from 'antd'
import { format } from '../../../../../utils'
import { ImageConst } from '../../../../../configs'
import '../style.less'

class ListQualiView extends React.Component {
  deleteQualificationItem = (id) => {
    const { dispatch } = this.props
    dispatch({
      type: 'candidateCV/deleteQualificationItem',
      payload: {
        id,
      },
    })
  }
  render() {
    const { qualifications, toggleModal } = this.props
    return (
      <List
        itemLayout="horizontal"
        dataSource={qualifications}
        renderItem={item => (
          <List.Item actions={[
            <Button
              icon="edit"
              onClick={() => toggleModal('edit', item)}
            />,
            <Button
              icon="delete"
              onClick={() => this.deleteQualificationItem(item._id)}
            />,
        ]}>
            <List.Item.Meta
              avatar={<Avatar src={ImageConst.icon.list} />}
              title={<p className="business-title">{item.certificate} - <span className="unit-style">{item.unit}</span></p>}
              description={`Từ tháng
              ${format.dateWithNoHour(item.from)} đến ${format.dateWithNoHour(item.come)}`}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default ListQualiView
