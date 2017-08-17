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
import { resetPasswordRequested } from '../../../actions/auth';

// Import Assets

class ResetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      verificationCode: '',
      password: ''
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


  onNext(e) {
    e.preventDefault();
    if (this.props.auth.state === 'LOGGING_IN')
      return;

    const { dispatch, history } = this.props;
    dispatch( resetPasswordRequested(this.state.email) );
    history.push('/password/confirm');
  }

  render() {

    return (
      <div className="page-layout__viewport row mt-5">
        <div className="card px-5 py-5 col-12 col-md-6 push-md-3 col-lg-4 push-lg-4">
          <form className="form-horizontal" onSubmit={this.onNext.bind(this)}>
              <div className="row mb-4">
                <div className="col text-center">
                  <h3>Reset Password</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="email" className="ml-2">Email :</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-at"></i></div>
                            <input type="email" name="email" className="form-control" id="email"
                                   placeholder="Email" required autoFocus value={ this.state.email } onChange={ this.onChange.bind(this) } />
                        </div>
                    </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-success col">
                    { this.props.auth.state === 'LOGGING_IN' ?
                      (<ThreeBounce size={12} color='white' />) :
                      (<div><i className="fa"></i>Next</div>)
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

ResetPassword.propTypes = {
  dispatch: PropTypes.func.isRequired
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  };
}

export default withRouter(connect(mapStateToProps)(ResetPassword));
