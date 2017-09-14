import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class SideBar extends Component {

  handleClick(e) {
    e.preventDefault()
    e.target.parentElement.classList.toggle('open')
  }

  isLogged() {
    return this.props.auth.state === 'LOGGED'
  }

  activeRoute(routeName) {
    //return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown'
    return 'nav-item nav-dropdown'
  }

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-title">
              Main
            </li>
            <li className={ this.activeRoute("/posts") }>
              <Link to={'/'} className="nav-link"><i className=""></i> Posts</Link>
              { this.isLogged() && (
                <ul className="nav-dropdown-items">
                  <li className="nav-item">
                    <Link to={'/post/create'} className="nav-link"><i className=""></i> Create Post</Link>
                  </li>
                </ul>
              )}
            </li>

            <li className={ this.activeRoute("/activism") }>
              <Link to={'/activism'} className="nav-link"><i className=""></i> Activists</Link>
              { this.isLogged() && (
                <ul className="nav-dropdown-items">
                  <li className="nav-item">
                    <Link to={'/activism/mypages'} className="nav-link"><i className=""></i> My Activism Pages</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/activism/create'} className="nav-link"><i className=""></i> Create Activism Page</Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <Link to={'/'} className="nav-link"><i className=""></i> City Officials</Link>
            </li>

            <li className="nav-item">
              <Link to={'/'} className="nav-link"><i className=""></i> Whistleblowers</Link>
            </li>

          </ul>

          <ul className="nav bottom mt-auto">
            <li className="nav-title">
              Other Pages
            </li>

            <li className="nav-item">
              <Link to={'/advertise'} className="nav-link"><i className=""></i> Advertise with Us</Link>
            </li>

            <li className="nav-item">
              <Link to={'/feedback'} className="nav-link"><i className=""></i> Feedback</Link>
            </li>

            <li className="nav-item">
              <Link to={'/terms'} className="nav-link"><i className=""></i> Terms of Service</Link>
            </li>

            <li className="nav-item">
              <Link to={'/privacy'} className="nav-link"><i className=""></i> Privacy Policy</Link>
            </li>

          </ul>
          <br />
        </nav>
      </div>
    )
  }
}

SideBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default withRouter(connect(mapStateToProps)(SideBar))
