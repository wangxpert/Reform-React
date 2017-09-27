import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Styles
import "./styles/styles.css"

// Import Components
import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const GooglePlusIcon = generateShareIcon('google')
const LinkedShareIcon = generateShareIcon('linkedin')
const TwitterShareIcon = generateShareIcon('twitter')
const EmailShareIcon = generateShareIcon('email')

class Buttons extends Component {
  render() {
    const { shareUrl, title, picture } = this.props

    return (
      <div className="share-buttons">
        <FacebookShareButton
          url={ shareUrl }
          quote={ title }
          className="share-button"
          >
          <FacebookIcon
            size={32}
            round />
        </FacebookShareButton>

        <GooglePlusShareButton
          url={ shareUrl }
          title={ title }
          picture={ picture }
          className="share-button"
          >
          <GooglePlusIcon
            size={32}
            round />
        </GooglePlusShareButton>

        <LinkedinShareButton
          url={ shareUrl }
          quote={ title }
          className="share-button"
          >
          <LinkedShareIcon
            size={32}
            round />
        </LinkedinShareButton>

        <TwitterShareButton
          url={ shareUrl }
          title={ title }
          className="share-button"
          >
          <TwitterShareIcon
            size={32}
            round />
        </TwitterShareButton>

        <EmailShareButton
          url={ shareUrl }
          subject={ title }
          className="share-button"
          >
          <EmailShareIcon
            size={32}
            round />
        </EmailShareButton>
      </div>
    )
  }
}

Buttons.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  picture: PropTypes.string
}

export default Buttons
