import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class GoogleAdSense extends Component {
  componentDidMount() {
    if(window) (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <ins className="adsbygoogle"
        style={ this.props.style }
        data-ad-client={ this.props.client }
        data-ad-slot={ this.props.slot }
        data-ad-test={ this.props.test }
        data-ad-format={ this.props.format }></ins>
    )
  }
}

GoogleAdSense.propTypes = {
  style: PropTypes.object, // eslint-disable-line
  client: PropTypes.string.isRequired,
  slot: PropTypes.string.isRequired,
  format: PropTypes.string,
  test: PropTypes.string,
}

GoogleAdSense.defaultProps = {
  style: { display: 'block' },
  format: 'auto',
  test: 'off'
}
