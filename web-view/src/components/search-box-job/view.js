import React from 'react'
import { Row, Card, Input, Button } from 'antd'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'

import { RcSelectBox } from '../../components'
import { AppConst } from '../../configs'

import './style.less'

class RcSearchBoxJobs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      city: '',
      career: '',
      salary: '',
      workMode: '',
      experience: '',
      aducationLevel: '',
      gender: '',
    }
  }
  componentDidMount() {
    this.fetchCareerGroup()
  }

  onSubmit = () => {
    const { keyword, city, career, workMode, salary, experience, aducationLevel, gender } = this.state
    const { dispatch } = this.props

    const payload = {
      keyword,
      city,
      career,
      workMode,
      salary,
      experience,
      aducationLevel,
      gender,
    }

    dispatch({
      type: 'searchJobs/searchJob',
      payload,
    })
    dispatch(routerRedux.push('/viec-lam/tim-kiem'))
  }


  onChangeFilter = (value, field) => {
    const newState = {
      [field]: value,
    }
    this.setState(newState)
  }

  fetchCareerGroup = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'app/fetchCareerGroup',
    })
  }

  /**
   * Change input state
   */
  changeInputState = (e) => {
    const { name, value } = e.target
    const newState = {
      [name]: value,
    }
    this.setState(newState)
  }

  render() {
    const { app: { careerGroups } } = this.props
    return (
      <Row className="wrapper-box-search">
        <Card
          title="Tìm kiếm việc làm"
          bordered={false}
        >
          <div>
            <Input
              placeholder="Nhập từ khóa"
              onChange={this.changeInputState}
              name="keyword"
            /><br /><br />
            <RcSelectBox
              title="Chọn ngành nghề"
              values={careerGroups}
              onChange={value => this.onChangeFilter(value, 'career')}
              isSearch
            /><br /><br />
            <RcSelectBox
              title="Chọn mức lương"
              values={AppConst.salary.list}
              onChange={value => this.onChangeFilter(value, 'salary')}
              isSearch
            /><br /><br />
            <RcSelectBox
              title="Chọn nơi làm việc"
              values={AppConst.cities.list}
              onChange={value => this.onChangeFilter(value, 'city')}
              isSearch
            /><br /><br />
            <RcSelectBox
              title="Chọn hình thức làm việc"
              values={AppConst.workModes.list}
              onChange={workMode => this.onChangeFilter(workMode, 'workMode')}
              isSearch
            /><br /><br />
            <RcSelectBox
              title="Chọn kinh nghiệm"
              values={AppConst.experience.list}
              onChange={value => this.onChangeFilter(value, 'experience')}
              isSearch
            /><br /><br />
            <RcSelectBox
              title="Chọn trình độ"
              values={AppConst.aducationLevel.listFilter}
              onChange={value => this.onChangeFilter(value, 'aducationLevel')}
              isSearch
            /><br /><br />
            <RcSelectBox
              title="Chọn giới tính"
              values={AppConst.gender.list}
              onChange={value => this.onChangeFilter(value, 'gender')}
              isSearch
            /><br /><br />
            <div className="align-btn">
              <Button onClick={this.onSubmit} type="primary">Tìm kiếm</Button>
            </div>
          </div>
        </Card>
      </Row>
    )
  }
}

export default connect(({ loading, app }) => ({ loading, app }))((RcSearchBoxJobs))
