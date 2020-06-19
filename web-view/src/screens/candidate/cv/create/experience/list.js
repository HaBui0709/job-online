import React from 'react'
import { List, Avatar, Button } from 'antd'
import { ImageConst } from '../../../../../configs';
import { format } from '../../../../../utils';

class ListQualificationView extends React.Component {
  deleteExperienceItem = (id) => {
    const { dispatch } = this.props
    dispatch({
      type: 'candidateCV/deleteExperienceItem',
      payload: {
        id,
      },
    })
  }
  render() {
    const { experiences, toggleModal } = this.props
    return (
      <List
        itemLayout="horizontal"
        dataSource={experiences}
        renderItem={item => (
          <List.Item actions={[
            <Button
              icon="edit"
              onClick={() => toggleModal('edit', item)}
            />,
            <Button
              icon="delete"
              onClick={() => this.deleteExperienceItem(item._id)}
            />,
        ]}>
            <List.Item.Meta
              avatar={<Avatar src={ImageConst.icon.list} />}
              title={<p className="business-title">{item.business}</p>}
              description={`Từ tháng
              ${format.dateWithNoHour(item.workTimeStartAt)} đến ${format.dateWithNoHour(item.workTimeEndAt)}`}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default ListQualificationView
