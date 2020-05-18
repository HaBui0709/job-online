import React from 'react'
import { connect } from 'dva'
import { Redirect } from 'dva/router'

class ErrorView extends React.Component {
  render() {
    return (
      <Redirect to="/404" />
    )
  }
}

export default connect()(ErrorView)
