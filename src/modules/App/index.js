import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import styles
import './styles/styles.css'

// Import components
import { NotificationContainer } from 'react-notifications'


import Header from './components/Header'
// import Footer from './components/Footer'
import SideBar from './components/SideBar'

import Ads from '../Ads'


// Import routes
import routes from './routes'

// Import Actions
import { getSessionRequested } from '../../redux/actions/auth'
import { getUserInformationRequested } from '../../redux/actions/account'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { isMounted: false }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getSessionRequested())
    dispatch(getUserInformationRequested())
  }

  componentDidMount() {
    this.setState({isMounted: true}) // eslint-disable-line
  }

  render() {
    return (
      <div className="app header-fixed sidebar-fixed">
        <Header />
        <div className="app-body">
          <SideBar />
          <main className="main-content">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8">
                  { routes }
                </div>
                <div className="col-0 hidden-sm-down col-md-4 pt-5">
                  <Ads />
                </div>
              </div>
            </div>
          </main>
        </div>
        {/* <Footer /> */}
        <NotificationContainer />
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(App)
