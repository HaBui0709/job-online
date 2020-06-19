import React from 'react'
import { MenuCandidateView } from '../../menus/candidate'
import { MenuRecuiterView } from '../../menus/recuiter'

class HeaderSingle extends React.Component {
  render() {
    const { isLoggedIn, user } = this.props
    return (
      <div>
        {
          (isLoggedIn && user.role === 'candidate') &&
          <MenuCandidateView currentMenu="management" />
        }
        {
          (isLoggedIn && user.role === 'recuiter') &&
          <MenuRecuiterView />
        }
      </div>
    )
  }
}

export default HeaderSingle
