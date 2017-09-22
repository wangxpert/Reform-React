import React, { Component } from 'react'

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'
import { NotificationManager } from 'react-notifications'

import Button from '../../components/Button'

class Advertise extends Component {

  constructor(props) {
    super(props)

    this.state = {
      contact: '',
      business: '',
      phone: '',
      email: '',
      comment: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== this.state && nextProps.state === 'ADVERTISE_INQUIRY_SUCCEEDED') {
      this.props.changeLocation('/')
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
    if (!state.phone && !state.email) {
      NotificationManager.warning('Please enter your phone number or email address.', "Require contact information.")
      return false
    }
    return true
  }

  onSubmit(e) {
    e.preventDefault()

    if (this.validateInput() === false) return

    if (this.props.state === 'REQUESTING_ADVERTISE_INQUIRY')
      return

    this.props.inquiry(this.state)
  }

  render() {

    return (
      <div className="inputpage my-3 my-md-5">
        <h1 className="title py-3 mt-3 mb-1 text-center"> Advertise With Us </h1>
        <p className="description text-center mb-4">To advertise on ReformCOW, submit the form below and/or contact us directly at <strong>info@reformcow.com</strong></p>
        <form className="form" onSubmit={ this.onSubmit }>

          <div className="form-group row">
            <label htmlFor="contact" className="col-auto col-md-3 col-form-label">Contact:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="text" name="contact" id="contact" value={ this.state.contact } onChange={ this.onChange } placeholder={ '' } required autoFocus />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="business" className="col-auto col-md-3 col-form-label">Company:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="text" name="business" id="business" value={ this.state.business } onChange={ this.onChange } placeholder={ '' } required />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="phone" className="col-auto col-md-3 col-form-label">Phone:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="tel" name="phone" id="phone" value={ this.state.phone } onChange={ this.onChange } placeholder={ '' } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="email" className="col-auto col-md-3 col-form-label">Email:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="email" name="email" id="email" value={ this.state.email } onChange={ this.onChange } placeholder={ '' } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="comment" className="col-auto col-md-3 col-form-label">Comments:</label>
            <div className="ml-auto col-md-9">
              <textarea className="form-control" style={{ height: '160px' }} name="comment" id="comment" value={ this.state.comment } onChange={ this.onChange } required />
            </div>
          </div>

          <div className="row py-3">
            <div className="ml-auto col-12 text-right">
              <Button type="submit">
                { this.props.state === 'REQUESTING_ADVERTISE_INQUIRY' ?
                  (<ThreeBounce size={12} color='white' />) :
                  (<div><i className="fa"></i> Submit </div>)
                }
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Advertise
