import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-toggleable-md  fixed-top navbar-inverse page-layout__navbar">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand ml-3" to="/">ReformCOW</Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item px-4">
              <Link to='/' className='page-layout__nav-item'>Posts</Link>
            </li>
            <li className="nav-item">
              <Link to='/activists'  className='page-layout__nav-item'>Activism Pages</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto mr-3">
            <li className="nav-item">
                <Link to='/login'  className='page-layout__nav-item'>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
