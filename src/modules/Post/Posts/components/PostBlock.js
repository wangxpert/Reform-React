import React, { Component } from 'react'

// Import Components
import {
  Circle
} from 'better-react-spinkit'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import EditIcon from 'material-ui/svg-icons/navigation/menu';

class PostBlock extends Component {

  render() {
    const props = this.props
    const { post, user } = this.props

    const spinnerStyle = { display: 'inline-block', padding: '0', margin: '0 0 0 1rem', height: 'auto' }

    return (

      <div className="post my-5 mx-auto pt-3 text-center">

        <div className="media p-3">
          <div className="media-left mx-3">
            <img src={ `https://${ post.picture }` } className="media-object post-avatar" alt="User Avatar" />
          </div>
          <div className="media-body">
            <h5 className="media-heading">{ post.preferred_username }</h5>
            <span>{ `${ post.cityname } / ${ post.departmentname }` }</span>
          </div>
          { (user && post.username === user.email) &&
            <div className="float-right pr-3">
              <IconMenu
                iconButtonElement={<IconButton><EditIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <MenuItem primaryText="Edit" onClick={ () => props.onEdit(post) } />
                <MenuItem primaryText="Delete" onClick={ () => props.onDelete(post) } />
              </IconMenu>
            </div>
          }
        </div>

        { post.media && <img src={ `https://${ post.media }` } className="post-media" alt="Post Media" /> }

        <div className="px-4 pt-3 pb-1">
          <p className="post-text">{ post.text }</p>
          <div className="p-3 row">
            <button className="btn btn-secondary post-button col" onClick={ e => props.onUpvote(post) }>
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
              &nbsp;&nbsp;{ post.upvotes }
              { props.state === 'UPVOTING_POST' && props.currentPost === post.post
                ? <Circle size={ 15 } color='black' style={ spinnerStyle }/>
                : ' Support'
              }
            </button>
            <button className="btn btn-secondary post-button col" onClick={ e => props.onDownvote(post) }>
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
              &nbsp;&nbsp;{ post.downvotes }
              { props.state === 'DOWNVOTING_POST' && props.currentPost === post.post
                ? <Circle size={ 15 } color='black' style={ spinnerStyle }/>
                : ' Don\'t Support'
              }
            </button>
            <button className="btn btn-secondary post-button col" onClick={ e => props.onComment(post) }>
              <i className="fa fa-comments" aria-hidden="true"></i>
              &nbsp;&nbsp;{ post.flags }
              { props.state === 'COMMENTING_POST' && props.currentPost === post.post
                ? <Circle size={ 15 } color='black' style={ spinnerStyle }/>
                : ' Comment'
              }
            </button>
            <button className="btn btn-secondary post-button col" onClick={ e => props.onFlag(post) }>
              <i className="fa fa-thumbs-up" aria-hidden="true"></i>
              &nbsp;&nbsp;{ post.flags }
              { props.state === 'FLAGGING_POST' && props.currentPost === post.post
                ? <Circle size={ 15 } color='black' style={ spinnerStyle }/>
                : ' Report'
              }
            </button>
          </div>
        </div>

      </div>
    )
  }
}

export default PostBlock
