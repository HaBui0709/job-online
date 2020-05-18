import React from 'react'
import lodash from 'lodash'
import { connect } from 'dva'
import { Layout, Steps } from 'antd'
import { translate } from 'react-i18next'
import moment from 'moment'

import FormInfoUserForm from './form/info-user'
import FormInfoBusinessForm from './form/business'
import Preview from './form/preview'

import './style.less'

const { Step } = Steps

const steps = (context) => {
  return [
    {
      key: 1,
      title: <b>THÔNG TIN NHÀ TUYỂN DỤNG</b>,
      content: <FormInfoUserForm
        next={context.next}
        prev={context.prev}
        data={context.state}
        resetState={context.resetState}
      />,
    },
    {
      key: 2,
      title: <b>THÔNG TIN CÔNG TY</b>,
      content: <FormInfoBusinessForm
        next={context.next}
        prev={context.prev}
        data={context.state}
        register={context.props.register}
        resetState={context.resetState}
        dispatch={context.props.dispatch}
      />,
    },
    {
      key: 3,
      title: <b>TỔNG QUAN LẠI</b>,
      content: <Preview
        next={context.next}
        prev={context.prev}
        data={context.state}
        resetState={context.resetState}
        onSubmit={context.submit}
      />,
    }]
}

class RegisterRecuiterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      user: {},
      business: {},
    }
  }

  /**
   * Next step
   */
  next = (data) => {
    const current = this.state.current + 1
    this.setState({ ...data, current })
  }

  /**
   * Previous step
   */
  prev = (data) => {
    const current = this.state.current - 1
    this.setState({ ...data, current })
  }

  /**
   * Reset state
   */
  resetState= () => {
    this.setState({})
  }
  /**
   * Handle submit
   */
  submit = () => {
    const { dispatch, register } = this.props
    const { user, business } = Object.assign({}, this.state)
    user.birthday = moment(user.birthday).toISOString()
    // Convert business

    const convertBusiness = {
      ...lodash.pick(business, ['name', 'address', 'city', 'website', 'phone', 'desc', 'scale']),
      ...register.business,
      wefare: {
        ...lodash.pick(business, ['absentDay', 'activities', 'educate', 'pantry', 'healthCare', 'reward']),
      },
      logo: '',
      // logoHeader: '',
    }
    const payload = {
      ...user,
      business: convertBusiness,
    }
    dispatch({
      type: 'register/registerRecuiter',
      payload,
    })
  }

  render() {
    const { current } = this.state
    const stepData = steps(this)
    return (
      <Layout className="background-login register background-white">
        <Layout className="page-content page-create">
          <Steps current={current}>
            {stepData.map(item => <Step key={item.key} title={item.title} />)}
          </Steps>
          <div className="content">
            {stepData[current].content}
          </div>
        </Layout>
      </Layout>
    )
  }
}

export default connect(({
  register,
  loading,
}) => ({
  register,
  loading,
}))(translate([])(RegisterRecuiterForm))

