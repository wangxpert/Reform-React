import React, { Component } from 'react'

// Import Style
import './styles.css'

class Button extends Component {
  
  render() {
    return (
      <button className="button" {...this.props}>
        { this.props.title }
      </button>
    )
  }
}

export default Button
