import React from 'react'
import { DatePicker, Col } from 'antd'
import moment from 'moment'
import './style.less'

const { RangePicker } = DatePicker

class RcRangePicker extends React.Component {
  constructor(props) {
    super(props)
    const { start, end } = this.props
    this.state = {
      start: start ? moment(start) : moment().subtract(1, 'month').startOf('d'),
      end: end ? moment(end) : moment().endOf('d'),
    }
  }

  onOk = () => {
    const { onOk } = this.props
    const { start, end } = this.state
    onOk(start.toISOString(), end.toISOString())
  }

  handleChange = (dates) => {
    this.setState({
      start: dates[0],
      end: dates[1],
    })
  }

  render() {
    const { translate, title } = this.props
    const { start, end } = this.state
    return (
      <Col xs={24} sm={24} md={24} lg={8} xl={8} span={4} className="rc-component">
        <div className="section-title">
          <h4>{translate(title)}</h4>
        </div>
        <RangePicker
          style={{ width: '100%' }}
          allowClear={false}
          defaultValue={[start, end]}
          showTime
          onChange={this.handleChange}
          onOk={this.onOk}
        />
      </Col>
    )
  }
}

export default RcRangePicker
