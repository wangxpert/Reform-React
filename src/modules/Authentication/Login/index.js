import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import styles
import '../styles/styles.css';

// Import Components

// Import Actions
import { loginRequested } from '../../../actions/auth';

// Import Assets
import imgLogo from '../../../assets/reformcow_96px.png';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: false
    };
  }

  componentDidMount() {

  }

  onChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }



  onLogin(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(loginRequested(this.state.email, this.state.password, this.state.remember));
  }

  render() {
    return (
      <div className="page-layout__viewport row mt-5">
        <div className="card px-5 py-5 col-12 col-md-6 push-md-3 col-lg-4 push-lg-4 align-middle">
          <form className="form-horizontal" onSubmit={this.onLogin.bind(this)}>
              <div className="row">
                <div className="col text-center">
                  <img src={ imgLogo } alt="logo"/>
                </div>
              </div>
              <div className="row mb-3">
                <div className="text-center col my-3">
                  <h2 style={{ color: '#333' }}> </h2>
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
                <div className="col">
                  <div className="form-check mb-2 mr-sm-2 mb-sm-0">
                    <label className="form-check-label">
                      <input className="form-check-input" name="remember"
                             type="checkbox"
                             checked={ this.state.remember }
                             onChange={ this.onChange.bind(this) }/>
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