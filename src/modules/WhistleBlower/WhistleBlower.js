import React, { Component } from 'react'

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'

import Button from '../../components/Button'

class WhistleBlower extends Component {

  constructor(props) {
    super(props)

    this.state = {
      department: '',
      persons: '',
      informant: '',
      summary: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== this.state && nextProps.state === 'BLOW_WHISTLE_SUCCEEDED') {
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

  onSubmit(e) {
    e.preventDefault()

    if (this.props.state === 'BLOWING_WHISTLE')
      return

    this.props.blowWhistle(this.state)
  }

  render() {

    return (
      <div className="inputpage my-3 my-md-5">
        <h1 className="title py-3 mt-3 mb-1 text-center"> Be a Whistleblower ! </h1>
        <p className="description mb-1 px-md-5">
          Here you can give information anonymously about illegal or unethical activity by a city employee or official.
          Fill out the information below. </p>
        <p className="description mb-0 px-md-5">
          It will, in no way, be connected to your account internally or externally.
        </p>
        <p className="description mb-4 px-md-5">
          ReformCOW will hold in our file for future reference and compare to similiar complaints from other submissions.
        </p>
        <form className="form" onSubmit={ this.onSubmit }>

          <div className="form-group row">
            <label htmlFor="department" className="col-auto col-md-3 col-form-label">Department:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="text" name="department" id="department" value={ this.state.department } onChange={ this.onChange } placeholder={ '' } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="persons" className="col-auto col-md-3 col-form-label">Persons Involved:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="text" name="persons" id="persons" value={ this.state.persons } onChange={ this.onChange } placeholder={ '' } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="informant" className="col-auto col-md-3 col-form-label">Reporter:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="text" name="informant" id="informant" value={ this.state.informant } onChange={ this.onChange } placeholder={ 'Optional' } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="summary" className="col-auto col-md-3 col-form-label">Summary:</label>
            <div className="ml-auto col-md-9">
              <textarea className="form-control" style={{ height: '160px' }} name="summary" id="summary" value={ this.state.summary } onChange={ this.onChange } autoFocus required />
            </div>
          </div>

          <div className="row py-3">
            <div className="ml-auto col-12 text-right">
              <Button type="submit">
                { this.props.state === 'BLOWING_WHISTLE' ?
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

export default WhistleBlower
