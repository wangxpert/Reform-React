import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import Components
import { NotificationManager } from 'react-notifications'

import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui/svg-icons/navigation/menu'

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
import Comment from '../../Activism/Page/components/Comment'

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

class Post extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      showCreatePage: false,
      showCreateComment: false,
      showEditComment: false,
      showConfirmDeleteComment: false,
      showConfirmDeletePost: false,
      comment: null
    }

    this.onChange = this.onChange.bind(this)

    this.upvotePost = this.upvotePost.bind(this)
    this.downvotePost = this.downvotePost.bind(this)
    this.flagPost = this.flagPost.bind(this)
    this.editPost = this.editPost.bind(this)
    this.deletePost = this.deletePost.bind(this)

    this.toggleAddCommentDialog = this.toggleAddCommentDialog.bind(this)
    this.toggleEditCommentDialog = this.toggleEditCommentDialog.bind(this)

    this.addComment = this.addComment.bind(this)
    this.editComment = this.editComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)

    this.toggleConfirmDeleteCommentDialog = this.toggleConfirmDeleteCommentDialog.bind(this)
    this.toggleConfirmDeletePostDialog = this.toggleConfirmDeletePostDialog.bind(this)
    this.isLogged = this.isLogged.bind(this)
  }

  componentWillMount() {
    const longId = this.props.match.params.postLongId
    const path = longId.split('-')
    this.props.getPost(path[0], path[1], path[2], path[3])
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post !== this.props.post && nextProps.post) {
      this.props.getComments(nextProps.post)
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

  addComment(text) {
    this.toggleAddCommentDialog()
    this.props.addComment(this.props.post, text, this.props.session.idToken.jwtToken)
  }

  editComment(comment) {
    this.setState({ comment: comment })
    this.toggleEditCommentDialog()
  }

  deleteComment(comment) {
    this.setState({ comment: comment })
    this.toggleConfirmDeleteCommentDialog()
  }

  deletePost() {
    this.props.deletePost(this.props.post, this.props.session.idToken.jwtToken)
    this.props.backLocation()
  }

  editPost() {
    this.props.changeLocation(`/post/edit/${this.props.post.postid}`)
  }

  upvotePost(e) {
    if (!this.isLogged()) return

    if (this.props.state === 'UPVOTING_POST')
      return

    this.props.upvotePost(this.props.post, this.props.session.idToken.jwtToken)
  }

  downvotePost(e) {
    if (!this.isLogged()) return

    if (this.props.state === 'DOWNVOTING_POST')
      return

    this.props.downvotePost(this.props.post, this.props.session.idToken.jwtToken)
  }

  flagPost(e) {
    if (!this.isLogged()) return

    if (this.props.state === 'FLAGGING_POST')
      return

    this.props.flagPost(this.props.post, this.props.session.idToken.jwtToken)
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

  toggleConfirmDeletePostDialog() {
    if (!this.isLogged()) return

    this.setState({ showConfirmDeletePost: !this.state.showConfirmDeletePost })
  }

  isLogged() {
    if (!this.props.session) {
      NotificationManager.error('You have to login to do this action.', "Error...")
      return false
    }
    return true
  }

  render() {
    const post = this.props.post
    const idToken = this.props.session ?  this.props.session.idToken.jwtToken : null

    if (!post)
      return null

    const shareUrl = ''

    let comments = null

    if (this.props.comments && this.props.comments)
      comments = this.props.comments.map((e, index) => (
        <Comment key={ index } className="my-3 mx-3 pt-3" comment={ e } state={ this.props.state } currentComment={ this.props.currentComment } user={ this.props.user }
          upvote={ () => { if (this.isLogged()) this.props.upvoteComment(e.postid, idToken) } }
          downvote={ () => { if (this.isLogged()) this.props.downvoteComment(e.postid, idToken) } }
          flag={ () => { if (this.isLogged()) this.props.flagComment(e.postid, idToken) } }
          editComment={ this.editComment } deleteComment={ this.deleteComment }/>
        ))

    return (
      <div className="post my-3 my-md-5">
        {/* Dialogs */}
        <InputDialog title={ 'Add Comment' } content={ 'Please enter the content of comment.' } buttonTitle={ 'Add' } defaultValue={''}
          isOpen={ this.state.showCreateComment } toggle={ this.toggleAddCommentDialog } save={ this.addComment }
        />

        <InputDialog title={ 'Edit Comment' } content={ 'Please enter the content of comment.' } buttonTitle={ 'Save' } defaultValue={ this.state.comment ? this.state.comment.text : '' }
          isOpen={ this.state.showEditComment } toggle={ this.toggleEditCommentDialog }
          save={ text => this.props.editComment(post, this.state.comment.id, text, idToken)  } />

        <ConfirmDialog title={ 'Confirm Deletion' } content={ 'Do you want to delete the comment?' }
          isOpen={ this.state.showConfirmDeleteComment } toggle={ this.toggleConfirmDeleteCommentDialog }
          confirm={ () => this.props.deleteComment(post, this.state.comment.id, idToken) } />

        <ConfirmDialog title={ 'Confirm Deletion' } content={ 'Do you want to delete this post?' }
          isOpen={ this.state.showConfirmDeletePost } toggle={ this.toggleConfirmDeletePostDialog }
          confirm={ this.deletePost } />
        {/* --- */}

        <div className="row">
          <div className="col-12">
            { (this.props.user && post.username === this.props.user.email) &&
              <div className="float-right">
                <IconMenu
                  onClick={ this.onContext }
                  iconButtonElement={<IconButton><EditIcon /></IconButton>}
                  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                  <MenuItem primaryText="Edit" onClick={ this.editPost } />
                  <MenuItem primaryText="Delete" onClick={ this.toggleConfirmDeletePostDialog } />
                </IconMenu>
              </div>
            }
            <div className="media p-3">
              <div className="media-left mx-3">
                <img src={ `https://${ post.picture }` } className="media-object post-avatar" alt="User Avatar" />
              </div>
              <div className="media-body">
                <h5 className="media-heading">{ post.preferred_username }</h5>
                <span>{ `${ post.cityname } / ${ post.departmentname }` }</span>
              </div>
            </div>
          </div>

          <div className="col-12 text-center" >
            <img className="post-media" src={ `https://${ post.media }` } alt="No Images" />
            <div className="mt-2 text-center">
              <FacebookShareButton
                url={ shareUrl }
                quote={ 'ReformCOW' }
                picture={ `https://${ post.media }` }
                className="share-button"
                >
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>

              <GooglePlusShareButton
                url={ shareUrl }
                quote={ 'ReformCOW' }
                className="share-button"
                >
                <GooglePlusIcon
                  size={32}
                  round />
              </GooglePlusShareButton>

              <LinkedinShareButton
                url={ shareUrl }
                quote={ 'ReformCOW' }
                className="share-button"
                >
                <LinkedShareIcon
                  size={32}
                  round />
              </LinkedinShareButton>

              <TwitterShareButton
                url={ shareUrl }
                quote={ 'ReformCOW' }
                className="share-button"
                >
                <TwitterShareIcon
                  size={32}
                  round />
              </TwitterShareButton>
            </div>
          </div>
          <div className="col-12">
            <div className="post-text">
              { post.text }
            </div>
          </div>

        </div>

        <div className="p-3 row">
          <Button className="col" style={ btnStyle2 } onClick={ this.upvotePost }>
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            { this.props.state === 'UPVOTING_POST'
              ? <Circle size={ 15 } color='white' style={ spinnerStyle }/>
              : ` ${ post.upvotes } Support`
            }
          </Button>
          <Button className="col" style={ btnStyle2 } onClick={ this.downvotePost }>
            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
            { this.props.state === 'DOWNVOTING_POST'
              ? <Circle size={ 15 } color='white' style={ spinnerStyle }/>
              : ` ${ post.downvotes } Don't Support`
            }
          </Button>
          <Button className="col" style={ btnStyle2 } onClick={ this.flagPost }>
            <i className="fa fa-user-times" aria-hidden="true"></i>
            { this.props.state === 'FLAGGING_POST'
              ? <Circle size={ 15 } color='white' style={ spinnerStyle }/>
              : ` ${ post.flags } Report`
            }
          </Button>
        </div>

        <div className="row">
          <div className="col-12 mt-1">
            <div className="comments-container">
              <div className="title text-center p-1">
                <i className="fa fa-comments" aria-hidden="true"></i> { this.props.comments.length } Comments
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


Post.propTypes = {
  auth: PropTypes.object,
  post: PropTypes.object,
  state: PropTypes.string,
  comments: PropTypes.array,
  currentComment: PropTypes.string,

  getComments: PropTypes.func,
  addComment: PropTypes.func,
  editComment: PropTypes.func,
  upvotePost: PropTypes.func,
  downvotePost: PropTypes.func,
  flagPost: PropTypes.func,
  // upvoteComment: PropTypes.func,
  // downvoteComment: PropTypes.func,
  // flagComment: PropTypes.func
}

export default Post
