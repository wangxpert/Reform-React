import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Import components
import {
  Circle
} from 'better-react-spinkit'

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/navigation/menu';

export default class Comment extends Component {

  constructor(props) {
    super(props)

    this.onUpvote = this.onUpvote.bind(this)
    this.onDownvote = this.onDownvote.bind(this)
    this.onReport = this.onReport.bind(this)
  }

  onUpvote() {
    if (this.props.state === 'UPVOTING_COMMENT')
      return

    this.props.upvote()
  }

  onDownvote() {
    if (this.props.state === 'DOWNVOTING_COMMENT')
      return

    this.props.downvote()
  }

  onReport() {
    if (this.props.state === 'DOWNVOTING_COMMENT')
      return

    this.props.flag()
  }

  onEditComment(commentId) {
    this.props.editComment(commentId)
  }

  onDeleteComment(commentId) {
    this.props.deleteComment(commentId)
  }

  render() {
    const { comment, user } = this.props

    return (
      <div className={ `comment ${ this.props.className }` }>
        { (user && comment.username === user.email) &&
          <div className="float-right pr-3">
            <IconMenu
              iconButtonElement={<IconButton><EditIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="Edit" onClick={ () => this.onEditComment(comment.commentid) } />
              <MenuItem primaryText="Delete" onClick={ () => this.onDeleteComment(comment.commentid) } />
            </IconMenu>
          </div>
        }
        <div className="media pt-3 ml-3">
          <div className="media-left mx-3">
            <img src={ comment.useravatar ? `https://${ comment.useravatar }` : '/img/user.png' } className="media-object img-thumbnail avatar" alt=""/>
          </div>
          <div className="media-body">
            <div className="media-heading user-name"><strong>{ comment.useralias }</strong></div>

            <span>{ new Date(comment.timestamp).toDateString() }</span>
          </div>

        </div>

        <div className="px-4 pt-3 pb-1">
          <p className="">{ comment.content }</p>
          <div className="p-3 row">
            <button className="btn btn-secondary post-button col" onClick={ this.onUpvote }>
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
              { this.props.state === 'UPVOTING_COMMENT' && this.props.comment.commentid === this.props.currentComment
                ? <Circle size={ 15 } color='black' style={{ display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }}/>
                : ` ${ comment.upvotes } Support`
              }
            </button>
            <button className="btn btn-secondary post-button col" onClick={ this.onDownvote }>
              <i className="fa fa-thumbs-down" aria-hidden="true"></i>
              { this.props.state === 'DOWNVOTING_COMMENT' && this.props.comment.commentid === this.props.currentComment
                ? <Circle size={ 15 } color='black' style={{ display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }}/>
                : ` ${ comment.downvotes } Don't support`
              }
            </button>
            <button className="btn btn-secondary post-button col" onClick={ this.onReport }>
              <i className="fa fa-user-times" aria-hidden="true"></i>
              { this.props.state === 'FLAGGING_COMMENT' && this.props.comment.commentid === this.props.currentComment
                ? <Circle size={ 15 } color='black' style={{ display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }}/>
                : ` ${ comment.flags } Report`
              }
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  flag: PropTypes.func.isRequired
}
