import React, { Component } from 'react'

// Import Components
import AlertBox from './components/AlertBox'
import MobileApps from './components/MobileApps'
import AdSense from './components/GoogleAdSense'

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
        <AdSense client='ca-pub-1870518657416443'
                        slot='5619428622'
                        test='off'
                        format='auto' />
      </div>
    )
  }
}

export default Ads
