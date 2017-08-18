import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Import Actions
import { logoutRequested } from '../../../../actions/auth';

// Import Styles
import './styles.css';

class Header extends Component {

  onAuth() {
    const { auth, history, dispatch } = this.props;
    if (auth.state === 'LOGGED') {
      dispatch(logoutRequested());
    } else {
      history.push('/auth/login');
    }
  }

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
            <li className="nav-item px-4">
              <a href="" className='page-layout__nav-item' onClick={ this.onAuth.bind(this) }>
                { this.props.auth.state === 'LOGGED' ? 'Logout' : 'Login' }
              </a>
            </li>

            { this.props.auth.state !== 'LOGGED' &&
              <li className="nav-item">
                <a href="/auth/signup" className='page-layout__nav-item'>
                  Signup
                </a>
              </li>
            }

          </ul>
        </div>
      </nav>
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
    auth: store.auth
  };
}

export default withRouter(connect(mapStateToProps)(Header));
