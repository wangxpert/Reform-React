import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap'

// Import Actions
import { logoutRequested } from '../../../../redux/actions/auth'

// Import Styles
import './styles.css'

class Header extends Component {

  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  sidebarToggle(e) {
    e.preventDefault()
    document.body.classList.toggle('sidebar-hidden')
  }

  mobileSidebarToggle(e) {
    e.preventDefault()
    document.body.classList.toggle('sidebar-mobile-show')
  }

  isLogged() {
    return this.props.auth.state === 'LOGGED'
  }

  onAuth() {
    const { auth, history, dispatch } = this.props
    if (auth.state === 'LOGGED') {
      dispatch(logoutRequested())
    } else {
      history.push('/auth/login')
    }
  }

  onLink(path) {
    this.props.history.push(path)
  }

  render() {
    const user = this.props.account.user

    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler hidden-lg-up" type="button" onClick={ this.mobileSidebarToggle }>&#9776;</button>
        <ul className="nav navbar-nav hidden-md-down">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={ this.sidebarToggle } href="">&#9776;</a>
          </li>
        </ul>
        <a className="navbar-brand" href="/">
          <div className="d-flex h-100 flex-column justify-content-center align-items-center">
            <strong>Reform COW</strong>
          </div>
        </a>

        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Dropdown isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
              <a onClick={ this.toggle } className="nav-link dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded={ this.state.dropdownOpen }>
                <img src={ (user && user.picture ) ? `https://${ user.picture }` : '/img/user.png' } className="img-avatar" alt="User"/>
                <span className="hidden-md-down">{ user && user.preferred_username }</span>
              </a>
              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center"><strong>Account</strong></DropdownItem>
                { this.isLogged() && (
                  <DropdownItem onClick={ e => this.onLink('/account/profile') }>
                    <i className="fa fa-user"></i> Profile
                  </DropdownItem>
                )}
                <DropdownItem onClick={ this.onAuth.bind(this) }>{ this.isLogged() ? (<div><i className="fa fa-sign-out"></i> Logout</div>) : (<div><i className="fa fa-sign-in"></i> Login</div>) }</DropdownItem>
                { !this.isLogged() &&
                  <DropdownItem onClick={ e => this.onLink('/auth/signup') }>
                    <i className="fa fa-user"></i> Register
                  </DropdownItem>
                }

              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </header>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth,
    account: store.account
  }
}

export default withRouter(connect(mapStateToProps)(Header))
