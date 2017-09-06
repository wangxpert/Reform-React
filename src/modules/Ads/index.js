import React, { Component } from 'react'

// Import Components
import AlertBox from './components/AlertBox'
import MobileApps from './components/MobileApps'

class Ads extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showAlert: true
    }
  }

  render() {
    return (
      <div>
        { this.state.showAlert && <AlertBox closeAlert={ e => (this.setState({ showAlert: false })) } /> }
        <MobileApps />
      </div>
    )
  }
}

export default Ads
