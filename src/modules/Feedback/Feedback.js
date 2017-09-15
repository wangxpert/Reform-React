import React, { Component } from 'react'

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'

import Button from '../../components/Button'

class FeedBack extends Component {

  constructor(props) {
    super(props)

    this.state = {
      contact: '',
      description: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== this.state && nextProps.state === 'SUBMIT_FEEDBACK_SUCCEEDED') {
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

    if (this.props.state === 'SUBMITTING_FEEDBACK')
      return

    this.props.submitFeedback(this.state)
  }

  render() {

    return (
      <div className="inputpage my-3 my-md-5">
        <h1 className="title py-3 mt-3 mb-4 text-center"> We’d Love to Hear From You! </h1>
        <form className="form" onSubmit={ this.onSubmit }>

          <div className="form-group row">
            <label htmlFor="contact" className="col-auto col-md-3 col-form-label">Contact:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="text" name="contact" id="contact" value={ this.state.contact } onChange={ this.onChange } placeholder={ '' } />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="description" className="col-auto col-md-3 col-form-label">Description:</label>
            <div className="ml-auto col-md-9">
              <textarea className="form-control" style={{ height: '160px' }} name="description" id="description" value={ this.state.description } onChange={ this.onChange } autoFocus required />
            </div>
          </div>

          <div className="row py-3">
            <div className="ml-auto col-12 text-right">
              <Button type="submit">
                { this.props.state === 'SUBMITTING_FEEDBACK' ?
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

export default FeedBack
