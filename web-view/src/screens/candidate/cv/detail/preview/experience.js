import React from 'react'
import { format } from '../../../../../utils'

import './style.less'

class ExperienceDetailPreView extends React.Component {
  render() {
    const { workExperiences } = this.props
    return (
      <div>
        {
          workExperiences.map((item) => {
            return (
              <div key={item._id} className="box-border">
                <div className="bold font14">
                  <span
                    className="blue"
                  >
                    {`Tháng ${format.dateWithNoHour(item.workTimeStartAt)} đến ${format.dateWithNoHour(item.workTimeEndAt)}: `}
                  </span>{item.title}
                </div>
                <div>
                  <br />
                  <b>Công ty:&nbsp;&nbsp;</b>
                  {item.company}<br />
                  <b>Mô tả công việc:&nbsp;&nbsp;</b>
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: item.jobDescription }} />
                  <br />
                  <b>Thành tích đạt được:&nbsp;&nbsp;</b>
                  <div dangerouslySetInnerHTML={{ __html: item.achievements }} />
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ExperienceDetailPreView
