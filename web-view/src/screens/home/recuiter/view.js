import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { Icon, Button } from 'antd';


import { RcSelectBox } from '../../../components'

import './style.less'
import { AppConst } from '../../../configs'

class HomePageRecuiterView extends React.Component {
  render() {
    const { t } = this.props
    return (
      <div>
        <div className="banner-ntd">
          <div className="container">
            <div className="row marginTop45">
              <div className="col-xs-12 col-sm-4 padding0-mb">
                <div className="box-search-ntd marginTop10-mb">
                  <div className="content-62 search-block search-block-resume">
                    <form action="" className="form-group form-search mb0 search-box-tk search-box w100p">
                      <div className="search-box-tk search-box w100p">
                        <div className="search-form">
                          <div className="input-search form-group">
                            <input
                              className="form-control search-header ui-autocomplete-input"
                              id="tu_khoa_ntd_5"
                              name="tu_khoa"
                              placeholder="Nhập từ khóa"
                              type="text"
                              autoComplete="off"
                              value=""
                            />
                            <div className="auto_complete" id="auto_complete_ntd_5">
                              <ul className="ui-autocomplete ui-front ui-menu ui-widget ui-widget-content" id="ui-id-1" style={{ display: 'none' }} />
                            </div>
                          </div>
                          <div className="form-group form-group-select">
                            <RcSelectBox
                              translate={t}
                              className="city-select-box"
                              title={<span><Icon className="placeholderIcon" type="environment" />{AppConst.cities.title}</span>}
                              values={AppConst.cities.list}
                              onChange={city => this.onFilterChange({ city })}
                              isSearch
                            />
                          </div>
                          <div className="form-group form-group-select">
                            <RcSelectBox
                              translate={t}
                              className="city-select-box"
                              title={<span><Icon className="placeholderIcon" type="environment" />{AppConst.cities.title}</span>}
                              values={AppConst.cities.list}
                              onChange={city => this.onFilterChange({ city })}
                              isSearch
                            />
                          </div>
                          <div className="form-group form-group-select">
                            <RcSelectBox
                              translate={t}
                              className="city-select-box"
                              title={<span><Icon className="placeholderIcon" type="environment" />{AppConst.cities.title}</span>}
                              values={AppConst.cities.list}
                              onChange={city => this.onFilterChange({ city })}
                              isSearch
                            />
                          </div>
                          <div className="form-group form-group-select">
                            <RcSelectBox
                              translate={t}
                              className="city-select-box"
                              title={<span><Icon className="placeholderIcon" type="environment" />{AppConst.cities.title}</span>}
                              values={AppConst.cities.list}
                              onChange={city => this.onFilterChange({ city })}
                              isSearch
                            />
                          </div>
                          <div className="form-group form-group-select">
                            <RcSelectBox
                              translate={t}
                              className="city-select-box"
                              title={<span><Icon className="placeholderIcon" type="environment" />{AppConst.cities.title}</span>}
                              values={AppConst.cities.list}
                              onChange={city => this.onFilterChange({ city })}
                              isSearch
                            />
                          </div>
                          <div className="form-group form-group-select">
                            <RcSelectBox
                              translate={t}
                              className="city-select-box"
                              title={<span><Icon className="placeholderIcon" type="environment" />{AppConst.cities.title}</span>}
                              values={AppConst.cities.list}
                              onChange={city => this.onFilterChange({ city })}
                              isSearch
                            />
                          </div>
                          <div className="form-group form-group-select">
                            <RcSelectBox
                              translate={t}
                              className="city-select-box"
                              title={<span><Icon className="placeholderIcon" type="environment" />{AppConst.cities.title}</span>}
                              values={AppConst.cities.list}
                              onChange={city => this.onFilterChange({ city })}
                              isSearch
                            />
                          </div>
                          <div className="form-group form-group-select">
                            <Button className="btn-orange-48" icon="search">Tìm hồ sơ</Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 hidden-xs col-sm-8 padding0-mb">
                <div className="wrapper-search-right">
                  <h1>Tuyển dụng nhanh chóng, dễ dàng và hiệu quả hơn !</h1>
                  <div className="row paddingTop55">
                    <div className="col-xs-12 col-sm-4">
                      <div className="cycle-white">
                        <i className="icon-hs-ntd" />
                      </div>
                      <h3 className="h3-text-static">
                        <div className="fontSize28 bold txt-green-mb">12 +</div>
                        <div className="fontSize16 txt-36-mb">Hồ sơ ứng tuyển</div>
                      </h3>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                      <div className="cycle-white">
                        <i className="icon-ntv-ntd" />
                      </div>
                      <h3 className="h3-text-static">
                        <div className="fontSize28 bold txt-green-mb">10 +</div>
                        <div className="fontSize16 txt-36-mb">Người tìm việc</div>
                      </h3>
                    </div>
                    <div className="col-xs-12 col-sm-4">
                      <div className="cycle-white">
                        <i className="icon-num-ut" />
                      </div>
                      <h3 className="h3-text-static">
                        <div className="fontSize28 bold txt-green-mb">12+</div>
                        <div className="fontSize16 txt-36-mb">Lượt ứng tuyển</div>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(({ loading }) => ({ loading }))(translate([])(HomePageRecuiterView))
