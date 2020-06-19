import React from 'react'
import { Card } from 'antd'


import './style.less'
import ComponentJobView from './component-job'

class AttractiveJobsView extends React.Component {
  render() {
    const { jobsInteresting = [] } = this.props
    return (
      <Card
        title={<h4 className="title-box margin0">
          Việc làm lương cao
        </h4>}
        bordered={false}
      >
        {
          jobsInteresting.map((item) => {
            return (
              <ComponentJobView key={item._id} data={item} />
            )
          })
        }
      </Card>
    )
  }
}

export default AttractiveJobsView
