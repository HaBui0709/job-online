import React from 'react'
import { helper } from '../../../../../utils'

import './style.less'

class LanguageDetailPreView extends React.Component {
  render() {
    const { foreignLanguages } = this.props
    return (

      <div>
        {
          foreignLanguages.map((item) => {
            return (
              <div key={item._id} className="box-border">
                <div className="bold font14">
                  <span className="blue">Ngôn ngữ: </span>: {helper.getLanguage(item.typeLanguage)}
                </div>
                <div>
                  <br />
                  <b>Trình độ:&nbsp;&nbsp;</b>
                  Sơ cấp<br />
                  <div className="m-l-20 m-t-5">
                    + Nghe: {helper.getLearning(item.listen)}<br />
                    + Đọc: {helper.getLearning(item.read)}<br />
                    + Viết: {helper.getLearning(item.write)}<br />
                    + Nói: {helper.getLearning(item.write)}<br />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default LanguageDetailPreView
