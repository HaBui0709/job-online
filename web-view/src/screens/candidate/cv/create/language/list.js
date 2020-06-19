import React from 'react'
import { List, Avatar, Button } from 'antd'
import { ImageConst } from '../../../../../configs';

class ListLanguageView extends React.Component {
  deleteLanguageItem = (id) => {
    const { dispatch } = this.props
    dispatch({
      type: 'candidateCV/deleteLanguageItem',
      payload: {
        id,
      },
    })
  }
  render() {
    const { foreignLanguages, toggleModal } = this.props
    return (
      <List
        itemLayout="horizontal"
        dataSource={foreignLanguages}
        renderItem={item => (
          <List.Item actions={[
            <Button
              icon="edit"
              onClick={() => toggleModal('edit', item)}
            />,
            <Button
              icon="delete"
              onClick={() => this.deleteLanguageItem(item._id)}
            />,
        ]}>
            <List.Item.Meta
              avatar={<Avatar src={ImageConst.icon.list} />}
              title={<p className="business-title">{item.typeLanguage}</p>}
              description={`Nghe:
              ${item.listen} - Đọc: ${item.read} - Nói: ${item.speak} - Viết: ${item.write}`}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default ListLanguageView
