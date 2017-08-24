import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import styles
import '../styles/styles.css'

// Import Components
import {
  ThreeBounce,
} from 'better-react-spinkit'

// Import Actions
import { confirmPasswordRequested } from '../../../actions/auth'

// Import Assets

class ConfirmPassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      verificationCode: '',
      password: ''
    }
  }

  componentDidMount() {

  }

  onChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  onReset(e) {
    e.preventDefault()

    const { auth } = this.props
    if (auth.state === 'CONFIRMING_PASSWORD')
      return

    const { dispatch, match: { params: { userName } } } = this.props
    dispatch(confirmPasswordRequested(userName, this.state.verificationCode, this.state.password))
  }

  render() {

    return (
      <div className="row py-5">
        <div className="px-4 py-4 col-12 col-md-6 push-md-3 col-lg-4 push-lg-4">
          <form className="form-horizontal" onSubmit={this.onReset.bind(this)}>
              <div className="row mb-4">
                <div className="col text-center">
                  <h3>Reset Password</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="code" className="ml-2">Verification Code :</label>
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-certificate"></i></div>
                            <input type="text" name="verificationCode" className="form-control" id="code"
                                   placeholder="Code" required autoFocus value={ this.state.verificationCode }onChange={ this.onChange.bind(this) } />
                        </div>
                    </div>
                </div>
              </div>
              <div className="row">
                  <div className="col-12">
                      <div className="form-group">
                          <label htmlFor="password" className="ml-2">New Password :</label>
                          <div className="input-group mr-sm-2 mb-sm-0">
                              <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-key"></i></div>
                              <input type="password" name="password" className="form-control" id="password"
                                     placeholder="Password" required value={ this.state.password } onChange={ this.onChange.bind(this) } />
                          </div>
                      </div>
                  </div>
              </div>

              <hr />
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-success col">
                    { this.props.auth.state === 'CONFIRMING_PASSWORD' ?
                      (<ThreeBounce size={12} color='white' />) :
                      (<div><i className="fa fa-refresh"></i> Reset</div>)
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

ConfirmPassword.propTypes = {
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(ConfirmPassword)
