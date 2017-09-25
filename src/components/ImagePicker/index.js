import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Components
import DropZone from 'react-dropzone'

// Import styles
import './styles.css'

class ImagePicker extends Component {

  render() {
    return (
      <DropZone
        className="image-uploader p-1 text-center"
        accept="image/*"
        onDropAccepted={ this.props.onDropAccepted }>
        { this.props.children }

        <div className="description ml-2">
          Click or drop file here.
        </div>
      </DropZone>
    )
  }
}

ImagePicker.propTypes = {
  onDropAccepted: PropTypes.func
}

export default ImagePicker
