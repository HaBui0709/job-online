import React, { PureComponent } from 'react'
import { Select } from 'antd'
import { format } from '../utils'
import './style.less'

const { Option } = Select

class RcSelectBox extends PureComponent {
  render() {
    const { title, values, onChange, isSearch = false } = this.props
    const search = isSearch && {
      showSearch: true,
      optionFilterProp: 'children',
      filterOption(input, option) {
        return format.nonAccentVietnamese(option.props.children)
          .indexOf(format.nonAccentVietnamese(input)) >= 0
      },
    }
    return (
      <Select placeholder={title} className="section-filter" onChange={onChange} {...search}>
        {
          values.map((item) => {
            return (
              <Option key={item._id} value={item._id}>{item.name}</Option>
            )
          })
        }
      </Select>
    )
  }
}

export default RcSelectBox

