import React from 'react'
import { RcGallery } from '../../../../../components'
// import './style.less'

export default ({ feedback, photos }) => {
  return (
    <div className="review-expanded-row">
      <p className="feedback">{feedback}</p>
      {photos.length ? <RcGallery data={photos} /> : null}
    </div>
  )
}
