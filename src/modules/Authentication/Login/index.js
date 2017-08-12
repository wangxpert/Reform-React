import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import styles
import '../styles/styles.css';

// Import components

// Import Assets
import imgLogo from '../../../assets/reformcow_96px.png';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onLogin() {
    alert('book');
  }

  render() {
    return (
      <div className="page-layout__viewport row mt-5">
        <div className="card px-5 py-5 col-md-4 push-md-4 align-middle">
          <form className="form-horizontal" role="form">
              <div className="row">
                <div className="col text-center">
                  <img src={ imgLogo } alt="logo"/>
                </div>
              </div>
              <div className="row mb-3">
                <div className="text-center col my-3">
                  <h2 style={{ color: '#333' }}></h2>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="email" className="ml-2">Email :</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-at"></i></div>
                            <input type="text" name="email" className="form-control" id="email"
                                   placeholder="Email" required autoFocus onChange={ this.onChange.bind(this) } />
                        </div>
                    </div>
                </div>
              </div>
              <div className="row">
                  <div className="col-12">
                      <div className="form-group">
                          <label htmlFor="password" className="ml-2">Password :</label>
                          <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                              <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-key"></i></div>
                              <input type="password" name="password" className="form-control" id="password"
                                     placeholder="Password" required onChange={ this.onChange.bind(this) } />
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="form-control-feedback">
                          <span className="text-danger align-middle">
                          </span>
                      </div>
                  </div>
              </div>
              <div className="row mb-3">
                <div className="col" style={{paddingTop: '.35rem'}}>
                  <div className="form-check mb-2 mr-sm-2 mb-sm-0">
                    <label className="form-check-label">
                      <input className="form-check-input" name="remember"
                             type="checkbox" />
                      <span style={{paddingBottom: '.15rem'}}>
                        Remember me
                      </span>
                    </label>
                    <a className="float-right" href="/password/reset">Forgot Your Password?</a>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-success col">
                    <i className="fa fa-sign-in"></i> Login
                  </button>
                </div>
              </div>
          </form>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {

  };
}

export default connect(mapStateToProps)(Login);
