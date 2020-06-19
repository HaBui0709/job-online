import React from 'react'
import { Card, List, Icon, Button } from 'antd'
import './style.less'

const { Meta } = Card

class CardView extends React.PureComponent {
  render() {
    const { translate, data, handleOnClick } = this.props
    const titleView = () => {
      return (
        <List
          className=""
          dataSource={data.listTitle}
          renderItem={item => (
            <List.Item>
              <Icon type="check" style={{ color: 'green', fontWeight: 'bold' }} />&nbsp; {translate(item)}
            </List.Item>
          )}
        />
      )
    }

    // Button redirect login (candidate or recuiter)
    const buttonLogin = () => {
      return (
        <Button className="login-style-btn" type="primary" onClick={() => handleOnClick()}>
          {translate(data.btnTitle)}
        </Button>
      )
    }
    return (
      <Card
        hoverable
        cover={<img alt="example" className="cover-padding" src={data.image} />}
      >
        <Meta
          title={titleView()}
          description={buttonLogin()}
        />
      </Card>
    )
  }
}

export default CardView
