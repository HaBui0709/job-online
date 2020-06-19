import React from 'react'
import { Tabs, Icon } from 'antd'
import { key } from '../../../../configs/locale'


// import StatisticView from './statistic/view'
import RecuitermentsView from './recuiterment/view'

import './style.less'

const { TabPane } = Tabs
class TabsView extends React.Component {
  onChangeTab = () => {
    this.props.dispatch({
      type: 'business/resetFilters',
    })
  }

  render() {
    const {
      translate,
      dispatch,
      businessId,
    } = this.props
    const data = [
      // {
      //   _id: 'statistic',
      //   icon: 'bar-chart',
      //   name: key.titleStatistic,
      //   component: () => (
      //     <StatisticView
      //       translate={translate}
      //     />
      //   ),
      // },
      {
        _id: 'recuiterments',
        icon: 'read',
        name: key.listRecuiterments,
        component: () => (
          <RecuitermentsView
            translate={translate}
            dispatch={dispatch}
            businessId={businessId}
          />
        ),
      },
    ]
    return (
      <Tabs
        defaultActiveKey={data[0]._id}
        type="card"
        onChange={this.onChangeTab}
      >
        {
          data.map((item) => {
            return (
              <TabPane
                tab={<span className="name-tab-pane"><Icon type={item.icon} />{translate(item.name)}</span>}
                key={item._id}
              >
                {item.component()}
              </TabPane>
            )
          })
        }
      </Tabs>
    )
  }
}

export default TabsView
