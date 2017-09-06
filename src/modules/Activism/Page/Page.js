import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Styles
import 'react-responsive-carousel/lib/styles/carousel.css'

// Import Components
import { Carousel } from 'react-responsive-carousel'

import {
  Circle
} from 'better-react-spinkit'

import Button from '../../../components/Button'

const btnStyle = { padding: '3px 30px', marginRight: '16px' }
const btnStyle2 = { margin: '0', width: '100%', margin: '1px 1px' }
const spinnerStyle = { display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }

class Page extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: ''
    }

    this.onChange = this.onChange.bind(this)
    this.addUserEmail = this.addUserEmail.bind(this)
    this.addComment = this.addComment.bind(this)
    this.upvotePage = this.upvotePage.bind(this)
    this.downvotePage = this.downvotePage.bind(this)
    this.flagPage = this.flagPage.bind(this)
  }

  componentWillMount() {
    const pageId = this.props.match.params.pageId
    this.props.getActivismPage(pageId)
    this.props.getActivismPageComments(pageId, 50)
  }

  onChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  addUserEmail(e) {
    e.preventDefault()
    this.props.addUserEmailToActivismPage(this.props.page.id, this.state.email)
  }

  addComment(e) {
    e.preventDefault()
    this.props.addComment(this.props.page.id, '', this.props.auth.session.idToken.jwtToken)
  }

  upvotePage(e) {
    if (this.props.state === 'UPVOTING_ACTIVISM_PAGE')
      return

    const page = this.props.page
    const idToken = this.props.auth.session.idToken.jwtToken

    this.props.upvotePage(page.id, idToken)
  }

  downvotePage(e) {
    if (this.props.state === 'DOWNVOTING_ACTIVISM_PAGE')
      return

    const page = this.props.page
    const idToken = this.props.auth.session.idToken.jwtToken

    this.props.downvotePage(page.id, idToken)
  }

  flagPage(e) {
    if (this.props.state === 'FLAGGING_ACTIVISM_PAGE')
      return

    const page = this.props.page
    const idToken = this.props.auth.session.idToken.jwtToken

    this.props.flagPage(page.id, idToken)
  }

  render() {
    const page = this.props.page
    const idToken = this.props.auth.session.idToken.jwtToken

    if (!page)
      return null

    const previewImages = page.images.map((e, index) => (
      <div key={ index }>
        <img src={ `https://${ page.images[0] }` } alt="preview" />
      </div>
    ))

    return (
      <div className="activism-page my-3 my-md-5">
        <Button className="float-right" onClick={ this.upvotePage }>
          <i className="fa fa-thumbs-up" aria-hidden="true"></i>
          { this.props.state === 'UPVOTING_ACTIVISM_PAGE'
            ? <Circle size={ 15 } color='white' style={ spinnerStyle }/>
            : ` ${ page.upvotes } Follow`
          }
        </Button>
        <h1 className="title mt-3">{ page.title }</h1>

        <div className="row">
          <div className="col mb-3">
            National/State/City - Designation
          </div>
        </div>
        
        <div className="row">
          <div className="col-12 col-lg-4">
            <Carousel axis="horizontal" showThumbs={ true } showArrows={ true }>
              { previewImages }
            </Carousel>
            {/*
            <div className="activity-container mb-3">
              <div className="container-title text-center py-1">
                Page Activity
              </div>
              <div className="content row px-3 py-2">
                <div className="col-6">
                  Followers<br /> 201
                </div>
                <div className="col-6">
                  Posts<br /> 200
                </div>
                <div className="col-6">
                  Support<br /> 100
                </div>
                <div className="col-6">
                  Against<br /> 80
                </div>
              </div>
            </div>
            */}
          </div>

          <div className="col-12 col-lg-8">
            <div className="content-container">
              { page.content }
            </div>
            <form onSubmit={ this.addUserEmail }>
              <div className="inform-container row mt-4">
                <div className="col-12 mb-1">
                  Stay informed. Sign Up for email updates.
                </div>

                <div className="col">
                  <input type="email" placeholder="Email Address" name="email" onChange={ this.onChange } required/>
                </div>
                <div className="col-auto">
                  <Button style={ btnStyle }>
                    <small>SUBMIT</small>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="p-3 row">
          <Button className="col" style={ btnStyle2 } onClick={ this.upvotePage }>
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            { this.props.state === 'UPVOTING_ACTIVISM_PAGE'
              ? <Circle size={ 15 } color='white' style={ spinnerStyle }/>
              : ` ${ page.upvotes } Support`
            }
          </Button>
          <Button className="col" style={ btnStyle2 } onClick={ this.downvotePage }>
            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
            { this.props.state === 'DOWNVOTING_ACTIVISM_PAGE'
              ? <Circle size={ 15 } color='white' style={ spinnerStyle }/>
              : ` ${ page.downvotes } Don't Support`
            }
          </Button>
          <Button className="col" style={ btnStyle2 } onClick={ this.flagPage }>
            <i className="fa fa-user-times" aria-hidden="true"></i>
            { this.props.state === 'FLAGGING_ACTIVISM_PAGE'
              ? <Circle size={ 15 } color='white' style={ spinnerStyle }/>
              : ` ${ page.flags } Report`
            }
          </Button>
        </div>

        <div className="row">
          <div className="col-12 mt-1">
            <div className="comments-container">
              <div className="title text-center p-1">
                <i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp; { page.comments } Comments
              </div>
              <div className="py-3 col ml-auto">
                <Button style={ btnStyle } onClick={ this.addComment } >
                  <small>+ COMMENT</small>
                </Button>
              </div>

              {/*<div className="comment my-3 mx-3 pt-3">
                <div className="media pt-3 ml-3">
                  <div className="media-left mx-3">
                    <img src={ `https://${ page.images[0] }` } className="media-object img-thumbnail avatar" alt="User Avatar"/>
                  </div>
                  <div className="media-body">
                    <div className="media-heading user-name"><strong>{ 'User' }</strong></div>

                    <span>{ '2018 / 1 / 3' }</span>
                  </div>

                </div>

                <div className="px-4 pt-3 pb-1">
                  <p className="">{ 'abcde asdkjsdfl; ;asflsdljdsfljk ldsfldfasljk;dafsljasdf asdf asdf asdf asdf asdf asdfasdfsdfasdfasdfasdfddfdfdfasd asd fdas' }</p>
                  <div className="p-3 row">
                    <button className="btn btn-secondary post-button col"><i className="fa fa-thumbs-up" aria-hidden="true"></i>

                      { this.props === 'UPVOTING_POST'
                        ? <Circle size={ 15 } color='black' style={{ display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }}/>
                        : '  Support'
                      }
                    </button>
                    <button className="btn btn-secondary post-button col"><i className="fa fa-thumbs-down" aria-hidden="true"></i>&nbsp;&nbsp;{ '111' } { "Don't Support" }</button>
                    <button className="btn btn-secondary post-button col"><i className="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;{ '222' } Comments</button>
                    <button className="btn btn-secondary post-button col"><i className="fa fa-user-times" aria-hidden="true"></i>&nbsp;&nbsp;Report</button>
                  </div>
                </div>
              </div> */}

            </div>
          </div>

        </div>
      </div>

    )
  }
}


Page.propTypes = {
  auth: PropTypes.object,
  page: PropTypes.object,
  state: PropTypes.string,

  getActivismPage: PropTypes.func,
  addUserEmailToActivismPage: PropTypes.func,
  getActivismPageComments: PropTypes.func,
  addComment: PropTypes.func,
  upvotePage: PropTypes.func,
  downvotePage: PropTypes.func,
  flagPage: PropTypes.func,
}

export default Page
