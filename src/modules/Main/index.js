import React, { Component } from 'react'

// Import Components
import AlertBox from './components/AlertBox'
import MobileApps from './components/MobileApps'

import TabBar from './components/TabBar'

// Import routes
import routes from './routes'

class Main extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showAlert: true
    }
  }

  render() {
    return (
      <div className="row main">
        <TabBar />
        <div className="col-8">
          { routes }
        </div>
        <div className="col-4 pt-4">
          { this.state.showAlert && <AlertBox closeAlert={ e => (this.setState({ showAlert: false })) } /> }
          <MobileApps />
        </div>
      </div>
    )
  }
}

export default Main
