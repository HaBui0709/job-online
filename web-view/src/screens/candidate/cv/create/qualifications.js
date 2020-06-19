import React, { PureComponent } from 'react'
import { Form, Button, Row } from 'antd'

import './style.less'
import ListQualificationView from './qualification/list'
import QualificaitonForm from './qualification/form'

export class QualificationForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      qualification: null,
      editModalVisible: false,
      addModalVisible: false,
    }
  }
  /**
   * Handle toggle modal
   */
  toggleModal = (type, newQualification) => {
    const { editModalVisible, addModalVisible, qualification } = this.state
    const newState = type === 'edit' ? { editModalVisible: !editModalVisible } : { addModalVisible: !addModalVisible }
    if (type === 'edit') {
      newState.qualification = qualification ? null : newQualification
    }
    this.setState(newState)
  }

  render() {
    const { candidateCV: { qualifications }, dispatch } = this.props
    const { addModalVisible, editModalVisible, qualification } = this.state
    return (
      <Row>
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.toggleModal('add')}
          >
            THÊM MỚI
          </Button>
        </div>
        {
          !!qualifications.length &&
          <ListQualificationView
            qualifications={qualifications}
            dispatch={dispatch}
            toggleModal={this.toggleModal}
          />
        }
        <QualificaitonForm
          visible={addModalVisible}
          dispatch={dispatch}
          toggleModal={this.toggleModal}
          qualification={{}}
        />
        {
         !!qualification &&
         <QualificaitonForm
           visible={editModalVisible}
           dispatch={dispatch}
           toggleModal={this.toggleModal}
           qualification={qualification}
         />
       }
      </Row>
    )
  }
}

export default Form.create()(QualificationForm)
