import React from 'react'
import PropTypes from 'prop-types'
import { RcTable } from '../../../../../components'
import columns from './columns'

class TableView extends React.Component {
  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }
  render() {
    const { data, isLoading, onChange, pageSize, total, current } = this.props
    return (
      <RcTable
        layoutClassNames="app-table-no-padding"
        classNames="app-table-small"
        columns={columns(this)}
        data={data}
        pagination={{ pageSize, total, current: current + 1 }}
        isLoading={isLoading}
        onChange={onChange}
      />
    )
  }
}
TableView.defaultProps = {
  isLoading: false,
}
export default TableView
