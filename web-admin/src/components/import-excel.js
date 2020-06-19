import React from 'react'
import { Upload, Button } from 'antd'
import './style.less'

class ImportExcel extends React.Component {
  render() {
    const { uploadExcel } = this.props
    return (
      <div style={{ float: 'right' }}>
        <Upload
          className="style-button"
          name="file"
          showUploadList={false}
          beforeUpload={(file) => {
          uploadExcel(file)
          return false
        }}
          howUploadList={false}
        >
          <Button className="btn-excel" icon="file-excel" size="small" />
        </Upload>
      </div>

    )
  }
}

export default ImportExcel
