import React, { PureComponent } from 'react'
import { Form, Button, Row } from 'antd'

import './style.less'
import ListLanguageView from './language/list'
import LanguageForm from './language/form'

export class QualificationForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      language: null,
      editModalVisible: false,
      addModalVisible: false,
    }
  }
  /**
   * Handle toggle modal
   */
  toggleModal = (type, newLanguage) => {
    const { editModalVisible, addModalVisible, language } = this.state
    const newState = type === 'edit' ?
      { editModalVisible: !editModalVisible } : { addModalVisible: !addModalVisible }
    if (type === 'edit') {
      newState.language = language ? null : newLanguage
    }
    this.setState(newState)
  }

  render() {
    const { candidateCV: { foreignLanguages }, dispatch } = this.props
    const { addModalVisible, editModalVisible, language } = this.state
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
          !!foreignLanguages.length &&
          <ListLanguageView
            foreignLanguages={foreignLanguages}
            dispatch={dispatch}
            toggleModal={this.toggleModal}
          />
        }
        <LanguageForm
          visible={addModalVisible}
          dispatch={dispatch}
          toggleModal={this.toggleModal}
          language={{}}
        />
        {
         !!language &&
         <LanguageForm
           visible={editModalVisible}
           dispatch={dispatch}
           toggleModal={this.toggleModal}
           language={language}
         />
       }
      </Row>
    )
  }
}

export default Form.create()(QualificationForm)
