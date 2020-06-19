import React, { Fragment } from 'react'
import { Icon, Button, Tooltip, Checkbox, Popover } from 'antd'
import { Link } from 'react-router-dom'
import { key } from '../../../../../configs/locale'
import RcTable from '../../../../../components/table'
import { format } from '../../../../../utils'
import { ImageConst } from '../../../../../configs'

/**
 * Reward columns
 */
const rewardColumns = (context) => {
  const { translate, dispatch } = context.props

  const changeUseRewardStatus = (_id) => {
    dispatch({
      type: 'business/useReward',
      rewardId: _id,
    })
  }
  return [{
    title: '#',
    render: (value, record, index) => index + 1,
  }, {
    title: translate(key.titleVoucher),
    dataIndex: 'voucher',
    render: value => (
      <Link to={`/vouchers/${value._id}`}>
        {value.name}
      </Link>
    ),
  }, {
    title: translate(key.users),
    dataIndex: 'user.name',
    render: (value, record) => (
      <Link to={`/users/${record.user._id}`}>
        {value}
      </Link>
    ),
  }, {
    title: translate(key.titleExchangeDate),
    dataIndex: 'createdAt',
    render: value => format.date(value),
  }, {
    title: translate(key.titleUseDate),
    dataIndex: 'updatedAt',
    render: value => format.date(value),
  }, {
    title: translate(key.voucherExpireByDate),
    dataIndex: 'expireAt',
    render: value => format.date(value),
  }, {
    title: translate(key.useStatus),
    dataIndex: '_id',
    align: 'center',
    render: (value, record) => (
      <Checkbox onChange={() => changeUseRewardStatus(value)} defaultChecked={record.isUsed} />
    ),
  }]
}


/**
 * Bill columns
 */
const billComlumns = (context) => {
  const { translate } = context.props
  return [{
    title: '#',
    render: (value, record, index) => index + 1,
  }, {
    title: translate(key.users),
    dataIndex: 'user',
    render: value => (value._id ? (
      <Link to={`/users/${value._id}`}>
        {value.name}
      </Link>
    ) : value.phone),
  }, {
    title: translate(key.titlePrice),
    dataIndex: 'price',
    render: value => (
      <Fragment>
        <img className="table-row-icon-coin" src={ImageConst.getIn(['icon', 'revenue'])} alt="revenue" />
        {format.number(value)}
      </Fragment>
    ),
  }, {
    title: translate(key.coin),
    dataIndex: 'coin',
    render: value => (
      <Fragment>
        <img className="table-row-icon-coin" src={ImageConst.getIn(['icon', 'coin'])} alt="coin" />
        {format.number(value)}
      </Fragment>
    ),
  }, {
    title: translate(key.titleCreatedAt),
    dataIndex: 'createdAt',
    render: value => format.date(value),
  }, {
    dataIndex: 'updatedAt',
    render: (value, record) => (
      <Popover
        content={(
          <tbody className="hover-table">
            <tr>
              <td>{translate(key.titleBillId)}:</td>
              <td>{record.billId}</td>
            </tr>
            <tr>
              <td>{translate(key.titleGetCoinDate)}:</td>
              <td>{format.date(value)}</td>
            </tr>
          </tbody>
        )}
      >
        <Icon type="info-circle" />
      </Popover>
    ),
  }, {
    dataIndex: '_id',
    render: () => (
      <Tooltip title={translate(key.delete)}>
        <Button size="small"><Icon type="close" /></Button>
      </Tooltip>
    ),
  }]
}

class TableView extends React.PureComponent {
  render() {
    const { data, isLoading, onChange, pageSize, total, current, tableType = 'reward' } = this.props
    return (
      <RcTable
        layoutClassNames="app-table-no-padding"
        classNames="app-table-small"
        columns={tableType === 'reward' ? rewardColumns(this) : billComlumns(this)}
        data={data}
        pagination={{ pageSize, total, current: current + 1 }}
        isLoading={isLoading}
        onChange={onChange}
      />
    )
  }
}

export default TableView
