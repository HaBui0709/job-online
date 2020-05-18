import React from 'react'
import { Col } from 'antd'
import { translate } from 'react-i18next'
// import { format } from '../../../../utils'
import ProfileView from './profile'
// import StatisticView from './statistic'
import ActionView from './action'

class InfoView extends React.Component {
  render() {
    const { user,
      changeBan,
      confirmPhone,
      t } = this.props
    // const statistic1 = [{
    //   title: 'Expense',
    //   value: format.number(user.statistic.expense),
    //   className: 'border-right',
    // }, {
    //   title: 'Bill',
    //   value: format.number(user.statistic.bill),
    //   className: 'border-right',
    // }, {
    //   title: 'Coin',
    //   value: format.number(user.statistic.coin),
    // }]
    return (
      <Col sm={24} md={24} lg={6}>
        <ProfileView user={user} translate={t} />
        {/* <StatisticView data={statistic1} /> */}
        <ActionView user={user} changeBan={changeBan} confirmPhone={confirmPhone} />
      </Col>
    )
  }
}

export default translate([])(InfoView)
