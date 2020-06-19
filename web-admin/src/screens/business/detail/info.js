import React from 'react'
import get from 'lodash/get'
import { Card, Typography } from 'antd'
import { RcGoogleMaps } from '../../../components'

class Info extends React.Component {
  render() {
    const { business } = this.props
    console.log('aaaaaaaaaaaaaa', get(business, 'location.coordinates', null))
    return (
      <Card className="card-data">
        <div className="business-info">
          <img src={business.logo} alt="" />
          <h2 className="name margin-top-16">{business.name}</h2>
          <p className="address margin-bottom-8">{business.address}</p>
          <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>
            {business.desc}
          </Typography.Paragraph>
        </div>
        <RcGoogleMaps
          showSearchBox={false}
          coordinates={get(business, 'location.coordinates', null)}
          containerElement={<div style={{ height: '200px' }} />}
        />
      </Card>
    )
  }
}

export default Info
