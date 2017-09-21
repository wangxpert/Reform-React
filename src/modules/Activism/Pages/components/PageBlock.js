import React from 'react'
import PropTypes from 'prop-types'

const DESCRIPTION_MAX_LENGTH = 200
function PageBlock(props) {
  const { activist } = props

  return (
    <div className="media page-block my-3 mx-auto p-3" onClick={ props.onClick }>
      <img className="mr-3 page-image img-thumbnail" src={ activist.images.length ? `https://${ activist.images[0] }` : '' } alt="" />
      <div className="media-body">
        <h5 className="mt-0 page-title">{ activist.title }</h5>
        <span className="page-description">
          { activist.text &&
            (activist.text.length > DESCRIPTION_MAX_LENGTH) ? `${ activist.text.substr(0, DESCRIPTION_MAX_LENGTH) }...` : activist.text
          }
        </span>
      </div>
    </div>
  )
}


PageBlock.propTypes = {
  activist: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default PageBlock
