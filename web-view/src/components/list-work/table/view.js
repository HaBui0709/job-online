import React from 'react'
import PropTypes from 'prop-types'
import { RcTable } from '../../../components'
import columns from './columns'

class TableView extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
  }
  render() {
    const { data, isLoading } = this.props
    return (
      <RcTable
        layoutClassNames="app-table-no-padding"
        classNames="app-table-small"
        columns={columns(this)}
        data={data}
        pagination={false}
        isLoading={isLoading}
        onChange={() => {}}
      />
    )
  }
}
TableView.defaultProps = {
  isLoading: false,
}
export default TableView
