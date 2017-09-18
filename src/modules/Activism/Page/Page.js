import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Styles
import 'react-responsive-carousel/lib/styles/carousel.css'
import 'video-react/dist/video-react.css'

// Import Components
import { Carousel } from 'react-responsive-carousel'
import { Player } from 'video-react'
import { NotificationManager } from 'react-notifications'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/navigation/menu';

import {
  Circle
} from 'better-react-spinkit'

import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

import Button from '../../../components/Button'
import ConfirmDialog from '../../../components/ConfirmDialog'
import InputDialog from '../../../components/InputDialog'
import Comment from './components/Comment'

const btnStyle = { padding: '3px 30px', marginRight: '16px' }
const btnStyle2 = { width: '100%', margin: '1px 1px' }
const spinnerStyle = { display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const GooglePlusIcon = generateShareIcon('google')
const LinkedShareIcon = generateShareIcon('linkedin')
const TwitterShareIcon = generateShareIcon('twitter')

class Page extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      showCreatePage: false,
      showCreateComment: false,
      showEditComment: false,
      showConfirmDeleteComment: false,
      showConfirmDeletePage: false,
      comment: null
    }

    this.onChange = this.onChange.bind(this)
    this.addUserEmail = this.addUserEmail.bind(this)
    this.addComment = this.addComment.bind(this)
    this.editComment = this.editComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    this.deletePage = this.deletePage.bind(this)
    this.editPage = this.editPage.bind(this)
    this.upvotePage = this.upvotePage.bind(this)
    this.downvotePage = this.downvotePage.bind(this)
    this.flagPage = this.flagPage.bind(this)
    this.followPage = this.followPage.bind(this)

    this.toggleAddCommentDialog = this.toggleAddCommentDialog.bind(this)
    this.toggleEditCommentDialog = this.toggleEditCommentDialog.bind(this)
    this.toggleConfirmDeleteCommentDialog = this.toggleConfirmDeleteCommentDialog.bind(this)
    this.toggleConfirmDeletePageDialog = this.toggleConfirmDeletePageDialog.bind(this)
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

  editComment(comment) {
    this.setState({ comment: comment })
    this.toggleEditCommentDialog()
  }

  deleteComment(comment) {
    this.setState({ comment: comment })
    this.toggleConfirmDeleteCommentDialog()
  }

  deletePage() {
    this.props.deletePage(this.props.page.id, this.props.auth.session.idToken.jwtToken)
  }

  editPage() {
    this.props.changeLocation(`/activism/update/${this.props.page.id}`)
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

    this.setState({ showCreateComment: !this.state.showCreateComment })
  }

  toggleEditCommentDialog() {
    if (!this.isLogged()) return

    this.setState({ showEditComment: !this.state.showEditComment })
  }

  toggleConfirmDeleteCommentDialog() {
    if (!this.isLogged()) return

    this.setState({ showConfirmDeleteComment: !this.state.showConfirmDeleteComment })
  }

  toggleConfirmDeletePageDialog() {
    if (!this.isLogged()) return

    this.setState({ showConfirmDeletePage: !this.state.showConfirmDeletePage })
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

    const shareUrl = ''

    let comments = null

    if (this.props.comments && this.props.comments.Items.length)
      comments = this.props.comments.Items.map((e, index) => (
        <Comment key={ index } className="my-3 mx-3 pt-3" comment={ e } state={ this.props.state } currentComment={ this.props.currentComment } user={ this.props.user }
          upvote={ () => { if (this.isLogged()) this.props.upvoteComment(e.activismid, e.commentid, idToken) } }
          downvote={ () => { if (this.isLogged()) this.props.downvoteComment(e.activismid, e.commentid, idToken) } }
          flag={ () => { if (this.isLogged()) this.props.flagComment(e.activismid, e.commentid, idToken) } }
          editComment={ this.editComment } deleteComment={ this.deleteComment }/>
        ))

    return (
      <div className="activism-page my-3 my-md-5">
        {/* Dialogs */}
        <InputDialog title={ 'Add Comment' } content={ 'Please enter the content of comment.' } buttonTitle={ 'Add' } default={''}
          isOpen={ this.state.showCreateComment } toggle={ this.toggleAddCommentDialog } save={ this.addComment } />

        <InputDialog title={ 'Edit Comment' } content={ 'Please enter the content of comment.' } buttonTitle={ 'Save' } default={ this.state.comment ? this.state.comment.content : '' }
          isOpen={ this.state.showEditComment } toggle={ this.toggleEditCommentDialog }
          save={ content => this.props.editComment(page.id, this.state.comment.commentid, content, idToken)  } />

        <ConfirmDialog title={ 'Confirm Deletion' } content={ 'Do you want to delete this page?' }
          isOpen={ this.state.showConfirmDeletePage } toggle={ this.toggleConfirmDeletePageDialog }
          confirm={ this.deletePage } />

        <ConfirmDialog title={ 'Confirm Deletion' } content={ 'Do you want to delete the comment?' }
          isOpen={ this.state.showConfirmDeleteComment } toggle={ this.toggleConfirmDeleteCommentDialog }
          confirm={ () => this.props.deleteComment(page.id, this.state.comment.commentid, idToken) } />
        {/* --- */}

        <div className="float-right text-right">
          { (this.props.user && page.username === this.props.user.email) &&
            <div className="">
              <IconMenu
                iconButtonElement={<IconButton><EditIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem primaryText="Edit" onClick={ this.editPage }/>
                <MenuItem primaryText="Delete" onClick={ () => this.toggleConfirmDeletePageDialog() }/>
              </IconMenu>
            </div>
          }
          <Button className="" onClick={ this.followPage }>
            <i className="fa fa-user-plus" aria-hidden="true"></i>
            { this.props.state === 'FOLLOWING_ACTIVISM_PAGE'
              ? <Circle size={ 15 } color='white' style={ spinnerStyle }/>
              : ` ${ page.followers ? page.followers : '' } Follow`
            }
          </Button>
        </div>

        <h1 className="title mt-3">{ page.title }</h1>


        <div className="row">
          <div className="col mb-3">
            { tier }
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-5 mb-3" >
            <div className="image-container">
              { page.images.length ?
                <Carousel axis="horizontal" showThumbs={ true } showArrows={ true } dynamicHeight={ true }>
                  { previewImages }
                </Carousel>
                : <div className="text-center p-5">No Image</div>
              }
            </div>
            <div className="pt-3 text-center">
              <div className="mb-2"> Share : </div>
              <FacebookShareButton
                url={ shareUrl }
                quote={ page.title }
                picture={ `https://${ page.images[0] }` }
                className="share-button"
                >
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>

              <GooglePlusShareButton
                url={ shareUrl }
                quote={ page.title }
                className="share-button"
                >
                <GooglePlusIcon
                  size={32}
                  round />
              </GooglePlusShareButton>

              <LinkedinShareButton
                url={ shareUrl }
                quote={ page.title }
                className="share-button"
                >
                <LinkedShareIcon
                  size={32}
                  round />
              </LinkedinShareButton>

              <TwitterShareButton
                url={ shareUrl }
                quote={ page.title }
                className="share-button"
                >
                <TwitterShareIcon
                  size={32}
                  round />
              </TwitterShareButton>
            </div>
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
                <i className="fa fa-comments" aria-hidden="true"></i> { this.props.comments ? this.props.comments.Count : 0 } Comments
              </div>
              <div className="py-3 col ml-auto">
                <Button style={ btnStyle } onClick={ e => this.toggleAddCommentDialog() } >
                  <small>+ COMMENT</small>
                </Button>
              </div>

              { comments }

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
  comments: PropTypes.object,
  currentComment: PropTypes.string,

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
