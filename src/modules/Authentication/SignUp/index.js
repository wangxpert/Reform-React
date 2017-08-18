import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Import styles
import '../styles/styles.css';

// Import Components
import {
  ThreeBounce,
} from 'better-react-spinkit'

// Import Actions
import { signupRequested } from '../../../actions/auth';

// Import Assets
import imgLogo from '../../../assets/reformcow_96px.png';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: 'SnowSea',
      firstName: 'Reo',
      lastName: 'Tanaka',
      email: 'reotanaka.dream@gmail.com',
      phoneNumber: '+971582976642',
      zipCode: '90001',
      password: 'Reotanaka5',
      confirmPassword: 'Reotanaka5'
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

  onSignUp(e) {
    e.preventDefault();
    if (this.props.auth.state === 'SIGNING_UP')
      return;

    const { dispatch } = this.props;
    dispatch(signupRequested({
      userName: this.state.userName,
      name: `${this.state.firstName} ${this.state.lastName}`,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      zipCode: this.state.zipCode,
      password: this.state.password
    }, this.props.history));
  }

  render() {

    return (
      <div className="page-layout__viewport row mt-5">
        <div className="card px-5 py-5 col-12 col-md-6 push-md-3 col-lg-4 push-lg-4 align-middle">
          <form className="form-horizontal" onSubmit={this.onSignUp.bind(this)}>
            <div className="row mb-5">
              <div className="col text-center">
                <img src={ imgLogo } alt="logo"/>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                  <div className="form-group">
                      <label htmlFor="username" className="ml-2 sr-only">User Name :</label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-user"></i></div>
                          <input type="text" name="userName" className="form-control" id="username"
                                 placeholder="User Name" required autoFocus value={ this.state.userName } onChange={ this.onChange.bind(this) } />
                      </div>
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                  <div className="form-group">
                      <label htmlFor="firstname" className="ml-2 sr-only">First name :</label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa"></i></div>
                          <input type="text" name="firstName" className="form-control" id="firstname"
                                 placeholder="First Name" required value={ this.state.firstName } onChange={ this.onChange.bind(this) } />
                      </div>
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                  <div className="form-group">
                      <label htmlFor="email" className="ml-2 sr-only">Last Name :</label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa"></i></div>
                          <input type="text" name="lastName" className="form-control" id="lastname"
                                 placeholder="Last Name" required value={ this.state.lastName } onChange={ this.onChange.bind(this) } />
                      </div>
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                  <div className="form-group">
                      <label htmlFor="email" className="ml-2 sr-only">Email :</label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-at"></i></div>
                          <input type="email" name="email" className="form-control" id="email"
                                 placeholder="Email" required value={ this.state.email } onChange={ this.onChange.bind(this) } />
                      </div>
                  </div>
              </div>
            </div>
            {/*<div className="row">
              <div className="col-12">
                  <div className="form-group">
                      <label htmlFor="phone_number" className="ml-2 sr-only">Phone Number :</label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-phone"></i></div>
                          <input type="tel" name="phoneNumber" className="form-control" id="phone_number"
                                 placeholder="Phone Number" required value={ this.state.phoneNumber } onChange={ this.onChange.bind(this) } />
                      </div>
                  </div>
              </div>
            </div>*/}
            <div className="row">
              <div className="col-12">
                  <div className="form-group">
                      <label htmlFor="zip_code" className="ml-2 sr-only">ZIP Code :</label>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-map-marker"></i></div>
                          <input type="text" name="zipCode" className="form-control" id="zip_code"
                                 placeholder="ZIP Code" required value={ this.state.zipCode } onChange={ this.onChange.bind(this) } />
                      </div>
                  </div>
              </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="password" className="ml-2 sr-only">Password :</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-key"></i></div>
                            <input type="password" name="password" className="form-control" id="password"
                                   placeholder="Password" required value={ this.state.password } onChange={ this.onChange.bind(this) } />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="confirm_password" className="ml-2 sr-only">Confirm Password :</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa"></i></div>
                            <input type="password" name="confirmPassword" className="form-control" id="confirm_password"
                                   placeholder="Confirm Password" required value={ this.state.confirmPassword } onChange={ this.onChange.bind(this) } />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-success col">
                  { this.props.auth.state === 'SIGNING_UP' ?
                    (<ThreeBounce size={12} color='white' />) :
                    (<div><i className="fa"></i> Sign Up</div>)
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  };
}

export default withRouter(connect(mapStateToProps)(SignUp));
