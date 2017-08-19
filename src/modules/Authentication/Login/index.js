import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Import styles
import '../styles/styles.css';

// Import Components
import {
  ThreeBounce,
} from 'better-react-spinkit'

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
    if (this.props.auth.state === 'LOGGING_IN')
      return;

    this.props.loginRequested(this.state.email, this.state.password, this.state.remember);
  }

  onForgotPassword(e) {
  }

  render() {

    return (
      <div className="page-layout__viewport row py-5">
        <div className="card px-5 py-5 col-12 col-md-6 push-md-3 col-lg-4 push-lg-4 align-middle">
          <form className="form-horizontal" onSubmit={this.onLogin.bind(this)}>
            <div className="row mb-5">
              <div className="col text-center">
                <img src={ imgLogo } alt="logo"/>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                  <div className="form-group">
                      <label htmlFor="email" className="ml-2">Email :</label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-at"></i></div>
                          <input type="text" name="email" className="form-control" id="email"
                                 placeholder="Email" required autoFocus value={ this.state.email } onChange={ this.onChange.bind(this) } />
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
                                   placeholder="Password" required value={ this.state.password } onChange={ this.onChange.bind(this) } />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <div className="form-check mb-2 mr-sm-2 mb-sm-0">
                  {/* }<label className="form-check-label">
                    <input className="form-check-input" name="remember"
                           type="checkbox"
                           checked={ this.state.remember }
                           onChange={ this.onChange.bind(this) }/>
                    <span style={{paddingBottom: '.15rem'}}>
                      Remember me
                    </span>
                  </label>*/}
                  <Link className="float-right" to="/password/reset">Forgot Your Password?</Link>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-success col">
                  { this.props.auth.state === 'LOGGING_IN' ?
                    (<ThreeBounce size={12} color='white' />) :
                    (<div><i className="fa fa-sign-in"></i> Login</div>)
                  }
                </button>
              </div>

              <div className="col">
                <div className="form-check mt-3 mb-2 mr-sm-2 mb-sm-0 text-center">
                  <Link to="/auth/signup">No Account? &nbsp;Register</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
};

// Retrieve data from store as props
const mapStateToProps = store => {
  return {
    auth: store.auth
  };
}

// Retrieve dispatch and callbacks from store as props
const mapDispatchToProps = dispatch => {
  return {
    loginRequested: (userName, password, remember) => dispatch(loginRequested(userName, password, remember))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
