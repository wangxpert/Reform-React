import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import styles

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'
import { NotificationManager } from 'react-notifications'
import Button from '../../../components/Button'

// Import Actions
import { updateUserInformationRequested } from '../../../redux/actions/account'

// Import Assets

// Import Utils
import { capitalize } from '../../../utils/input'

class Profile extends Component {

  constructor(props) {
    super(props)

    const user = props.account.user

    var name = user ? user.name : ' '
    if (!name)
      name=' '

    name = name.split(' ')

    this.state = {
      userName: user ? user.preferred_username : '',
      firstName: name[0],
      lastName: name[1],
      email: user ? user.email : '',
      phoneNumber: user ? user.phone_number : '',
      zipCode: user ? user['custom:zipcode'] : '',
      avatar: user? `https://${ user.picture }`: '',
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

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.account.state !== 'GET_USER_INFORMATION_SUCCEEDED')
      return

    const { user } = nextProps.account

    if (user) {
      var name = user.name
      if (!name)
        name=' '

      name = name.split(' ')

      this.setState({
        userName: user.preferred_username,
        firstName: name[0],
        lastName: name[1],
        email: user.email,
        phoneNumber: user.phone_number,
        avatar: `https://${ user.picture }`,
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
    if (state.newPassword !== state.confirmPassword) {
      NotificationManager.error('Password must match the confirm password.', "Password doesn't match...")
      return false
    }
    return true
  }

  onSave(e) {
    e.preventDefault()

    if (this.props.account.state === 'UPDATING_USER_INFORMATION')
      return

    this.validateInput()

    const { user } = this.props.account
    const name = `${ capitalize(this.state.firstName) } ${ capitalize(this.state.lastName) }`

    this.props.dispatch(updateUserInformationRequested({
      userName: ( this.state.userName !== user.preferred_username ) ? this.state.userName : undefined,
      name: ( name !== user.name ) ? name : undefined,
      zipCode: (this.state.zipCode !== user['custom:zipcode']) ? this.state.zipCode : undefined,
      oldPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      oldAvatar: this.props.account.user.picture,
      avatarFile: this.state.avatarFile
    }))
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
      <div className="inputpage my-3 my-md-5">
        <h1 className="title py-3 mt-3 mb-4"> Manage Your account </h1>
        <form className="form" onSubmit={ this.onSave }>

          <div className="form-group row mb-md-5">

            <div className="col-12 col-md-auto ml-lg-5 mr-lg-2 text-center">
              <img src={ this.state.avatar ? this.state.avatar : '/img/user.png' } alt="avatar" className="img-thumbnail avatar" id="avatar" onClick={ this.onAvatar }/>
              <input ref={input => this.filePicker = input} type="file" name="pic" accept="image/*" hidden onChange={ this.onFilePick } />
            </div>

            <div className="col-12 col-md mt-sm-3 mt-md-5">
              <div className="form-group row">
                <label htmlFor="name" className="col-auto text-center col-md-4 col-lg-3 col-form-label">First Name:</label>
                <div className="ml-auto col-md">
                  <input className="form-control col" type="text" name="firstName" id="first_name" autoFocus style={{ textTransform: 'capitalize' }} value={ this.state.firstName } onChange={ this.onChange } />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="name" className="col-auto text-center col-md-4 col-lg-3 col-form-label">Last Name:</label>
                <div className="ml-auto col-md">
                  <input className="form-control col" type="text" name="lastName" id="last_name" autoFocus style={{ textTransform: 'capitalize' }} value={ this.state.lastName } onChange={ this.onChange } />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="username" className="col-auto col-md-3 col-form-label">User Name:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="text" name="userName" id="username" autoFocus value={ this.state.userName } onChange={ this.onChange } required />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-auto col-md-3 col-form-label">Email:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="email" name="email" id="email" value={ this.state.email } readOnly />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="phone_number" className="col-auto col-md-3 col-form-label">Phone Number:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="text" name="phoneNumber" id="phone_number" value={ this.state.phoneNumber } onChange={ this.onChange } readOnly />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="zip_code" className="col-auto col-md-3 col-form-label">ZIP Code:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="text" name="zipCode" id="zip_code" value={ this.state.zipCode } onChange={ this.onChange } required
              pattern="(\d){5}" title="ZIP code must have 5 digits." />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="current_password" className="col-auto col-md-3 col-form-label">Old Password:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="password" name="currentPassword" id="current_password" value={ this.state.currentPassword } onChange={ this.onChange }
               pattern="^(?=.*[A-Z])^(?=.*[\d])^(?=.*[a-z])(.){8,}" title="Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number."/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="new_password" className="col-auto col-md-3 col-form-label">New Password:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="password" name="newPassword" id="new_password" value={ this.state.newPassword } onChange={ this.onChange }
              pattern="^(?=.*[A-Z])^(?=.*[\d])^(?=.*[a-z])(.){8,}" title="Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number." />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="confirm_password" className="col-auto col-md-3 col-form-label">Re-Password:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="password" name="confirmPassword" id="confirm_password" value={ this.state.confirmPassword } onChange={ this.onChange }
               pattern="^(?=.*[A-Z])^(?=.*[\d])^(?=.*[a-z])(.){8,}" title="Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number." />
            </div>
          </div>

          <div className="row py-3">
            <div className="ml-auto col-12 text-right">
              <Button type="submit">
                { this.props.account.state === 'UPDATING_USER_INFORMATION' ?
                  (<ThreeBounce size={12} color='white' />) :
                  (<div><i className="fa fa-save"></i> Save Change</div>)
                }
              </Button>
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
