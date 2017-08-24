import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import styles


// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'
import { NotificationManager } from 'react-notifications'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'

// Import Actions
import { uploadAvatarRequested } from '../../../actions/account'

// Import Assets

// Import Utils
import { capitalize, normalizePhoneNumber } from '../../../utils/input'

class Profile extends Component {

  constructor(props) {
    super(props)

    const user = props.account.user

    this.state = {
      userName: user ? user.preferred_username : '',
      email: user ? user.email : '',
      phoneNumber: user ? user.phone_number : '',
      zipCode: user ? user['custom:zipcode'] : '',
      avatar: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      avatarFile: null
    }

    this.onChange = this.onChange.bind(this)
    this.onAvatar = this.onAvatar.bind(this)
    this.onFilePick = this.onFilePick.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount() {
    // this.props.dispatch(getUserInformationRequested())
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps.account

    if (user) {
      this.setState({
        userName: user.preferred_username,
        email: user.email,
        phoneNumber: user.phone_number,
        zipCode: user['custom:zipcode'],
        password: '',
        confirmPassword: ''
      })
    }
  }

  onChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  validateInput() {
    const state = this.state
    if (state.password !== state.confirmPassword) {
      NotificationManager.error('Password must match the confirm password.', "Password doesn't match...")
      return false
    }
    return true
  }

  onSave(e) {
    e.preventDefault()

    if (this.state.avatarFile) {
      this.props.dispatch(uploadAvatarRequested(this.state.avatarFile))
    }
  }

  onAvatar(e) {
    this.filePicker.click()
  }

  onFilePick(e) {
    e.preventDefault()

    const file = e.target.files[0]

    if (file) {
      let reader = new FileReader()

      reader.onloadend = () => {
        this.setState({
          avatarFile: file,
          avatar: reader.result
        })
      }

      reader.readAsDataURL(file)
    }
  }

  render() {

    return (
      <div className="inputpage my-3">
        <h1 className="title mt-3"> Manage Your account </h1>
        <form className="form" onSubmit={ this.onSave }>

          <div className="form-group row mb-3">
            <label htmlFor="avatar" className="col-form-label"></label>
            <div className="ml-auto col-sm-12 text-center">
              <img src={ this.state.avatar ? this.state.avatar : '/img/user.png' } alt="avatar" className="img-thumbnail avatar" id="avatar" onClick={ this.onAvatar }/>
              <input ref={input => this.filePicker = input} type="file" name="pic" accept="image/*" hidden onChange={ this.onFilePick } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-auto col-sm-3 col-form-label">Email:</label>
            <div className="ml-auto col-sm-9">
              <input className="form-control" type="email" name="email" id="email" value={ this.state.email } readOnly />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="Username" className="col-auto col-sm-3 col-form-label">User Name:</label>
            <div className="ml-auto col-sm-9">
              <input className="form-control" type="text" name="userName" id="username" autoFocus value={ this.state.userName } onChange={ this.onChange } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="phone_number" className="col-auto col-sm-3 col-form-label">Phone Number:</label>
            <div className="ml-auto col-sm-9">
              <input className="form-control" type="text" name="phoneNumber" id="phone_number" value={ this.state.phoneNumber } onChange={ this.onChange } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="zip_code" className="col-auto col-sm-3 col-form-label">ZIP Code:</label>
            <div className="ml-auto col-sm-9">
              <input className="form-control" type="text" name="zipCode" id="zip_code" value={ this.state.zipCode } onChange={ this.onChange } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="current_password" className="col-auto col-sm-3 col-form-label">Current Password:</label>
            <div className="ml-auto col-sm-9">
              <input className="form-control" type="password" name="currentPassword" id="current_password" value={ this.state.currentPassword } onChange={ this.onChange } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="new_password" className="col-auto col-sm-3 col-form-label">New Password:</label>
            <div className="ml-auto col-sm-9">
              <input className="form-control" type="password" name="newPassword" id="new_password" value={ this.state.newPassword } onChange={ this.onChange } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="confirm_password" className="col-auto col-sm-3 col-form-label">Confirm Password:</label>
            <div className="ml-auto col-sm-9">
              <input className="form-control" type="password" name="confirmPassword" id="confirm_password" value={ this.state.confirmPassword } onChange={ this.onChange } />
            </div>
          </div>

          <div className="row py-3">
            <div className="ml-auto col-12 text-right">
              <Button title="Save Change" type="submit" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    account: store.account
  }
}

export default connect(mapStateToProps)(Profile)
