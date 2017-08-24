import React, { Component } from 'react'

// Import styles
import '../Posts/styles/styles.css'
import './styles/styles.css'

// Import components
import AlertBox from '../Posts/components/AlertBox'
import MobileApps from '../Posts/components/MobileApps'

// Import routes
import routes from './routes'

class Activists extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showAlert: true
    }
  }

  render() {

    return (
      <div className='row page-layout__viewport'>

        <div className="col-8">
          { routes }
        </div>

        <div className="col-4">
          { this.state.showAlert && <AlertBox closeAlert={ e => (this.setState({ showAlert: false })) } /> }
          <MobileApps />
        </div>


      </div>
    )
  }
}

export default Activists
