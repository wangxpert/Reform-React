import React, { Component } from 'react'

// Import styles

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'

import Button from '../../../components/Button'

// Import Assets

// Import Utils

class Create extends Component {

  constructor(props) {
    super(props)

    this.state = {
      department: '',
      text: '',
      imageFile: null,
      image: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.onImage = this.onImage.bind(this)
    this.onPickImage = this.onPickImage.bind(this)

    if (props.user) {
      let state = props.user['custom:stateid']
      let city = props.user['custom:city']
      props.fetchDepartments(state, city)
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.departments !== this.props.departments && nextProps.departments.Items && nextProps.departments.Count) {
      this.setState({
        department: nextProps.departments.Items[1].department
      })
    }

    if (nextProps.user !== this.props.user && nextProps.user) {
      let state = nextProps.user['custom:stateid']
      let city = nextProps.user['custom:city']
      this.props.fetchDepartments(state, city)
    }

    if (nextProps.state !== this.props.state && nextProps.state === 'CREATE_POST_SUCCEEDED') {
      this.setState({
        text: '',
        imageFile: null,
        image: null
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

  onCreate(e) {
    e.preventDefault()

    if (this.props.state === 'CREATING_POST')
      return

    this.props.createPost({
      state: this.props.user['custom:stateid'],
      city: this.props.user['custom:city'],
      department: this.state.department,
      text: this.state.text,
      imageFile: this.state.imageFile
    }, this.props.session.idToken.jwtToken)
  }

  onImage(e) {
    e.preventDefault()

    const file = e.target.files[0]

    if (file) {
      let reader = new FileReader()

      reader.onloadend = () => {
        this.setState({
          imageFile: file,
          image: reader.result
        })
      }

      reader.readAsDataURL(file)
    }
  }

  onPickImage(e) {
    this.imagePicker.click()
  }

  render() {
    let departments = null
    if (this.props.departments) {
      departments = this.props.departments.Items.map((e, index) => {
        if (index === 0) return null
        return <option key={ index } value={ e.department }>{ e.name }</option>
      })
    }

    return (
      <div className="inputpage my-3 my-md-5">
        <h1 className="title py-3 mt-3 mb-4 text-center"> Create a Post </h1>
        <form className="form" onSubmit={ this.onCreate }>

          <div className="form-group row">
            <label htmlFor="department" className="col-auto col-md-3 col-form-label">Department:</label>
            <div className="ml-auto col-md-9">
              <select className="form-control" name="department" id="department" value={ this.state.department } onChange={ this.onChange } placeholder={ 'Choose Department' } required >
                { departments  }
              </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="upload_image" className="col-auto col-md-3 col-form-label">Image:</label>
            <div className="ml-auto col-md-9">
              <div className="row">
                <div className="col">
                  <input className="form-control" type="text" name="image" id="image" value={ this.state.imageFile ? this.state.imageFile.name : '' } onChange={ this.onChange } placeholder={ 'Choose File' }/>
                </div>
                <div className="col-auto pr-3" >
                  <Button type="button" onClick={ this.onPickImage }>
                    Browse
                  </Button>
                </div>
                <input ref={input => this.imagePicker = input} type="file" name="pic" accept="image/*" hidden onChange={ this.onImage } />
                <div className="col-12 mt-3">
                  <img className="img-responsive preview-image" src={ this.state.image } alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="content" className="col-auto col-md-3 col-form-label">Text:</label>
            <div className="ml-auto col-md-9">
              <textarea className="form-control" style={{ height: '160px' }} name="text" id="content" value={ this.state.description } onChange={ this.onChange } placeholder={ 'Enter Text' } required />
            </div>
          </div>

          <div className="row py-3">
            <div className="ml-auto col-12 text-right">
              <Button type="submit">
                { this.props.state === 'CREATING_POST' ?
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

export default Create
