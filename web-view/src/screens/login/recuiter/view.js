import React from 'react'
import { connect } from 'dva';
import translate from 'react-i18next/dist/commonjs/translate';

import { FormLoginView } from '../form-login'

class LoginRecuiterView extends React.Component {
  render() {
    return (
      <FormLoginView
        type="Recuiter"
      />
    )
  }
}

export default connect(({ loading, login }) => ({ loading, login }))(translate([])(LoginRecuiterView))
