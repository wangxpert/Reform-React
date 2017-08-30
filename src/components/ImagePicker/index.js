import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Components
import DropZone from 'react-dropzone'
import Button from '../Button'

import {
  ThreeBounce
} from 'better-react-spinkit'

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
        <div className="m-1">
          <Button type="button">
            { this.props.uploading ?
              (<ThreeBounce size={12} color='white' />) :
              (' Add ')
            }
          </Button>
        </div>
      </DropZone>
    )
  }
}

ImagePicker.propTypes = {
  onDropAccepted: PropTypes.func
}

export default ImagePicker
