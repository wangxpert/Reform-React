import React, { Component } from 'react'

import './styles.css'

class PreviewImage extends Component {

  constructor(props) {
    super(props)

    this.onDelete = this.onDelete.bind(this)
  }

  onDelete(e) {
    e.preventDefault()
    e.stopPropagation()

    this.props.onDelete();
  }

  render() {
    return (
      <div className="preview-img" onClick={ this.onDelete }>
        <img src={ this.props.src } alt=""/>
        <div className="overlay text-center py-1">
          Delete
        </div>
      </div>
    )
  }
}

export default PreviewImage
