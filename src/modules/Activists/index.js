import React, { Component } from 'react'

// Import styles
import '../Posts/styles/styles.css'
import './styles/styles.css'

// Import components

// Import routes
import routes from './routes'

class Activists extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div>
        { routes }
      </div>
    )
  }
}

export default Activists
