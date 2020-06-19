import React, { Fragment } from 'react'
import { Col } from 'antd'
import DataSet from '@antv/data-set'
import { Chart, Axis, Tooltip, Geom, Legend, Coord } from 'bizcharts'
import { ComponentConst, ImageConst } from '../../configs'

import './style.less'
import { format } from '../../utils'
import { TableView } from './table'

const BILL_COLOR = '#f60'
const BILL_FIELD = ComponentConst.chart.fields.recuiterment

class ChartByDayView extends React.Component {
  /**
   * Handle click on points of chart
   */
  onPointClick = (e) => {
    const { onChangeStatisticFilter } = this.props
    // eslint-disable-next-line no-underscore-dangle
    const { originalDate: date, city: type } = e.data._origin
    if (type === BILL_FIELD) {
      onChangeStatisticFilter({ date })
    }
  }
  render() {
    const { statisticChart: { chart, filter, recuiterments }, t, loading, dispatch } = this.props
    const ds = new DataSet()
    const dv = ds.createView().source(chart)
    dv.transform({
      type: 'fold',
      fields: [BILL_FIELD],
      key: 'city',
      value: 'number',
      retains: ['percent', 'date', 'originalDate'],
    })
    const cols = {
      date: {
        range: [0, 1],
      },
    }
    return (
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
              { value: BILL_FIELD, fill: BILL_COLOR, marker: 'square' },
            ]}
          />
          <Axis name="date" />
          <Axis name="number" />
          <Tooltip crosshairs={{ type: 'y' }} />
          <Geom
            type="area"
            position="date*number*percent"
            size={3} color={['city', ['#424242']]}
            shape="area"
          />
          {/* <Geom type="path" position="date*number*percent" size={1}>
                </Geom> */}
          <Geom
            type="point"
            position="date*number*percent"
            size={5}
            shape="circle"
            color={['city', [BILL_COLOR]]}
            style={{ stroke: '#fff', lineWidth: 1, cursor: 'pointer' }}
            adjust={['dodge', 'stack']}
          />
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
              {`${format.dateWithNoHour(filter.date)} - (${format.number(filter.total)})`}</h2>
            <TableView
              translate={t}
              isLoading={loading.effects['billChrecuitermentsart/fetchRecuiterments']}
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
    )
  }
}

export default ChartByDayView
