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
import { updateUserInformationRequested } from '../../../actions/account'

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
    this.onSave = this.onSave.bind(this)
    this.onVideo = this.onVideo.bind(this)
    this.onPickVideo = this.onPickVideo.bind(this)
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

  onVideo(e) {
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

  onPickVideo(e) {
    this.videoPicker.click()
  }

  render() {

    return (
      <div className="inputpage my-3 my-md-5">
        <h1 className="title py-3 mt-3 mb-4 text-center"> Create an Activism Page </h1>
        <form className="form" onSubmit={ this.onSave }>

          <div className="form-group row">
            <label htmlFor="page_tier" className="col-auto col-md-3 col-form-label">Page Tier:</label>
            <div className="ml-auto col-md-9">
              <select className="form-control" name="pageTier" id="username" autoFocus value={ this.state.userName } onChange={ this.onChange } required >
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="subscription_plan" className="col-auto col-md-3 col-form-label">Subscription Plan:</label>
            <div className="ml-auto col-md-9">
              <select className="form-control" name="email" id="email" value={ this.state.email } >
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="location" className="col-auto col-md-3 col-form-label">Location:</label>
            <div className="ml-auto col-md-9">
              <div className="row">
                <div className="col-6 pr-0" id="location">
                  <select className="form-control" name="state" id="state" value={ this.state.state } >
                  </select>
                </div>
                <div className="col-6 pl-0" id="location">
                  <select className="form-control" name="state" id="city" value={ this.state.city } >
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="description" className="col-auto col-md-3 col-form-label">Description:</label>
            <div className="ml-auto col-md-9">
              <textarea className="form-control" style={{ height: '160px' }} name="description" id="description" value={ this.state.description } onChange={ this.onChange } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="upload_video" className="col-auto col-md-3 col-form-label">Upload Video:</label>
            <div className="ml-auto col-md-9">
              <div className="row">
                <div className="col">
                  <input className="form-control" type="text" name="video" id="video" value={ this.state.video } onChange={ this.onChange } placeholder={ '60 seconds or less' }/>
                </div>
                <div className="col-auto pr-3" >
                  <Button type="button" onClick={ this.onPickVideo }>
                    ...
                  </Button>
                </div>
                <input ref={input => this.videoPicker = input} type="file" name="pic" accept="video/*" hidden onChange={ this.onVideoPick } />
              </div>
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
