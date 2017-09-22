import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Styles
import './styles/styles.css'

// Import Components
import Reveal from 'react-reveal'

class DemoVideo extends Component {

  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {

  }

  render() {
    if (!this.props.isOpen) return null

    return (
      <div className="demo-video d-flex flex-column justify-content-center align-items-center" onClick={ this.props.toggle }>
        <Reveal effect="animated zoomIn">
          <iframe className="video" width="560" height="315" title="ReforeCOW Intro & Demo"
            frameBorder="0" allowFullScreen
            src="https://www.youtube-nocookie.com/embed/hS9ivJwruC0?rel=0&autoplay=1&controls=0">
          </iframe>
        </Reveal>
      </div>
    )
  }
}

DemoVideo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

export default DemoVideo
