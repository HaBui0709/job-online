import React from 'react'
import { Link } from 'dva/router';
import './style.less'

class NoteWarningView extends React.Component {
  render() {
    return (
      <div className="chu-y">
        Người tìm việc cảnh giác với các hình thức lừa đảo
        <Link
          to="/note"
          className="text-swindled"
        />
      </div>
    )
  }
}

export default NoteWarningView
