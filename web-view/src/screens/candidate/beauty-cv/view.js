import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { Row } from 'antd'

import './style.less'

import CardPreviewCVBeauty from './card-preview'
import ShowPreview from './show-preview'
import CvBeautyView from './cv-beaty-view'
import { CVListModal } from './modal-apply'
import { ImageConst } from '../../../configs'

const dataCV = [
  {
    type: 'cv1',
    cover: ImageConst.cv1,
    name: 'Mẫu CV 1',
  },
  {
    type: 'cv2',
    cover: ImageConst.cv2,
    name: 'Mẫu CV 2',
  },
  {
    type: 'cv3',
    cover: ImageConst.cv3,
    name: 'Mẫu CV 3',
  }]

class BeautyCVView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      typeCV: '',
      statusModalVisible: false,
    }
  }

  componentDidMount() {
    this.fetchListCvDetail()
  }

  onnChangeIsShowState = (type) => {
    this.setState({
      isShow: true,
      typeCV: type,
    })
  }

  fetchListCvDetail = () => {
    this.props.dispatch({
      type: 'cvBeautyModel/fetchListCVDetail',
    })
  }

  useTemplateCV = () => {
    console.log('useTemplateCV', this.state.typeCV)
  }

  /**
   * Handle toggle modal
   *
   * @param {Array} cvs
   *
   */
  toggleModal = () => {
    const { statusModalVisible } = this.state
    this.setState({
      statusModalVisible: !statusModalVisible,
    })
    if (!statusModalVisible) {
      this.props.dispatch({
        type: 'cvBeautyModel/fetchAllCV',
      })
    }
  }

  previewCVBeauty = (cvBeautyId) => {
    this.props.dispatch({
      type: 'cvBeautyModel/previewCVBeauty',
      payload: {
        cvBeautyId,
      },
    })
  }

  deleteCVBeauty = (cvBeautyId) => {
    this.props.dispatch({
      type: 'cvBeautyModel/deleteCVBeauty',
      cvBeautyId,
    })
  }

  render() {
    const { isShow, typeCV } = this.state
    const { cvBeautyModel: { cvBeautys, isCVExisted, cvs }, dispatch } = this.props
    return (
      <div style={{ background: 'ghostwhite', marginBottom: '30px' }}>
        <div className="container beauty-cv">
          <div className="header-beauty">
            <h3>Trang trí CV</h3>
          </div><br /><br />
          {
            isCVExisted && !!cvBeautys.length &&
            <Row className="box-content">
              <header className="block-title">
                <h3 className="title font-roboto text-primary">
                  <span className="text">CV đẹp của bạn</span>
                  <span className="line" />
                </h3>
              </header>
              {
                cvBeautys.map((item) => {
                  return (
                    <CvBeautyView
                      key={item._id}
                      cvBeauty={item}
                      previewCVBeauty={this.previewCVBeauty}
                      deleteCVBeauty={this.deleteCVBeauty}
                    />
                  )
                })
              }
            </Row>
          }
          <br />


          <div className="box-content">
            <header className="block-title">
              <h3 className="title font-roboto text-primary">
                <span className="text">Danh sách trang trí CV dành cho bạn</span>
                <span className="line" />
              </h3>
            </header>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginBottom25 box-green-content marginBottom10-mb text-left">
            <p className="fontSize14" style={{ marginBottom: 0 }}>
              Vui lòng chọn mẫu mà bạn muốn để tiếp tục.
            </p>
          </div>
          <Row gutter={16}>
            {
              dataCV.map((item) => {
                return (
                  <span key={item.type}>
                    <CardPreviewCVBeauty cvTemp={item} onnChangeIsShowState={this.onnChangeIsShowState} />
                  </span>
                )
              })
            }
          </Row>
          {
           isShow &&
           <Row>
             <ShowPreview
               typeCV={typeCV}
               toggleModal={this.toggleModal}
               useTemplateCV={this.useTemplateCV}
               dataCV={dataCV}
             />
           </Row>
         }
        </div>
        <CVListModal
          visible={this.state.statusModalVisible}
          dispatch={dispatch}
          toggleModal={this.toggleModal}
          cvs={cvs}
          typeCV={typeCV}
        />
      </div>
    );
  }
}

export default connect(({ loading, cvBeautyModel }) => ({ loading, cvBeautyModel }))(translate([])(BeautyCVView))
