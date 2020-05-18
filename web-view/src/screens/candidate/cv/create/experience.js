import React from 'react'
import { Button, Row } from 'antd'

import FormModal from './experience/form'
import ListExpView from './experience/list'

class ExperienceView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      experience: null,
      editModalVisible: false,
      addModalVisible: false,
    }
  }
  /**
   * Handle toggle modal
   */
  toggleModal = (type, newExp) => {
    const { editModalVisible, addModalVisible, experience } = this.state
    const newState = type === 'edit' ?
      { editModalVisible: !editModalVisible } : { addModalVisible: !addModalVisible }
    if (type === 'edit') {
      newState.experience = experience ? null : newExp
    }
    this.setState(newState)
  }

  render() {
    const { dispatch, candidateCV: { experiences } } = this.props
    const { addModalVisible, editModalVisible, experience } = this.state
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
          !!experiences.length &&
          <ListExpView experiences={experiences} dispatch={dispatch} toggleModal={this.toggleModal} />
        }
        <FormModal
          visible={addModalVisible}
          dispatch={dispatch}
          toggleModal={this.toggleModal}
          experience={{}}
        />
        {
         !!experience &&
         <FormModal
           visible={editModalVisible}
           dispatch={dispatch}
           toggleModal={this.toggleModal}
           experience={experience}
         />
       }
      </Row>
    )
  }
}

export default ExperienceView
