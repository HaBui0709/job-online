import React from 'react'
import { connect } from 'dva';
import translate from 'react-i18next/dist/commonjs/translate';

import { FormLoginView } from '../form-login'

class LoginCandidate extends React.Component {
  render() {
    const { dispatch } = this.props
    return (
      <FormLoginView
        dispatch={dispatch}
        type="Candidate"
      />
    )
  }
}

export default connect(({ loading, login }) => ({ loading, login }))(translate([])(LoginCandidate))
