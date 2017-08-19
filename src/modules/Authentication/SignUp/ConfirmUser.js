import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import styles
import '../styles/styles.css';

// Import Components
import {
  Circle,
  ThreeBounce
} from 'better-react-spinkit'

// Import Actions
import { confirmUserRequested, resendCodeRequested } from '../../../actions/auth';

// Import Assets

class ConfirmUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      verificationCode: ''
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

  onConfirm(e) {
    e.preventDefault();

    const { auth } = this.props;
    if (auth.state === 'CONFIRMING_USER')
      return;

    const { dispatch, match: { params: { userName } } } = this.props;
    dispatch(confirmUserRequested(userName, this.state.verificationCode));
  }

  onResendCode(e) {
    e.preventDefault();

    const { dispatch, auth, match: { params: { userName } } } = this.props;

    if (auth.state === 'RESENDING_CODE')
      return;

    dispatch(resendCodeRequested(userName));
  }

  render() {

    const { auth } = this.props;

    return (
      <div className="page-layout__viewport row mt-5">
        <div className="card px-5 py-5 col-12 col-md-6 push-md-3 col-lg-4 push-lg-4">
          <form className="form-horizontal" onSubmit={ this.onConfirm.bind(this) }>
              <div className="row mb-4">
                <div className="col text-center">
                  <h3>Confirm User</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="email" className="ml-2">{ "We've sent the verification code via SMS." }</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-check-square-o"></i></div>
                            <input type="text" name="verificationCode" className="form-control" id="code"
                                   placeholder="Verification Code" required autoFocus value={ this.state.verificationCode } onChange={ this.onChange.bind(this) } />
                        </div>
                    </div>
                    <a className="float-right" href="" onClick={ this.onResendCode.bind(this) }>
                      { auth.state === 'RESENDING_CODE' ?
                        (<Circle size={15} color='#02b2fb' />) :
                        'Resend Code'
                      }
                    </a>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-success col">
                    { auth.state === 'CONFIRMING_USER' ?
                      (<ThreeBounce size={12} color='white' />) :
                      (<div><i className="fa"></i>Confirm</div>)
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

ConfirmUser.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  };
}

export default connect(mapStateToProps)(ConfirmUser);
