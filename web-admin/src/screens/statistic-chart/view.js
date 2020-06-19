import React, { Fragment } from 'react'
import moment from 'moment'
import lodash from 'lodash'
import DataSet from '@antv/data-set'
import { Layout, Row, Col } from 'antd'
import { Chart, Axis, Tooltip, Geom, Legend, Coord } from 'bizcharts'
import { connect } from 'dva'
import { translate } from 'react-i18next'

import { RcBreadcrumb, RcSelectBox, RcDatePicker } from '../../components'
import { helper, format } from '../../utils'
import { AppConst, ComponentConst, ImageConst } from '../../configs'
import { key } from '../../configs/locale'
import { TableView } from './table'

import './style.less'

import ChartByDayView from './chart-by-day'

const BILL_COLOR = '#f60'
const RECUITERMENT_FIELD = ComponentConst.chart.fields.recuiterment

export class StatisticChartView extends React.Component {
  componentDidMount() {
    this.onFilterChange()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.statisticChart.typeFilter !== this.props.statisticChart.typeFilter) {
      this.onFilterChange()
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'statisticChart/clear',
    })
  }

  // Change Filter
  onFilterChange = (newFilter = {}) => {
    const { statisticChart: { filter } } = this.props
    const filters = helper.mergeObjects(filter, newFilter)
    const query = lodash.pick(filters, ['status', 'city', 'startAt', 'endAt', 'startChart', 'endChart', 'date'])
    this.loadStatisticChart(query)
  }

  /**
   * Handle click on points of chart
   */
  onPointClick = (e) => {
    const { statisticChart: { typeFilter } } = this.props
    if (typeFilter === AppConst.statisticChart.filter.week) {
      // eslint-disable-next-line no-underscore-dangle
      const { originalDate, city: type } = e.data._origin
      if (type === RECUITERMENT_FIELD) {
        this.onChangeStatisticFilter({ ...originalDate })
      }
    } else {
      // eslint-disable-next-line no-underscore-dangle
      const { originalDate: date, city: type } = e.data._origin
      if (type === RECUITERMENT_FIELD) {
        this.onChangeStatisticFilter({ date })
      }
    }
  }

  /**
   * Handle change statistic filter
   */
  onChangeStatisticFilter = (newFilter = {}) => {
    let { statisticChart: { filter } } = this.props
    if (!newFilter.page) {
      newFilter.page = 0
    }
    filter = helper.mergeObjects(filter, newFilter)
    const query = lodash.pick(filter, ['status', 'page', 'startChart', 'endChart', 'city', 'startAt', 'endAt', 'date'])
    this.fetchRecuiterments(query)
  }

  /**
   * Handle change bill table
   */
  onBillTablePageChange = (pagination) => {
    const { current } = pagination
    this.onChangeStatisticFilter({ page: current - 1 })
  }

  // disabled start at
  disabledDateStartAt = (startAtValue) => {
    if (!startAtValue) {
      return false
    }
    const { statisticChart: { filter } } = this.props
    return filter.endAt.valueOf() < startAtValue.valueOf()
  }

  // disabled end at
  disabledDateEndAt = (endAtValue) => {
    if (!endAtValue) {
      return false
    }
    const { statisticChart: { filter } } = this.props
    const currentDate = moment()
    const startAtValue = moment(filter.startAt).startOf('d')

    return endAtValue.valueOf() >= currentDate.valueOf() || endAtValue.valueOf() < startAtValue.valueOf()
  }

  // Load statistic chart
  loadStatisticChart = (filter) => {
    const { dispatch } = this.props
    const { statisticChart: { typeFilter } } = this.props

    if (typeFilter === AppConst.statisticChart.filter.day) {
      dispatch({
        type: 'statisticChart/fetchByDay',
        payload: { ...filter },
      })
    } else {
      dispatch({
        type: 'statisticChart/fetchByWeek',
        payload: { ...filter },
      })
    }
  }

  /**
   * Handle fetch recuiterments
   */
  fetchRecuiterments = (filters) => {
    this.props.dispatch({
      type: 'statisticChart/fetchRecuiterments',
      payload: filters,
    })
  }

  changeTypeChartFilter = (typeFilter) => {
    const { dispatch } = this.props
    dispatch({
      type: 'statisticChart/updateTypeFilter',
      payload: {
        typeFilter,
      },
    })
  }

  render() {
    const { app: { appFilters }, statisticChart: { chart, filter, recuiterments, typeFilter }, t, loading, dispatch, statisticChart } = this.props
    const ds = new DataSet()
    const dv = ds.createView().source(chart)
    dv.transform({
      type: 'fold',
      fields: [RECUITERMENT_FIELD],
      key: 'city',
      value: 'number',
      retains: ['date', 'originalDate'],
    })
    const cols = {
      date: {
        tickInterval: 20,
      },
    }
    return (
      <Layout className="container">
        <Row type="flex" justify="space-between">
          <RcBreadcrumb name={`${t(key.menyStatistic)}`} />
        </Row>
        <Layout className="page-content">
          <Row gutter={8}>
            <Col xs={24} sm={24} md={24} lg={4} xl={4} span={4}>
              <Row className="filter-box">
                <RcSelectBox
                  translate={t}
                  title={AppConst.statisticChart.filter.title}
                  values={AppConst.statisticChart.filter.list}
                  onChange={type => this.changeTypeChartFilter(type)}
                  initValue={AppConst.statisticChart.filter.default}
                />
                <RcDatePicker
                  title={appFilters.statisticChart.startAt.title}
                  placeholder={appFilters.statisticChart.startAt.title}
                  initValue={filter.startAt}
                  onChange={(startAt) => {
                        this.onFilterChange({ startAt })
                      }}
                  format="DD-MM-YYYY"
                  disabledDate={this.disabledDateStartAt}
                />
                <RcDatePicker
                  title={appFilters.statisticChart.endAt.title}
                  placeholder={appFilters.statisticChart.endAt.title}
                  initValue={filter.endAt}
                  onChange={(endAt) => {
                    this.onFilterChange({ endAt })
                  }}
                  format="DD-MM-YYYY"
                  disabledDate={this.disabledDateEndAt}
                />
                <RcSelectBox
                  translate={t}
                  className="city-select-box"
                  title={appFilters.cities.title}
                  values={appFilters.cities.list}
                  onChange={city => this.onFilterChange({ city })}
                  initValue={appFilters.cities.default}
                  isSearch
                />
                <RcSelectBox
                  translate={t}
                  title={key.status}
                  values={appFilters.status.list}
                  onChange={status => this.onFilterChange({ status })}
                  initValue={appFilters.status.default}
                />
              </Row>
            </Col>
            {
              (typeFilter === AppConst.statisticChart.filter.week) &&
              <Col xs={24} sm={24} md={24} lg={20} xl={20} span={20}>
                <Chart
                  height={400}
                  data={dv}
                  scale={cols}
                  onPointClick={this.onPointClick}
                  style={{ backgroundColor: '#fff' }}
                  padding={[20, 'auto', 'auto', 5]}
                  forceFit
                >
                  <Coord scale={[0.9, 1]} />
                  <Legend
                    custom
                    items={[
                    { value: RECUITERMENT_FIELD, fill: '#424242', marker: 'square' },
                  ]}
                  />
                  <Axis name="date" />
                  <Axis name="number" />
                  <Tooltip crosshairs={{ type: 'y' }} />
                  <Geom
                    type="interval"
                    position="date*number"
                    color={['city', ['#424242']]}
                  />
                  {/* <Geom
                  type="path"
                  position="date*percent"
                  size={0}
                  opacity={0}
                /> */}
                  <Geom
                    type="point"
                    position="date*number"
                    size={4}
                    shape="circle"
                    color={['city', [BILL_COLOR]]}
                    style={{ stroke: '#fff', cursor: 'pointer' }}
                  />
                  {/* //   <Label */}
                  {/* //     content={[
                //         'percent',
                //         function (val) {
                //           return `${val} %`
                //         },
                //       ]}
                //     textStyle={{
                //       fill: 'green',
                //       fontSize: '13',
                //       textBaseline: 'top',
                //     }}
                //   />
                // </Geom> */}
                </Chart>
                {
                !!recuiterments.length &&
                <Fragment>
                  <br />
                  <h2 className="histories-title">
                    <img
                      src={ImageConst.icon.allDoc}
                      alt="bill"
                      style={{ height: '35px', paddingRight: '8px' }}
                    />
                    {
                      `${format.dateWithDayMonthOnly(filter.startChart)} - ${format.dateWithDayMonthOnly(filter.endChart)}
                      (${format.number(filter.total)})`}
                  </h2>
                  <TableView
                    translate={t}
                    isLoading={loading.effects['statisticChart/fetchRecuiterments']}
                    data={recuiterments}
                    onChange={this.onBillTablePageChange}
                    pageSize={filter.limit}
                    total={filter.total}
                    current={filter.page}
                    dispatch={dispatch}
                  />
                </Fragment>
              }
              </Col>
            }
            {
              (typeFilter === AppConst.statisticChart.filter.day) &&
              <ChartByDayView
                t={t}
                loading={loading}
                dispatch={dispatch}
                onChangeStatisticFilter={this.onChangeStatisticFilter}
                statisticChart={statisticChart}
              />
            }
          </Row>
        </Layout>
      </Layout>
    )
  }
}

export default connect(({
  app,
  statisticChart,
  loading }) => (
  {
    app,
    statisticChart,
    loading,
  }))(translate()(StatisticChartView))
