import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

class Header extends Component {

  render() {
    return (
      <div className='footer'>
        <div className='container'>
          <nav className="navbar navbar-toggleable-md fixed-bottom navbar-inverse page-layout__navbar py-4">
            <div className="collapse navbar-collapse" id="navbarFooter">
              <ul className="navbar-nav m-auto">
                <li className="nav-item px-3">
                  <Link to='/aboutus' className='page-layout__nav-item'>About Us</Link>
                </li>
                &nbsp|&nbsp
                <li className="nav-item px-3">
                  <Link to='/terms'  className='page-layout__nav-item'>Terms of Use</Link>
                </li>
                &nbsp|&nbsp
                <li className="nav-item px-3">
                    <Link to='/privacy'  className='page-layout__nav-item'>Privacy Policy</Link>
                </li>
                &nbsp|&nbsp
                <li className="nav-item px-3">
                    <Link to='/advertise'  className='page-layout__nav-item'>Advertise with Us</Link>
                </li>
                &nbsp|&nbsp
                <li className="nav-item px-3">
                    <Link to='/contactus'  className='page-layout__nav-item'>Contact Us</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default Header
