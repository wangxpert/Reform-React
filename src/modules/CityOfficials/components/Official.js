import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Official extends Component {

  render() {
    const { official } = this.props

    return (
      <div className="official-block row my-3 mx-3 py-3">
        <div className="col-12 col-sm-4 text-center">
          <img className="official-avatar" src={ `https://${ official.photo }` } alt="Official Avatar"/>
        </div>
        <div className="col-12 col-sm-8 py-2">
          <div className="official-name text-center">{ official.name }</div>
          <div className="official-position text-center">{ official.position }</div>
          <div className="official-termends row">
            <span className="col-5 text-right">Term Ends:</span>
            <span className="col-7"><strong>{ official.termends }</strong></span>
          </div>
          <div className="official-email row">
            <span className="col-5 text-right">Email:</span>
            <span className="col-7"><strong>{ official.email }</strong></span>
          </div>
        </div>
      </div>
    )
  }
}

Official.propTypes = {
  official: PropTypes.object.isRequired
}

export default Official
