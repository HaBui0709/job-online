/* eslint-disable no-underscore-dangle */
import lodash from 'lodash'
import React, { PureComponent, Fragment } from 'react'
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts'
import DataSet from '@antv/data-set'
import { Row } from 'antd'
import { connect } from 'dva'
import { RcRangePicker, RcSelectBox } from '../../../../../components'
import { AppConst, ComponentConst } from '../../../../../configs'
import { helper, format } from '../../../../../utils'
import { key } from '../../../../../configs/locale'
import TableView from './table'

const BILL_COLOR = '#273250'
const REWARD_COLOR = '#902b2b'
const BILL_FIELD = ComponentConst.getIn(['chart', 'fields', 'bills'])
const REWARD_FIELD = ComponentConst.getIn(['chart', 'fields', 'rewards'])

class Statistic extends PureComponent {
  /**
   * Handle filter change
   */
  onChangeRange = (range) => {
    this.props.dispatch({
      type: 'business/changeChartFilters',
      payload: {
        range,
      },
    })
  }

  /**
   * Handle click on points of chart
   */
  onPointClick = (e) => {
    const { originalDate: date, city: type } = e.data._origin
    if (type === REWARD_FIELD) {
      this.fetchRewards({ date })
    } else {
      this.fetchBills({ date })
    }
  }

  /**
   * Handle change reward filter
   */
  onChangeRewardFilter = (newFilter = {}) => {
    let { business: { filters } } = this.props
    if (!newFilter.page) {
      newFilter.page = 0
    }
    filters = helper.mergeObjects(filters, newFilter)
    const query = lodash.pick(filters, ['page', 'isUsed', 'date'])
    this.fetchRewards(query)
  }

  /**
   * Handle change reward table
   */
  onRewardTablePageChange = (pagination) => {
    const { current } = pagination
    this.onChangeRewardFilter({ page: current - 1 })
  }

  /**
   * Handle change reward filter
   */
  onChangeBillFilter = (newFilter = {}) => {
    let { business: { filters } } = this.props
    if (!newFilter.page) {
      newFilter.page = 0
    }
    filters = helper.mergeObjects(filters, newFilter)
    const query = lodash.pick(filters, ['page', 'registered', 'date'])
    this.fetchBills(query)
  }

  /**
   * Handle change reward table
   */
  onBillTablePageChange = (pagination) => {
    const { current } = pagination
    this.onChangeBillFilter({ page: current - 1 })
  }

  /**
   * Handle chart tooltip change
   */
  onTooltipChange = ({ items }) => {
    const { translate } = this.props
    const [bill, reward] = items
    items.splice(0)
    items.push({
      ...bill,
      name: translate(key.titleBill),
    }, {
      ...reward,
      name: translate(key.titleReward),
    })
  }

  /**
   * Handle fetch reward histories
   */
  fetchRewards = (filters) => {
    this.props.dispatch({
      type: 'business/fetchRewards',
      payload: filters,
    })
  }

  /**
   * Handle fetch reward histories
   */
  fetchBills = (filters) => {
    this.props.dispatch({
      type: 'business/fetchBills',
      payload: filters,
    })
  }

  render() {
    const { business: { statistic, filters, rewards, displayTableType, bills }, translate, loading, dispatch } = this.props
    const ds = new DataSet()
    const dv = ds.createView().source(statistic)
    dv.transform({
      type: 'fold',
      fields: [BILL_FIELD, REWARD_FIELD],
      key: 'city',
      value: 'number',
    });
    const cols = {
      date: {
        range: [0, 1],
      },
    }

    return (
      <Fragment>
        <Row className="filter-box">
          <RcRangePicker
            title={translate(AppConst.getIn(['businesses', 'rangeTitle']))}
            defaultValue={filters.range}
            format="DD-MM-YYYY"
            onChange={this.onChangeRange}
          />
        </Row>

        <Chart
          height={400}
          data={dv}
          scale={cols}
          onPointClick={this.onPointClick}
          style={{ backgroundColor: '#fff', paddingTop: '24px' }}
          forceFit
        >
          <Legend
            // items={[
            //   { value: translate(key.titleBill), fill: BILL_COLOR, marker: 'circle' },
            //   { value: translate(key.titleReward), fill: REWARD_COLOR, marker: 'circle' },
            // ]}
            custom={false}
          />
          <Axis name="date" />
          <Axis name="number" />
          <Tooltip crosshairs={{ type: 'y' }} />
          <Geom
            type="line"
            position="date*number"
            size={2} color={['city', [BILL_COLOR, REWARD_COLOR]]}
            shape="line"
          />
          <Geom
            type="point"
            position="date*number"
            size={4}
            shape="circle"
            color={['city', [BILL_COLOR, REWARD_COLOR]]}
            style={{ stroke: '#fff', lineWidth: 1, cursor: 'pointer' }}
          />
        </Chart>
        {
          displayTableType === 'reward' && (
            <Fragment>
              <h2 className="histories-title">{`${translate(key.titleReward)}: ${format.dateWithNoHour(filters.date)} - (${filters.total})`}</h2>
              <Row className="filter-box">
                <RcSelectBox
                  translate={translate}
                  className="active-select-box"
                  title={AppConst.getIn(['reward', 'isUsed', 'title'])}
                  values={AppConst.getIn(['reward', 'isUsed', 'list'])}
                  onChange={isUsed => this.onChangeRewardFilter({ isUsed })}
                  initValue={AppConst.getIn(['reward', 'isUsed', 'default'])}
                  isHorizontal
                />
              </Row>
              <TableView
                translate={translate}
                isLoading={loading.effects['business/fetchRewards']}
                data={rewards}
                onChange={this.onRewardTablePageChange}
                pageSize={filters.limit}
                total={filters.total}
                current={filters.page}
                tableType="reward"
                dispatch={dispatch}
              />
            </Fragment>
          )
        }
        {
          displayTableType === 'bill' && (
            <Fragment>
              <h2 className="histories-title">{`${translate(key.titleBill)}: ${format.dateWithNoHour(filters.date)} - (${filters.total})`}</h2>
              <Row className="filter-box">
                <RcSelectBox
                  translate={translate}
                  className="active-select-box"
                  title={AppConst.getIn(['user', 'registerStatus', 'title'])}
                  values={AppConst.getIn(['user', 'registerStatus', 'list'])}
                  onChange={registered => this.onChangeBillFilter({ registered })}
                  initValue={AppConst.getIn(['user', 'registerStatus', 'default'])}
                  isHorizontal
                />
              </Row>
              <TableView
                translate={translate}
                isLoading={loading.effects['business/fetchBills']}
                data={bills}
                onChange={this.onBillTablePageChange}
                pageSize={filters.limit}
                total={filters.total}
                current={filters.page}
                tableType="bill"
                dispatch={dispatch}
              />
            </Fragment>
          )
        }
      </Fragment>
    )
  }
}
export default connect(({ business, loading }) => ({
  business,
  loading,
}))(Statistic)
