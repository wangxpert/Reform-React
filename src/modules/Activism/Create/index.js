import React, { Component } from 'react'
import { connect } from 'react-redux'

// Import styles

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'
import { NotificationManager } from 'react-notifications'

import Button from '../../../components/Button'
import ImagePicker from '../../../components/ImagePicker'
import PreviewImage from './components/PreviewImage'

// Import Actions
import { createActivismPageReuested } from '../../../redux/actions/activism'

import {
  statesFetchRequested,
  citiesFetchRequested,
  selectState,
  selectCity,
} from '../../../redux/actions/region'

// Import Assets

// Import Utils

class PageManage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      level: 1,
      state: '',
      city: '',
      description: '',
      images: [],
      imageFiles: [],
      videoFile: null,
      video: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onVideo = this.onVideo.bind(this)
    this.onPickVideo = this.onPickVideo.bind(this)
    this.onDropAccepted = this.onDropAccepted.bind(this)
    this.onState = this.onState.bind(this)
    this.onCity = this.onCity.bind(this)
    this.onDeleteImage = this.onDeleteImage.bind(this)
  }

  componentDidMount() {
    if (!this.props.states)
      this.props.statesFetchRequested()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.states !== this.props.states && nextProps.states) {
      this.setState({ state: nextProps.states.Items[0].stateid })
      this.props.selectState(nextProps.states.Items[0].stateid)

      this.props.citiesFetchRequested(nextProps.states.Items[0].stateid)
    }

    if (nextProps.cities !== this.props.cities && nextProps.cities) {
      let city = nextProps.cities.Count ? nextProps.cities.Items[0].city : ''
      this.setState({ city: city })
      this.props.selectCity(city)
    }

    if (nextProps.state !== this.props.state && nextProps.state === 'CREATE_ACTIVISM_PAGE_SUCCEEDED') {
      this.setState({
        title: '',
        level: 1,
        state: '',
        city: '',
        description: '',
        images: [],
        imageFiles: [],
        videoFile: null,
        video: ''
      })
    }
  }

  makeStateOption(state) {
    return (
      <option key={ state.stateid } value={ state.stateid }>{ state.name }</option>
    )
  }

  makeCityOption(city) {
    return (
      <option key={ city.city } value={ city.city }>{ city.name }</option>
    )
  }

  onState(e) {
    const state = e.target.value

    this.setState({ state: state })
    this.props.selectState(state)
    this.props.citiesFetchRequested(state)
  }

  onCity(e) {
    const city = e.target.value

    this.setState({ city: city })
    this.props.selectCity(city)
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

    if (this.props.state === 'CREATING_ACTIVISM_PAGE')
      return

    this.props.createActivismPage({
      title: this.state.title,
      level: this.state.level,
      state: (this.state.level > 1) ? this.state.state : undefined,
      city: (this.state.level > 2) ? this.state.city : undefined,
      content: this.state.description,
      imageFiles: this.state.imageFiles,
      videoFile: this.state.videoFile
    }, this.props.auth.session.idToken.jwtToken)
  }

  onVideo(e) {
    e.preventDefault()

    const file = e.target.files[0]

    if (file) {
      this.setState({
        videoFile: file,
        video: file.name
      })
    }

  }

  onPickVideo(e) {
    this.videoPicker.click()
  }

  onDropAccepted(accept) {
    accept.forEach(e => {
      const images = this.state.images
      const imageFiles = this.state.imageFiles

      imageFiles.push(e)
      images.push(e.preview)

      this.setState({
        images, imageFiles
      })
    })
  }

  onDeleteImage(index) {
    const images = this.state.images
    const imageFiles = this.state.imageFiles

    imageFiles.splice(index, 1)
    images.splice(index, 1)

    this.setState({
      images, imageFiles
    })
  }

  render() {
    var stateOptions = null
    var cityOptions = null

    if (this.props.states)
      stateOptions = this.props.states.Items.map(this.makeStateOption)

    if (this.props.cities) {
      cityOptions = this.props.cities.Items.map(this.makeCityOption)
    }

    const renderPreviews = this.state.images.map((e, index) => (
      <div key={ index } className="col-4 col-sm-4 col-md-3 col-lg-2 p-1">
        <PreviewImage src={ e } onDelete={ e => this.onDeleteImage(index) } />
      </div>
    ))

    return (
      <div className="inputpage my-3 my-md-5">
        <h1 className="title py-3 mt-3 mb-4 text-center"> Create an Activism Page </h1>
        <form className="form" onSubmit={ this.onSave }>

          <div className="form-group row">
            <label htmlFor="level" className="col-auto col-md-3 col-form-label">Page Title:</label>
            <div className="ml-auto col-md-9">
              <input className="form-control" type="text" name="title" id="title" value={ this.state.title } onChange={ this.onChange } placeholder={ '' } required autoFocus />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="level" className="col-auto col-md-3 col-form-label">Page Tier:</label>
            <div className="ml-auto col-md-9">
              <select className="form-control" name="level" id="level" value={ this.state.level } onChange={ this.onChange } required >
                <option value={1}>County</option>
                <option value={2}>State</option>
                <option value={3}>City</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="location" className="col-auto col-md-3 col-form-label">Location:</label>
            <div className="ml-auto col-md-9">
              <div className="row">
                <div className="col-6 pr-0" id="location">
                  <select className="form-control" name="state" id="state" value={ this.state.state } onChange={ this.onState } disabled={ this.state.level < 2 } >
                    { this.state.level > 1 && stateOptions }
                  </select>
                </div>
                <div className="col-6 pl-0" id="location">
                  <select className="form-control" name="state" id="city" value={ this.state.city } onChange={ this.onCity } disabled={ this.state.level < 3 }>
                    { this.state.level > 2 && cityOptions }
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="images" className="col-auto col-md-3 col-form-label">Images:</label>
            <div className="ml-auto col-md-9">
              <ImagePicker onDropAccepted={ this.onDropAccepted } >
                <div className="row px-3">
                  { renderPreviews }
                </div>
              </ImagePicker>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="description" className="col-auto col-md-3 col-form-label">Description:</label>
            <div className="ml-auto col-md-9">
              <textarea className="form-control" style={{ height: '160px' }} name="description" id="description" value={ this.state.description } onChange={ this.onChange } required />
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
                <input ref={input => this.videoPicker = input} type="file" name="pic" accept="video/*" hidden onChange={ this.onVideo } />
              </div>
            </div>
          </div>

          <div className="row py-3">
            <div className="ml-auto col-12 text-right">
              <Button type="submit">
                { this.props.state === 'CREATING_ACTIVISM_PAGE' ?
                  (<ThreeBounce size={12} color='white' />) :
                  (<div><i className="fa"></i> Create </div>)
                }
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    account: state.account,
    states: state.region.states,
    cities: state.region.cities,
    state: state.activism.state,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    statesFetchRequested: () => dispatch(statesFetchRequested()),
    citiesFetchRequested: (state) => dispatch(citiesFetchRequested(state)),
    selectState: (state) => dispatch(selectState(state)),
    selectCity: (city) => dispatch(selectCity(city)),
    createActivismPage: (info, idToken) => dispatch(createActivismPageReuested(info, idToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageManage)
