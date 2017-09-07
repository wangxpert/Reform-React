import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Styles
import 'react-responsive-carousel/lib/styles/carousel.css'
import 'video-react/dist/video-react.css'

// Import Components
import { Carousel } from 'react-responsive-carousel'
import { Player } from 'video-react'
import { NotificationManager } from 'react-notifications'

import {
  Circle
} from 'better-react-spinkit'

import Button from '../../../components/Button'
import AddCommentDialog from './components/AddCommentDialog'
import Comment from './components/Comment'

const btnStyle = { padding: '3px 30px', marginRight: '16px' }
const btnStyle2 = { width: '100%', margin: '1px 1px' }
const spinnerStyle = { display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }

class Page extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      showDialog: false
    }

    this.onChange = this.onChange.bind(this)
    this.addUserEmail = this.addUserEmail.bind(this)
    this.addComment = this.addComment.bind(this)
    this.upvotePage = this.upvotePage.bind(this)
    this.downvotePage = this.downvotePage.bind(this)
    this.flagPage = this.flagPage.bind(this)
    this.followPage = this.followPage.bind(this)

    this.toggleAddCommentDialog = this.toggleAddCommentDialog.bind(this)
    this.isLogged = this.isLogged.bind(this)
  }

  componentWillMount() {
    const pageId = this.props.match.params.pageId
    this.props.getActivismPage(pageId)
    this.props.getActivismPageComments(pageId)
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

  addComment(content) {
    this.toggleAddCommentDialog()
    this.props.addComment(this.props.page.id, content, this.props.auth.session.idToken.jwtToken)
  }

  upvotePage(e) {
    if (!this.isLogged()) return

    if (this.props.state === 'UPVOTING_ACTIVISM_PAGE')
      return

    this.props.upvotePage(this.props.page.id, this.props.auth.session.idToken.jwtToken)
  }

  downvotePage(e) {
    if (!this.isLogged()) return

    if (this.props.state === 'DOWNVOTING_ACTIVISM_PAGE')
      return

    this.props.downvotePage(this.props.page.id, this.props.auth.session.idToken.jwtToken)
  }

  flagPage(e) {
    if (!this.isLogged()) return

    if (this.props.state === 'FLAGGING_ACTIVISM_PAGE')
      return

    this.props.flagPage(this.props.page.id, this.props.auth.session.idToken.jwtToken)
  }

  followPage(e) {
    if (!this.isLogged()) return

    if (this.props.state === 'FOLLOWING_ACTIVISM_PAGE')
      return

    this.props.followPage(this.props.page.id, this.props.auth.session.idToken.jwtToken)
  }

  toggleAddCommentDialog() {
    if (!this.isLogged()) return

    this.setState({ showDialog: !this.state.showDialog })
  }

  isLogged() {
    if (!this.props.auth.session) {
      NotificationManager.error('You have to login to do this action.', "Error...")
      return false
    }
    return true
  }

  render() {
    const page = this.props.page
    const idToken = this.props.auth.session ?  this.props.auth.session.idToken.jwtToken : null

    if (!page)
      return null

    let tier = 'National'
    if (page.level === 2) {
      tier = `State - ${ page.statename }`
    } else if (page.level === 3) {
      tier = `City - ${ page.statename }/${ page.cityname }`
    }

    const previewImages = page.images.map((e, index) => (
      <div key={ index }>
        <img src={ `https://${ e }` } alt="preview" />
      </div>
    ))

    return (
      <div className="activism-page my-3 my-md-5">
        <AddCommentDialog isOpen={ this.state.showDialog } toggle={ this.toggleAddCommentDialog } save={ this.addComment } />
        <Button className="float-right" onClick={ this.followPage }>
          <i className="fa fa-user-plus" aria-hidden="true"></i>
          { this.props.state === 'FOLLOWING_ACTIVISM_PAGE'
            ? <Circle size={ 15 } color='white' style={ spinnerStyle }/>
            : ` ${ page.followers ? page.followers : '' } Follow`
          }
        </Button>
        <h1 className="title mt-3">{ page.title }</h1>

        <div className="row">
          <div className="col mb-3">
            { tier }
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-5">
            <Carousel axis="horizontal" showThumbs={ true } showArrows={ true } dynamicHeight={ true }>
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

          <div className="col-12 col-lg-7">
            { page.videos[0] &&
              <Player className="mb-2">
                <source src={ `https://${ page.videos[0] }` } />
              </Player>
            }
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
                <Button style={ btnStyle } onClick={ e => this.toggleAddCommentDialog() } >
                  <small>+ COMMENT</small>
                </Button>
              </div>

              <Comment className="my-3 mx-3 pt-3" comment={{
                  "commentid": "P3WE6537Z",
                  "activismid": "P3WGETKBY",
                  "username": "james@avai.com",
                  "useralias": "Jamie #1",
                  "usercity": "Austin",
                  "userstate": "Texas",
                  "content": "A test activism page comment.",
                  "timestamp": "2017-09-05T17:01:11.806Z",
                  "upvotes": 0,
                  "downvotes": 0,
                  "flags": 0
                }} state={ this.props.state }
                upvote={ () => { if (this.isLogged()) this.props.upvoteComment('P3WGETKBY', 'P3WE6537Z', idToken) } }
                downvote={ () => { if (this.isLogged()) this.props.downvoteComment('P3WE6537Z', 'P3WGETKBY', idToken) } }
                flag={ () => { if (this.isLogged()) this.props.flagComment('P3WE6537Z', 'P3WGETKBY', idToken) } }/>

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
  followPage: PropTypes.func,
  upvoteComment: PropTypes.func,
  downvoteComment: PropTypes.func,
  flagComment: PropTypes.func
}

export default Page
