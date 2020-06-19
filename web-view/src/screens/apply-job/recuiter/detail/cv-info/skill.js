import React from 'react'
import { helper } from '../../../../../utils'

import './style.less'

class SkillDetailPreView extends React.Component {
  render() {
    const { forteSkill } = this.props
    return (
      <div>
        {
          forteSkill ? <div className="box-border">
            <div className="bold font14">
              <span className="blue">Kỹ năng/sở trường: </span>
            </div>
            <div className="m-l-20 m-t-5">
              <ul>
                {
                  forteSkill.mainSkill.map((item) => {
                    return (
                      <li key={item}>{helper.getMainSkills(item)}</li>
                    )
                  })
                }
              </ul>
            </div>
            <div className="bold font14">
              <span className="blue">Kỹ năng khác: </span>
            </div>
            <div className="m-l-20 m-t-5">
              <div dangerouslySetInnerHTML={{ __html: forteSkill.otherSkill }} />
            </div>
          </div> : <div>Không có</div>
        }
      </div>

    )
  }
}

export default SkillDetailPreView
