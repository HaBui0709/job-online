import React from 'react'

import './style.less'
import { helper } from '../../../../../utils';

class OfficeInfoDetailPreView extends React.Component {
  render() {
    const { computerLiteracy } = this.props
    return (
      <div>
        {
          computerLiteracy ? <div className="box-border">
            <div className="bold font14">
              <span className="blue">Tin học văn phòng: </span>
            </div>
            <div className="m-l-20 m-t-5">
              + MS word: {helper.getLearning(computerLiteracy.word) || ''}<br />
              +  MS Excel: {helper.getLearning(computerLiteracy.excel) || ''}<br />
              + MS Power Point: {helper.getLearning(computerLiteracy.powerPoint) || ''}<br />
              + MS Outlook: {helper.getLearning(computerLiteracy.Outlook) || ''}<br />
              + Phần mềm khác:<div dangerouslySetInnerHTML={{ __html: computerLiteracy.other }} /><br />
            </div>
          </div> : <div>Không có</div>
        }
      </div>

    )
  }
}

export default OfficeInfoDetailPreView
