import React from 'react'
import { Card, Row, List, Button, Avatar, Icon, Col, Tag } from 'antd'
import { ImageConst } from '../../../../configs'
import { format, helper } from '../../../../utils'
import { key } from '../../../../configs/locale'

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [],
      isLoadMore: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user: { fullName, createdAt, phone, birthday, email }, translate, user } = nextProps
    const contacts = [
      {
        title: 'Loại người dùng',
        text: this.getRole(user),
      },
      {
        title: 'FullName:',
        text: fullName,
      }, {
        title: `${translate(key.signUp)}:`,
        text: format.date(createdAt),
      }, {
        title: `${translate(key.titlePhone)}:`,
        text: format.phone(phone),
      }, {
        title: 'Email:',
        text: email,
      }, {
        title: `${translate(key.birthday)}:`,
        text: format.date(birthday),
      }]
    this.setState({
      contacts,
    })
  }

  getRole = (user) => {
    let nameRole = ''
    if (user.admin && user.admin.role !== undefined) {
      nameRole = user.admin.role
      return <Tag color="green">{nameRole}</Tag>
    }
    if (user.role) {
      nameRole = helper.getRole(user.role)
    }
    return <Tag color="green">{nameRole}</Tag>
  }

  loadMore = () => {
    const { contacts } = this.state
    const { user: { city, gender }, translate } = this.props
    const add = [{
      title: `${translate(key.titleCity)}:`,
      text: format.city(city),
    }, {
      title: `${translate(key.gender)}:`,
      text: format.gender(gender),
    }, {
      title: `${translate(key.facebook)}:`,
      text: '',
    }]
    this.setState({
      contacts: contacts.concat(add),
      isLoadMore: true,
    })
  }

  render() {
    const { user: { isLocalExpert, statuses, avatar, username } } = this.props
    const { contacts, isLoadMore } = this.state
    const loadMore = !isLoadMore && (
      <Button
        icon="ellipsis"
        className="float-right btn-load-more"
        onClick={() => {
          this.loadMore()
        }}
      />
    )
    return (
      <Card className="user-detail-card">
        <div className="user-status">
          {
            isLocalExpert &&
            <img
              className="table-row-icon-local-expert"
              src={ImageConst.icon.localExpert}
              alt="local-expert"
              title="Local expert"
            />
          }
          {
            statuses.verified &&
            <Icon type="check" />
          }
        </div>
        <Row type="flex" justify="center">
          <Avatar className="user-avatar" src={avatar} />
        </Row>
        <h1 className="username text-app-color">{username}</h1>
        <List
          itemLayout="horizontal"
          className="list-info"
          dataSource={contacts}
          loadMore={loadMore}
          renderItem={item => (
            <List.Item>
              <Col span={8} style={{ paddingRight: 0 }}>
                <span className="title">{item.title}</span>
              </Col>
              <Col style={{ padding: 0 }} span={16} className="text">
                <span className="text-info">{item.text}</span>
              </Col>
            </List.Item>
          )}
        />
      </Card>
    )
  }
}
