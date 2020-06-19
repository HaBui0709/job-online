import React from 'react'
import { format } from '../../../../utils'

import './style.less'

class QualificationDetailPreView extends React.Component {
  render() {
    const { qualifications } = this.props
    return (
      <div>
        {
        qualifications.map((item) => {
          return (
            <div key={item._id} className="box-border">
              <div className="bold font14">
                <span className="blue">{`Năm ${format.dateWithNoHour(item.from)} - Năm ${format.dateWithNoHour(item.come)}: `}
                </span>: {item.certificate}
              </div>
              <div>
                <br />
                <b>Đơn vị đào tạo:&nbsp;&nbsp;</b>
                {item.unit}<br />
                <b>Chuyên ngành: &nbsp;&nbsp;</b>
                {item.specialized}
                <br />
                <b>Loại tốt nghiệp: &nbsp;&nbsp;</b>
                {item.graduationType}
              </div>
            </div>
          )
        })
  }
      </div>
    )
  }
}
export default QualificationDetailPreView
